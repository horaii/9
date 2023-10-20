import { Link, NavLink } from 'react-router-dom';
import './Header.scss'
import { FaBars } from 'react-icons/fa';
import { toggle } from '../../../redux/menuSlice';
import { useDispatch } from 'react-redux';

export default function Header({ isMain }) {
	const dispatch = useDispatch()
	return (
		<header className='header myScroll'>
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
					<NavLink to='/community' activeClassName='active'>
						Community
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
			<FaBars 
				className='bars' 
				fontSize={22} 
				color={'#333'} 
				onClick={()=> dispatch(toggle())}
			/>
		</header>
	);
}
