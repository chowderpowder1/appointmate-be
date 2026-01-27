import React from 'react'
import DocumentStyles from './TherapistDocumentsPage.module.css'
import { IoDocument } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { IoIosDownload } from "react-icons/io";

import {useGetTherapistAssignedDocuments, useGetPatientDocumentSignedUrl} from '../../queries/useEmployees'
const TherapistDocumentsPage = () => {
  const { data, isLoading, isError } = useGetTherapistAssignedDocuments();
  const {mutateAsync : getSignedUrl, isPending} = useGetPatientDocumentSignedUrl();

     const handleDownload = async (documentId) => {
      console.log(documentId)
        try{
          const data = await getSignedUrl(documentId);
          console.log(data.url)
          window.open(data.url, '_blank');
        }catch(err){
          console.error('Download Failed:', err)
        }
    }
    
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong.</div>;

  console.log(data)
  return (
<div className={DocumentStyles.container}>
  {/* <div className={DocumentStyles.directoryContainer}>
    <IoDocument/>
    <p className={DocumentStyles.directoryHeader}>Documents</p>
  </div> */}

    <div className={DocumentStyles.subContainer}>
      <div className={DocumentStyles.subContainerHeader}>
        <p className={DocumentStyles.header}>My Documents</p>
      </div>
      <div className={DocumentStyles.tableContainer}>
        <table className={DocumentStyles.tbl}>
            <thead className={DocumentStyles.tblHead}>
                <tr>
                    <th className={DocumentStyles.tblHeader}>Patient Name</th>
                    <th className={DocumentStyles.tblHeader}>File Name</th>
                    <th className={DocumentStyles.tblHeader}>File Size</th>
                    <th className={DocumentStyles.tblHeader}>Date Uploaded</th>

                    <th className={DocumentStyles.tblHeader}>Action</th>
                </tr>
            </thead>
            <tbody className={DocumentStyles.tblBody}>
              {data && data.length > 0 ? (
data.map((doc) => (
  <tr key={doc.documentId}>
    <td className={DocumentStyles.tblData}>{doc.patientName || `Patient ID: ${doc.patientId}`}</td>
    <td className={DocumentStyles.tblData}>{doc.fileName || 'N/A'}</td>
    <td className={DocumentStyles.tblData}>
      {doc.fileSize ? `${(doc.fileSize / 1024 / 1024).toFixed(2)}mb` : 'N/A'}
    </td>
    <td className={DocumentStyles.tblData}>
      {doc.formattedDate || 'N/A'}
    </td>
    <td className={`${DocumentStyles.tblData}`}>
      <div className={DocumentStyles.tblDataActionContainer}>
        {/* <div className={DocumentStyles.eyeIconContainer}>
          <FaEye 
            className={`${DocumentStyles.icon} ${DocumentStyles.eyeIcon}`}
            onClick={() => window.open(doc.filePath, '_blank')}
            style={{cursor: 'pointer'}}
          />
        </div> */}
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}} className={DocumentStyles.dlIconContainer}>
          <IoIosDownload 
            className={DocumentStyles.icon}
            onClick={() => handleDownload(doc.documentId)}
            style={{cursor: 'pointer'}}
          />
        </div>
      </div>
    </td>
  </tr>
))
) : (
  <tr>
    <td colSpan="7" className={DocumentStyles.tblData} style={{textAlign: 'center'}}>
      No documents found
    </td>
  </tr>
)}  
                {/* <tr>
                    <td className={DocumentStyles.tblData}>Marian Rivera</td>
                    <td className={DocumentStyles.tblData}>scans.pdf</td>
                    <td className={DocumentStyles.tblData}>1.3mb</td>
                    <td className={DocumentStyles.tblData}>21 MAY 2025</td>
                    <td className={DocumentStyles.tblData}>PT Dela Cruz</td>
                    <td className={DocumentStyles.tblData}>22 MAY 2025</td>
                    <td className={`${DocumentStyles.tblData} `}>
                      <div className={DocumentStyles.tblDataActionContainer}>
                        <div className={DocumentStyles.eyeIconContainer}>
                          <FaEye className={`${DocumentStyles.icon} ${DocumentStyles.eyeIcon}`}/>
                        </div>
                        <div className={DocumentStyles.dlIconContainer}>
                          <IoIosDownload className={DocumentStyles.icon}/>
                        </div>
                      </div>
                      </td>
                </tr> */}
               
            </tbody>
          </table>
      </div>
    </div>
</div>
  )
}

export default TherapistDocumentsPage
