import {React, useState, useEffect} from 'react'
import AppointmentStyles from './AppointmentDetails.module.css'
import MockupPt from '../../assets/aw_mock-px.png'
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { BsCalendarMinusFill } from "react-icons/bs";
import Button from '@mui/material/Button';
import Modal from '../../components/Ui/Modal'
import TextField from "@mui/material/TextField";

// React Icons
import { MdOutlineCancel } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";

import RescheduleTab from './RescheduleTab.jsx' 
// Query
import { UseGetAnAppointmentsDetails, useUpdateMyAppointment } from '../../queries/apptData.js'

import { useGetMyRecords } from '../../queries/users.js'

const AppointmentDetails = (apptID) => {
    const { data: evalData, isLoading: evalDataisLoading, error: evalDataError} = useGetMyRecords();

    const [complaint, setComplaint] = useState('')
    const { data: apptDetails, isLoading: apptDetailIsLoading, error: apptDetailsError} = UseGetAnAppointmentsDetails(apptID);
    const [isCancelOpen, setIsCancelOpen] = useState(false);
    const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);

    const {mutate: updateApptMutation} = useUpdateMyAppointment();
    const [apptUpdatePayload, setApptUpdatePayload]= useState({
        apptID:apptID,
        apptNewStatus:'',
    })

    
    useEffect(() => {
      if (evalData?.complaint) {
        setComplaint(evalData.complaint);
      }
    }, [evalData]);

    if (apptDetailIsLoading || evalDataisLoading) return <div>Loading...</div>;
    if (apptDetailsError || evalDataError) return <div>Error: {apptDetailsError.error}</div>;

    console.log(evalData);

    const cancelApptSubmit = () =>{
        updateApptMutation(apptUpdatePayload)
    }
    const rescheduleApptSubmit = () =>{
        updateApptMutation(apptUpdatePayload)
    }

  return (
    <div className={AppointmentStyles.appointmentContainer}>
        <div className={AppointmentStyles.appointmentTitleContainer}>
            <BsCalendarMinusFill className={AppointmentStyles.titleIcon}/>
            <h2 className={AppointmentStyles.appointmentTitle}>Your Appointment Details</h2>
        </div>
        <Modal open={isCancelOpen} onClose={() => setIsCancelOpen(false)}> 
        <div className={AppointmentStyles.confirmationCancelModal}>
                <MdOutlineCancel className={AppointmentStyles.cancelModalIcon} />
                <div className={AppointmentStyles.cancelModalTextBox}>
                    <h4>Cancel your Appointment?</h4>
                    <p>Are you sure you want to cancel your appointment?</p>
                </div>
              <div className={AppointmentStyles.cancelModalBtnContainer}>
                  <Button
                      variant="outlined"
                      sx={{
                        width: "50%",
                        border: "1px solid gray",
                        backgroundColor: "gray",
                        fontWeight: 600,
                        fontSize: "1rem",
                        whiteSpace: "nowrap",
                        color: "white",
                        textTransform: "none",
                        borderRadius:'15px',
                        padding:'1rem',
                        height:'15px',
                      }}

                    onClick={()=>{
                        setIsCancelOpen(false)
                    }}
                    >Cancel</Button>
                  <Button
                      variant="outlined"
                      sx={{
                        width: "50%",
                        border: "1px solid var(--primary-color)",
                        padding: "1rem",
                        backgroundColor: "var(--primary-color)",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        whiteSpace: "nowrap",
                        color: "white",
                        textTransform: "none",
                        borderRadius:'15px',
                        height:'15px'                        

                      }}
                    onClick={()=>{
                        cancelApptSubmit()
                        setIsCancelOpen(false)
                    }}
                    >Confirm</Button>
              </div>
        </div>
          {/* <button onClick={activeModal}>close</button> */}
      </Modal>

      {/* Reschedule Modal */}
        <Modal open={isRescheduleOpen} onClose={() => setIsRescheduleOpen(false)}> 
                    <RescheduleTab/>
        {/* <div className={AppointmentStyles.confirmationCancelModal}>
                <RiCalendarScheduleFill className={AppointmentStyles.rescheduleModalIcon} />
                <div className={AppointmentStyles.cancelModalTextBox}>
                    <h4>Reschedule your Appointment?</h4>
                    
                </div>
              <div className={AppointmentStyles.cancelModalBtnContainer}>
                  <Button
                      variant="outlined"
                      sx={{
                        width: "50%",
                        border: "1px solid gray",
                        backgroundColor: "gray",
                        fontWeight: 600,
                        fontSize: "1rem",
                        whiteSpace: "nowrap",
                        color: "white",
                        textTransform: "none",
                        borderRadius:'15px',
                        padding:'1rem',
                        height:'15px',
                      }}

                    onClick={()=>{
                        setIsRescheduleOpen(false)
                    }}
                    >Cancel</Button>
                  <Button
                      variant="outlined"
                      sx={{
                        width: "50%",
                        border: "1px solid var(--primary-color)",
                        padding: "1rem",
                        backgroundColor: "var(--primary-color)",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        whiteSpace: "nowrap",
                        color: "white",
                        textTransform: "none",
                        borderRadius:'15px',
                        height:'15px'                        

                      }}
                    onClick={()=>{
                        rescheduleApptSubmit()
                        setIsRescheduleOpen(false)
                    }}
                    >Confirm</Button>
              </div>
        </div> */}
          {/* <button onClick={activeModal}>close</button> */}
      </Modal>
      <div className={AppointmentStyles.mainContainer}>
        <div className={AppointmentStyles.columnOne}>
            <h4 className={AppointmentStyles.therapistLabel}>Your Physical Therapist</h4>
            <div className={AppointmentStyles.therapistProfile}>
                <img src={MockupPt} alt="" />
            </div>
            <h1 className={AppointmentStyles.therapistName}>PT {apptDetails.assignedTherapist}</h1>
            <p>Physical Therapy – {apptDetails.therapistSpecialization}</p>
            <p className={AppointmentStyles.therapistId}>PT-{apptDetails.therapistID}</p>
            <div className={AppointmentStyles.contactInfo}>
                <h5 className={AppointmentStyles.contactTitle}>Contact Information</h5>
                <div className='divider'></div>
                <div className={AppointmentStyles.contactItem}>
                    <FaPhoneAlt/>
                    <p>{apptDetails.therapistContactNumber}</p>
                </div>
                <div className={AppointmentStyles.contactItem}>
                    <IoIosMail/>
                    <p>{apptDetails.therapistEmail}</p>
                </div>
            </div>
        </div>
        
        <div className={AppointmentStyles.columnTwo}>
            <div className={AppointmentStyles.rowTop}>
                 <div className={AppointmentStyles.contentLeft}>
                     <div className={AppointmentStyles.contentContainer}>
                        <p className={AppointmentStyles.appointmentDataTitle}>Session ID:</p>
                        <p className={AppointmentStyles.appointmentData}>#21ABB</p>
                     </div>
                     <div>
                        <p className={AppointmentStyles.appointmentDataTitle}>Selected Branch:</p>
                        <p className={AppointmentStyles.appointmentData}>Zabarte Road Quezon City</p>
                     </div>
                     <div>
                        <p className={AppointmentStyles.appointmentDataTitle}>Payment Method:</p>
                        <p className={AppointmentStyles.appointmentData}>HMO, Maxicare</p>
                     </div>
                     <div>
                        <p className={AppointmentStyles.appointmentDataTitle}>Date & Time:</p>
                        <p className={AppointmentStyles.appointmentData}>{apptDetails.appt_date} {apptDetails.appt_start} - {apptDetails.appt_end}</p>
                     </div>
                 </div>
                 <div className={AppointmentStyles.contentRight}>
                     <div>
                        <p className={AppointmentStyles.appointmentDataTitle}>Status:</p>
                        <p className={AppointmentStyles.appointmentData}>{(apptDetails.apptStatus).toUpperCase()}</p>
                     </div>

                 </div>
            </div>
            <div className={AppointmentStyles.rowBottom}>
            <p></p>
            
            <div className={AppointmentStyles.pxComplaintContainer}>
                {/* <p className={AppointmentStyles.pxComplaint}>Hi po! I’ve been feeling some mild lower back discomfort lately, baka dahil sa matagal na upo during tapings and shoots. Also po, I had a previous ankle injury na minsan umaalalay pa rin. Hoping to get this checked po, thank you!</p> */}
                <TextField
                label="Chief Complaint"
                name="patientName"
                value={complaint}
                onChange={''}
                
                variant="outlined"
                size="small"
              />
            </div>
            <div className={AppointmentStyles.btnContainer}>

                <Button
                  variant="outlined"
                  sx={{
                    width: "50%",
                    border: "1px solid var(--primary-color)",
                    padding: "1rem",
                    backgroundColor: "transparent",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    whiteSpace: "nowrap",
                    color: "var(--primary-color)",
                    textTransform: "none",
                    borderRadius:'15px',
                  }}

                  onClick={
                    ()=>{
                        setApptUpdatePayload(prev => ({
                            ...prev,
                            apptNewStatus:'reschedule'
                        }))
                        setIsRescheduleOpen(true)
                        console.log(apptUpdatePayload)
                    }
                  }
                >
                  Reschedule Appointment
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    width: "50%",
                    border: "1px solid #E1151E",
                    padding: "1rem",
                    backgroundColor: "transparent",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    whiteSpace: "nowrap",
                    color: "#E1151E",
                    textTransform: "none",
                    borderRadius:'15px',
                  }}
                  onClick={
                    ()=>{
                        setApptUpdatePayload(prev => ({
                            ...prev,
                            apptNewStatus:'cancelled'
                        }))
                    setIsCancelOpen(true)
                    }
                  }                  
                >
                  Cancel Appointment
                </Button>

            </div>

            </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentDetails
