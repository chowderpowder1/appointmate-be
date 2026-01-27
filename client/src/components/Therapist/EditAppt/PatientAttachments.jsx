import React from 'react'
import AttachmentStyles from './PatientAttachments.module.css'
import { FaNoteSticky } from "react-icons/fa6";
import { IoCalendarClear } from "react-icons/io5";
import { GiResize } from "react-icons/gi";
import { useGetPatientDocumentList,  } from '../../../queries/useEmployees'

const PatientAttachments = (apptDocuments) => {

    const {data:documentList, isLoading: documentListIsLoading, error: documentListError}=useGetPatientDocumentList()

    if (documentListIsLoading) return <div>Loading...</div>;
    if (documentListError ) return <div>⚠ Error: {apptDetailsDataError.message}</div>;

    const data = apptDocuments.apptDocuments;
    console.log(documentList)
  return (
    <div>
        <p className={AttachmentStyles.header}>Patient Attachments</p>
        <div className={AttachmentStyles.attachmentContainer}>
            <div className={AttachmentStyles.attachmentHeader}>
                <p>File Name</p>
                <p>File Type</p>
                <p>Date</p>
                <p>Action</p>
            </div>
            <div className={AttachmentStyles.headerBg}></div>

            {documentList.map((d)=>(
            <div className={AttachmentStyles.attachmentRow}>
                <span> {d.file_name.slice(0,20)}...</span>
                <span> {d.file_type.toUpperCase()}</span>
                <span>{d.upload_date.split('T')[0]}</span>
                <span>Action</span>
            </div>

            ))}

        </div>
    </div>
  )
}

export default PatientAttachments
