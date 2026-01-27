import {React, useState} from 'react'
import AttachmentStyles from './Attachments.module.css'
import { FaFileUpload } from "react-icons/fa";
import { CgAttachment } from "react-icons/cg";
import { FaTrash } from "react-icons/fa";
import { FaFloppyDisk } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { HiOutlineDownload } from "react-icons/hi";
import dayjs from 'dayjs';

import { useUploadDocument, useGetMyDocumentsList, useGetDocumentSignedUrl } from '../../queries/users'

import { Link } from "react-router";

const Attachments = () => {
  
  const {data : documentList, isLoading: documentListIsLoading, error: documentListError} = useGetMyDocumentsList();

  const {mutateAsync : getSignedUrl, isPending} = useGetDocumentSignedUrl();

  const {mutate: updateDocumentMutation} = useUploadDocument();

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

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


    const handleUpload = async (e) => {
        e.preventDefault;
        
        const file = e.target.files[0];
        // if (!file) return;

    //     if (file.size > MAX_SIZE_BYTES) {
    //     alert('File must be 5MB or smaller');
    //     e.target.value = '';
    //     return;
    // }
        setFile(e.target.files[0]);
        setError('');

        if (!file) {
            setError('Please Select a file');
            return    
        }
        
        setUploading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        updateDocumentMutation(formData)

    }

    if (documentListIsLoading) return <div>Loading...</div>;
    if (documentListError) return <div>Error: {documentListError.message}</div>;
    console.log(documentList)
  return (
    <div styles={{width:'100%'}} className={AttachmentStyles.attachmentContainer}>
        <div className={AttachmentStyles.attachmentTitleContainer}>
            <CgAttachment className={AttachmentStyles.attachmentIcon}/>
            <h1 className={AttachmentStyles.attachmentTitle}>Your Attachments</h1>

          <div className={AttachmentStyles.uploadBtnContainer}>

              <input 
              style={{display:'none'}} 
              type="file" 
              id="myfile" 
              name="myfile"
              onChange={handleUpload}
              />

              <FaFileUpload className={AttachmentStyles.uploadIcon}/>
              <label className={AttachmentStyles.uploadBtn} for="myfile">Add Files</label>

        </div>
        </div>
        <div className="divider"></div>

        {documentList.length==0 && <h1 className={AttachmentStyles.noDocs}>You don’t have any documents uploaded yet..</h1>}        
<div className={AttachmentStyles.uploadedAttachmentsContainer}>
        <div className={AttachmentStyles.header}>
            <span>Filename</span>
            <span>File Size</span>
            <span>Date</span>
            {/* <span>Last Viewed By</span>
            <span>Last Accessed</span> */}
            <span>Actions</span>        
        </div>
        {documentList.map((d)=>(
          <div key={d.ptn_doc_id}className={AttachmentStyles.row}>
              <span><CgNotes/>{d.file_name}</span>
              <span> <FaFloppyDisk/>{d.file_type.toUpperCase()}</span>
              <span className={AttachmentStyles.date}>{dayjs(d.upload_date).format(' MMMM DD, YYYY')}</span>
              {/* <span>PT Lee Ji-eun</span>
              <span>22 May 2025</span> */}
              <span className={AttachmentStyles.bntContainer}>
                
              <button 
              onClick={() => handleDownload(d.ptn_doc_id)} 
              className={AttachmentStyles.downloadBtnContainer}
              disabled={isPending}
              ><HiOutlineDownload/></button>
              {/* <div className={AttachmentStyles.removeBntContainer}><FaTrash/></div> */}
              </span>
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default Attachments
