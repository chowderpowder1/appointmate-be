import React from 'react'
import DocumentStyles from './TherapistDocumentsPage.module.css'
import { IoDocument } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { IoIosDownload } from "react-icons/io";

const TherapistDocumentsPage = () => {
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
                    <th className={DocumentStyles.tblHeader}>Last Viewed By</th>
                    <th className={DocumentStyles.tblHeader}>Last Accessed By</th>
                    <th className={DocumentStyles.tblHeader}>Action</th>
                </tr>
            </thead>
            <tbody className={DocumentStyles.tblBody}>
                <tr>
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
                </tr>
                <tr>
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
                </tr>
            </tbody>
          </table>
      </div>
    </div>
</div>
  )
}

export default TherapistDocumentsPage
