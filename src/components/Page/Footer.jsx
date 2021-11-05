import React from 'react';
import { NavLink } from 'react-router-dom'
import { Container } from 'reactstrap'
import FooterIcon from '../../assets/img/page/footer_icon.svg'

const Footer = () => {
	return (
		<div className="page-footer">
			<Container>
				<div className="links-wrapper">
					<div className="links">
						<div className="d-flex flex-column">
							{/* <NavLink className="redirect" to={'/'}>Terms of service</NavLink>
							<NavLink className="redirect" to={'/'}>Privacy policy</NavLink>
							<NavLink className="redirect" to={'/'}>GitHub</NavLink> */}
							<NavLink className="redirect" to={{ pathname: "https://docs.weezi.io" }} target="_blank">Documents</NavLink>
							{/* <NavLink className="redirect" to={'/'}>Contact us</NavLink> */}
						</div>
						<div>
							<div className="rights">© 2021  Weezi</div>
							<div className="rights mobile">© 2021  Weezi<br />All rights reserved</div>
						</div>
					</div>
					<div className="links">
						<div className="d-flex flex-column">
							{/* <NavLink className="redirect" to={'/'}>Gitbook</NavLink> */}
							<NavLink className="redirect" to={{ pathname: 'https://t.me/weeziDAO' }} target="_blank">Telegram</NavLink>
							{/* <NavLink className="redirect" to={'/'}>Medium</NavLink>
							<NavLink className="redirect" to={'/'}>Twitter</NavLink> */}
						</div>
						<div>
							<div className="rights">All rights reserved</div>
							<div className="white-space mobile"></div>
						</div>
					</div>
				</div>
				<div className="footer-icon">
					<img src={FooterIcon} alt="" />
					<div className="white-space"></div>
				</div>
			</Container>
		</div>
	)
}

export default (Footer)