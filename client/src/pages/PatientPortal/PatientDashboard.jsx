import { React, useState} from 'react'
import PDStyles from './PatientDashboard.module.css'
import MockUser from '../../assets/zoey.png'
import DatePicker from '../../components/PatientPortal/DatePicker'
import AppointmentNotification from '../../components/PatientPortal/AppointmentNotification'
import { BiSolidAlarm } from "react-icons/bi";
import OnboardingPage from '../OnBoarding/OnboardingPage'
import Modal from '../../components/Ui/Modal'
import ProgressStepper from '../../components/PatientPortal/ProgressStepper'
import MiniVerticalStepper from '../../components/PatientPortal/MiniVerticalStepper'
import { CgNotes } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";

const PatientDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={PDStyles.container}>
      <Modal open={isOpen}>
        <OnboardingPage/>
      </Modal>
      <div className={`${PDStyles.columnOne} ${PDStyles.column}`}>
        <div className={PDStyles.profileContainer}>

          <div className={PDStyles.profileLeft}>
            <div className={PDStyles.patientPhoto}>
              <img src={MockUser} alt="" />
            </div>
            <h2 className={PDStyles.PatientName}>Zoey Min</h2>
            <p className={PDStyles.patientId}>PID #A2023141814</p>
            <p className={PDStyles.patientPhone}><FaPhoneAlt/>+63 911 222 1111</p>
            <p className={PDStyles.patientEmail}><IoMdMail/>zoey.min@demon-hunters.com</p>
          </div>

          <div className={PDStyles.profileRight}>
            <h2 className={PDStyles.header}>Basic Information</h2>
            <div className={PDStyles.basicInfoContainer}>
              <div className={PDStyles.basicInfoOne}>
                <p className={PDStyles.infoDataHeader}>Gender:</p>
                <p>Female</p>
                <div className={PDStyles.divider}></div>
                <p className={PDStyles.infoDataHeader}>Birthdate:</p>
                <p>06-10-2002</p>
                <div className={PDStyles.divider}></div>
                <p className={PDStyles.infoDataHeader}>City:</p>
                <p>Caloocan City</p>
                <div className={PDStyles.divider}></div>
                <p className={PDStyles.infoDataHeader}>HMO Card presented:</p>
                <p>MediCard</p>
              </div>
              <div className={PDStyles.basicInfoTwo}>
                
                <p className={PDStyles.infoDataHeader}>Age:</p>
                <p>22</p>
                <div className={PDStyles.divider}></div>
                <p className={PDStyles.infoDataHeader}>Home Address:</p>
                <p>Brgy. Sample Address Blk 2</p>
                <div className={PDStyles.divider}></div>
                <p className={PDStyles.infoDataHeader}>ZIP Code:</p>
                <p>224</p>
                <div className={PDStyles.divider}></div>
                <p className={PDStyles.infoDataHeader}>HMO Card presented:</p>
                <p>Medd</p>
              </div>
            </div>

          </div>

        </div>

          <AppointmentNotification/>
          <div className={PDStyles.treatmentProgressContainer}><ProgressStepper isHome={true}/>
          </div>
      </div>

      <div className={`${PDStyles.columnTwo} ${PDStyles.column}`}>
        <DatePicker/>
        <div className={`${PDStyles.progressContainer} ${PDStyles.miniVerticalStepperContainer}`}>
          <h1 className={PDStyles.subHeader}>Therapy Progress</h1>
          <p>Session Breakdown</p>
          <MiniVerticalStepper/>
        </div>
      </div>

      <div className={`${PDStyles.columnThree} ${PDStyles.column}`}>

        <div className={PDStyles.progressContainer}>
          <h2 className={PDStyles.smallHeader}>Notifications</h2>
        </div>

        <div className={`${PDStyles.progressContainer} ${PDStyles.documentsContainer}`}>
          <h2 className={PDStyles.smallHeader}>Files/Documents</h2>

          <div className={PDStyles.documentRowContainer}>
            <div className={PDStyles.documentRow}>
              <div className={PDStyles.documentIcon}><CgNotes/></div>
              <div className={PDStyles.documentRowSubcontainer}>
                <p >MRI_LUMBAR.pdf</p>
                <p>1.3mb</p>
                <p>21 May 2025</p>
              </div>
            </div>
            <div className={PDStyles.documentRow}>
              <div className={PDStyles.documentIcon}><CgNotes/></div>
              <div className={PDStyles.documentRowSubcontainer}>
                <p >MRI_LUMBAR.pdf</p>
                <p>1.3mb</p>
                <p>21 May 2025</p>
              </div>
            </div>
          </div>
          
        </div>

        <div className={PDStyles.progressContainer}>
          <h2 className={PDStyles.smallHeader}>Session Notes</h2>
          
           <div className={PDStyles.documentRowContainer}>
            <div className={PDStyles.documentRow}>
              <div className={PDStyles.documentIcon}><CgNotes/></div>
              <div className={PDStyles.documentRowSubcontainer}>
                <p >Session_two.pdf</p>
                <p>1.3mb</p>
                <p>21 May 2025</p>
              </div>
            </div>
            <div className={PDStyles.documentRow}>
              <div className={PDStyles.documentIcon}><CgNotes/></div>
              <div className={PDStyles.documentRowSubcontainer}>
                <p >Session_one.pdf</p>
                <p>1.3mb</p>
                <p>21 May 2025</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  )
}

export default PatientDashboard
