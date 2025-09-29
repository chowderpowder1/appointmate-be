import React from 'react'
import TherapistStyles from './TherapistTab.module.css'

import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

// Mui dependencies
import TextField from '@mui/material/TextField';

const TherapistTab = () => {
  return (
<div className={TherapistStyles.container}>
      <div className={TherapistStyles.headerContainer}>
          <p className={TherapistStyles.header}>Therapist</p>
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
      <div className={TherapistStyles.tblContainer}>
        <table className={TherapistStyles.tbl}>
            <thead className={TherapistStyles.tblHeader}>
                <tr>
                    <th className={TherapistStyles.tblHeaderItem}>Name</th>
                    <th className={TherapistStyles.tblHeaderItem}>Branch</th>
                    <th className={TherapistStyles.tblHeaderItem}>Date Added</th>
                    <th className={TherapistStyles.tblHeaderItem}>Action</th>
                </tr>
            </thead>
            <tbody className={TherapistStyles.tblBody}>
                <tr>
                    <td className={TherapistStyles.tblBodyItem}>Mary Grace Buenaventura</td>
                    <td className={TherapistStyles.tblBodyItem}>Zabarte</td>
                    <td className={TherapistStyles.tblBodyItem}>September 30 2023</td>
                    <td className={TherapistStyles.tblBodyItem}>
                        <div className={TherapistStyles.tblActionContainer}>
                            <div><FaEye/></div>
                            <div><MdEdit/></div>
                            <div><FaTrash/></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className={TherapistStyles.tblBodyItem}>Mary Grace Buenaventura</td>
                    <td className={TherapistStyles.tblBodyItem}>Zabarte</td>
                    <td className={TherapistStyles.tblBodyItem}>September 30 2023</td>
                    <td className={TherapistStyles.tblBodyItem}>
                        <div className={TherapistStyles.tblActionContainer}>
                            <div><FaEye/></div>
                            <div><MdEdit/></div>
                            <div><FaTrash/></div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>
      <div className={TherapistStyles.footerDataContainer}>
        <p className={TherapistStyles.pageNumber}>Showing 1 out of 1 page</p>
        <div className={TherapistStyles.paginationContainer}>
            <p>Previous</p>
            <div className={TherapistStyles.pageItem}>
                <p >1</p>
            </div>
            <p>Next</p>
        </div>
      </div>
      
    </div>
  )
}

export default TherapistTab
