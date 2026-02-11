import React from 'react'
import {Link} from 'react-router'
import EditStyles from './EditApptPage.module.css'
import AssignedPt from '../../components/Therapist/EditAppt/AssignedTherapist'
import ApptDetails from '../../components/Therapist/EditAppt/ApptDetails'
import PaymentMethod from '../../components/Therapist/EditAppt/PaymentMethod'
import PxAttachment from '../../components/Therapist/EditAppt/PatientAttachments'
import UpdateApptStatus from '../../components/Therapist/EditAppt/UpdateApptStatus'
import UpdateServicePlan from '../../components/Therapist/EditAppt/UpdateServicePlan'
import CreateServicePlan from '../../components/Therapist/EditAppt/CreateServicePlan.jsx'
import OpenPatientSession from '../../components/Therapist/EditAppt/OpenPatientSession.jsx'
import { IoIosArrowBack } from "react-icons/io";
import { IoCalendarClear } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

import { useParams } from "react-router";
import { useGetApptDetailsOverview, useGetApptDocuments, useGetApptServicePlan } from '../../queries/useEmployees'
import {useUsers} from '../../queries/users'

const EditAppt = () => {
  const { id } = useParams();
  const { data: apptDetailsData, isLoading: apptDetailsDataIsLoading, error: apptDetailsDataError} = useGetApptDetailsOverview(id);

  const { data: apptServiceData, isLoading: apptServiceDataIsLoading, error: apptServiceDataError} = useGetApptServicePlan(apptDetailsData?.apptId);

  const { data: myData, isLoading: myDataIsLoading, error: myDataError} = useUsers();
  
  const { data: apptDocuments, isLoading: apptDocumentsDataIsLoading, error: apptDocumentsDataError} = useGetApptDocuments(apptDetailsData?.patientID);

  if (apptDetailsDataIsLoading || apptDocumentsDataIsLoading || apptServiceDataIsLoading) return <div>Loading...</div>;
  if (apptDetailsDataError || apptDocumentsDataError || apptServiceDataError) return <div>⚠ Error: {apptDetailsDataError.message}</div>;

  return (
    <div className={EditStyles.mainContainer}>
      {/* <div className={EditStyles.directoryContainer}> <IoCalendarClear/> <p>Appointments</p> <IoIosArrowForward/> <p>Edit Appointments</p></div> */}
      <div className={EditStyles.rowOne}>

        <div className={EditStyles.headercontainer}>
          <Link to='/front-desk/manage-appointments'className={EditStyles.dirContainer}>
            <IoIosArrowBack/>
            <h2>Edit appointment</h2>
          </Link>
          <div className={EditStyles.sessionIdContainer}>
            <p><b>Session ID:</b> {apptServiceData.sessionId || 'No Service Plan assigned'}</p>
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
        <OpenPatientSession apptData={apptDetailsData} serviceData={apptServiceData} />
        <UpdateApptStatus apptData={apptDetailsData} userData={myData}/>
        <UpdateServicePlan apptData={apptDetailsData} userData={myData} serviceData={apptServiceData}/>
        <CreateServicePlan apptData={apptDetailsData} userData={myData}/>
        
      </div>

    </div>
  )
}

export default EditAppt
