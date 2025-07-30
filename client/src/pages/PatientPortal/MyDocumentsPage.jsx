import React from 'react'
import DocumentStyles from './MyDocumentsPage.module.css'
import Attachments from '../../components/PatientPortal/Attachments'
const MyDocuments = () => {
  return (
    <div className={DocumentStyles.documentContainer}>
      <Attachments/>
    </div>
  )
}

export default MyDocuments
