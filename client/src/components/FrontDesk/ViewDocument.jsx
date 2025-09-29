import React from 'react'
import DocumentStyles from './ViewDocument.module.css'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { FaFilePdf } from "react-icons/fa6";

const ViewDocument = () => {
  return (
    <div className={DocumentStyles.container}>
        <div className={DocumentStyles.headerContainer}>
            <p>PFC_Laboratory.pdf</p>
            <p>#A2023141D16</p>
        </div>
        <div className={DocumentStyles.subContainer}>
            <div className={DocumentStyles.downloadContainer}>
                <FaFilePdf className={DocumentStyles.dlIcon}/>
                <p className={DocumentStyles.dlText}>Click to download file</p>
            </div>
            <div className={DocumentStyles.documentTextcontainer}>
                <p>Patient Name: Belle Mariano</p>
                <p>Date of Test: 02-10-25</p>
                <p>Date Uploaded: 02-10-25</p>
                <p>Source: External Clinic</p>
                <p>Status: Pending</p>
            </div>
        </div>
        <Box
            sx={{
                p:'0 ',
                width:'100%'
            }}>
            <TextField multiline fullWidth id="outlined-search" label="Add Notes" type="search" 
            sx={{
            
                backgroundColor:'white'
            }}
            
            />
        </Box>
        <Box
        sx={{ display:'flex', gap:'.5rem'
        }}>        
            <Button variant="contained"
            sx={{color:'white', backgroundColor:'#55e402ff', boxShadow:'none', borderRadius:'10px'}}>
                Approve Document</Button>
            <Button variant="contained"
            sx={{color:'white', backgroundColor:'#ff3737ff', boxShadow:'none', borderRadius:'10px'}}>
                Reject Document</Button>

        </Box>

    </div>
  )
}

export default ViewDocument
