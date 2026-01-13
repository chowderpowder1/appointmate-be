import {React, useState } from 'react'
import { NavLink } from 'react-router';
import SideBarStyles from './TherapistSideBar.module.css'
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaCalendar } from "react-icons/fa6";
import { RiFolder6Fill } from "react-icons/ri";
import { TbGraphFilled } from "react-icons/tb";
import { RiExpandRightFill } from "react-icons/ri";
import { HiDocumentMagnifyingGlass } from "react-icons/hi2";

import AwWhite from '../../assets/aw-white-logo.png'
const TherapistSideBar = () => {

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
        <NavLink className={ActiveSideBar} to='dashboard'>
          <MdDashboard /> <span className={expandedText()}>DASHBOARD</span>
        </NavLink>
        <NavLink to='manage-appointments' className={ActiveSideBar}>
          <FaCalendar /> <span className={expandedText()}>APPOINTMENTS</span>
        </NavLink>
        <NavLink to='patient-records' className={ActiveSideBar}>
          <HiDocumentMagnifyingGlass /> <span className={expandedText()}>PATIENT RECORDS</span>
        </NavLink> 
        <NavLink to='my-documents' className={ActiveSideBar}>
          <TbGraphFilled /> <span className={expandedText()}>MY DOCUMENTS</span>
        </NavLink>

        <div onClick={expandSideBar} className={SideBarStyles.expandContainer}>
          <RiExpandRightFill className={ expand ? `${SideBarStyles.expandBtn} ${SideBarStyles.expandBtnActive}` : `${SideBarStyles.expandBtn}`} />
          <span className={expandedText()}>Collapse</span>
        </div>

      </div>
    </nav>
  )
}

export default TherapistSideBar
