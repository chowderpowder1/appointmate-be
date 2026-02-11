import {React, useState, useEffect} from 'react'
import { Link } from 'react-router'
import ManageStyles from './ManageApptTab.module.css'
import MockPxPhoto from '../../assets/aw_mock-px.png'
import { FaEye } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { Button } from '@mui/material';
import { useGetAllAppt, useUpdateApptStatus } from '../../queries/useEmployees' 
import Pagination from '../../features/Pagination.jsx'

import {useGetAvatar} from '../../queries/users.js'

import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
const TestTable = () => {

  const {mutate: updateApptStatus } = useUpdateApptStatus();
  const { data: allApptData, isLoading: allAptDataIsLoading, error: allAptDataError} = useGetAllAppt();
  console.log(allApptData)
  const apptData = allApptData?.allActiveAppt
  const columns = [
    {
      accessorKey: 'patient_name',
      header: "Patient Name",
      cell: (props) => <p>{props.getValue}</p>
    },
    {
      accessorKey: 'appt_date',
      header: "Date",
      cell: (props) => <p>{props.getValue}</p>
    },
    {
      accessorKey: 'appt_start',
      header: "Time",
      cell: (props) => <p>{props.getValue}</p>
    },
    {
      accessorKey: 'therapist_name',
      header: "Therapist",
      cell: (props) => <p>{props.getValue}</p>
    },
    {
      accessorKey: 'mode_of_payment',
      header: "Payment",
      cell: (props) => <p>{props.getValue}</p>
    },
    {
      accessorKey: 'appt_status',
      header: "Status",
      cell: (props) => <p>{props.getValue}</p>
    },
    {
      accessorKey: 'patient_name',
      header: "Action",
      cell: (props) => <p>{props.getValue}</p>
    },
  ]
    const table = useReactTable({
    apptData,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const [rowData, setRowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ postsPerPage, setPostsPerPage] = useState(10);

 
  const apptStatusHandler = (status) =>{
    updateApptStatus({
      appt_id: status,
      appt_status: 'scheduled'
    })
  }

    const getApptStatusIndicator = (status) => {
    switch (status) {
      case 'pending':
        return {"background-color":'orange'};
      case 'scheduled':
        return {"background-color":'#388E3C'};
      case 'completed':
        return {"background-color":'#1976D5'};
      case 'approved':
        return {"background-color":'#388E3C'};
      case 'cancelled':   
      return {"background-color":'#D32F2F'};
    }
  }

  useEffect(() => {
    if (allApptData?.allActiveAppt) {
    setRowData(allApptData.allActiveAppt)
    }
  }),[allApptData]

  if (allAptDataIsLoading ) return <div>Loading...</div>;
  if (allAptDataError) return <div>Error: {allAptDataError.message}</div>
  

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = rowData?.slice(firstPostIndex, lastPostIndex);
  
  return (
    <div className={ManageStyles.container}>

        <div className={ManageStyles.apptDashboard}>
            <h2 style={{color:'#454545'}}>ALL APPOINTMENTS</h2>
            <div className={ManageStyles.apptListContainer}>
                <div className={ManageStyles.apptDataHeader}>
                    <span><p>Patient Name</p></span>
                    <span>Date</span>
                    <span>Time</span>
                    <span>Therapist</span>
                    <span>Payment</span>
                    <span>Status</span>
                    <span>Action</span>
                </div>

                {currentPosts?.map((data, index)=>(
                    <div key={data.appt_id} className={ManageStyles.apptDataRow}>
                        <span className={ManageStyles.pxDataItem}>
                        <div className={ManageStyles.pxPhotoContainer}>
                          {data.userAvatar ?  <img src={data?.userAvatar} className={ManageStyles.pxPhoto} alt="" /> : <div className={ManageStyles.generatedProfile}>{data?.patient_name.slice(0,1).toUpperCase()} </div>}
                           
                        </div>
                            <div className={ManageStyles.pxDataText}>
                                <p>{data.patient_name.slice(0,1).toUpperCase() + data.patient_name.slice(1)}</p>
                                <p className={ManageStyles.pxIdText}>Patient ID: {data.patient_id}</p>
                            </div>
                        </span>
                        <span>{data.appt_date}</span>
                        <span>{data.appt_start}</span>
                        <span className={ManageStyles.therapistContainer}>
                          <div className={ManageStyles.pxPhotoContainer}>
                            <img src={MockPxPhoto} className={ManageStyles.pxPhoto} alt="" />
                        </div>
                          <p>PT {data.therapist_name.slice(0,1).toUpperCase() + data.therapist_name.slice(1)}</p>
                        </span>
                        <span>{data?.mode_of_payment || 'N/A' }</span>
                        <span className={ManageStyles.apptStatusIndicator}>
                          {/* Commented out code below places a circle indicator */}
                          <div className={ManageStyles.circleStatusIndicator} style={getApptStatusIndicator(data.appt_status)}></div>
                          {data.appt_status.toUpperCase()}
                        </span>
                        <span className={ManageStyles.actionBtnsContainer}>
                            {/* <span className={ManageStyles.viewBtn}>
                              <FaEye className={ManageStyles.icon}/>
                            </span> */}
                            <Button disabled={ data.appt_status === 'completed' || data.appt_status === 'scheduled' || data.appt_status === 'approved' || data.appt_status === 'cancelled' } onClick={()=> apptStatusHandler(data.appt_id)}
                            variant='contained' > Approve
                            </Button>

                            {/* // onClick={handleSaveProfile} 
                            // disabled={loading}>{loading ? 'Saving...' : 'Save Profile'} */}
                            <Link to={`edit-appointment/${data.appt_id}`}>                            
                              <Button variant='contained' > 
                                View
                              </Button>
                            </Link>

                        </span>
                    </div>
                ))}
            </div>
        </div>
        <div className={ManageStyles.paginationContainer}>
          <Pagination
              totalPosts={rowData?.length || 0}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
          />
        </div>   
      </div>
  )
}

export default TestTable
