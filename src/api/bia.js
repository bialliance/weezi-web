import Web3 from 'web3'
import Web3Modal from 'web3modal'
import MewConnect from '@myetherwallet/mewconnect-web-client'
import { checkNameAbi } from '../config/checkNameAbi.json'
import { hash } from 'eth-ens-namehash'
import { proxyBot } from '../config/default.json'
import { ENS } from '../config/contractAdresses.json'

const VOTING_BOOLS = [false, false]

class Bia {
    constructor() {
        this.connected = false
        this.provider = ''
        this.web3 = ''
        this.accountAddress = ''
        this.exexutionHash = ''
        this.contract = ''
        this.aragonContract = ''
        this.daos = ''
        this.chainId = ''
        this.chainLogo = ''
        this.networkName = ''
        this.appChainId = ''
        this.canChangeNetwork = false
        this.proxyBotAddress = proxyBot.address
        this.tokenRequestAddress = proxyBot.tokenRequest.main
        this.proxyBotUrl = proxyBot.url.main
        this.price = proxyBot.price.main
    }

    async getNetworkName() {
        if (this.web3) {
            this.networkName = await this.web3.eth.net.getNetworkType()
        } else {
            console.log('To get Netwirk Name you need to connect first')
        }
    }

    getENSContractAddress(chainId) {
        switch (chainId) {
            case 4:
                return ENS.testnet
            case 97:
                return ENS.binanceTest
            case 1:
                return ENS.mainnet
            case 56:
                return ENS.binanceMain
            default:
                return ''
        }
    }

    changeWallet() {
        return new Promise(async (resolve, reject) => {
            this.web3 = new Web3(this.provider)
            this.web3.eth.net.isListening().then(() => {
                this.web3.eth.getAccounts().then((accounts) => {
                    this.accountAddress = accounts[0]
                    this.web3.eth.getChainId().then(async (r) => {
                        this.chainId = r
                        this.appChainId = r
                        this.connected = true
                        this.canChangeNetwork = true
                        this.chainLogo = this.getChainLogo(this.chainId)
                        this.networkName = await this.web3.eth.net.getNetworkType()
                        resolve(accounts[0])
                    })
                }).catch((e) => reject(e))
            }).catch((e) => reject(e))
        })
    }

    async connect(callback = () => { }) {
        if (!this.connected) {
            const providerOptions = {
                mewconnect: {
                    package: MewConnect, // required
                    options: {
                        infuraId: '1fa62a71dee94d9ebc1fc18e82207e55', // required
                    },
                },
            }
            const web3Modal = new Web3Modal({
                // network: "mainnet", // optional
                cacheProvider: false, // optional
                providerOptions, // required
                theme: 'dark',
            })
            web3Modal.clearCachedProvider()

            this.provider = await web3Modal.connect()
            this.web3 = new Web3(this.provider)
            this.web3.eth.net
                .isListening()
                .then(() => {
                    this.web3.eth.getAccounts().then((e) => {
                        this.accountAddress = e[0]
                        this.web3.eth.getChainId().then(async (r) => {
                            this.chainId = r
                            this.appChainId = r
                            this.connected = true
                            this.canChangeNetwork = true
                            this.chainLogo = this.getChainLogo(this.chainId)
                            this.networkName = await this.web3.eth.net.getNetworkType()
                            this.proxyBotUrl = proxyBot.url[String(this.chainId)]
                            this.tokenRequestAddress = proxyBot.tokenRequest[String(this.chainId)]
                            this.price = proxyBot.price[String(this.chainId)]
                            callback({
                                address: this.accountAddress,
                                success: true,
                            })
                        })
                    })
                })
                .catch((e) => {
                    callback({ address: null, success: false })
                })
        } else {
            this.networkName = await this.web3.eth.net.getNetworkType()
            callback({ address: this.accountAddress, success: true })
        }
    }

    async waitForResponse(hash, ms, triesLeft = 10) {
        return new Promise((resolve, reject) => {
            const interval = setInterval(async () => {
                await this.web3.eth.getTransactionReceipt(hash).then((res) => {
                    if (res !== null) {
                        if (res.status) {
                            clearInterval(interval)
                            resolve(res)
                        }
                    }
                })
            }, ms)
        })
    }

    async checkName(name) {
        return new Promise((resolve, reject) => {
            this.connect(() => {
                const contractAddress = this.getENSContractAddress(this.chainId)
                const contract = new this.web3.eth.Contract(
                    checkNameAbi.abi,
                    contractAddress,
                )
                const nameHased = hash(`${name}.aragonid.eth`)
                console.log(name)
                console.log(nameHased)
                contract.methods
                    .resolver(nameHased)
                    .call((err, result) => {
                        if (err) {
                            console.log(err)
                            reject(err)
                        }
                        resolve(result)
                    })
            })
        })
    }
    setChainId(cb = () => { }) {
        this.web3.eth.getChainId().then(async (r) => {
            this.chainId = r
            cb(r)
        })
    }

    async getDao(callback = () => { }) {
        if (!this.connected) {
            alert('Need to connect')
        } else {
            this.setChainId(async (chainId) => {
                this.contract = await this.getDaoFactoryContract()
                if (this.contract) {
                    this.contract.methods
                        .getDaos(this.accountAddress)
                        .call((err, result) => {
                            if (err) {
                                console.log(err)
                            }
                            this.daos = result
                            callback(this.daos)
                        })
                } else {
                    callback(undefined)
                }
            })
        }
    }

    spliceAddress(address) {
        return (
            address.substr(0, 5) + '..' + address.substr(address.length - 4, 4)
        )
    }
}
export default Bia;