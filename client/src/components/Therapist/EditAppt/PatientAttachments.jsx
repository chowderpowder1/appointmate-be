import React from 'react'
import AttachmentStyles from './PatientAttachments.module.css'
import { FaNoteSticky } from "react-icons/fa6";
import { IoCalendarClear } from "react-icons/io5";
import { GiResize } from "react-icons/gi";

const PatientAttachments = () => {
  return (
    <div>
        <p className={AttachmentStyles.header}>Patient Attachments</p>
        <div className={AttachmentStyles.attachmentContainer}>
            <div className={AttachmentStyles.attachmentHeader}>
                <p>File Name</p>
                <p>File Size</p>
                <p>Date</p>
                <p>Action</p>
            </div>
            <div className={AttachmentStyles.headerBg}></div>
            <div className={AttachmentStyles.attachmentRow}>
                <span> <FaNoteSticky className={AttachmentStyles.icon} /> MRI_Spine.pdf</span>
                <span> <GiResize className={AttachmentStyles.icon} /> 1.3mb</span>
                <span> <IoCalendarClear className={AttachmentStyles.icon} /> 21 MAY 2025</span>
                <span>Action</span>
            </div>
            <div className={AttachmentStyles.attachmentRow}>
                <span> <FaNoteSticky className={AttachmentStyles.icon} /> MRI_Spine.pdf</span>
                <span> <GiResize className={AttachmentStyles.icon} /> 1.3mb</span>
                <span> <IoCalendarClear className={AttachmentStyles.icon} /> 21 MAY 2025</span>
                <span>Action</span>
            </div>


        </div>
    </div>
  )
}

export default PatientAttachments
