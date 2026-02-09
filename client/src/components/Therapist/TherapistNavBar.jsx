import React from 'react'
import NavStyles from './TherapistNavBar.module.css'
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link, NavLink, useNavigate } from 'react-router'
import MockUser from '../../assets/aw_mock-px.png'
import { IoMdLogOut } from "react-icons/io";
import axios from 'axios';

// Tanstack
import { useUsers } from '../../queries/users'
import {useUser} from '../../layouts/FrontDeskLayout'
const TherapistNavBar = () => {
  const { data: userData, isLoading: userDataIsLoading, error: userDataError} = useUsers();
      const redirect = useNavigate();
      const avatar = useUser()
      const handleLogout = async (e) => {
        try{
            localStorage.clear();
            const logoutStatus = await axios.post('http://localhost:8080/auth/logout', {}, { withCredentials: true } )
            redirect('/login');
        } catch(err){
            console.log('Logout Failed: '+ err);
        }
    }

  if (userDataIsLoading) return <div>Loading...</div>;
  if (userDataError) return <div>⚠ Error: {userDataError.message}</div>;
  return (
    <div className={NavStyles.main}>
      <h1>Accelerated Wellness & Pain Clinic</h1>
      <div>
        <ul className={NavStyles.navItems}>

 
            <li><IoIosNotifications/></li>
            <li className={NavStyles.userPhotoContainer}>{avatar ? <img src={avatar} alt="" /> : <div className={NavStyles.generateAvatar}>{userData.firstName.slice(0,1).toUpperCase()}</div>}</li>
            <p style={{color:'#454545'}}><strong>{userData.userRole}</strong>: {userData.firstName}</p>
            <button onClick={handleLogout} className="logout-btn"><IoMdLogOut/></button>
        </ul>

      </div>

    </div>
  )
}

export default TherapistNavBar
