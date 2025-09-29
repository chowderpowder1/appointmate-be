import {React, useState} from 'react'
import ManageStyles from './ManageRolesTab.module.css'

import ReceptionistTab from '../../components/AdminPortal/RoleTabs/ReceptionistTab'
import OperationsManagerTab from '../../components/AdminPortal/RoleTabs/OperationsManagerTab'
import TherapistTab from '../../components/AdminPortal/RoleTabs/TherapistTab'

const ManageRolesTab = () => {
    
        const [ activeTab, setActiveTab ] = useState(0);
      
        const toggleTab = (index) => {
          setActiveTab(index);
        }
      
  return (
    <div className={ManageStyles.container}>
        <div className={ManageStyles.dataContainer}>
            <div className={ManageStyles.tabContainer}>
                {/* <div onClick={ ()=> toggleTab(0)} className={`${ManageStyles.tabItem} ${activeTab === 0 ? ManageStyles.tabActive:''}`}>
                  Clinic Owner
                </div> */}
                <div onClick={ ()=> toggleTab(0)} className={`${ManageStyles.tabItem} ${activeTab === 0 ? ManageStyles.tabActive:''}`}>
                  <p>Operations Manager</p>
                </div>
            
                <div onClick={ ()=> toggleTab(1)} className={`${ManageStyles.tabItem} ${activeTab === 1 ? ManageStyles.tabActive:''}`}>
                  <p>Receptionist</p>
                </div>
            
                <div onClick={ ()=> toggleTab(2)} className={`${ManageStyles.tabItem} ${activeTab === 2 ? ManageStyles.tabActive:''}`}>
                  <p>Therapist</p>
                </div>
                <div onClick={ ()=> toggleTab(3)} className={`${ManageStyles.tabItem} ${activeTab === 3 ? ManageStyles.tabActive:''}`}>
                  <p>Users</p>
                </div>
            </div>
        <div className={ManageStyles.slidesContainer}>

            <div className={` ${ activeTab === 0 ? `${ManageStyles.branchSlideActive}` : `${ManageStyles.branchSlide}`}`}>
                <OperationsManagerTab/>
            </div>

            <div className={` ${ activeTab === 1 ? `${ManageStyles.branchSlideActive}` : `${ManageStyles.branchSlide}`}`}>
                <ReceptionistTab/>
            </div>

            <div className={` ${ activeTab === 2 ? `${ManageStyles.branchSlideActive}` : `${ManageStyles.branchSlide}`}`}>
                <TherapistTab/>
            </div>

            <div className={`${ManageStyles.branchSlide} ${ activeTab === 3 ? `${ManageStyles.branchSlideActive}` : ''}`}>
            </div>

        </div>
        </div>
    </div>
  )
}

export default ManageRolesTab
