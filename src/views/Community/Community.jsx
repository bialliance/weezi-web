import React from 'react';
import { Container, Col, Row } from 'reactstrap'
import PropTypes from 'prop-types';

class Community extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<Container>
				<div>i ya</div>
			</Container>
		)
	}
}

Community.propTypes = {
	history: PropTypes.object,
}

export default (Community)