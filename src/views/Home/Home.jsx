import React, {
	useEffect, useState
	// useState
} from 'react';
import { Container } from 'reactstrap'
import PropTypes from 'prop-types';
// import { useDencrypt } from "use-dencrypt-effect";
import CountUp from 'react-countup';
import icon1 from '../../assets/img/home/icon1.png'
import icon2 from '../../assets/img/home/icon2.svg'
import icon3 from '../../assets/img/home/icon3.svg'
import icon4 from '../../assets/img/home/icon4.png'
import icon5 from '../../assets/img/home/icon5.svg'
import icon6 from '../../assets/img/home/icon6.svg'
import icon7 from '../../assets/img/home/icon7.svg'
import icon8 from '../../assets/img/home/icon8.svg'
import icon9 from '../../assets/img/home/icon9.png'
import icon10 from '../../assets/img/home/icon10.svg'
import icon11 from '../../assets/img/home/icon11.svg'
import icon12 from '../../assets/img/home/icon12.svg'
import Slider from "react-slick";
import step1 from '../../assets/img/home/step1.png'
import step2 from '../../assets/img/home/step2.png'
import step3 from '../../assets/img/home/step3.png'
import step4 from '../../assets/img/home/step4.png'
import SliderStep from '../../components/Home/SliderStep'
import CreateForm from "../../components/Home/CreateForm"
import Preloader from '../../components/Home/Preloader';
import api from '../../api/api'
import SmoothScroll from '../../components/SmoothScroll/SmoothScroll';
import Footer from '../../components/Page/Footer';
import Header from '../../components/Page/Header';
import ScrollAnimation from 'react-animate-on-scroll';
// !!version with animation
// import mobileBackground from '../../assets/img/animation/comp_png/1080x1920/1080x1920_000.jpg'
// import iPhoneBackground from '../../assets/img/animation/comp_png/1177x2532/1177x2532_000.jpg'
import mobileBackground from '../../assets/img/home/state1_bg_mobile.png'
import iPhoneBackground from '../../assets/img/home/state1_bg_mobile.png'
import desktopBackground from '../../assets/img/home/state1_bg.png'

const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9, icon10, icon11, icon12]
const steps = [
	{
		img: step1,
		title: 'Deploy your unique DAO',
		description: 'Unique ENS name, Governance and Community tokens'
	},
	{
		img: step2,
		title: 'Customize for your audience',
		description: 'Voting rules, dashboard & reporting, % carry, withdraw / deposit terms and more'
	},
	{
		img: step3,
		title: 'Select or build investment strategies',
		description: 'Select and apply from dozens of working investment strategies or build your own'
	},
	{
		img: step4,
		title: 'Manage all your DAOs in 1 interface',
		description: 'Initiate and track all your activities in 1 interface'
	},
]

function DecryptAnimation(value) {
	// const { result, dencrypt } = useDencrypt();
	// useEffect(() => {
	// 	dencrypt(value);
	// }, []);
	// return result;
	return value
}

function importAll(r) {
	let images = []
	r.keys().map((item) => images.push(r(item)))
	return images
}

function getImages(propotions) {
	let images = []
	switch (propotions) {
		case '16:9':
			// !!version with animation
			// images = importAll(require.context('../../assets/img/animation/comp_png/1920x1080'));
			images = [{ default: desktopBackground }]
			break
		case '4:3':
			// images = importAll(require.context('../../assets/img/animation/comp_png/1920x1440'));
			images = [{ default: desktopBackground }]
			break
		case '3:4':
			// images = importAll(require.context('../../assets/img/animation/comp_png/1440x1920'));
			images = [{ default: desktopBackground }]
			break
		case '9:16':
			images = [{ default: mobileBackground }]
			break
		case '9:19.5':
			images = [{ default: iPhoneBackground }]
			break
		default:
			// images = importAll(require.context('../../assets/img/animation/comp_png/1920x1080'));
			images = [{ default: desktopBackground }]
			break;
	}
	return images
}

function closest(num, arr) {
	let curr = arr[0];
	let diff = Math.abs(num - curr);
	for (let val = 0; val < arr.length; val++) {
		const newdiff = Math.abs(num - arr[val]);
		if (newdiff < diff) {
			diff = newdiff;
			curr = arr[val];
		}
	}
	return curr;
}

