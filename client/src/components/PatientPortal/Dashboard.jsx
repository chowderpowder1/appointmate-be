import DashboardStyles from './Dashboard.module.css'

import { React, useState, useEffect} from 'react'
import MockUser from '../../assets/aw_mock-px.png'
import DatePicker from '../../components/PatientPortal/DatePicker'
import AppointmentNotification from '../../components/PatientPortal/AppointmentNotification'
import { BiSolidAlarm } from "react-icons/bi";
import OnboardingPage from '../../pages/OnBoarding/OnboardingPage.jsx'
import Modal from '../../components/Ui/Modal'
import ProgressStepper from '../../components/PatientPortal/ProgressStepper'
import MiniVerticalStepper from '../../components/PatientPortal/MiniVerticalStepper'
import { CgNotes } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";

// axios fetch user data 
import { useUsers, usePatientData, useGetAvatar } from '../../queries/users.js'


const Dashboard = () => {
    const {data : userData, isLoading: userDataIsLoading, error: userDataError} = useUsers();
    const {data : patientData, isLoading: patientDataIsLoading, error: patientDataError} = usePatientData();
  
    const {data : userAvatar, isLoading: userAvatarIsLoading, error: userAvatarError} = useGetAvatar();

    if (patientDataIsLoading || userDataIsLoading || userAvatarIsLoading ) return <div>Loading...</div>;
    if (patientDataError || userDataError || userAvatarError) return <div>Error: {patientDataError.message}</div>;

return (
    <div className={DashboardStyles.container}>
      <div className={`${DashboardStyles.columnOne} ${DashboardStyles.column}`}>
        <div className={DashboardStyles.profileContainer}>

          <div className={DashboardStyles.profileLeft}>
            <div className={DashboardStyles.patientPhoto}>
              <img src={userAvatar || MockUser} className={DashboardStyles.userPhoto} alt="" />
            </div>

            <h2 className={DashboardStyles.PatientName}>{userData.firstName} {userData.lastName}</h2>
            <p className={DashboardStyles.patientId}>PID #A2023141814</p>
            <p className={DashboardStyles.patientPhone}><FaPhoneAlt/>{userData.contact_number}</p>
            <p className={DashboardStyles.patientEmail}><IoMdMail/>{userData.email}</p>
          </div>

          <div className={DashboardStyles.profileRight}>
            <h2 className={DashboardStyles.header}>Basic Information</h2>
            <div className={DashboardStyles.basicInfoContainer}>
              <div className={DashboardStyles.basicInfoOne}>
                <p className={DashboardStyles.infoDataHeader}>Gender:</p>
                <p>{patientData.gender}</p>

                <div className={DashboardStyles.divider}></div>
                <p className={DashboardStyles.infoDataHeader}>Birthdate:</p>
                <p>{patientData.dob}</p>

                <div className={DashboardStyles.divider}></div>
                <p className={DashboardStyles.infoDataHeader}>City:</p>
                <p>{patientData.city}</p>

                <div className={DashboardStyles.divider}></div>
                <p className={DashboardStyles.infoDataHeader}>HMO Card presented:</p>
                <p>{patientData.hmoCardPresented}</p>

              </div>
              <div className={DashboardStyles.basicInfoTwo}>
                
                <p className={DashboardStyles.infoDataHeader}>Age:</p>
                <p>{patientData.age}</p>
                
                <div className={DashboardStyles.divider}></div>
                <p className={DashboardStyles.infoDataHeader}>Home Address:</p>
                <p>{patientData.unit}, {patientData.street}, Barangay {patientData.barangay}, <br/>{patientData.city}, {patientData.zipcode}</p>
                
                <div className={DashboardStyles.divider}></div>
                <p className={DashboardStyles.infoDataHeader}>ZIP Code:</p>
                <p>{patientData.zipcode}</p>
                <div className={DashboardStyles.divider}></div>
                <p className={DashboardStyles.infoDataHeader}>HMO Card number:</p>
                <p>{patientData.hmoNumber}</p>
              </div>
            </div>

          </div>

        </div>

          <AppointmentNotification/>
          <div className={DashboardStyles.treatmentProgressContainer}><ProgressStepper isHome={true}/>
          </div>
      </div>

      <div className={`${DashboardStyles.columnTwo} ${DashboardStyles.column}`}>
        <DatePicker/>
        <div className={`${DashboardStyles.progressContainer} ${DashboardStyles.miniVerticalStepperContainer}`}>
          <h1 className={DashboardStyles.subHeader}>Therapy Progress</h1>
          <p>Session Breakdown</p>
          <MiniVerticalStepper/>
        </div>
      </div>

      <div className={`${DashboardStyles.columnThree} ${DashboardStyles.column}`}>

        <div className={DashboardStyles.progressContainer}>
          <h2 className={DashboardStyles.smallHeader}>Notifications</h2>
        </div>

        <div className={`${DashboardStyles.progressContainer} ${DashboardStyles.documentsContainer}`}>
          <h2 className={DashboardStyles.smallHeader}>Files/Documents</h2>

          <div className={DashboardStyles.documentRowContainer}>
            <div className={DashboardStyles.documentRow}>
              <div className={DashboardStyles.documentIcon}><CgNotes/></div>
              <div className={DashboardStyles.documentRowSubcontainer}>
                <p >MRI_LUMBAR.pdf</p>
                <p>1.3mb</p>
                <p>21 May 2025</p>
              </div>
            </div>
            <div className={DashboardStyles.documentRow}>
              <div className={DashboardStyles.documentIcon}><CgNotes/></div>
              <div className={DashboardStyles.documentRowSubcontainer}>
                <p >MRI_LUMBAR.pdf</p>
                <p>1.3mb</p>
                <p>21 May 2025</p>
              </div>
            </div>
          </div>
          
        </div>

        <div className={DashboardStyles.progressContainer}>
          <h2 className={DashboardStyles.smallHeader}>Session Notes</h2>
          
           <div className={DashboardStyles.documentRowContainer}>
            <div className={DashboardStyles.documentRow}>
              <div className={DashboardStyles.documentIcon}><CgNotes/></div>
              <div className={DashboardStyles.documentRowSubcontainer}>
                <p >Session_two.pdf</p>
                <p>1.3mb</p>
                <p>21 May 2025</p>
              </div>
            </div>
            <div className={DashboardStyles.documentRow}>
              <div className={DashboardStyles.documentIcon}><CgNotes/></div>
              <div className={DashboardStyles.documentRowSubcontainer}>
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

export default Dashboard
