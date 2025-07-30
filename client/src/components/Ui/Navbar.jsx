import React from 'react'
import { Link, NavLink } from 'react-router'
import './Navbar.css'
import AwLogo from '../../assets/aw-logo-lowRes.png'
import MockUser from '../../assets/zoey.png'
import { IoSearchSharp } from "react-icons/io5";

const Navbar = () => {

    const ActiveNav = ({isActive})  => isActive ? 'activeNav nav-item' : 'nav-item'
  return (
     <nav>
        <div className="nav-container">
            <NavLink to="/" className='logoContainer'><img src={AwLogo} alt=""/></NavLink>
            <div className='navCenter'>
                <NavLink to="/" className={ActiveNav}>Home</NavLink>
                <NavLink to="/about" className={ActiveNav}>About us</NavLink>
                <NavLink to="/services" className={ActiveNav}>Services</NavLink>
                <NavLink to="/HMOs" className={ActiveNav}>HMOs</NavLink>
                <NavLink to="/FAQs" className={ActiveNav}>FAQs</NavLink>
                <NavLink to="/Contact-Us" className={ActiveNav}>Contact Us</NavLink>
                <div className='nav-indicator'></div>
            </div>
            
            <div className="right-nav">
                <IoSearchSharp className='search-btn'/>
                <Link to='/Appointment' className="nav-book-btn">Book Now</Link>
                <Link className="user-icon" to='/Welcome'><img src={MockUser} alt="" /></Link>
            </div>
            
        </div>
    </nav>
  )
}

export default Navbar