function getScreenPropotions() {
	const ratiosArray = ['16:9', '4:3', '3:4', '9:16', '9:19.5'];
	const imageSizes = [[1920, 1080], [1920, 1440], [1440, 1920], [1080, 1920], [1170, 2532]];
	const ratioFloatsArray = [1.77, 1.33, 0.75, 0.56, 0.46];
	const height = window.screen.height
	const width = window.screen.width
	const currentRatioFloat = width / height;
	const matchedRatioFloat = parseFloat(closest(currentRatioFloat, ratioFloatsArray));
	const matchedRatio = ratiosArray[ratioFloatsArray.indexOf(matchedRatioFloat)];
	const imageSize = imageSizes[ratioFloatsArray.indexOf(matchedRatioFloat)]
	let isMobile = false
	if (width <= 1177) isMobile = true
	return { isMobile, propotions: matchedRatio, imageSize: { width: imageSize[0], height: imageSize[1] }, screenSize: { width, height } }
}

function cacheImages(srcArray, cb) {
	let promises = []
	srcArray.forEach((element, i) => {
		const src = element.default
		promises.push(new Promise((resolve, reject) => {
			const img = new Image()
			img.onload = () => resolve()
			img.src = src
		}))
	})
	Promise.all(promises).then(() => {
		cb()
	})

}

function fillHeight(resolutions) {
	const k = resolutions.imageSize.width / resolutions.imageSize.height
	return (resolutions.screenSize.height * k < resolutions.imageSize.height) ? false : true
}

function togglePageElements() {
	document.body.style.overflowY === '' ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = ''
}

function fadeOutPreloader(cb) {
	if (document.querySelector('.preloader-wrapper')) {
		document.querySelector('.preloader-wrapper').classList.add('fadeOut')
		setTimeout(() => {
			cb()
		}, 1000)
	}
}

function showImages() {
	const images = document.querySelector('.jpeg-animation-container')
	if (images.classList.contains('animate__fadeOut')) {
		images.classList.remove('animate__fadeOut')
		images.classList.add('animate__fadeIn')
	}
}

