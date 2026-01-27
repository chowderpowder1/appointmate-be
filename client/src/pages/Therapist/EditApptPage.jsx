import React from 'react'
import EditStyles from './EditApptPage.module.css'
import AssignedPt from '../../components/Therapist/EditAppt/AssignedTherapist'
import ApptDetails from '../../components/Therapist/EditAppt/ApptDetails'
import PaymentMethod from '../../components/Therapist/EditAppt/PaymentMethod'
import PxAttachment from '../../components/Therapist/EditAppt/PatientAttachments'
import UpdateApptStatus from '../../components/Therapist/EditAppt/UpdateApptStatus'
import { IoIosArrowBack } from "react-icons/io";
import { IoCalendarClear } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

import { useParams } from "react-router";
import { useGetApptDetailsOverview, useGetApptDocuments,  } from '../../queries/useEmployees'
import {useUsers} from '../../queries/users'
const EditAppt = () => {
  const { id } = useParams();
  const { data: apptDetailsData, isLoading: apptDetailsDataIsLoading, error: apptDetailsDataError} = useGetApptDetailsOverview(id);
  
  const { data: myData, isLoading: myDataIsLoading, error: myDataError} = useUsers();
  
  const { data: apptDocuments, isLoading: apptDocumentsDataIsLoading, error: apptDocumentsDataError} = useGetApptDocuments(apptDetailsData?.patientID);

  if (apptDetailsDataIsLoading || apptDocumentsDataIsLoading) return <div>Loading...</div>;
  if (apptDetailsDataError || apptDocumentsDataError) return <div>⚠ Error: {apptDetailsDataError.message}</div>;
  

  return (
    <div className={EditStyles.mainContainer}>
      <div className={EditStyles.directoryContainer}> <IoCalendarClear/> <p>Appointments</p> <IoIosArrowForward/> <p>Edit Appointments</p></div>
      <div className={EditStyles.rowOne}>

        <div className={EditStyles.headercontainer}>
          <div className={EditStyles.dirContainer}>
            <IoIosArrowBack/>
            <h2>Edit appointment</h2>
          </div>
          <div className={EditStyles.sessionIdContainer}>
            <p><b>Session ID:</b> Approval Needed</p>
          </div>
        </div>
        <AssignedPt apptData={apptDetailsData} apptID={id}/>

        <div className={EditStyles.apptDetailsContainer}>
          <ApptDetails apptID={id} userData={myData}/>
          <PaymentMethod apptData={apptDetailsData}/>
          <PxAttachment apptDocuments={apptDocuments}/>
        </div>

        {/* <button className={EditStyles.applyBtn}> Apply Changes</button> */}
      </div>
      <div className={EditStyles.rowTwo}>
        <UpdateApptStatus apptData={apptDetailsData} userData={myData}/>
      </div>

    </div>
  )
}

export default EditAppt
