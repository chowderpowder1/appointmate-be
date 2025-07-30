import React from 'react'
import AttachmentStyles from './Attachments.module.css'
import { FaFileUpload } from "react-icons/fa";
import { CgAttachment } from "react-icons/cg";

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
            <span>Actions</span>        
        </div>
        <div className={AttachmentStyles.row}>
            <span>document.pdf</span>
            <span>1.2 MB</span>
            <span>21 May 2025</span>
            <span><button>Delete</button></span>
        </div>
        <div className={AttachmentStyles.row}>
            <span>document.pdf</span>
            <span>1.2 MB</span>
            <span>21 May 2025</span>
            <span><button>Delete</button></span>
        </div>
      </div>
    </div>
  )
}

export default Attachments