function hideImages() {
	const images = document.querySelector('.jpeg-animation-container')
	if (!images.classList.contains('animate__fadeOut')) {
		images.classList.add('animate__fadeOut')
		images.classList.remove('animate__fadeIn')
		images.classList.remove('animate__delay-2s')
	}
}
const Home = (props) => {
	const [isLoading, setIsLoading] = useState(true)
	const [backgroundIndex, setBackgroundIndex] = useState(0)
	const [images, setImages] = useState([])
	const [needfillHeight, setNeedfillHeight] = useState(false)
	const [DAOVaults, setDAOVaults] = useState(14)
	const [currentUsers, setCurrentUsers] = useState(285)
	const [aum, setAum] = useState(11.3)
	const [totalTransactionVolume, setTotalTransactionVolume] = useState(29.8)
	const [votesCastByCommunity, setVotesCastByCommunity] = useState(1743)
	const [isMobile, setIsMobile] = useState(false)
	const getDaoInfo = () => {
		api.getDaoInfo().then((data) => {
			setDAOVaults(data.DAOVaults)
			setCurrentUsers(data.currentUsers)
			setAum(data.aum)
			setTotalTransactionVolume(data.totalTransactionVolume)
			setVotesCastByCommunity(data.votesCastByCommunity)
		}).catch((e) => e)
	}

	const onSmoothScroll = (SmoothScrollY) => {
		const pageHeight = document.querySelector('.home-container.state3').offsetTop
		const yOffsetPerImage = pageHeight / images.length
		let imageIndex = Math.floor(SmoothScrollY / yOffsetPerImage)
		if (imageIndex > 100) imageIndex = 100
		if (imageIndex < 0) imageIndex = 0
		if (backgroundIndex !== imageIndex) setBackgroundIndex(imageIndex - 1 > 0 ? imageIndex - 1 : 0)
	}
	useEffect(() => {
		togglePageElements()
		getDaoInfo()
		const { isMobile, propotions, imageSize, screenSize } = getScreenPropotions()
		setIsMobile(isMobile)
		setNeedfillHeight(fillHeight({ imageSize, screenSize }))
		const images = getImages(propotions)
		setImages(images)
		cacheImages(images, () => {
			fadeOutPreloader(() => {
				togglePageElements()
				setIsLoading(false)
			})
		})
		function handleScroll() {
			const pageHeight = document.querySelector('.home-container.state3').offsetTop
			if (window.pageYOffset < pageHeight) showImages()
			if (window.pageYOffset >= pageHeight) hideImages()
		}
		window.addEventListener('scroll', handleScroll);
		return function cleanup() {
			window.removeEventListener('scroll', handleScroll);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div>
			{
				isLoading ? <Preloader /> :
					<>
						<div>
							<div className="jpeg-animation-container animate__animated animate__fadeIn animate__delay-2s">
								{/* {
									// !!version with animation
									!isMobile &&
									<>
										<div className="filler left"></div>
										<div className="filler right"></div>
									</>
								} */}
								{images.map((image, index) => {
									let classNames = 'jpeg-animation'
									if (needfillHeight) classNames += ' h-100 w-auto'
									if (backgroundIndex + 1 !== index && backgroundIndex - 1 !== index && backgroundIndex !== index) classNames += ' d-none'
									// if (backgroundIndex === index) classNames += ' z-index-2'

									return (
										<img key={image.default} src={image.default} alt="" className={classNames} />
									)
								})}
							</div>
						</div>
						<Header className="page-header" />
						<SmoothScroll onSmoothScroll={isMobile ? () => { } : onSmoothScroll}>
							<div className="home-page-content-wrapper">
								<CreateForm history={props.history} />
								<div className="home-container state1">
									<div className="content">
										<svg className="weezi-logo-i animate__animated animate__fadeInUp animate__delay-1150ms" xmlns="http://www.w3.org/2000/svg" width="65" height="14" viewBox="0 0 65 14" fill="none"><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-custom-link" /><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-general-link" />
											<g clipPath="url(#clip0_54:39)">
												<path d="M0 9.5118L7.76712 14L15.5342 9.5118V0L12.8493 1.55289V7.9589L9.10959 10.1271V4.0274H6.42466V10.1271L2.68493 7.9589V1.55289L0 0V9.5118Z" fill="black" />
												<path className="w2-i anim-word-i" d="M21.9002 0.19165L18.0273 6.90398L21.9002 13.6163H31.4519L29.899 10.9314H23.4557L21.9002 8.24644H27.5977V5.56151H21.9002L23.4557 2.87658H29.899L31.4519 0.19165H21.9002Z" fill="black" />
												<path className="w3-i anim-word-i" d="M35.9002 0.19165L32.0273 6.90398L35.9002 13.6163H45.4519L43.899 10.9314H37.4557L35.9002 8.24644H41.5977V5.56151H35.9002L37.4557 2.87658H43.899L45.4519 0.19165H35.9002Z" fill="black" />
												<path className="w4-i anim-word-i" d="M47.5618 13.6163H58.4933V10.9314H51.2429L58.4933 2.87658V0.19165H47.7535V2.87658H54.8122L47.5618 10.9314V13.6163Z" fill="black" />
												<path className="w5-i anim-word-i" d="M64.4384 0.19165H61.7534V13.6163H64.4384V0.19165Z" fill="black" />
											</g>
											<defs>
												<clipPath id="clip0_54:39">
													<rect width="64.4384" height="14" fill="white" />
												</clipPath>
											</defs>
										</svg>
										<h2 className="title animate__animated animate__fadeInUp animate__delay-1300ms">Now - simple CRM  for DAO Asset Management <br />	in DeFi, NFT and GameFi</h2>
										<span className="subtitle animate__animated animate__fadeInUp animate__delay-1450ms">Tomorrow - disrupter of family offices, trusts,  <br />endowments, charity and grants organizations</span>
										<span className="subtitle mobile">
											<div>Launch</div>
											<div>Customize</div>
											<div>Manage in 1 interface</div>
										</span>
									</div>
								</div>
								<div className="home-container state3">

									<div className="content">
										<div className="stats">
											{/* animate__animated animate__fadeInUp_300 animate__delay-650ms */}
											<ScrollAnimation
												animateIn="animate__animated animate__fadeInUp_300 animate__delay-100ms"
												animateOnce={true}
											>
												<div className="stat">
													<CountUp className="number" end={DAOVaults} duration={2} />
													<span className="title">{DecryptAnimation('DAO Vaults')}</span>
												</div>
											</ScrollAnimation>
											<ScrollAnimation
												animateIn="animate__animated animate__fadeInUp_300 animate__delay-100ms"
												animateOnce={true}
											>
												<div className="stat">
													<CountUp className="number" useEasing={true} prefix="$" suffix="M" decimal="," decimals={1} end={aum} duration={1} />
													<span className="title">{DecryptAnimation('Assets Under Management')}</span>
												</div>
											</ScrollAnimation>
											<ScrollAnimation
												animateIn="animate__animated animate__fadeInUp_300 animate__delay-100ms"
												animateOnce={true}
											>
												<div className="stat">
													<CountUp className="number" useEasing={true} prefix="$" suffix="M" decimal="," decimals={1} end={totalTransactionVolume} duration={1} />
													<span className="title">{DecryptAnimation('Total Transaction Volume')}</span>
												</div>
											</ScrollAnimation>
										</div>
										<div className="stats">
											<ScrollAnimation
												animateIn="animate__animated animate__fadeInUp_300 animate__delay-200ms"
												animateOnce={true}
											>
												<div className="stat">
													<CountUp className="number" end={currentUsers} duration={2} />
													<span className="title">{DecryptAnimation('Current Users')}</span>
												</div>
											</ScrollAnimation>
											<ScrollAnimation
												animateIn="animate__animated animate__fadeInUp_300 animate__delay-200ms"
												animateOnce={true}
											>
												<div className="stat">
													<CountUp className="number" end={votesCastByCommunity} duration={2} />
													<span className="title">{DecryptAnimation('Votes Cast by Community')}</span>
												</div>
											</ScrollAnimation>
										</div>
									</div>

								</div>

								<div className="home-container state4">
									<div className="content">
										<ScrollAnimation animateIn="animate__animated animate__fadeInUp animate__delay-100ms" animateOnce={true}>
											<span className="title">500+<br />Supported Tokens</span>
										</ScrollAnimation>
										<ScrollAnimation animateIn="animate__animated animate__fadeInUp animate__delay-250ms pt-1_25vw" animateOnce={true}>
											<span className="description">Ethereum, Uniswap, Maker, Sushswap, Instadapp, Aave, Lido,<br />wBTC, Yearn, Curve, Balancer, Compound, Furucombo and more </span>
										</ScrollAnimation>
										<div className="icons">
											{
												icons.map((icon, index) => (
													<ScrollAnimation key={icon} animateIn={`animate__animated animate__fadeInUp animate__delay-${50 * (index + 1)}ms`} animateOnce={true}>
														<div className="icon-wrapper" >
															<img src={icon} alt="" className="icon" />
														</div>
													</ScrollAnimation>
												))
											}
										</div>
										<ScrollAnimation animateIn="animate__animated animate__fadeInUp animate__delay-250ms pt-1_25vw" animateOnce={true}>
											<div className="description mobile">Ethereum, Uniswap, Maker, Sushswap,<br />Instadapp, Aave, Lido, wBTC, Yearn, Curve,<br />Balancer, Compound, Furucombo and more</div>
										</ScrollAnimation>
									</div>
								</div>

								<div className="home-container state5">
									<div className="content">
										<div className="slider-content-desc">
											<div className="subtitle">
												<ScrollAnimation animateIn="animate__animated animate__fadeInUp_300 animate__delay-100ms" animateOnce={true}>
													<span>All you need for transparent and secure<br /></span>
												</ScrollAnimation>
												<ScrollAnimation animateIn="animate__animated animate__fadeInUp_300 animate__delay-200ms" animateOnce={true}>
													<span>asset management on-chain</span>
												</ScrollAnimation>
											</div>
											<div className="tip">Scroll to learn more</div>
										</div>
										<Container>
											<Slider
												dots={true}
												infinite={true}
												speed={500}
												slidesToShow={1}
												slidesToScroll={1}
												rows={1}
											>
												{
													steps.map((step, index) =>
													(<SliderStep key={step.img}
														index={index}
														img={step.img}
														title={step.title}
														description={step.description}
														history={props.history}
													/>)
													)
												}
											</Slider>
										</Container>
									</div>
								</div>
							</div>
							<Footer className="page-footer" />
						</SmoothScroll>
					</>
			}
		</div>
	)
}

Home.propTypes = {
	history: PropTypes.object,
}

export default (Home)