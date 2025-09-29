import {React, useState } from 'react'
import { NavLink } from 'react-router';
import SideBarStyles from './AdminSideBar.module.css'
import { FaKey } from "react-icons/fa";
import { RiExpandRightFill } from "react-icons/ri";
import AwWhite from '../../assets/aw-white-logo.png'

const AdminSideBar = () => {

  const [expand, setExpand] = useState(null);

  const ActiveSideBar= ({isActive}) => isActive ? `${SideBarStyles.icon} ${SideBarStyles.iconActive}` : `${SideBarStyles.icon}`;

  const expandedSideBar = () => {
    return expand ? `${SideBarStyles.sideBarContainer} ${SideBarStyles.expand} ` : `${SideBarStyles.sideBarContainer}`; }

  const expandedText = () => {
    return expand ? `${SideBarStyles.text} ${SideBarStyles.activeText} ` : `${SideBarStyles.text} `; }

  const expandSideBar = ()=> setExpand(!expand);
  

  return (
    <nav className={expandedSideBar()}>
      <div className={SideBarStyles.sideBarSubcontainer}>
        <div className={SideBarStyles.logoContainer}>
          <img src={AwWhite} alt="" className={SideBarStyles.logo}/>
        </div>
        {/* <img src={AwLogo} alt="" /> */}
        <NavLink to='manage-roles' className={ActiveSideBar}>
          <FaKey /> <span className={expandedText()}>MANAGE ROLES</span>
        </NavLink>

        <div onClick={expandSideBar} className={SideBarStyles.expandContainer}>
          <RiExpandRightFill className={ expand ? `${SideBarStyles.expandBtn} ${SideBarStyles.expandBtnActive}` : `${SideBarStyles.expandBtn}`} />
          <span className={expandedText()}>Collapse</span>
        </div>

      </div>
    </nav>
  )
}

export default AdminSideBar
