import { React, useState } from 'react'
import DocumentStyles from './FdManageDocuments.module.css'
import TextField from '@mui/material/TextField';
import { NavLink } from 'react-router';
import Button from '@mui/material/Button';
import Modal from '../../components/Ui/Modal'
import ClinicPhoto from '../../assets/AwZabarte.jpg'
import ViewDocument from '../../components/FrontDesk/ViewDocument'
import blankPx from '../../assets/blank-px.jpg'

import { useGetPatientDocumentList } from '../../queries/useEmployees'

const FdManageDocuments = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsOpen(true);  
  }

  const { data: patientDocumentList, isLoading: patientDocumentListIsLoading, error: patientDocumentListError} = useGetPatientDocumentList();

  const documentStatus = (type) =>{
    switch (type.toLowerCase()) {
      case 'verified' : return 'approvedText';
      case 'rejected' : return 'rejectedText';
      case 'pending': return 'pendingText';

    }
  }
  
    if (patientDocumentListIsLoading) return <div>Loading...</div>;
    if (patientDocumentListError) return <div>⚠ Error: {patientDocumentListError.message}</div>;

    console.log(patientDocumentList)
  return (
    <div className={DocumentStyles.container}>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}> 
        <ViewDocument user={selectedUser}/>
      </Modal>      
      <div className={DocumentStyles.header}>Manage documents</div>
      <div className={DocumentStyles.documentContainer}>
        <div className={DocumentStyles.tblTitle}>
          <p className={DocumentStyles.tblTitleText}>ALL MEDICAL DOCUMENTS</p>
          <div className={DocumentStyles.filterContainer}>
            <TextField
              id="outlined-search" label="Search" type="search" variant="outlined"
            
              sx={{
                  '& .MuiOutlinedInput-root':{
                      borderRadius:'30px',
                      height:'40px',
                  },
                  label:{
                      top:'-6px'
                  }
              }}/>
           
          </div>
        </div>

        <div className={DocumentStyles.tableContainer}>
          <table className={DocumentStyles.tbl}>
            <thead className={DocumentStyles.tblHead}>
                <tr>
                    <th className={DocumentStyles.tblHeader}>Patient Name</th>
                    <th className={DocumentStyles.tblHeader}>File Name</th>
                    <th className={DocumentStyles.tblHeader}>File Type</th>                  
                    <th className={DocumentStyles.tblHeader}>Status</th>
                    <th className={DocumentStyles.tblHeader}>Action</th>
                </tr>
            </thead>
            <tbody className={DocumentStyles.tblBody}>
              {patientDocumentList.map((data)=>(
                <tr key={data.documentId}>
                  <td className={DocumentStyles.tblData}>
                    <div className={DocumentStyles.pxContainer}>
                      <div className={DocumentStyles.blankPxContainer}>
                        <img className={DocumentStyles.pxPhoto} src={data.patientAvatar} alt="" />
                      </div>
                      <div style={{alignItems:'center', display:'flex'}}>
                        <p>{data.patientName}</p>
                        <p>{data.patientId}</p>
                      </div>
                    </div>
                  </td>
                  <td className={DocumentStyles.tblData}>{data.file_name}</td>
                  <td className={DocumentStyles.tblData}>{data.file_type.toUpperCase()}</td>
                  <td className={DocumentStyles.tblData}>
                    <div 
                    style={{
                      margin:'auto',
                    }} 
                    className={`${DocumentStyles[documentStatus(data.doc_status)]}`}>
                      <p>{data.doc_status.toUpperCase()}</p>
                    </div>
                  </td>                
                  <td className={DocumentStyles.tblData}>   
                  <Button onClick={() => handleOpenModal(data)} variant="contained"
                      sx={{
                          borderRadius:'35px',
                          boxShadow:'none'
                          }}
                      >View</Button></td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FdManageDocuments
