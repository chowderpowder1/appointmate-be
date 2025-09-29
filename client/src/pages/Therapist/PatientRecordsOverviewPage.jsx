import React from 'react'
import RecordStyles from './PatientRecordsOverviewPage.module.css'
import { IoMdDocument } from "react-icons/io";
import { CgEye } from "react-icons/cg";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router';

const PatientRecordsOverview = () => {
  return (
    <div className={RecordStyles.container}>
        <div className={RecordStyles.headerContainer}>
            {/* <IoMdDocument/> */}
            <p className={RecordStyles.header}>Patient Records</p>
            <div className={RecordStyles.filterActionContainer}>
                <TextField
                id="outlined-search" label="Search field" type="search" variant="outlined"
                
                sx={{
                    '& .MuiOutlinedInput-root':{
                        borderRadius:'30px',
                        height:'40px',
                        alignItems:'center',
                        display:'flex'
                    },
                    label:{
                        fontSize:'1rem',
                        top:'-5px'
                    }
                }}/>
                <NavLink to='add-patient-record'>
                    <Button variant="contained"
                    sx={{
                        borderRadius:'35px',
                        boxShadow:'none'
                    
                    }}
                   >
                        Add Record
                        </Button>
                </NavLink>
            </div>

        </div>



        <div className={RecordStyles.tableContainer}>
            <table className={RecordStyles.tbl}>
                <thead className={RecordStyles.tblHead}>
                    <tr>
                        <th className={RecordStyles.tblHeader}>Patient No.</th>
                        <th className={RecordStyles.tblHeader}>Patient Name</th>
                        <th className={RecordStyles.tblHeader}>Branch</th>
                        <th className={RecordStyles.tblHeader}>Payment Method</th>
                        <th className={RecordStyles.tblHeader}>Date Created</th>
                        <th className={RecordStyles.tblHeader}>Action</th>
                    </tr>
                </thead>
                <tbody className={RecordStyles.tblBody}>
                    <tr>
                        <td className={RecordStyles.tblData}>P-01</td>
                        <td className={RecordStyles.tblData}>Marian Rivera</td>
                        <td className={RecordStyles.tblData}>Zabarte</td>
                        <td className={RecordStyles.tblData}>HMO</td>
                        <td className={RecordStyles.tblData}>Date Created</td>
                        <td className={RecordStyles.tblData}><NavLink to='view-patient-record/:1'>                           <Button variant="contained"
                            sx={{
                                borderRadius:'35px',
                                boxShadow:'none'
                                }}
                            >View</Button></NavLink></td>
                    </tr>
                    <tr>
                        <td className={RecordStyles.tblData}>P-01</td>
                        <td className={RecordStyles.tblData}>Marian Rivera</td>
                        <td className={RecordStyles.tblData}>Zabarte</td>
                        <td className={RecordStyles.tblData}>HMO</td>
                        <td className={RecordStyles.tblData}>Date Created</td>
                        <td className={RecordStyles.tblData}>
                            <Button variant="contained"
                            sx={{
                                borderRadius:'35px',
                                boxShadow:'none'
                                }}
                            >View</Button></td>
                    </tr>
                    <tr>
                        <td className={RecordStyles.tblData}>P-01</td>
                        <td className={RecordStyles.tblData}>Marian Rivera</td>
                        <td className={RecordStyles.tblData}>Zabarte</td>
                        <td className={RecordStyles.tblData}>HMO</td>
                        <td className={RecordStyles.tblData}>Date Created</td>
                        <td className={RecordStyles.tblData}>                           
                            <Button variant="contained"
                            sx={{
                                borderRadius:'35px',
                                boxShadow:'none'
                                }}
                            >View</Button></td>
                    </tr>
                    <tr>
                        <td className={RecordStyles.tblData}>P-01</td>
                        <td className={RecordStyles.tblData}>Marian Rivera</td>
                        <td className={RecordStyles.tblData}>Zabarte</td>
                        <td className={RecordStyles.tblData}>HMO</td>
                        <td className={RecordStyles.tblData}>Date Created</td>
                        <td className={RecordStyles.tblData}>
                            <Button variant="contained"
                            sx={{
                                borderRadius:'35px',
                                boxShadow:'none'
                                }}
                            >View</Button>
                        </td>
                    </tr>
                    <tr>
                        <td className={RecordStyles.tblData}>P-01</td>
                        <td className={RecordStyles.tblData}>Marian Rivera</td>
                        <td className={RecordStyles.tblData}>Zabarte</td>
                        <td className={RecordStyles.tblData}>HMO</td>
                        <td className={RecordStyles.tblData}>Date Created</td>
                        <td className={RecordStyles.tblData}>                           
                            <Button variant="contained"
                            sx={{
                                borderRadius:'35px',
                                boxShadow:'none'
                                }}
                            >View</Button></td>
                    </tr>
                    <tr>
                        <td className={RecordStyles.tblData}>P-01</td>
                        <td className={RecordStyles.tblData}>Marian Rivera</td>
                        <td className={RecordStyles.tblData}>Zabarte</td>
                        <td className={RecordStyles.tblData}>HMO</td>
                        <td className={RecordStyles.tblData}>Date Created</td>
                        <td className={RecordStyles.tblData}>                           <Button variant="contained"
                            sx={{
                                borderRadius:'35px',
                                boxShadow:'none'
                                }}
                            >View</Button></td>
                    </tr>
                    <tr>
                        <td className={RecordStyles.tblData}>P-01</td>
                        <td className={RecordStyles.tblData}>Marian Rivera</td>
                        <td className={RecordStyles.tblData}>Zabarte</td>
                        <td className={RecordStyles.tblData}>HMO</td>
                        <td className={RecordStyles.tblData}>Date Created</td>
                        <td className={RecordStyles.tblData}>                           <Button variant="contained"
                            sx={{
                                borderRadius:'35px',
                                boxShadow:'none'
                                }}
                            >View</Button></td>
                    </tr>
                    <tr>
                        <td className={RecordStyles.tblData}>P-01</td>
                        <td className={RecordStyles.tblData}>Marian Rivera</td>
                        <td className={RecordStyles.tblData}>Zabarte</td>
                        <td className={RecordStyles.tblData}>HMO</td>
                        <td className={RecordStyles.tblData}>Date Created</td>
                        <td className={RecordStyles.tblData}>                           <Button variant="contained"
                            sx={{
                                borderRadius:'35px',
                                boxShadow:'none'
                                }}
                            >View</Button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>Showing 1-10 of 10 entries</p>
        <div className={RecordStyles.paginationContainer}>
            <button> First</button>
            <button> Previous</button>
            <button> 1</button>
            <button> Next</button>
            <button> Last</button>
        </div>
    </div>
  )
}

export default PatientRecordsOverview
