import React from 'react'
import NavStyles from './TherapistNavBar.module.css'
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link, NavLink, useNavigate } from 'react-router'
import MockUser from '../../assets/aw_mock-px.png'
import { IoMdLogOut } from "react-icons/io";
import axios from 'axios';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IoIosArrowDown } from "react-icons/io";

// Tanstack
import { useUsers } from '../../queries/users'
import {useUser} from '../../layouts/FrontDeskLayout'
const TherapistNavBar = () => {
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
  console.log(userData)
  return (
    <div className={NavStyles.main}>
      <h1>Accelerated Wellness & Pain Clinic</h1>
      <div>
        <ul className={NavStyles.navItems}>

 
            {/* <li><IoIosNotifications/></li>
             */}
               <div>
                
      <Button aria-describedby={id} onClick={handleClick}>
        <li className={NavStyles.userPhotoContainer}>{avatar ? <img src={avatar} alt="" /> : 
        
        <div className={NavStyles.generateAvatar}>{userData.firstName.slice(0,1).toUpperCase()|| ''}</div>}
        <IoIosArrowDown className={NavStyles.dropdownArrow}/>
        </li>
            
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
         slotProps={{
           paper: {
             sx: {
               borderRadius: '10px',
               marginTop:'1rem',
               padding:'1rem',
             }
           }
         }}
      >
        <p style={{color:'#454545'}}><strong>{userData.userRole}</strong>: {userData.firstName}</p>
        <button className={NavStyles.logoutBtn} style={{
          width:'100%',
          
        }} onClick={handleLogout}>Logout</button>
      </Popover>
    </div>
            
        </ul>

      </div>

    </div>
  )
}

export default TherapistNavBar
