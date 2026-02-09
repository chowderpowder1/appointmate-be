import React from 'react'
import DocumentStyles from './ViewDocument.module.css'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Link} from 'react-router'
import { FaFilePdf } from "react-icons/fa6";

import { useUpdateDocumentStatus, useGetPatientDocumentSignedUrl } from '../../queries/useEmployees'

const ViewDocument = (user) => {    
  const {mutateAsync : getSignedUrl, isPending} = useGetPatientDocumentSignedUrl();
   const { mutate: updateDocumentStatus} = useUpdateDocumentStatus();
//    const { documentStatus, setDocumentStatus }= useState(null);
    const handleDownload = async (documentId) => {
        try{
          const data = await getSignedUrl(documentId);
          console.log(data.url)
          window.open(data.url, '_blank');
        }catch(err){
          console.error('Download Failed:', err)
        }
    }
    const userData = user.user;
  return (
    <div className={DocumentStyles.container}>
        <div className={DocumentStyles.headerContainer}>
            <p>{userData.file_name}</p>
 
        </div>
        <div className={DocumentStyles.subContainer}>
            <div className={DocumentStyles.downloadContainer}>
                <FaFilePdf className={DocumentStyles.dlIcon}/>
                <p onClick={() => handleDownload(userData.documentId)} className={DocumentStyles.dlText}>Click to download file</p>
            </div>
            <div className={DocumentStyles.documentTextcontainer}>
                <p>Patient Name: {userData.patientName}</p>
                {/* <p>Date of Test: 02-10-25</p> */}
                <p>Date Uploaded: 02-10-25</p>
                {/* <p>Source: External Clinic</p> */}
                <p>Status: {userData.doc_status.toUpperCase()}</p>
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
        <Box fullWidth
        sx={{ display:'flex', gap:'.5rem', justifyContent:'center', width:'100%'
        }}>        
            <Button variant="contained"
            disabled={userData.doc_status ==='approved'? true : false}
            onClick={() => 
                {
                    updateDocumentStatus({id:userData.documentId, status:'verified'

                })}}
            sx={{color:'white', backgroundColor:'#2EAD6A', boxShadow:'none', borderRadius:'10px'}}>
                Approve </Button>

            <Button variant="contained"
            disabled={userData.doc_status ==='rejected'? true : false}
            onClick={() => 
                {
                    updateDocumentStatus({id:userData.documentId, status:'rejected'

                })}}
            sx={{color:'white', backgroundColor:'#D64545', boxShadow:'none', borderRadius:'10px'}}>
                Reject </Button>

            <Button variant="contained"
            onClick={() => 
                {
                    updateDocumentStatus({id:userData.documentId, status:'pending'

                })}}
                disabled={userData.doc_status ==='pending'? true : false}
            sx={{color:'white', backgroundColor:'#F7960A', boxShadow:'none', borderRadius:'10px'}}>
                Pending </Button>

        </Box>

    </div>
  )
}

export default ViewDocument
