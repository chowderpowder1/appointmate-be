import {React, useState} from 'react'
import ManageStyles from './ManageAppointments.module.css'
import NotificationBelt from '../../components/Therapist/NotificationBelt.jsx'
import ManageTab from '../../components/Therapist/ManageApptTab'
import AddApptTab from '../../components/Therapist/AddApptTab'


const ManageAppointments = () => {
    const [ activeTab, setActiveTab ] = useState(0);
  
    const toggleTab = (index) => {
      setActiveTab(index);
    }
  
  return (
    <div className={ManageStyles.container}>
      <div className={ManageStyles.headerContainer}>
        <h1 className={ManageStyles.header}>Manage Appointments</h1>
        <NotificationBelt/>
      </div>
      <div className={ManageStyles.apptDashboardContainer}>
        <div className={ManageStyles.tabContainer}>

            <div onClick={ ()=> toggleTab(0)} className={`${ManageStyles.tabItem} ${activeTab === 0 ? ManageStyles.tabActive:''}`}>
              Manage Appointments
            </div>

            <div onClick={ ()=> toggleTab(1)} className={`${ManageStyles.tabItem} ${activeTab === 1 ? ManageStyles.tabActive:''}`}>
              Schedule Appointments
            </div>
{/*             
            <div onClick={ ()=> toggleTab(2)} className={`${ManageStyles.tabItem} ${activeTab === 2 ? ManageStyles.tabActive:''}`}>
              Reschedule Appointments
            </div>
            
            <div onClick={ ()=> toggleTab(3)} className={`${ManageStyles.tabItem} ${activeTab === 3 ? ManageStyles.tabActive:''}`}>
              Cancel Appointments
            </div> */}
        </div>

        <div className={ManageStyles.slidesContainer}>

          <div className={` ${ activeTab === 0 ? `${ManageStyles.branchSlideActive}` : `${ManageStyles.branchSlide}`}`}>
            <ManageTab/>
          </div>

          <div className={` ${ activeTab === 1 ? `${ManageStyles.branchSlideActive}` : `${ManageStyles.branchSlide}`}`}>
            <AddApptTab/>
          </div>

          <div className={`${ManageStyles.branchSlide} ${ activeTab === 2 ? `${ManageStyles.branchSlideActive}` : ''}`}>
          </div>

          <div className={`${ManageStyles.branchSlide} ${ activeTab === 3 ? `${ManageStyles.branchSlideActive}` : ''}`}>
          </div>

        </div>
        
      </div>
    </div>
  )
}

export default ManageAppointments
