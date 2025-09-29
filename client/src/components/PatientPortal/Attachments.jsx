import React from 'react'
import AttachmentStyles from './Attachments.module.css'
import { FaFileUpload } from "react-icons/fa";
import { CgAttachment } from "react-icons/cg";
import { FaTrash } from "react-icons/fa";
import { FaFloppyDisk } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";

const Attachments = () => {
  return (
    <div className={AttachmentStyles.attachmentContainer}>
        <div className={AttachmentStyles.attachmentTitleContainer}>
            <CgAttachment className={AttachmentStyles.attachmentIcon}/>
            <h1 className={AttachmentStyles.attachmentTitle}>Your Attachments</h1>

            <div className={AttachmentStyles.uploadBtnContainer}>
            <input style={{display:'none'}} type="file" id="myfile" name="myfile"></input>
            <FaFileUpload className={AttachmentStyles.uploadIcon}/>
            <label className={AttachmentStyles.uploadBtn} for="myfile">Add Files</label>
        </div>
        </div>
        <div className="divider"></div>
        
      <div className={AttachmentStyles.uploadedAttachmentsContainer}>
        <div className={AttachmentStyles.header}>
            <span>Filename</span>
            <span>File Size</span>
            <span>Date</span>
            <span>Last Viewed By</span>
            <span>Last Accessed</span>
            <span>Actions</span>        
        </div>
        <div className={AttachmentStyles.row}>
            <span><CgNotes/>MRI_Lumbar_Spine.pdf</span>
            <span> <FaFloppyDisk/>1.2 MB</span>
            <span>21 May 2025</span>
            <span>PT Lee Ji-eun</span>
            <span>22 May 2025</span>
            <span><div className={AttachmentStyles.removeBntContainer}><FaTrash/></div></span>
        </div>
        <div className={AttachmentStyles.row}>
            <span> <CgNotes/>Ortho_Report.png</span>
            <span> <FaFloppyDisk/>28.7kb</span>
            <span>16 June 2025</span>
            <span>PT Lee Ji-eun</span>
            <span>17 June 2025</span>
            <span><div className={AttachmentStyles.removeBntContainer}><FaTrash/></div></span>
        </div>
      </div>
    </div>
  )
}

export default Attachments
