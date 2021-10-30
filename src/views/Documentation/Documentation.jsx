import React from 'react';
import { Container, Col, Row } from 'reactstrap'
import PropTypes from 'prop-types';

class Documentation extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<Container>
				<div>ya toje</div>
			</Container>
		)
	}
}

Documentation.propTypes = {
	history: PropTypes.object,
}

export default (Documentation)