import React from 'react'
import AttachmentStyles from './PatientAttachments.module.css'
import { FaNoteSticky } from "react-icons/fa6";
import { IoCalendarClear } from "react-icons/io5";
import { GiResize } from "react-icons/gi";

const PatientAttachments = (apptDocuments) => {
    const data = apptDocuments.apptDocuments;
    console.log(data)
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
            {data.map((d)=>(
            <div className={AttachmentStyles.attachmentRow}>
                <span> {d.file_name}</span>
                <span> {d.file_type.toUpperCase()}</span>
                <span>{d.formatted_date}</span>
                <span>Action</span>
            </div>

            ))}

        </div>
    </div>
  )
}

export default PatientAttachments
