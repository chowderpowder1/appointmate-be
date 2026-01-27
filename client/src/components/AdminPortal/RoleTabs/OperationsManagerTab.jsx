import React from 'react'
import OperationStyles from './OperationsManagerTab.module.css'

// Mui dependencies
import TextField from '@mui/material/TextField';

import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import dayjs from 'dayjs';

const OperationsManagerTab = ({operationData}) => {
  return (
    <div>
        <div className={OperationStyles.container}>
            <div className={OperationStyles.headerContainer}>
                <p className={OperationStyles.header}> Operations Manager</p>
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
            <div className={OperationStyles.tblContainer}>
              <table className={OperationStyles.tbl}>
                  <thead className={OperationStyles.tblHeader}>
                      <tr>
                          <th className={OperationStyles.tblHeaderItem}>Name</th>
                          <th className={OperationStyles.tblHeaderItem}>Date Added</th>
                          <th className={OperationStyles.tblHeaderItem}>Action</th>
                      </tr>
                  </thead>
                  <tbody className={OperationStyles.tblBody}>
                       {operationData?.map((user) => (
    <tr key={user.user_id}>
      <td className={OperationStyles.tblBodyItem}>
        {user.user_fname} {user.user_lname}
      </td>

      <td className={OperationStyles.tblBodyItem}>
        {dayjs(user.created_at).format('MMMM D YYYY')}
      </td>

      <td className={OperationStyles.tblBodyItem}>
        <div className={OperationStyles.tblActionContainer}>
          <div><FaEye /></div>
          <div><MdEdit /></div>
          <div><FaTrash /></div>
        </div>
      </td>
    </tr>
  ))}

                  </tbody>
              </table>
            </div>
            <div className={OperationStyles.footerDataContainer}>
              <p className={OperationStyles.pageNumber}>Showing 1 out of 1 page</p>
              <div className={OperationStyles.paginationContainer}>
                  <p>Previous</p>
                  <div className={OperationStyles.pageItem}>
                      <p >1</p>
                  </div>
                  <p>Next</p>
              </div>
            </div>
      
    </div>
    </div>
  )
}

export default OperationsManagerTab
