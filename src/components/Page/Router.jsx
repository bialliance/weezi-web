import React from 'react';
import { NavLink } from 'react-router-dom'

class Router extends React.Component {

	activateRoute(event) {
		const routes = document.getElementsByClassName('route')
		for (let i = 0; i < routes.length; i++) { routes[i].classList.remove('active') }
		event.target.classList.add('active')
	}

	getHref(link) {
		const href = link.split('/')
		return href[href.length - 1]
	}

	componentDidMount() {
		const href = this.getHref(window.location.href)
		const routes = document.getElementsByClassName('route')
		for (let i = 0; i < routes.length; i++) {
			const routeHref = this.getHref(routes[i].href)
			href === routeHref ? routes[i].classList.add('active') : routes[i].classList.remove('active')
		}
	}

	render() {
		return (
			<div className="routes">
				<NavLink to={'/'} className="route active" onClick={this.activateRoute}>Home</NavLink>
				<NavLink to={'/documentation'} className="route" onClick={this.activateRoute}>Documentation</NavLink>
				<NavLink to={'/community'} className="route" onClick={this.activateRoute}>Community</NavLink>
			</div>
		)
	}
}

export default (Router)