import React, { useState } from "react";
import {
  Input,
  Button,
  Col,
  Row,
  Form,
  FormGroup,
} from "reactstrap";
import axios from 'axios';
import InputRange from 'react-input-range';
import Bia from '../../api/bia' 
const bia = new Bia()
const CreateForm = () => {

  const [hiddenForm, setHiddenForm] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [lastActive, setLastActive] = useState(0)

  const [daoName, setDaoName] = useState('')
  const [daoNameDree, setDaoNameDree] = useState(true)//TODO NAME CHECKER
  const [daoDescription, setDaoDescription] = useState('')
  const [gpTokenName, setGpTokenName] = useState('')
  const [gpTokenSymbol, setGpTokenSymbol] = useState('')
  const [gpAmount, setGpAmount] = useState(0)
  const [gpSupport, setGpSupport] = useState(0)
  const [gpApprove, setGpApprove] = useState(0)
  const [gpVoteDurationDays, setGpVoteDurationDays] = useState(0)
  const [gpVoteDurationHours, setGpVoteDurationHours] = useState(0)
  const [gpVoteDurationMinutes, setGpVoteDurationMinutes] = useState(0)
  const [gpAllocationPeriodDays, setGpAllocationPeriodDays] = useState(0)
  const [gpAllocationPeriodHours, setGpAllocationPeriodHours] = useState(0)
  const [gpAllocationPeriodMinutes, setGpAllocationPeriodMinutes] = useState(0)
  const [gpDelayPeriodDays, setGpDelayPeriodDays] = useState(0)
  const [gpDelayPeriodHours, setGpDelayPeriodHours] = useState(0)
  const [gpDelayPeriodMinutes, setGpDelayPeriodMinutes] = useState(0)

  const [lpTokenName, setLpTokenName] = useState('')
  const [lpTokenSymbol, setLpTokenSymbol] = useState('')
  const [lpAmount, setLpAmount] = useState(0)
  const [lpSupport, setLpSupport] = useState(0)
  const [lpApprove, setLpApprove] = useState(0)
  const [lpDotVoteDurationDays, setLpDotVoteDurationDays] = useState(0)
  const [lpDotVoteDurationHours, setLpDotVoteDurationHours] = useState(0)
  const [lpDotVoteDurationMinutes, setLpDotVoteDurationMinutes] = useState(0)
  const [lpDotVoteDurationDays2, setLpDotVoteDurationDays2] = useState(0)
  const [lpDotVoteDurationHours2, setLpDotVoteDurationHours2] = useState(0)
  const [lpDotVoteDurationMinutes2, setLpDotVoteDurationMinutes2] = useState(0)

  const format = function (days, hours, minutes) {
		return (
			Number(minutes) * 60 +
			Number(hours) * 60 * 60 +
			Number(days) * 24 * 60 * 60
		)
	}
	const createDao = async function () {
		if (!daoNameDree) {
			this.errorText = 'Name is busy!'
			this.error = true
		} else if (!bia.connected) {
			bia.connect(async (data) => {
				console.log('bia.connect')
				console.log(data)
				this.accountAddress = bia.spliceAddress(data.address)
				this.walletConnected = data.success
				if ([1, 4, 56, 97].includes(bia.chainId)) {
					this.error = false
					this.sendData()
				} else {
					this.errorText = 'Unsupported Metamask Network'
					this.error = true
				}
			})
		} else {
			bia.setChainId(async (chainId) => {
				if ([1, 4, 56, 97].includes(chainId)) {
					bia.appChainId = chainId
					this.error = false
					this.sendData()
				} else {
					this.errorText = 'Unsupported Metamask Network'
					this.error = true
				}
			})
		}
	}
	const sendData = async function () {
		if (bia.appChainId === bia.chainId) {
			this.newDao.indeterminate = true
			this.params = {
				platform: document.querySelector('#platform').value || '',
				daoName: this.daoName || '',
				daoDescription: this.daoDescription || '',
				gpTokenName: this.gpTokenName || '',
				gpTokenSymbol: this.gpTokenSymbol || '',
				gpAmount:
					String(this.gpAmount) + '000000000000000000' || '',
				lpTokenName: this.lpTokenName || '',
				lpTokenSymbol: this.lpTokenSymbol || '',
				lpAmount:
					String(this.lpAmount) + '000000000000000000' || '',
				votingSettings: [
					String(this.supportRequired) + '0000000000000000' ||
					'0',
					String(this.minAcceptanceQuorum) + '0000000000000000' ||
					'0',
					this.format(
						this.voteDays,
						this.voteHours,
						this.voteMinutes,
					),
				],
				dotVotingSettings: [
					String(this.dotMinAcceptanceQuorum) +
					'0000000000000000' || '0',
					String(this.dotSupportRequired) + '0000000000000000' ||
					'0',
					this.format(
						this.dotVoteDays,
						this.dotVoteHours,
						this.dotVoteMinutes,
					),
				],
				appSettings: [
					this.format(
						this.allocationDays,
						this.allocationHours,
						this.allocationMinutes,
					),
					this.format(
						this.financeBudgetDays,
						this.financeBudgetHours,
						this.financeBudgetMinutes,
					),
					this.format(
						this.delayDays,
						this.delayHours,
						this.delayMinutes,
					),
				],
				tokenRequest: bia.tokenRequestAddress,
			}
			this.hideForm = true
			const proxyBotParams = {
				daoName: this.params.daoName,
				gpTokenName: this.params.gpTokenName,
				gpTokenSymbol: this.params.gpTokenSymbol,
				lpTokenName: this.params.lpTokenName,
				lpTokenSymbol: this.params.lpTokenSymbol,
				votingSettings: this.params.votingSettings,
				dotVotingSettings: this.params.dotVotingSettings,
				gpAmount: this.params.gpAmount,
				lpAmount: this.params.lpAmount,
				tokenRequest: bia.tokenRequestAddress,
				appSettings: this.params.appSettings,
			}
			console.log(
				'------------------ PROXY BOT DATA ------------------',
			)
			console.log(bia.proxyBotUrl)
			console.log(bia.proxyBotAddress)
			console.log(bia.tokenRequestAddress)
			console.log(
				'------------------ PROXY BOT DATA ------------------',
			)
			axios
				.get(`${bia.proxyBotUrl}/status`)
				.then((res) => {
					if (res.data.success) {
						bia.web3.eth
							.sendTransaction({
								to: bia.proxyBotAddress,
								from: bia.accountAddress,
								value: bia.web3.utils.toWei(
									bia.price,
									'ether',
								),
							})
							.then((hash) => {
								console.log(hash.transactionHash)
								console.log(proxyBotParams)
								axios
									.post(
										`${bia.proxyBotUrl}/requests`,
										{
											tx_hash: hash.transactionHash,
											params: proxyBotParams,
										},
									)
									.then((res) => {
										this.newDao.value = 100
										this.newDao.indeterminate = false
										this.$router.push({
											name: 'DaoManager',
										})
									})
							})
							.catch((e) => {
								this.errorText = 'Transaction denied'
								this.error = true
								this.hideForm = false
							})
					} else {
						this.errorText = 'Proxy Bot is dead'
						this.error = true
					}
				})
				.catch((e) => {
					this.errorText = 'Proxy Bot is dead'
					this.error = true
					console.log(e)
				})
		} else {
			this.error = true
		}
	}
	const validateName = async function (name) {
		this.daoName = name
			.toLowerCase()
			// eslint-disable-next-line no-useless-escape
			.replace(/[&\/\\#,+()$~%.'":*?<>{}!@^_|=`]/g, '')
			// eslint-disable-next-line no-control-regex
			.replace(/[^\x00-\x7F]+/g, '')
			.replace(' ', '')
		const result = await bia.checkName(this.daoName)
		if (result === '0x0000000000000000000000000000000000000000') {
			this.nameFree = true
		} else {
			this.nameFree = false
		}
		console.log(result)
	}

  function nextStep() {
    setLastActive(currentStep)
    setCurrentStep(currentStep + 1)
  }
  function prevStep() {

    setLastActive(currentStep - 2)
    setCurrentStep(currentStep - 1)
  }
  function hideCreateForm() {
    document.querySelector('.create-form').classList.add('create-form_hidden')
    document.body.style.overflowY = 'auto'
  }

  return (
    <div className='create-form create-form_hidden'>
      <span className='create-form_close-form' onClick={hideCreateForm}><svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 6.5L25.5 25.5M6.5 25.5L25.5 6.5L6.5 25.5Z" stroke="black" stroke-width="2" stroke-miterlimit="10" />
      </svg>
      </span>
      <Form>
        <Row className={`create-form_step create-form_step-1${currentStep === 1 ? ' create-form_active' : ''}${lastActive === 1 ? ' create-form_last-active' : ''}`}>
          <div className="create-form_topbar" onClick={() => prevStep()}>1/3 Create DAO </div>
          <div className="flex-wrapper">
            <Col className="create-form_left-side" xs={12} lg={6}>
              <h2>1/3</h2>
            </Col>
            <Col className="create-form_right-side" xs={12} lg={6}>
              <div>
                <h1>Create DAO</h1>
                <p>So create your first DAO you have to fill this form. Don’t worry is less when 15 minutes</p>
              </div>
              <FormGroup>
                <Input label="" placeholder="Enter DAO name" onChange={(e) => setDaoName(e.target.value)} />
                <Input label="" placeholder="and DAO description" onChange={(e) => setDaoDescription(e.target.value)} />
              </FormGroup>
            </Col>
          </div>
          <Button className="next-btn" type="button" onClick={() => nextStep()}>Next</Button>
        </Row>

        <Row className={`create-form_step create-form_step-2${currentStep === 2 ? ' create-form_active' : ''}${lastActive === 2 ? ' create-form_last-active' : ''}`}>
          <div className="create-form_topbar" onClick={() => prevStep()}>2/3 Create GP token</div>
          <div className="flex-wrapper">
            <Col className="create-form_left-side" xs={12} lg={6}>
              <h2>2/3</h2>
            </Col>
            <Col className="create-form_right-side" xs={12} lg={6}>
              <div>
                <h1>Create GP token</h1>
                <p>GP Token is a cryptocurrency based on user’s real-life usability that enables real-time payment and realization.</p>
                <FormGroup>
                  <Input label="" placeholder="Full token name" onChange={(e) => setGpTokenName(e.target.value)} />
                  <Input label="" placeholder="Token Symbol" onChange={(e) => setGpTokenSymbol(e.target.value)} />
                  <Input label="" placeholder="Amount" onChange={(e) => setGpAmount(e.target.value)} />
                </FormGroup>
              </div>
              <div>
                <h1>Voting</h1>
                <p>GP Token is a cryptocurrency based on user’s real-life usability that enables real-time payment and realization.</p>

                <FormGroup>
                  <div className="position-relative">
                    <div className="input-range-label">
                      <div>Support</div>
                      <div>{gpSupport}%</div>
                    </div>
                    <InputRange
                      maxValue={100}
                      minValue={0}
                      value={gpSupport}
                      onChange={value => setGpSupport(value)} />
                  </div>
                  <div className="position-relative">
                    <div className="input-range-label">
                      <div>Minimum approval</div>
                      <div>{gpApprove}%</div>
                    </div>
                    <InputRange
                      maxValue={100}
                      minValue={0}
                      value={gpApprove}
                      onChange={value => setGpApprove(value)} />
                  </div>
                </FormGroup>
              </div>
              <div className="vote-period-wrapper">
                <div className="vote-row">
                  <div className="vote-period-label">Vote Duration</div>
                  <FormGroup className="vote-period">
                    <Input label="" placeholder="Days" onChange={(e) => setGpVoteDurationDays(e.target.value)} />
                    <Input label="" placeholder="Hours" onChange={(e) => setGpVoteDurationHours(e.target.value)} />
                    <Input label="" placeholder="Minutes" onChange={(e) => setGpVoteDurationMinutes(e.target.value)} />
                  </FormGroup>
                </div>
                <div className="vote-row">
                  <div className="vote-period-label">Allocations Period</div>
                  <FormGroup className="vote-period">
                    <Input label="" placeholder="Days" onChange={(e) => setGpAllocationPeriodDays(e.target.value)} />
                    <Input label="" placeholder="Hours" onChange={(e) => setGpAllocationPeriodHours(e.target.value)} />
                    <Input label="" placeholder="Minutes" onChange={(e) => setGpAllocationPeriodMinutes(e.target.value)} />
                  </FormGroup>
                </div>
                <div className="vote-row">
                  <div className="vote-period-label">Delay Period</div>
                  <FormGroup className="vote-period">
                    <Input label="" placeholder="Days" onChange={(e) => setGpDelayPeriodDays(e.target.value)} />
                    <Input label="" placeholder="Hours" onChange={(e) => setGpDelayPeriodHours(e.target.value)} />
                    <Input label="" placeholder="Minutes" onChange={(e) => setGpDelayPeriodMinutes(e.target.value)} />
                  </FormGroup>
                </div>
              </div>
            </Col>
          </div>
          <Button className="next-btn" type="button" onClick={() => nextStep()}>Next</Button>
        </Row>

        <Row className={`create-form_step create-form_step-2${currentStep === 3 ? ' create-form_active' : ''}${lastActive === 3 ? ' create-form_last-active' : ''}`}>
          <div className="create-form_topbar" onClick={() => prevStep()}> Create LP token</div>
          <div className="flex-wrapper">
            <Col className="create-form_left-side" xs={12} lg={6}>
              <h2>3/3</h2>
            </Col>
            <Col className="create-form_right-side" xs={12} lg={6}>
              <div>
                <h1>Create LP token</h1>
                <p>GP Token is a cryptocurrency based on user’s real-life usability that enables real-time payment and realization.</p>
                <FormGroup>
                  <Input label="" placeholder="Full token name" onChange={(e) => setLpTokenName(e.target.value)} />
                  <Input label="" placeholder="Token Symbol" onChange={(e) => setLpTokenSymbol(e.target.value)} />
                  <Input label="" placeholder="Amount" onChange={(e) => setLpAmount(e.target.value)} />
                </FormGroup>
              </div>
              <div>
                <h1>Dot voting</h1>
                <p>GP Token is a cryptocurrency based on user’s real-life usability that enables real-time payment and realization.</p>
                <FormGroup>
                  <div className="position-relative">
                    <div className="input-range-label">
                      <div>Support</div>
                      <div>{lpSupport}%</div>
                    </div>
                    <InputRange
                      maxValue={100}
                      minValue={0}
                      value={lpSupport}
                      onChange={value => setLpSupport(value)} />
                  </div>
                  <div className="position-relative">
                    <div className="input-range-label">
                      <div>Minimum approval</div>
                      <div>{lpApprove}%</div>
                    </div>
                    <InputRange
                      maxValue={100}
                      minValue={0}
                      value={lpApprove}
                      onChange={value => setLpApprove(value)} />
                  </div>
                </FormGroup>
              </div>
              <div className="vote-period-wrapper">
                <div className="vote-row">
                  <div className="vote-period-label">Dot Vote Duration</div>
                  <FormGroup className="vote-period">
                    <Input label="" placeholder="Days" onChange={(e) => setLpDotVoteDurationDays(e.target.value)} />
                    <Input label="" placeholder="Hours" onChange={(e) => setLpDotVoteDurationHours(e.target.value)} />
                    <Input label="" placeholder="Minutes" onChange={(e) => setLpDotVoteDurationMinutes(e.target.value)} />
                  </FormGroup>
                </div>
                <div className="vote-row">
                  <div className="vote-period-label">Dot Vote Duration</div>
                  <FormGroup className="vote-period">
                    <Input label="" placeholder="Days" onChange={(e) => setLpDotVoteDurationDays2(e.target.value)} />
                    <Input label="" placeholder="Hours" onChange={(e) => setLpDotVoteDurationHours2(e.target.value)} />
                    <Input label="" placeholder="Minutes" onChange={(e) => setLpDotVoteDurationMinutes2(e.target.value)} />
                  </FormGroup>
                </div>
              </div>
            </Col>
          </div>
          <Button className="next-btn" type="submit">Create</Button>
        </Row>
      </Form>
    </div>
  );
}

export default CreateForm;
