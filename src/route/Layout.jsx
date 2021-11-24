import React from 'react'
import Header from '../components/Page/Header'
import Footer from '../components/Page/Footer'
import PropTypes from 'prop-types';
class Layout extends React.Component {
	render() {
		return (
			<>
				<Header className="page-header" />
				{this.props.children}
				<Footer className="page-footer" />
			</>
		)
	}
}

Layout.propTypes = {
	children: PropTypes.object,
}

export default Layout