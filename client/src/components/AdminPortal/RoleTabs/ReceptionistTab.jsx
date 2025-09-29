import React from 'react'
import ReceptionistStyles from './ReceptionistTab.module.css'
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

// Mui dependencies
import TextField from '@mui/material/TextField';

const ReceptionistTab = () => {
  return (
    <div className={ReceptionistStyles.container}>
      <div className={ReceptionistStyles.headerContainer}>
          <p className={ReceptionistStyles.header}> Receptionist</p>
            <div style={{
                display:'flex',
                gap:'1rem'
            }}>
                <TextField
                    id="filled-search"
                    label="Search Employee"
                    type="search"
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline':{
                          borderRadius:'25px',
                        },
                        '& .MuiInputBase-input':{
                            height:'.5em'
                        },
                        '& .MuiFormLabel-root':{
                            top:'-5px'
                        }
                          }}
                        />
                <TextField
                    id="filled-search"
                    label="Filter By"
                    type="search"
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline':{
                          borderRadius:'25px',
                        },
                        '& .MuiInputBase-input':{
                            height:'.5em'
                        },
                        '& .MuiFormLabel-root':{
                            top:'-5px'
                        }
                          }}
                        />
            </div>
      </div>
      <div className={ReceptionistStyles.tblContainer}>
        <table className={ReceptionistStyles.tbl}>
            <thead className={ReceptionistStyles.tblHeader}>
                <tr>
                    <th className={ReceptionistStyles.tblHeaderItem}>Name</th>
                    <th className={ReceptionistStyles.tblHeaderItem}>Branch</th>
                    <th className={ReceptionistStyles.tblHeaderItem}>Date Added</th>
                    <th className={ReceptionistStyles.tblHeaderItem}>Action</th>
                </tr>
            </thead>
            <tbody className={ReceptionistStyles.tblBody}>
                <tr>
                    <td className={ReceptionistStyles.tblBodyItem}>Mary Grace Buenaventura</td>
                    <td className={ReceptionistStyles.tblBodyItem}>Zabarte</td>
                    <td className={ReceptionistStyles.tblBodyItem}>September 30 2023</td>
                    <td className={ReceptionistStyles.tblBodyItem}>
                        <div className={ReceptionistStyles.tblActionContainer}>
                            <div><FaEye/></div>
                            <div><MdEdit/></div>
                            <div><FaTrash/></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className={ReceptionistStyles.tblBodyItem}>Mary Grace Buenaventura</td>
                    <td className={ReceptionistStyles.tblBodyItem}>Zabarte</td>
                    <td className={ReceptionistStyles.tblBodyItem}>September 30 2023</td>
                    <td className={ReceptionistStyles.tblBodyItem}>
                        <div className={ReceptionistStyles.tblActionContainer}>
                            <div><FaEye/></div>
                            <div><MdEdit/></div>
                            <div><FaTrash/></div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>
      <div className={ReceptionistStyles.footerDataContainer}>
        <p className={ReceptionistStyles.pageNumber}>Showing 1 out of 1 page</p>
        <div className={ReceptionistStyles.paginationContainer}>
            <p>Previous</p>
            <div className={ReceptionistStyles.pageItem}>
                <p >1</p>
            </div>
            <p>Next</p>
        </div>
      </div>
      
    </div>
  )
}

export default ReceptionistTab

    // <div className={RbacStyles.container}>
    //   <div className={RbacStyles.headerContainer}>
    //     <h1 className={RbacStyles.header}>Manage Appointments</h1>

    //   </div>
    //   <div className={RbacStyles.apptDashboardContainer}>
    //     <div className={RbacStyles.tabContainer}>

    //         <div onClick={ ()=> toggleTab(0)} className={`${RbacStyles.tabItem} ${activeTab === 0 ? RbacStyles.tabActive:''}`}>
    //           Manage Appointments
    //         </div>

    //         <div onClick={ ()=> toggleTab(1)} className={`${RbacStyles.tabItem} ${activeTab === 1 ? RbacStyles.tabActive:''}`}>
    //           Schedule Appointments
    //         </div>
            
    //         <div onClick={ ()=> toggleTab(2)} className={`${RbacStyles.tabItem} ${activeTab === 2 ? RbacStyles.tabActive:''}`}>
    //           Reschedule Appointments
    //         </div>
            
    //         <div onClick={ ()=> toggleTab(3)} className={`${RbacStyles.tabItem} ${activeTab === 3 ? RbacStyles.tabActive:''}`}>
    //           Cancel Appointments
    //         </div>
    //     </div>

    //     <div className={RbacStyles.slidesContainer}>

    //       <div className={` ${ activeTab === 0 ? `${RbacStyles.branchSlideActive}` : `${RbacStyles.branchSlide}`}`}>

    //       </div>

    //       <div className={` ${ activeTab === 1 ? `${RbacStyles.branchSlideActive}` : `${RbacStyles.branchSlide}`}`}>
    //       </div>

    //       <div className={`${RbacStyles.branchSlide} ${ activeTab === 2 ? `${RbacStyles.branchSlideActive}` : ''}`}>

    //       </div>

    //       <div className={`${RbacStyles.branchSlide} ${ activeTab === 3 ? `${RbacStyles.branchSlideActive}` : ''}`}>

    //       </div>

    //     </div>
    //   </div>