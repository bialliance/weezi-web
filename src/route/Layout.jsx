import React from 'react'
import PropTypes from 'prop-types'
class Layout extends React.Component {
	render() {
		return (
			<>
				{this.props.children}
			</>
		)
	}
}

Layout.propTypes = {
	children: PropTypes.object,
}

export default Layout