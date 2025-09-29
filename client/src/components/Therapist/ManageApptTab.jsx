import React from 'react'
import { Link } from 'react-router'
import ManageStyles from './ManageApptTab.module.css'
import MockPxPhoto from '../../assets/mockPx.jpg'
import { FaEye } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";

const ManageAppt = () => {
    const mockAppointments = [
  {
    patientName: "Sarah Johnson",
    date: "15 September 2025",
    time: "2:30 PM",
    therapist: "Dr. Maria Rodriguez",
    payment: "Cash Basis",
    apptId: 1
  },
  {
    patientName: "Michael Chen",
    date: "15 September 2025",
    time: "3:45 PM",
    therapist: "Dr. James Wilson",
    payment: "HMO",
    apptId: 2
  },
  {
    patientName: "Emma Davis",
    date: "16 September 2025",
    time: "10:00 AM",
    therapist: "Dr. Lisa Thompson",
    payment: "HMO",
    apptId: 3
  },
  {
    patientName: "Robert Martinez",
    date: "16 September 2025",
    time: "1:15 PM",
    therapist: "Dr. Maria Rodriguez",
    payment: "Cash Basis",
    apptId: 4
  },
  {
    patientName: "Jennifer Wong",
    date: "17 September 2025",
    time: "9:30 AM",
    therapist: "Dr. James Wilson",
    payment: "HMO",
    apptId: 5
  }
];

  return (
    <div className={ManageStyles.container}>

        <div className={ManageStyles.apptDashboard}>
            <h2>ALL APPOINTMENTS</h2>
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

                {mockAppointments.map((data, index)=>(
                    <div className={ManageStyles.apptDataRow}>
                        <span className={ManageStyles.pxDataItem}>
                        <div className={ManageStyles.pxPhotoContainer}>
                            <img src={MockPxPhoto} className={ManageStyles.pxPhoto} alt="" />
                        </div>
                            <div className={ManageStyles.pxDataText}>
                                <p>{data.patientName}</p>
                                <p>#A2023141814</p>
                            </div>
                        </span>
                        <span>January 5</span>
                        <span>9:30AM</span>
                        <span>Meowtoo</span>
                        <span>Cash</span>
                        <span>Ongoing</span>
                        <span className={ManageStyles.actionBtnsContainer}>
                            <span className={ManageStyles.viewBtn}>
                              <FaEye className={ManageStyles.icon}/>
                            </span>
                            <span className={ManageStyles.editBtn}>
                              <Link to={`edit-appointment/${data.apptId}`}>
                                  <MdEditDocument className={ManageStyles.icon}/>
                              </Link>
                            </span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ManageAppt
