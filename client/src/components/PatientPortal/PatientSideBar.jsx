import {React, useState } from 'react'
import { NavLink } from 'react-router';
import SideBarStyles from './PatientSideBar.module.css'
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaClipboardList, FaCalendar } from "react-icons/fa6";
import { RiFolder6Fill } from "react-icons/ri";
import { TbGraphFilled } from "react-icons/tb";
import { RiExpandRightFill } from "react-icons/ri";

const PatientSideBar = () => {

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
        <NavLink className={ActiveSideBar} to='dashboard'>
          <MdDashboard /> <span className={expandedText()}>DASHBOARD</span>
        </NavLink>
        <NavLink to='profile' className={ActiveSideBar}>
          <CgProfile /> <span className={expandedText()}>PATIENT PROFILE</span>
        </NavLink>
        <NavLink to='treatment-progress' className={ActiveSideBar}>
          <FaCalendar /> <span className={expandedText()}>APPOINTMENT</span>
        </NavLink>
        {/* <NavLink to='patient-record' className={ActiveSideBar}>
          <FaClipboardList /> <span className={expandedText()}>PATIENT RECORD</span>
        </NavLink> */}
        {/* <NavLink to='documents' className={ActiveSideBar}>
          <RiFolder6Fill /> <span className={expandedText()}>MY DOCUMENTS</span>
        </NavLink>
        <NavLink to='reports' className={ActiveSideBar}>
          <TbGraphFilled /> <span className={expandedText()}>REPORTS</span>
        </NavLink> */}
        <div onClick={expandSideBar} className={SideBarStyles.expandContainer}>
          <RiExpandRightFill className={ expand ? `${SideBarStyles.expandBtn} ${SideBarStyles.expandBtnActive}` : `${SideBarStyles.expandBtn}`} />
          <span className={expandedText()}>Collapse</span>
        </div>
      </div>
    </nav>
  )
}

export default PatientSideBar
