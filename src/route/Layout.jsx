import React from 'react'
import Header from '../components/Page/Header'
import Footer from '../components/Page/Footer'
import PropTypes from 'prop-types';
// import SmoothScroll from "../components/SmoothScroll/SmoothScroll";
import styled, { keyframes } from 'styled-components';
const SmoothScroll  = styled.div`
  
`;
class Layout extends React.Component {
	render() {
		return (
			<SmoothScroll>
				<Header className="page-header" />
				{this.props.children}
				<Footer className="page-footer" />
			</SmoothScroll>
		)
	}
}

Layout.propTypes = {
	children: PropTypes.object,
}

export default Layout