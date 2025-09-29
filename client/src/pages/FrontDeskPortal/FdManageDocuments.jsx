import { React, useState } from 'react'
import DocumentStyles from './FdManageDocuments.module.css'
import TextField from '@mui/material/TextField';
import { NavLink } from 'react-router';
import Button from '@mui/material/Button';
import Modal from '../../components/Ui/Modal'
import ClinicPhoto from '../../assets/AwZabarte.jpg'
import ViewDocument from '../../components/FrontDesk/ViewDocument'
import blankPx from '../../assets/blank-px.jpg'

const FdManageDocuments = () => {

  const mockData = [
    {
        submissionId:'SUB_2024_001_7F8A9B2C',
        patientId:'#A2023141818',
        patientName: "John Doe",
        fileName: "chest_xray_report.pdf",
        fileType: "PDF",
        status: "Approved"
    },
    {
        submissionId:'SUB_2024_002_3D5E6F1A',
        patientId:'#A2023141819',
        patientName: "Jane Smith",
        fileName: "blood_test_results.xlsx",
        fileType: "Excel", 
        status: "Rejected"
    },
    {
        submissionId:'SUB_2024_003_9B4C7E8D',
        patientId:'#A2023141820',
        patientName: "Robert Johnson",
        fileName: "mri_scan_brain.dcm",
        fileType: "DICOM",
        status: "Approved"
    },
    {
        submissionId:'SUB_2024_004_5A1F2C9E',
        patientId:'#A2023141821',
        patientName: "Emily Davis",
        fileName: "lab_report_2024.docx",
        fileType: "Word Document",
        status: "Pending"
    }
];

  const documentStatus = (type) =>{
    switch (type) {
      case 'Approved' : return 'approvedText';
      case 'Rejected' : return 'rejectedText';
      case 'Pending' : return 'pendingText';

    }
  }
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={DocumentStyles.container}>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}> 
        <ViewDocument/>
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
            <TextField
              id="outlined-search" label="Filter By" type="search" variant="outlined"
            
              sx={{
                  '& .MuiOutlinedInput-root':{
                      borderRadius:'30px',
                      height:'40px',
                  },
                  label:{
                      top:'-6px'
                  }
              }}/>
            <TextField
              id="outlined-search" label="Uploaded By" type="search" variant="outlined"
            
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
              {mockData.map((data)=>(
                <tr key={data.submissionId}>
                  <td className={DocumentStyles.tblData}>
                    <div className={DocumentStyles.pxContainer}>
                      <div className={DocumentStyles.blankPxContainer}>
                        <img className={DocumentStyles.pxPhoto} src={blankPx} alt="" />
                      </div>
                      <div>
                        <p>{data.patientName}</p>
                        <p>{data.patientId}</p>
                      </div>
                    </div>
                  </td>
                  <td className={DocumentStyles.tblData}>{data.fileName}</td>
                  <td className={DocumentStyles.tblData}>{data.fileType}</td>
                  <td className={DocumentStyles.tblData}>
                    <div className={`${DocumentStyles[documentStatus(data.status)]}`}>
                      <p>{data.status}</p>
                    </div>
                  </td>                
                  <td className={DocumentStyles.tblData}>   
                  <Button onClick={() => setIsOpen(true)} variant="contained"
                      sx={{
                          borderRadius:'35px',
                          boxShadow:'none'
                          }}
                      >View</Button></td>
                </tr>
              ))}
              {/* <tr>
                <td className={DocumentStyles.tblData}>P-01</td>
                <td className={DocumentStyles.tblData}>Marian Rivera</td>
                <td className={DocumentStyles.tblData}>Zabarte</td>
                <td className={DocumentStyles.tblData}>HMO</td>                
                <td className={DocumentStyles.tblData}>   
                <Button onClick={() => setIsOpen(true)} variant="contained"
                    sx={{
                        borderRadius:'35px',
                        boxShadow:'none'
                        }}
                    >View</Button></td>
              </tr>
              <tr>
                <td className={DocumentStyles.tblData}>P-01</td>
                <td className={DocumentStyles.tblData}>Marian Rivera</td>
                <td className={DocumentStyles.tblData}>Zabarte</td>
                <td className={DocumentStyles.tblData}>HMO</td>              
                <td className={DocumentStyles.tblData}>   
                <Button onClick={() => setIsOpen(true)} variant="contained"
                    sx={{
                        borderRadius:'35px',
                        boxShadow:'none'
                        }}
                    >View</Button></td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FdManageDocuments
