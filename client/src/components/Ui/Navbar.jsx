import {React, useEffect, useState} from 'react'
import axios from 'axios';
import { Link, NavLink, useNavigate } from 'react-router'
import './Navbar.css'
import AwLogo from '../../assets/aw-logo-lowRes.png'
import MockUser from '../../assets/zoey.png'

import { IoSearchSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";

import { useUsers } from '../../queries/users'
import { useScroll } from '../../features/scrollContext'

const Navbar = () => {

    const [isOpenMenu, setOpenMenu] = useState(false);
    const redirect = useNavigate();

    const handleLogout = async (e) => {
        try{
            localStorage.clear();
            const logoutStatus = await axios.post('http://localhost:8080/auth/logout', {}, { withCredentials: true } )
            redirect('/login');
        } catch(err){
            console.log('Logout Failed: '+ err);
        }
    }

    const { data, isLoading, error } = useUsers();
    console.log(data);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>⚠ Error: {error.message}</div>;

    const ActiveNav = ({isActive})  => isActive ? 'activeNav nav-item' : 'nav-item'
  return (
        <nav className="nav-container">
            <div className="hamb" onClick={() => setOpenMenu(true) }><span className="hambLine"></span></div>
            <NavLink to="/" className='logoContainer'><img src={AwLogo} alt=""/></NavLink>
            <div className='navCenter'>
                <li>
                    <NavLink to="/" className={ActiveNav}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={ActiveNav}>About us</NavLink>
                </li>
                {/* <li>
                    <NavLink to="/services" className={ActiveNav}>Services</NavLink>
                </li> */}
                <li>
                    <NavLink to="/HMOs" className={ActiveNav}>HMOs</NavLink>
                </li>
                {/* <li>
                    <NavLink to="/FAQs" className={ActiveNav}>FAQs</NavLink>
                </li>
                <li>
                    <NavLink to="/Contact-Us" className={ActiveNav}>Contact Us</NavLink>
                </li> */}
                <div className='nav-indicator'></div>
            </div>
            
            <div className="right-nav">
                <IoSearchSharp className='search-btn'/>
                <Link to='/Appointment' className="nav-book-btn">Book Now</Link>
                    
                {data.loggedIn && <><Link className="user-icon" to='/patient/dashboard'><img src={MockUser} alt="" /></Link>
                <button onClick={handleLogout} className="logout-btn"><IoMdLogOut/></button> <p>{data.firstName}</p></>} 

                {!data.loggedIn && <Link to='/login' className='nav-book-btn'>Login</Link>} 
                
                
            </div>
        </nav>
  )
}

export default Navbar
