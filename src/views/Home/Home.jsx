import React, {
	useEffect, useState
	// useState
} from 'react';
import { Container } from 'reactstrap'
import PropTypes from 'prop-types';
// import { useDencrypt } from "use-dencrypt-effect";
import {
	fadeInRight,
	// fadeOut
} from 'react-animations';
import styled, { keyframes } from 'styled-components';
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
// import VideoBackground from '../../components/Home/VideoBackground';

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

const inAnim = keyframes`${fadeInRight}`
// const outAnim = keyframes`${fadeOut}`
const AmimationDiv1 = styled.div`
		animation: 1s ${inAnim};
		display: none;
		padding-top: 4.2vw;
		display: flex;
		flex-direction: column;
	`;
const AmimationDiv2 = styled.div`
	animation: 1s ${inAnim};
	display: none;
		padding-top: 4.2vw;
		display: flex;
		flex-direction: column;
`;

function importAll(r) {
	let images = []
	r.keys().map((item) => images.push(r(item)))
	return images
}

function getImages(propotions) {
	let images = []
	switch (propotions) {
		case '16:9':
			images = importAll(require.context('../../assets/img/animation/comp_png/1920x1080'));
			break
		case '4:3':
			images = importAll(require.context('../../assets/img/animation/comp_png/1920x1440'));
			break
		case '3:4':
			images = importAll(require.context('../../assets/img/animation/comp_png/1440x1920'));
			break
		case '9:16':
			images = importAll(require.context('../../assets/img/animation/comp_png/1080x1920'));
			break
		case '9:19.5':
			images = importAll(require.context('../../assets/img/animation/comp_png/1177x2532'));
			break
		default:
			images = importAll(require.context('../../assets/img/animation/comp_png/1920x1080'));
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
	return { propotions: matchedRatio, imageSize: { width: imageSize[0], height: imageSize[1] }, screenSize: { width, height } }
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
	const header = document.querySelector('.page-header-wrapper')
	const footer = document.querySelector('.page-footer')
	header.style.display === 'none' ? header.style.display = 'block' : header.style.display = 'none'
	footer.style.display === 'none' ? footer.style.display = 'flex' : footer.style.display = 'none'
}

function fadeOutPreloader(cb) {
	document.querySelector('.preloader-wrapper').classList.add('fadeOut')
	setTimeout(() => {
		cb()
	}, 2000)
}

const Home = (props) => {
	const [isLoading, setIsLoading] = useState(true)
	const [backgroundIndex, setBackgroundIndex] = useState(0)
	const [images, setImages] = useState([])
	const [needfillHeight, setNeedfillHeight] = useState(false)
	useEffect(() => {
		togglePageElements()
		const { propotions, imageSize, screenSize } = getScreenPropotions()
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
			const pageHeight = document.querySelector('.home-container.state4').offsetTop
			const yOffsetPerImage = pageHeight / images.length
			let imageIndex = Math.floor(window.pageYOffset / yOffsetPerImage)
			if (imageIndex > 100) imageIndex = 100
			if (imageIndex < 0) imageIndex = 0
			//TODO midleware easing 
			if (backgroundIndex !== imageIndex) setBackgroundIndex(imageIndex - 1 > 0 ? imageIndex - 1 : 0)
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
					<div className="home-page-content-wrapper">
						<div className="filler left"></div>
						<div className="filler right"></div>
						{images.map((image, index) => {
							let classNames = 'jpeg-animation'
							if (needfillHeight) classNames += ' h-100 w-auto'
							if (backgroundIndex !== index) classNames += ' d-none'
							return (
								<img src={image.default} alt="" className={classNames} />
							)
						})}
						<CreateForm history={props.history} />
						<div className="home-container state1">
							<div className="content">
								<svg className="weezi-logo-i" xmlns="http://www.w3.org/2000/svg" width="65" height="14" viewBox="0 0 65 14" fill="none"><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-custom-link" /><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-general-link" />
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
								<h2 className="title">Now - simple CRM  for DAO Asset Management <br />	in DeFi, NFT and GameFi</h2>
								<span className="subtitle">Tomorrow - disrupter of family offices, trusts,  <br />endowments, charity and grants organizations</span>
								<span className="subtitle mobile">
									<div>Launch</div>
									<div>Customize</div>
									<div>Manage in 1 interface</div>
								</span>
							</div>
						</div>

						{/* <div className="home-container state2">
					<div className="content">
						<svg className="weezi-logo" xmlns="http://www.w3.org/2000/svg" width="65" height="14" viewBox="0 0 65 14" fill="none"><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-custom-link" /><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-general-link" />
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
						<h2 className="title">CRM for on-chain DAO Asset Management</h2>
						<span className="subtitle">Launch + Customize + Manage in 1 interface</span>
					</div>
				</div> */}

						<div className="home-container state3">

							<div className="content">
								<div className="stats">
									<AmimationDiv1>
										<CountUp className="number" end={14} duration={2} />
										<span className="title">{DecryptAnimation('DAO Vaults')}</span>
									</AmimationDiv1>
									<AmimationDiv2 className="stat">
										<CountUp className="number" useEasing={true} prefix="$" suffix="M" decimal="," decimals={1} end={12.4} duration={1} />
										<span className="title">{DecryptAnimation('Assets Under Management')}</span>
									</AmimationDiv2>
									<AmimationDiv2 className="stat">
										<CountUp className="number" useEasing={true} prefix="$" suffix="M" decimal="," decimals={1} end={28.3} duration={1} />
										<span className="title">{DecryptAnimation('Total Transaction Volume')}</span>
									</AmimationDiv2>
								</div>
								<div className="stats">
									<AmimationDiv1 className="stat">
										<CountUp className="number" end={248} duration={2} />
										<span className="title">{DecryptAnimation('Current Users')}</span>
									</AmimationDiv1>
									<AmimationDiv1 className="stat">
										<CountUp className="number" end={1690} duration={2} />
										<span className="title">{DecryptAnimation('Votes Cast by Community')}</span>
									</AmimationDiv1>
								</div>
							</div>

						</div>

						<div className="home-container state4">
							<div className="content">
								<span className="title">500+<br />Supported Tokens</span>
								<span className="description">Ethereum, Uniswap, Maker, Sushswap, Instadapp, Aave, Lido,<br />wBTC, Yearn, Curve, Balancer, Compound, Furucombo and more </span>
								<div className="icons">
									{
										icons.map((icon, index) => (
											<div key={`icon-${index}`} className="icon-wrapper" >
												<img src={icon} alt="" className="icon" />
											</div>
										))
									}
								</div>
								<div className="description mobile">Ethereum, Uniswap, Maker, Sushswap,<br />Instadapp, Aave, Lido, wBTC, Yearn, Curve,<br />Balancer, Compound, Furucombo and more</div>
							</div>
						</div>

						<div className="home-container state5">
							<div className="content">
								<div className="slider-content-desc">
									<div className="subtitle">All you need for transparent and secure<br />asset management on-chain</div>
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
											(<SliderStep key={`step-${index}`}
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
			}
		</div>
	)
}

Home.propTypes = {
	history: PropTypes.object,
}

export default (Home)