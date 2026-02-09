import React from 'react'
import AttachmentStyles from './PatientAttachments.module.css'
import { FaNoteSticky } from "react-icons/fa6";
import { IoCalendarClear, IoDocumentAttach } from "react-icons/io5";
import { GiResize } from "react-icons/gi";
import { useGetPatientDocumentList, useGetPatientDocumentSignedUrl } from '../../../queries/useEmployees'
import { MdOutlineFileDownload } from "react-icons/md";

import dayjs from 'dayjs'

const PatientAttachments = (apptDocuments) => {
    const {mutateAsync : getSignedUrl, isPending} = useGetPatientDocumentSignedUrl();
    const {data:documentList, isLoading: documentListIsLoading, error: documentListError}=useGetPatientDocumentList()

    const handleDownload = async (documentId) => {
    try{
    const data = await getSignedUrl(documentId);
    console.log(data.url)
    window.open(data.url, '_blank');
    }catch(err){
    console.error('Download Failed:', err)
    }
    }

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
                <span className={AttachmentStyles.fileNameContainer}> <IoDocumentAttach className={AttachmentStyles.fileNameIcon}/>
                <p>{d.file_name.slice(0,20)}...</p>
                </span>
                <span> {d.file_type.toUpperCase()}</span>
                <span>{dayjs(d.upload_date.split('T')[0]).format('MMM DD, YYYY')}</span>
                <span onClick={() => handleDownload(d455.documentId)} className={AttachmentStyles.downloadContainer}><MdOutlineFileDownload/></span>
            </div>

            ))}

        </div>
    </div>
  )
}

export default PatientAttachments
