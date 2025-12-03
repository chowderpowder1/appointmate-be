import { React, useState, useEffect} from 'react'
import PDStyles from './PatientDashboard.module.css'
import MockUser from '../../assets/zoey.png'
import DatePicker from '../../components/PatientPortal/DatePicker'
import AppointmentNotification from '../../components/PatientPortal/AppointmentNotification'
import { BiSolidAlarm } from "react-icons/bi";
import OnboardingPage from '../OnBoarding/OnboardingPage'
import Modal from '../../components/Ui/Modal'
import Dashboard from '../../components/PatientPortal/Dashboard.jsx'

import ProgressStepper from '../../components/PatientPortal/ProgressStepper'
import MiniVerticalStepper from '../../components/PatientPortal/MiniVerticalStepper'
import { CgNotes } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";

// axios fetch user data 
import { useUsers, usePatientData } from '../../queries/users.js'

const PatientDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const {data : userData, isLoading: userDataIsLoading, error: userDataError} = useUsers();
  // const {data : patientData, isLoading: patientDataIsLoading, error: patientDataError} = usePatientData();

  // const modalHandler = (e) => {
  //   setIsOpen(e)
  // }

  // useEffect(()=>{
  //   if (userData?.is_profile_complete) {
  //     modalHandler(false)
  //   } else if (!userData?.is_profile_complete) {
  //     modalHandler(true)
  //   } else{
  //     modalHandler(true)
  //   }
  // }, [userData])

  if (userDataIsLoading ) return <div>Loading...</div>;
  if (userDataError ) return <div>Error: {userDataError.message}</div>;
  console.log(userData.is_profile_complete);
  if(!userData.is_profile_complete){
    return(<Modal open={true}>
      <OnboardingPage></OnboardingPage>
    </Modal>)
  }
  // if (userDataIsLoading || patientDataIsLoading) return <div>Loading...</div>;
  // console.log(patientDataError);
  // if (userDataError || patientDataError) return <div>Error: {patientDataError.message}</div>;

  return (
    <><Dashboard></Dashboard></>
    // <div className={PDStyles.container}>
    //   <Modal open={isOpen}>
    //     <OnboardingPage/>
    //   </Modal>
    //   <div className={`${PDStyles.columnOne} ${PDStyles.column}`}>
    //     <div className={PDStyles.profileContainer}>

    //       <div className={PDStyles.profileLeft}>
    //         <div className={PDStyles.patientPhoto}>
    //           <img src={MockUser} alt="" />
    //         </div>
    //         <h2 className={PDStyles.PatientName}>{userData.firstName} {userData.lastName}</h2>
    //         <p className={PDStyles.patientId}>PID #A2023141814</p>
    //         <p className={PDStyles.patientPhone}><FaPhoneAlt/>{userData.contact_number}</p>
    //         <p className={PDStyles.patientEmail}><IoMdMail/>{userData.email}</p>
    //       </div>

    //       <div className={PDStyles.profileRight}>
    //         <h2 className={PDStyles.header}>Basic Information</h2>
    //         <div className={PDStyles.basicInfoContainer}>
    //           <div className={PDStyles.basicInfoOne}>
    //             <p className={PDStyles.infoDataHeader}>Gender:</p>
    //             <p>Female</p>
    //             <div className={PDStyles.divider}></div>
    //             <p className={PDStyles.infoDataHeader}>Birthdate:</p>
    //             <p>{patientData.dob}</p>
    //             <div className={PDStyles.divider}></div>
    //             <p className={PDStyles.infoDataHeader}>City:</p>
    //             <p>{patientData.city}</p>
    //             <div className={PDStyles.divider}></div>
    //             <p className={PDStyles.infoDataHeader}>HMO Card presented:</p>
    //             <p>{patientData.hmoCardPresented}</p>
    //           </div>
    //           <div className={PDStyles.basicInfoTwo}>
                
    //             <p className={PDStyles.infoDataHeader}>Age:</p>
    //             <p>{patientData.age}</p>
    //             <div className={PDStyles.divider}></div>
    //             <p className={PDStyles.infoDataHeader}>Home Address:</p>
    //             <p>Brgy. Sample Address Blk 2</p>
    //             <div className={PDStyles.divider}></div>
    //             <p className={PDStyles.infoDataHeader}>ZIP Code:</p>
    //             <p>{patientData.zipcode}</p>
    //             <div className={PDStyles.divider}></div>
    //             <p className={PDStyles.infoDataHeader}>HMO Card number:</p>
    //             <p>{patientData.hmoNumber}</p>
    //           </div>
    //         </div>

    //       </div>

    //     </div>

    //       <AppointmentNotification/>
    //       <div className={PDStyles.treatmentProgressContainer}><ProgressStepper isHome={true}/>
    //       </div>
    //   </div>

    //   <div className={`${PDStyles.columnTwo} ${PDStyles.column}`}>
    //     <DatePicker/>
    //     <div className={`${PDStyles.progressContainer} ${PDStyles.miniVerticalStepperContainer}`}>
    //       <h1 className={PDStyles.subHeader}>Therapy Progress</h1>
    //       <p>Session Breakdown</p>
    //       <MiniVerticalStepper/>
    //     </div>
    //   </div>

    //   <div className={`${PDStyles.columnThree} ${PDStyles.column}`}>

    //     <div className={PDStyles.progressContainer}>
    //       <h2 className={PDStyles.smallHeader}>Notifications</h2>
    //     </div>

    //     <div className={`${PDStyles.progressContainer} ${PDStyles.documentsContainer}`}>
    //       <h2 className={PDStyles.smallHeader}>Files/Documents</h2>

    //       <div className={PDStyles.documentRowContainer}>
    //         <div className={PDStyles.documentRow}>
    //           <div className={PDStyles.documentIcon}><CgNotes/></div>
    //           <div className={PDStyles.documentRowSubcontainer}>
    //             <p >MRI_LUMBAR.pdf</p>
    //             <p>1.3mb</p>
    //             <p>21 May 2025</p>
    //           </div>
    //         </div>
    //         <div className={PDStyles.documentRow}>
    //           <div className={PDStyles.documentIcon}><CgNotes/></div>
    //           <div className={PDStyles.documentRowSubcontainer}>
    //             <p >MRI_LUMBAR.pdf</p>
    //             <p>1.3mb</p>
    //             <p>21 May 2025</p>
    //           </div>
    //         </div>
    //       </div>
          
    //     </div>

    //     <div className={PDStyles.progressContainer}>
    //       <h2 className={PDStyles.smallHeader}>Session Notes</h2>
          
    //        <div className={PDStyles.documentRowContainer}>
    //         <div className={PDStyles.documentRow}>
    //           <div className={PDStyles.documentIcon}><CgNotes/></div>
    //           <div className={PDStyles.documentRowSubcontainer}>
    //             <p >Session_two.pdf</p>
    //             <p>1.3mb</p>
    //             <p>21 May 2025</p>
    //           </div>
    //         </div>
    //         <div className={PDStyles.documentRow}>
    //           <div className={PDStyles.documentIcon}><CgNotes/></div>
    //           <div className={PDStyles.documentRowSubcontainer}>
    //             <p >Session_one.pdf</p>
    //             <p>1.3mb</p>
    //             <p>21 May 2025</p>
    //           </div>
    //         </div>
    //       </div>
          
    //     </div>
    //   </div>

    // </div>
  )
}

export default PatientDashboard
