
import React from "react"
import PropTypes from 'prop-types'
import {
	// Button
} from 'reactstrap'

const ConnectAlert = ({ showAlert, setShowAlert, onClick, message }) => {
	const alert = {
		zIndex: 10,
		margin: 0,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '1rem 2rem',
		position: 'absolute',
		width: '100%'
	}
	const close = {
		minWidth: '40px',
		minHeight: '40px',
		maxWidth: '40px',
		maxHeight: '40px',
		borderRadius: '45px',
		backgroundColor: 'rgba(0, 0, 0, .15)',
	}
	// const connect = {
	// 	height: '40px',
	// 	width: '200px',
	// 	borderRadius: '4px'
	// }
	return (
		<div className={`alert alert-danger alert-dismissible fade show${showAlert ? '' : ' d-none'}`} role="alert" style={alert}>
			{/* <Button className="next-btn" type="button" onClick={onClick} style={connect}>Connect</Button> */}
			<span><strong>Attention! </strong>{message ? message : 'For the service to work correctly, you need to use Metamask'}</span>
			<button onClick={() => setShowAlert(false)} type="button" className="close" style={close} data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
	);
}

ConnectAlert.propTypes = {
	showAlert: PropTypes.bool,
	setShowAlert: PropTypes.func,
	// onClick: PropTypes.func,
	message: PropTypes.string,
}

export default ConnectAlert