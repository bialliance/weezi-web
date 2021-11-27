import React from 'react';
import { NavLink } from 'react-router-dom'
import menuIcon from '../../assets/img/page/menu.svg'
import { slide as Menu } from 'react-burger-menu'

const Router = () => {

	function activateRoute(event) {
		const routes = document.getElementsByClassName('route')
		for (let i = 0; i < routes.length; i++) { routes[i].classList.remove('active') }
		event.target.classList.add('active')
	}

	function getHref(link) {
		const href = link.split('/')
		return href[href.length - 1]
	}

	function toggleOverflow() {
		if (!menu) document.body.style.overflowY = 'hidden'
		else document.body.style.overflowY = 'auto'
		document.querySelector('.topbar-menu-icon').classList.toggle('active')
		setMenu(!menu)
	}

	const href = getHref(window.location.href)
	const routes = document.getElementsByClassName('route')
	for (let i = 0; i < routes.length; i++) {
		const routeHref = getHref(routes[i].href)
		href === routeHref ? routes[i].classList.add('active') : routes[i].classList.remove('active')
	}
	const [menu, setMenu] = React.useState(false)
	return (
		<div>
			<div className="routes mobile">
				<img src={menuIcon} alt="" className="topbar-menu-icon" />
				<Menu isOpen={menu} onOpen={toggleOverflow}>
					<div className="bm-content-wrapper">
						<div className="main-links">
							<NavLink to={'/'} className="route" onClick={activateRoute}>Home</NavLink>
							<NavLink to={{ pathname: "https://docs.weezi.io" }} target="_blank" className="route" onClick={activateRoute}>Documentation</NavLink>
							{/* <NavLink to={'/community'} className="route" onClick={activateRoute}>Community</NavLink> */}
						</div>
						<div className="bottom-links">
							<NavLink to={{ pathname: 'https://t.me/weeziDAO' }} target="_blank" className="link">Telegram</NavLink>
							{/* <NavLink to={'/'} target="_blank" className="link">Twitter</NavLink> */}
							{/* <NavLink to={'/'} target="_blank" className="link">Medium</NavLink> */}
						</div>
					</div>
				</Menu>
			</div>
			<div className="routes">
				<NavLink to={'/'} className="route active animate__animated animate__fadeInUp_300 animate__delay-650ms" onClick={activateRoute}>Home</NavLink>
				<NavLink to={{ pathname: "https://docs.weezi.io" }} target="_blank" className="route animate__animated animate__fadeInUp_300 animate__delay-800ms" onClick={activateRoute}>Documentation</NavLink>
				{/* <NavLink to={'/community'} className="route" onClick={activateRoute}>Community</NavLink> */}
			</div>
		</div>
	)
}

export default (Router)