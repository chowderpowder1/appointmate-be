import React from 'react'
import UpcomingStyles from './UpcomingAppt.module.css'
import MockPxPhoto from '../../assets/mockPx.jpg'
import { FiExternalLink } from "react-icons/fi";
import { Link } from 'react-router'
import { useGetAllUpcomingAppts } from '../../queries/useEmployees'
import altPhoto from '../../assets/aw_mock-px.png'
import { Button } from '@mui/material';


const UpcomingAppt = () => {
  const { data: upcomingApptData, isLoading: upcomingApptDataIsLoading, error: upcomingApptDataError} = useGetAllUpcomingAppts();
  
    if (upcomingApptDataIsLoading) return <div>Loading...</div>;
    if (upcomingApptDataError) return <div>Error: {upcomingApptDataError.message}</div>;

    console.log(upcomingApptData)
  return (
    <div className={UpcomingStyles.container}>
      <h3 className={UpcomingStyles.header}>Upcoming Appointments</h3>
      <div className={UpcomingStyles.table}>
        {upcomingApptData.map((u)=>(
          <div className={UpcomingStyles.row}>
          <div className={UpcomingStyles.rowsubContainer}>
            <div className={UpcomingStyles.pxPhotoContainer}>
              <img className={UpcomingStyles.pxPhoto} src={u?.patientAvatar || altPhoto } alt="" />
            </div>
            <div className={UpcomingStyles.apptDetailsContainer}>
              <p className={UpcomingStyles.pxName}>{u.patientName}</p>
              <div className={UpcomingStyles.apptDetails}>
                <p className={UpcomingStyles.apptDate}>{u.appt_date}</p>
                <p className={UpcomingStyles.apptTime}>{u.appt_start} - {u.appt_end}</p>
              </div>
            </div>
          </div>
            <Link to={`/front-desk/manage-appointments/edit-appointment/${u.appt_id}`}>                            
              <Button variant='contained' > 
                View Patient Record
              </Button>
            </Link>
            
        </div>
        ))}
        


        {/* <div className={UpcomingStyles.row}>
          <div className={UpcomingStyles.rowsubContainer}>
            <div className={UpcomingStyles.pxPhotoContainer}>
              <img className={UpcomingStyles.pxPhoto} src={MockPxPhoto} alt="" />
            </div>
            <div className={UpcomingStyles.apptDetailsContainer}>
              <p className={UpcomingStyles.pxName}>Maya Angelou</p>
              <div className={UpcomingStyles.apptDetails}>
                <p className={UpcomingStyles.apptDate}>Monday, May 22, 2025</p>
                <p className={UpcomingStyles.apptTime}>9:30AM</p>
              </div>
            </div>
          </div>

          <button className={UpcomingStyles.apptBtn}>
            <FiExternalLink className={UpcomingStyles.linkIcon}/>
            <p>Patient Record</p>
          </button>
        </div> */}


      </div>
    </div>
  )
}

export default UpcomingAppt
