import React from 'react';
import { Card, CardImg, CardBody } from 'reactstrap'
import PropTypes from 'prop-types';

const SliderStep = (props) => {
	return (
		<Card className="slider-step">
			<CardImg src={props.img} alt="" />
			<CardBody>
				<div className="step">Step {props.index + 1}</div>
				<div className="title">{props.title}</div>
				<div className="desc">{props.description}</div>
				<div className="more">Learn more</div>
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