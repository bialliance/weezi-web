import React from 'react';
import { Card, CardImg, CardBody } from 'reactstrap'
import PropTypes from 'prop-types';
import ScrollAnimation from 'react-animate-on-scroll';

const SliderStep = (props) => {
	return (
		<Card className="slider-step">
			<ScrollAnimation animateIn="animate__animated animate__fadeInUp animate__delay-100ms" animateOnce={true}>
				<div className="step mobile">Step {props.index + 1}</div>
			</ScrollAnimation>
			<ScrollAnimation animateIn="animate__animated animate__fadeInUp animate__delay-300ms" animateOnce={true}>
				<CardImg src={props.img} alt="" />
			</ScrollAnimation>
			<CardBody>
				<ScrollAnimation animateIn="animate__animated animate__fadeInUp animate__delay-100ms" animateOnce={true}>
					<div className="step">Step {props.index + 1}</div>
				</ScrollAnimation>
				<ScrollAnimation animateIn="animate__animated animate__fadeInUp animate__delay-200ms" animateOnce={true}>
					<div className="title">{props.title}</div>
				</ScrollAnimation>
				<ScrollAnimation animateIn="animate__animated animate__fadeInUp animate__delay-300ms" animateOnce={true}>
					<div className="desc">{props.description}</div>
				</ScrollAnimation>
				{/* <div className="more">Learn more</div> */}
			</CardBody>
		</Card>
	)
}

SliderStep.propTypes = {
	history: PropTypes.object,
	index: PropTypes.number,
	img: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string
}

export default (SliderStep)