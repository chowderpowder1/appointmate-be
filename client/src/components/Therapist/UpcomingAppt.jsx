import {React, useEffect, useState} from 'react'
import UpcomingStyles from './UpcomingAppt.module.css'
import MockPxPhoto from '../../assets/mockPx.jpg'
import { FiExternalLink } from "react-icons/fi";
import { Link } from 'react-router'
import { useGetAllUpcomingAppts } from '../../queries/useEmployees'
import altPhoto from '../../assets/aw_mock-px.png'
import { Button } from '@mui/material';
import Pagination from '../../features/Pagination';

const UpcomingAppt = () => {
  const { data: upcomingApptData, isLoading: upcomingApptDataIsLoading, error: upcomingApptDataError} = useGetAllUpcomingAppts();
    const [rowData, setRowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ postsPerPage, setPostsPerPage] = useState(5);

  
  console.log(upcomingApptData)

     useEffect(() => {
    if (upcomingApptData) {
    setRowData(upcomingApptData)
    }
  }),[upcomingApptData]

      const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = rowData?.slice(firstPostIndex, lastPostIndex);
  
      console.log(upcomingApptData)
      
    if (upcomingApptDataIsLoading) return <div>Loading...</div>;
    if (upcomingApptDataError) return <div>Error: {upcomingApptDataError.message}</div>;
  return (
    <div className={UpcomingStyles.container}>
      <h3 className={UpcomingStyles.header}>Upcoming Appointments</h3>
      <div className={UpcomingStyles.table}>
        {currentPosts.map((u)=>(
          <div className={UpcomingStyles.row}>
          <div className={UpcomingStyles.rowsubContainer}>
            <div className={UpcomingStyles.pxPhotoContainer}>
              {u.patientAvatar ? <img className={UpcomingStyles.pxPhoto} src={u?.patientAvatar || altPhoto } alt="" /> : <div className={UpcomingStyles.generateAvatar}>{u.patientName.slice(0,1).toUpperCase()}</div> }
              
            </div>
            <div className={UpcomingStyles.apptDetailsContainer}>
              <p className={UpcomingStyles.pxName}>{u.patientName.slice(0,1).toUpperCase() + u.patientName.slice(1)}</p>
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

        <div className={UpcomingStyles.paginationContainer}>
          <Pagination
              totalPosts={rowData?.length || 0}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
          />
        </div>   

      </div>
    </div>
  )
}

export default UpcomingAppt
