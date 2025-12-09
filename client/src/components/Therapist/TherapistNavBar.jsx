import React from 'react'
import NavStyles from './TherapistNavBar.module.css'
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link, NavLink, useNavigate } from 'react-router'
import MockUser from '../../assets/aw_mock-px.png'
import { IoMdLogOut } from "react-icons/io";

// Tanstack
import { useUsers } from '../../queries/users'

const TherapistNavBar = () => {
  const { data: userData, isLoading: userDataIsLoading, error: userDataError} = useUsers();
  
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
      <h1>Appointment and Patient Record Management System</h1>
      <div>
        <ul className={NavStyles.navItems}>

 
            <li><IoIosNotifications/></li>
            <li><CgProfile/></li>
            <p>{userData.userRole}: {userData.firstName}</p>
            <button onClick={handleLogout} className="logout-btn"><IoMdLogOut/></button>
        </ul>

      </div>

    </div>
  )
}

export default TherapistNavBar
