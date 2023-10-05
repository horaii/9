import { Link, NavLink } from 'react-router-dom';
import './Header.scss'

export default function Header({ isMain }) {
	return (
		<header className='header'>
			<h1>
				<Link to='/'>LOGO</Link>
			</h1>

			<ul>
				<li>
					<NavLink to='/department' activeClassName='active'>
						Department
					</NavLink>
				</li>
				<li>
					<NavLink to='/gallery' activeClassName='active'>
						Gallery
					</NavLink>
				</li>
				<li>
					<NavLink to='/youtube' activeClassName='active'>
						Youtube
					</NavLink>
				</li>
				<li>
					<NavLink to='/members' activeClassName='active'>
						Members
					</NavLink>
				</li>
				<li>
					<NavLink to='/contact' activeClassName='active'>
						Contact
					</NavLink>
				</li>
			</ul>
		</header>
	);
}
