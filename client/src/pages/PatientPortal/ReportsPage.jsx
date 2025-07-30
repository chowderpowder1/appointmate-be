import React from 'react'
import ReportStyles from './ReportsPage.module.css'
import CircularStepper from '../../components/PatientPortal/CircularStepper'
import { PiNoteFill } from "react-icons/pi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";

const ReportsPage = () => {
  return (
    <div className={ReportStyles.reportContainer}>
      {/* Column One */}
      <div className={ReportStyles.columnOne}>
        <CircularStepper/>
        <div className={ReportStyles.reportDownloadableContainer}>
            <h1 className={ReportStyles.reportTitle}>Reports</h1>
            <div className={ReportStyles.reportTable}>
                <div className={ReportStyles.reportRow}>
                    <div className={ReportStyles.reportFileNameContainer}>
                      <div className={ReportStyles.reportFileName}>
                        <PiNoteFill/>
                        <p>MarianoB_PT-Session1.pdf</p>
                      </div>
                      1.3mb
                    </div>
                    <p>22 May 2025</p>
                    <div className={ReportStyles.btnContainer}> 
                      <div className={ReportStyles.linkBtn}><FaExternalLinkAlt/></div> 
                      <div className={ReportStyles.downloadBtn}><MdOutlineFileDownload/></div>
                    </div>
                </div>
                <div className={ReportStyles.reportRow}>
                    <div className={ReportStyles.reportFileNameContainer}>
                      <div className={ReportStyles.reportFileName}>
                        <PiNoteFill/>
                        <p>MarianoB_PT-Session1.pdf</p>
                      </div>
                      1.3mb
                    </div>
                    <p>22 May 2025</p>
                    <div className={ReportStyles.btnContainer}> 
                      <div className={ReportStyles.linkBtn}><FaExternalLinkAlt/></div> 
                      <div className={ReportStyles.downloadBtn}><MdOutlineFileDownload/></div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Column Two */}
      <div className={ReportStyles.columnTwo}>
        <div className={ReportStyles.sessionTitleContainer}>
          <h1 className={ReportStyles.sessionTitle}>MarianoB_PT-Session1</h1>
          <div className={ReportStyles.sessionStatusIndicator}>Done</div>
        </div>
        <div className={ReportStyles.sessionDataContainer}>
          <div>
            <p className={ReportStyles.sessionDataTitle}>Date of Session:</p>
            <p className={ReportStyles.sessionDataTitle}>Time/Duration:</p>
          </div>
          <div>
            <p className={ReportStyles.sessionDataTitle}>Assigned PT:</p>
            <p className={ReportStyles.sessionDataTitle}>Session Number:</p>
          </div>
        </div>
        <div className="divider"></div>
        <div className={ReportStyles.sessionDataContainer}>
          <p className={ReportStyles.sessionDataTitle}>Subjective:</p>
        </div>
        <div className="divider"></div>
        <div className={ReportStyles.sessionDataContainer}>
          <p className={ReportStyles.sessionDataTitle}>Objective:</p>
        </div>
        <div className="divider"></div>
        <div className={ReportStyles.sessionDataContainer}>
          <p className={ReportStyles.sessionDataTitle}>Assessment:</p>
        </div>
        <div className="divider"></div>
        <div className={ReportStyles.sessionDataContainer}>
          <p className={ReportStyles.sessionDataTitle}>Plan:</p>
        </div>
        <div className="divider"></div>
        <div className={ReportStyles.sessionDataContainer}>
          <div>
            <p className={ReportStyles.sessionDataTitle}>Attachments/Media:</p>
            
          </div>
          <div>
            <p className={ReportStyles.sessionDataTitle}>Comments:</p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage
