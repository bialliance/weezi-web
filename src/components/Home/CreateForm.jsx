import React, {
  useState,
} from "react";
import {
  // Input,
  Button,
  Col,
  Row,
  Form,
  FormGroup,
} from "reactstrap";
import axios from 'axios';
import InputRange from 'react-input-range';
import { CheckCircle, XCircle } from "phosphor-react";
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';
import InputTextField from '../UI/InputTextField'
import InputNumberField from "../UI/InputNumberField";
import TextareaField from '../UI/TextareaField'
import ConnectAlert from "./ConnectAlert";
import Bia from '../../api/bia'
const bia = new Bia()
const CreateForm = (props) => {

  const [currentStep, setCurrentStep] = useState(1)
  const [lastActive, setLastActive] = useState(0)
  const [nameFree, setNameFree] = useState(false)

  const [daoName, setDaoName] = useState('')
  const [daoDescription, setDaoDescription] = useState('')
  const [gpTokenName, setGpTokenName] = useState('')
  const [gpTokenSymbol, setGpTokenSymbol] = useState('')
  const [gpAmount, setGpAmount] = useState(30000)
  const [votingSupportRequired, setVotingSupportRequired] = useState(51)
  const [votingMinimalApproval, setVotingMinimalApproval] = useState(25)
  const [voteDurationDays, setVoteDurationDays] = useState(0)
  const [voteDurationHours, setVoteDurationHours] = useState(24)
  const [voteDurationMinutes, setVoteDurationMinutes] = useState(0)
  const [allocationPeriodDays, setAllocationPeriodDays] = useState(3)
  const [allocationPeriodHours, setAllocationPeriodHours] = useState(0)
  const [allocationPeriodMinutes, setAllocationPeriodMinutes] = useState(0)
  const [delayPeriodDays, setDelayPeriodDays] = useState(2)
  const [delayPeriodHours, setDelayPeriodHours] = useState(0)
  const [delayPeriodMinutes, setDelayPeriodMinutes] = useState(0)

  const [lpTokenName, setLpTokenName] = useState('')
  const [lpTokenSymbol, setLpTokenSymbol] = useState('')
  const [lpAmount, setLpAmount] = useState(1)
  const [dotVotingSupportRequired, setDotVotingSupportRequired] = useState(40)
  const [dotVotingMinimalApproval, setDotVotingMinimalApproval] = useState(40)
  const [dotVoteDurationDays, setDotVoteDurationDays] = useState(5)
  const [dotVoteDurationHours, setDotVoteDurationHours] = useState(0)
  const [dotVoteDurationMinutes, setDotVoteDurationMinutes] = useState(0)
  const [financeBudgetPeriodDays, setFinanceBudgetPeriodDays] = useState(7)
  const [financeBudgetPeriodHours, setFinanceBudgetPeriodHours] = useState(0)
  const [financeBudgetPeriodMinutes, setFinanceBudgetPeriodMinutes] = useState(0)

  const [error, setError] = useState(false)
  const [errorText, setErrorText] = useState('')

  const [percent, setPercent] = useState(0)
  const [daoLink, setDaoLink] = useState('')
  const [createStatusTitle, setCreateStatusTitle] = useState('Creating your personal DAO')
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const format = function (days, hours, minutes) {
    return (
      Number(minutes) * 60 +
      Number(hours) * 60 * 60 +
      Number(days) * 24 * 60 * 60
    )
  }
  const calculatePercentage = (logs) => {
    let percent = 5
    for (let i = 0; i < logs.length; i++) {
      if (logs[i].message.includes('Creating TokenManagers')) {
        percent = 32
        continue
      }
      if (logs[i].message.includes('Finalize DAO')) {
        percent = 69
        continue
      }
      if (logs[i].message.includes('Sending fees')) {
        percent = 100
        continue
      }
    }
    return percent
  }
  const createDao = async function () {
    document.activeElement.blur()
    nextStep()
    if (!nameFree) {
      setErrorText('Name is busy!')
      setError(true)
    } else if (!bia.connected) {
      bia.connect(async (data) => {
        console.log('bia.connect')
        console.log(data)
        bia.walletConnected = data.success
        if ([1, 4, 56, 97].includes(bia.chainId)) {
          setError(false)
          sendData()
        } else {
          setErrorText('Unsupported Metamask Network')
          setError(true)
        }
      })
    } else {
      bia.setChainId(async (chainId) => {
        if ([1, 4, 56, 97].includes(chainId)) {
          bia.appChainId = chainId
          setError(false)
          sendData()
        } else {
          setErrorText('Unsupported Metamask Network')
          setError(true)
        }
      })
    }
  }
  const sendData = async function () {
    if (bia.appChainId === bia.chainId) {
      const params = {
        daoName: daoName || '',
        daoDescription: daoDescription || '',
        gpTokenName: gpTokenName || '',
        gpTokenSymbol: gpTokenSymbol || '',
        gpAmount:
          String(gpAmount) + '000000000000000000' || '',
        lpTokenName: lpTokenName || '',
        lpTokenSymbol: lpTokenSymbol || '',
        lpAmount:
          String(lpAmount) + '000000000000000000' || '',
        votingSettings: [
          String(votingSupportRequired) + '0000000000000000' ||
          '0',
          String(votingMinimalApproval) + '0000000000000000' ||
          '0',
          format(
            voteDurationDays,
            voteDurationHours,
            voteDurationMinutes,
          ),
        ],
        dotVotingSettings: [
          String(dotVotingSupportRequired) +
          '0000000000000000' || '0',
          String(dotVotingMinimalApproval) + '0000000000000000' ||
          '0',
          format(
            dotVoteDurationDays,
            dotVoteDurationHours,
            dotVoteDurationMinutes,
          ),
        ],
        appSettings: [
          format(
            allocationPeriodDays,
            allocationPeriodHours,
            allocationPeriodMinutes,
          ),
          format(
            financeBudgetPeriodDays,
            financeBudgetPeriodHours,
            financeBudgetPeriodMinutes,
          ),
          format(
            delayPeriodDays,
            delayPeriodHours,
            delayPeriodMinutes,
          ),
        ],
        tokenRequest: bia.tokenRequestAddress,
      }
      const proxyBotParams = {
        daoName: params.daoName,
        gpTokenName: params.gpTokenName,
        gpTokenSymbol: params.gpTokenSymbol,
        lpTokenName: params.lpTokenName,
        lpTokenSymbol: params.lpTokenSymbol,
        votingSettings: params.votingSettings,
        dotVotingSettings: params.dotVotingSettings,
        gpAmount: params.gpAmount,
        lpAmount: params.lpAmount,
        tokenRequest: bia.tokenRequestAddress,
        appSettings: params.appSettings,
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
                    const { data: { data: { id, params: { daoName } } } } = res
                    let percentLocal = 0
                    const percentUpdater = setInterval(() => {
                      console.log(percentLocal)
                      if (percentLocal < 100) {
                        console.log(percentLocal < 100)
                        axios.get(`${bia.proxyBotUrl}/requests/${id}/logs`).then((logs) => {
                          percentLocal = calculatePercentage(logs.data)
                          setPercent(percentLocal)
                        })
                      } else {
                        console.log(percentLocal < 100)
                        setPercent(100)
                        clearInterval(percentUpdater)
                        setDaoLink(bia.getDaoAddress(daoName))
                        updateDisplay()
                      }
                    }, 1000)
                  })
              })
              .catch((e) => {
                errorText('Transaction denied')
                error(true)
              })
          } else {
            setErrorText('Proxy Bot is dead')
            setError(true)
          }
        })
        .catch((e) => {
          setErrorText('Proxy Bot is dead')
          setError(true)
          console.log(e)
        })
    } else {
      setError(true)
    }
  }

  const updateDisplay = () => {
    document.querySelector('.create-form_close-form').style.zIndex = 8
    document.querySelector('.daoLink').style.display = "block"
    document.querySelector('.daoName').style.display = "none"
    setCreateStatusTitle('Done')
  }

  function validateName(name) {
    if (!name) {
      setDaoName(name)
      return
    }
    let validName = name.toLowerCase()
      // eslint-disable-next-line no-useless-escape
      .replace(/[&\/\\#,+()$~%.'":*?<>{}!@^_|=`]/g, '')
      // eslint-disable-next-line no-control-regex
      .replace(/[^\x00-\x7F]+/g, '')
      .replace(' ', '')
    // if ((validName.length === 1 && validName[0] === '-') || (validName.length > 1 && validName[validName.length - 1] === '-' && validName[validName.length - 2] === '-')) validName = validName.substring(0, validName[validName.length - 2])
    if (daoName !== validName) isNameAvailable(validName)
    setDaoName(validName)
  }

  async function isNameAvailable(name) {
    if (!name) {
      setNameFree(false)
      return
    }
    if (!bia.connected) {
      setNameFree(false)
      bia.connect((response) => {
        if (!response.success) {
          setAlertMessage(response.message)
          setShowAlert(true)
        } else {
          setAlertMessage('')
          setShowAlert(false)
        }
      })
      return
    } else {
      let nameFreeHash = ''
      try {
        nameFreeHash = await bia.checkName(name)
      } catch (e) {
        nameFreeHash = '0x0000000000000000000000000000000000000000'
      }
      if (nameFreeHash === '0x0000000000000000000000000000000000000000') {
        setNameFree(true)
      } else {
        setNameFree(false)
      }
    }
  }

  function nextStep() {
    bia.connect((response) => {
      if (!response.success) setShowAlert(true)
      else {
        setLastActive(currentStep)
        setCurrentStep(currentStep + 1)
      }
    })
  }
  function prevStep() {
    setLastActive(currentStep - 2)
    setCurrentStep(currentStep - 1)
  }
  function hideCreateForm() {
    document.querySelector('.create-form').classList.add('create-form_hidden')
    document.querySelector('.page-header-wrapper').classList.remove('d-none')
    document.body.style.overflowY = 'auto'
  }

  function validateNumber(e, min, max, setValue, prevValue) {
    console.log(e.target.validity.valid)
    console.log(e.target.value)
    if (e.target.validity.valid)
      if (Number(e.target.value) >= min && Number(e.target.value) <= max) setValue(Number(e.target.value))
      else if (Number(e.target.value) < min) setValue(min)
      else if (Number(e.target.value) > max) setValue(max)
      else setValue(prevValue)
  }

  function focusInput() {
    if (window.innerWidth <= 414) {
      const stepDOM = document.querySelector(`.create-form_step-${currentStep}`)
      stepDOM.querySelector('.create-form_left-side').classList.add('d-none')
      stepDOM.querySelector('.create-form_right-side').style.height = '35vh'
    }
  }

  function unfocusInput() {
    if (window.innerWidth <= 414) {
      const stepDOM = document.querySelector(`.create-form_step-${currentStep}`)
      stepDOM.querySelector('.create-form_left-side').classList.remove('d-none')
      stepDOM.querySelector('.create-form_right-side').style.height = '70vh'
    }
  }

  function connectThroughtAlert() {
    bia.connect()
  }



  return (
    <div className='create-form create-form_hidden'>
      <ConnectAlert
        showAlert={showAlert}
        // showAlert={alertMessage ? true : false}
        setShowAlert={setShowAlert}
        onClick={connectThroughtAlert}
        message={alertMessage}
      />
      <span className='create-form_close-form' onClick={hideCreateForm}><svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 6.5L25.5 25.5M6.5 25.5L25.5 6.5L6.5 25.5Z" stroke="black" strokeWidth="2" strokeMiterlimit="10" />
      </svg>
      </span>
      <Form>
        <NavLink className={`redirect${currentStep !== 1 ? ' hidden' : ''}`} onClick={() => { props.history.push('/'); window.location.reload() }} to={'/'}>
          <svg className="weezi-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 14" fill="none"><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-custom-link" /><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-general-link" />
            <g clipPath="url(#clip0_54:39)">
              <path d="M0 9.5118L7.76712 14L15.5342 9.5118V0L12.8493 1.55289V7.9589L9.10959 10.1271V4.0274H6.42466V10.1271L2.68493 7.9589V1.55289L0 0V9.5118Z" fill="black" />
              <path className="w2 anim-word" d="M21.9002 0.19165L18.0273 6.90398L21.9002 13.6163H31.4519L29.899 10.9314H23.4557L21.9002 8.24644H27.5977V5.56151H21.9002L23.4557 2.87658H29.899L31.4519 0.19165H21.9002Z" fill="black" />
              <path className="w3 anim-word" d="M35.9002 0.19165L32.0273 6.90398L35.9002 13.6163H45.4519L43.899 10.9314H37.4557L35.9002 8.24644H41.5977V5.56151H35.9002L37.4557 2.87658H43.899L45.4519 0.19165H35.9002Z" fill="black" />
              <path className="w4 anim-word" d="M47.5618 13.6163H58.4933V10.9314H51.2429L58.4933 2.87658V0.19165H47.7535V2.87658H54.8122L47.5618 10.9314V13.6163Z" fill="black" />
              <path className="w5 anim-word" d="M64.4384 0.19165H61.7534V13.6163H64.4384V0.19165Z" fill="black" />
            </g>
            <defs>
              <clipPath id="clip0_54:39">
                <rect width="64.4384" height="14" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </NavLink>
        <Row className={`create-form_step create-form_step-1${currentStep === 1 ? ' create-form_active' : ''}${lastActive === 1 ? ' create-form_last-active' : ''}`}>
          <div className="create-form_topbar" onClick={prevStep}>1/3 Create DAO </div>
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
                <div className="position-relative">
                  <InputTextField
                    onFocus={focusInput}
                    onBlur={unfocusInput}
                    id="daoName"
                    placeholder="Enter DAO name"
                    validate={validateName}
                    value={daoName}
                  />
                  {
                    nameFree ?
                      <CheckCircle color="green" className="input-icon" /> :
                      <XCircle color="red" className="input-icon" />
                  }
                </div>
                <TextareaField
                  onFocus={focusInput}
                  onBlur={unfocusInput}
                  id="daoDescription"
                  placeholder="and DAO description"
                  value={daoDescription}
                  validate={setDaoDescription}
                  maxRows={6}
                />
              </FormGroup>
            </Col>
          </div>
          <Button className="next-btn" type="button" onClick={nextStep}>Next</Button>
        </Row>

        <Row className={`create-form_step create-form_step-2${currentStep === 2 ? ' create-form_active' : ''}${lastActive === 2 ? ' create-form_last-active' : ''}`}>
          <div className="create-form_topbar" onClick={prevStep}>2/3 Create GP token</div>
          <div className="flex-wrapper">
            <Col className="create-form_left-side" xs={12} lg={6}>
              <h2>2/3</h2>
            </Col>
            <Col className="create-form_right-side" xs={12} lg={6}>
              <div>
                <h1>Create GP token</h1>
                <p>GP Token is a cryptocurrency based on user’s real-life usability that enables real-time payment and realization.</p>
                <FormGroup>
                  <InputTextField
                    onFocus={focusInput}
                    onBlur={unfocusInput}
                    id="gpTokenName"
                    placeholder="Full token name"
                    validate={setGpTokenName}
                    value={gpTokenName}
                  />
                  <InputTextField
                    onFocus={focusInput}
                    onBlur={unfocusInput}
                    id="gpTokenSymbol"
                    placeholder="Token Symbol"
                    validate={setGpTokenSymbol}
                    value={gpTokenSymbol}
                  />
                  <InputNumberField
                    onFocus={focusInput}
                    onBlur={unfocusInput}
                    id="gpAmount"
                    placeholder="Amount"
                    validate={validateNumber}
                    value={gpAmount}
                    pattern="[0-9]*"
                    min={0}
                    max={1000000000}
                    setValue={setGpAmount}
                  />
                </FormGroup>
              </div>
              <div>
                <h1>Voting</h1>
                <p>GP Token is a cryptocurrency based on user’s real-life usability that enables real-time payment and realization.</p>

                <FormGroup>
                  <div className="position-relative">
                    <div className="input-range-label">
                      <div>Support</div>
                      <div className="percent">{votingSupportRequired}%</div>
                    </div>
                    <InputRange
                      maxValue={100}
                      minValue={0}
                      value={votingSupportRequired}
                      onChange={value => setVotingSupportRequired(value)} />
                  </div>
                  <div className="position-relative">
                    <div className="input-range-label">
                      <div>Minimum approval</div>
                      <div className="percent">{votingMinimalApproval}%</div>
                    </div>
                    <InputRange
                      maxValue={100}
                      minValue={0}
                      value={votingMinimalApproval}
                      onChange={value => setVotingMinimalApproval(value)} />
                  </div>
                </FormGroup>
              </div>
              <div className="vote-period-wrapper">
                <div className="vote-row">
                  <div className="vote-period-label">Vote Duration</div>
                  <FormGroup className="vote-period">
                    <InputNumberField
                      onFocus={focusInput}
                      onBlur={unfocusInput}
                      id="voteDurationDays"
                      placeholder="Days"
                      validate={validateNumber}
                      value={voteDurationDays}
                      pattern="[0-9]*"
                      min={0}
                      max={99}
                      setValue={setVoteDurationDays}
                    />
                    <InputNumberField
                      onFocus={focusInput}
                      onBlur={unfocusInput}
                      id="voteDurationHours"
                      placeholder="Hours"
                      validate={validateNumber}
                      value={voteDurationHours}
                      pattern="[0-9]*"
                      min={0}
                      max={24}
                      setValue={setVoteDurationHours}
                    />
                    <InputNumberField
                      onFocus={focusInput}
                      onBlur={unfocusInput}
                      id="voteDurationMinutes"
                      placeholder="Minutes"
                      validate={validateNumber}
                      value={voteDurationMinutes}
                      pattern="[0-9]*"
                      min={0}
                      max={60}
                      setValue={setVoteDurationMinutes}
                    />
                  </FormGroup>
                </div>
                <div className="vote-row">
                  <div className="vote-period-label">Allocations Period</div>
                  <FormGroup className="vote-period">
                    <InputNumberField
                      onFocus={focusInput}
                      onBlur={unfocusInput}
                      id="allocationPeriodDays"
                      placeholder="Days"
                      validate={validateNumber}
                      value={allocationPeriodDays}
                      pattern="[0-9]*"
                      min={0}
                      max={99}
                      setValue={setAllocationPeriodDays}
                    />
                    <InputNumberField
                      onFocus={focusInput}
                      onBlur={unfocusInput}
                      id="allocationPeriodHours"
                      placeholder="Hours"
                      validate={validateNumber}
                      value={allocationPeriodHours}
                      pattern="[0-9]*"
                      min={0}
                      max={24}
                      setValue={setAllocationPeriodHours}
                    />
                    <InputNumberField
                      onFocus={focusInput}
                      onBlur={unfocusInput}
                      id="allocationPeriodMinutes"
                      placeholder="Minutes"
                      validate={validateNumber}
                      value={allocationPeriodMinutes}
                      pattern="[0-9]*"
                      min={0}
                      max={60}
                      setValue={setAllocationPeriodMinutes}
                    />
                  </FormGroup>
                </div>
                <div className="vote-row">
                  <div className="vote-period-label">Delay Period</div>
                  <FormGroup className="vote-period">
                    <InputNumberField
                      onFocus={focusInput}
                      onBlur={unfocusInput}
                      id="delayPeriodDays"
                      placeholder="Days"
                      validate={validateNumber}
                      value={delayPeriodDays}
                      pattern="[0-9]*"
                      min={0}
                      max={99}
                      setValue={setDelayPeriodDays}
                    />
                    <InputNumberField
                      onFocus={focusInput}
                      onBlur={unfocusInput}
                      id="delayPeriodHours"
                      placeholder="Hours"
                      validate={validateNumber}
                      value={delayPeriodHours}
                      pattern="[0-9]*"
                      min={0}
                      max={24}
                      setValue={setDelayPeriodHours}
                    />
                    <InputNumberField
                      onFocus={focusInput}
                      onBlur={unfocusInput}
                      id="delayPeriodMinutes"
                      placeholder="Minutes"
                      validate={validateNumber}
                      value={delayPeriodMinutes}
                      pattern="[0-9]*"
                      min={0}
                      max={60}
                      setValue={setDelayPeriodMinutes}
                    />
                  </FormGroup>
                </div>
              </div>
            </Col>
          </div>
          <Button className="next-btn" type="button" onClick={nextStep}>Next</Button>
        </Row>

        <Row className={`create-form_step create-form_step-3${currentStep === 3 ? ' create-form_active' : ''}${lastActive === 3 ? ' create-form_last-active' : ''}`}>
          <div className="create-form_topbar" onClick={prevStep}> Create LP token</div>
          <div className="flex-wrapper">
            <Col className="create-form_left-side" xs={12} lg={6}>
              <h2>3/3</h2>
            </Col>
            <Col className="create-form_right-side" xs={12} lg={6}>
              <div>
                <h1>Create LP token</h1>
                <p>GP Token is a cryptocurrency based on user’s real-life usability that enables real-time payment and realization.</p>
                <FormGroup>
                  <InputTextField
                    onFocus={focusInput}
                    onBlur={unfocusInput}
                    id="lpTokenName"
                    placeholder="Full token name"
                    validate={setLpTokenName}
                    value={lpTokenName}
                  />
                  <InputTextField
                    onFocus={focusInput}
                    onBlur={unfocusInput}
                    id="lpTokenSymbol"
                    placeholder="Token Symbol"
                    validate={setLpTokenSymbol} value={lpTokenSymbol}
                  />
                  <InputTextField
                    onFocus={focusInput}
                    onBlur={unfocusInput}
                    id="lpAmount"
                    placeholder="Amount"
                    validate={setLpAmount} value={lpAmount}
                  />
                </FormGroup>
              </div>
              <div>
                <h1>Dot voting</h1>
                <p>GP Token is a cryptocurrency based on user’s real-life usability that enables real-time payment and realization.</p>
                <FormGroup>
                  <div className="position-relative">
                    <div className="input-range-label">
                      <div>Support</div>
                      <div className="percent">{dotVotingSupportRequired}%</div>
                    </div>
                    <InputRange
                      maxValue={100}
                      minValue={0}
                      value={dotVotingSupportRequired}
                      onChange={value => setDotVotingSupportRequired(value)} />
                  </div>
                  <div className="position-relative">
                    <div className="input-range-label">
                      <div>Minimum approval</div>
                      <div className="percent">{dotVotingMinimalApproval}%</div>
                    </div>
                    <InputRange
                      maxValue={100}
                      minValue={0}
                      value={dotVotingMinimalApproval}
                      onChange={value => setDotVotingMinimalApproval(value)} />
                  </div>
                </FormGroup>
              </div>
              <div className="vote-period-wrapper">
                <div className="vote-row">
                  <div className="vote-period-label">Dot Vote Duration</div>
                  <FormGroup className="vote-period">
                    <InputNumberField
                      onFocus={focusInput}
                      onBlur={unfocusInput}
                      id="dotVoteDurationDays"
                      placeholder="Days"
                      validate={validateNumber}
                      value={dotVoteDurationDays}
                      pattern="[0-9]*"
                      min={0}
                      max={99}
                      setValue={setDotVoteDurationDays}
                    />
                    <InputNumberField
                      onFocus={focusInput}
                      onBlur={unfocusInput}
                      id="dotVoteDurationHours"
                      placeholder="Hours"
                      validate={validateNumber}
                      value={dotVoteDurationHours}
                      pattern="[0-9]*"
                      min={0}
                      max={24}
                      setValue={setDotVoteDurationHours}
                    />
                    <InputNumberField
                      onFocus={focusInput}
                      onBlur={unfocusInput}
                      id="dotVoteDurationMinutes"
                      placeholder="Minutes"
                      validate={validateNumber}
                      value={dotVoteDurationMinutes}
                      pattern="[0-9]*"
                      min={0}
                      max={60}
                      setValue={setDotVoteDurationMinutes}
                    />
                  </FormGroup>
                </div>
                <div className="vote-row">
                  <div className="vote-period-label">Dot Vote Duration</div>
                  <FormGroup className="vote-period">
                    <InputNumberField
                      onFocus={focusInput}
                      onBlur={unfocusInput}
                      id="financeBudgetPeriodDays"
                      placeholder="Days"
                      validate={validateNumber}
                      value={financeBudgetPeriodDays}
                      pattern="[0-9]*"
                      min={0}
                      max={99}
                      setValue={setFinanceBudgetPeriodDays}
                    />
                    <InputNumberField
                      onFocus={focusInput}
                      onBlur={unfocusInput}
                      id="financeBudgetPeriodHours"
                      placeholder="Hours"
                      validate={validateNumber}
                      value={financeBudgetPeriodHours}
                      pattern="[0-9]*"
                      min={0}
                      max={24}
                      setValue={setFinanceBudgetPeriodHours}
                    />
                    <InputNumberField
                      onFocus={focusInput}
                      onBlur={unfocusInput}
                      id="financeBudgetPeriodMinutes"
                      placeholder="Minutes"
                      validate={validateNumber}
                      value={financeBudgetPeriodMinutes}
                      pattern="[0-9]*"
                      min={0}
                      max={60}
                      setValue={setFinanceBudgetPeriodMinutes}
                    />
                  </FormGroup>
                </div>
              </div>
            </Col>
          </div>
          <Button className="next-btn" type="button" onClick={createDao}>Create</Button>
        </Row>

        <Row className={`create-form_step create-form_step-4${currentStep === 4 ? ' create-form_active' : ''}${lastActive === 4 ? ' create-form_last-active' : ''}`}>
          <div className="create-status">
            <div className="title">
              <span className="bright">{createStatusTitle}</span>
              <span className="dark daoName">{daoName}</span>
              <div className="dark daoLink">
                <div>Your DAO url:</div>
                <NavLink to={{ pathname: daoLink }} target="_blank">{daoLink}</NavLink>
              </div>
            </div>
            <div className="percentage" style={{ width: `${percent}%` }}>{percent}%</div>
          </div>
        </Row>
      </Form>
    </div>
  );
}

CreateForm.propTypes = {
  history: PropTypes.object,
}

export default CreateForm;
