import {React, useState} from 'react'
import ManageStyles from './ManageRolesTab.module.css'

import ReceptionistTab from '../../components/AdminPortal/RoleTabs/ReceptionistTab'
import OperationsManagerTab from '../../components/AdminPortal/RoleTabs/OperationsManagerTab'
import TherapistTab from '../../components/AdminPortal/RoleTabs/TherapistTab'

import {useGetAllEmployees} from '../../queries/admin'
const ManageRolesTab = () => {
    const { data, isLoading, error } = useGetAllEmployees();

        const [ activeTab, setActiveTab ] = useState(0);
      
        const toggleTab = (index) => {
          setActiveTab(index);
        }
      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>{error.message}</div>;
console.log(data)
const employees = data.employees || [];

const frontDesk = employees.filter(emp => emp.user_role === 4);
const therapists = employees.filter(emp => emp.user_role === 3);
const oms = employees.filter(emp => emp.user_role === 2);

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
                  <p>Front Desk</p>
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
                <OperationsManagerTab operationData={oms}/>
            </div>

            <div className={` ${ activeTab === 1 ? `${ManageStyles.branchSlideActive}` : `${ManageStyles.branchSlide}`}`}>
                <ReceptionistTab frontDeskData={frontDesk}/>
            </div>

            <div className={` ${ activeTab === 2 ? `${ManageStyles.branchSlideActive}` : `${ManageStyles.branchSlide}`}`}>
                <TherapistTab therapistData={therapists} />
            </div>

            {/* <div className={`${ManageStyles.branchSlide} ${ activeTab === 3 ? `${ManageStyles.branchSlideActive}` : ''}`}>
            </div> */}

        </div>
        </div>
    </div>
  )
}

export default ManageRolesTab
