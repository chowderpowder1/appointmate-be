import { React, useState} from 'react'
import SideBarStyles from './FdSideBar.module.css'
import { NavLink } from 'react-router';

import AwWhite from '../../assets/aw-white-logo.png'

// icons
import { FaKey } from "react-icons/fa";
import { RiExpandRightFill } from "react-icons/ri";
import { HiDocumentMagnifyingGlass } from "react-icons/hi2";
import { MdDashboard } from "react-icons/md";
import { FaBookMedical } from "react-icons/fa";

const FdSideBar = () => {

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
        <NavLink to='dashboard' className={ActiveSideBar}>
          <MdDashboard /> <span className={expandedText()}>DASHBOARD</span>
        </NavLink>

        <NavLink to='manage-appointments' className={ActiveSideBar}>
          <HiDocumentMagnifyingGlass /> <span className={expandedText()}>APPOINTMENTS</span>
        </NavLink>

        <NavLink to='manage-documents' className={ActiveSideBar}>
          <FaBookMedical /> <span className={expandedText()}>MANAGE DOCUMENTS</span>
        </NavLink>

        <div onClick={expandSideBar} className={SideBarStyles.expandContainer}>
          <RiExpandRightFill className={ expand ? `${SideBarStyles.expandBtn} ${SideBarStyles.expandBtnActive}` : `${SideBarStyles.expandBtn}`} />
          <span className={expandedText()}>Collapse</span>
        </div>

      </div>
    </nav>
  )
}

export default FdSideBar
