import React from 'react'
import NavStyles from './TherapistNavBar.module.css'
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import Popover from '@mui/material/Popover';

// Tanstack
import { useUsers } from '../../queries/users'

const FDTopNav = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const { data: userData, isLoading: userDataIsLoading, error: userDataError} = useUsers();
  
  if (userDataIsLoading) return <div>Loading...</div>;
  if (userDataError) return <div>⚠ Error: {userDataError.message}</div>;
  const handleLogout = async (e) => {
        try{
            localStorage.clear();
            const logoutStatus = await axios.post('http://localhost:8080/auth/logout', {}, { withCredentials: true } )
            redirect('/login');
        } catch(err){
            console.log('Logout Failed: '+ err);
        }
    }
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
