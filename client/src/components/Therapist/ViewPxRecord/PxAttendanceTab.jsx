import React from 'react'
import AttendanceStyles from './PxAttendanceTab.module.css'
const PxAttendanceTab = () => {
  return (
    <div className={AttendanceStyles.container}>
      <h1 className={AttendanceStyles.header}>Session Attendace</h1>
      {/* <table className={AttendanceStyles.tbl}>
        <thead>
          <tr>
            <th> Date of Attendance</th>
            <th> Date of Approval</th>
            <th> Notes</th>
          </tr>
        </thead> */}
         <div className={AttendanceStyles.tblContainer}>
           <table className={AttendanceStyles.tbl}>
            <thead className={AttendanceStyles.tblHead}>
                <tr>
                  <th className={AttendanceStyles.tblHeader}>DATE OF ATTENDANCE</th>
                  <th className={AttendanceStyles.tblHeader}>DATE OF APPROVAL</th>
                  <th className={AttendanceStyles.tblHeader}>NOTES</th>
                </tr>
            </thead>
            <tbody className={AttendanceStyles.tblBody}>
                <tr>
                  <td className={AttendanceStyles.tblData}>P-01</td>
                  <td className={AttendanceStyles.tblData}>Marian Rivera</td>
                  <td className={AttendanceStyles.tblData}>Zabarte</td>
                </tr>
                <tr>
                  <td className={AttendanceStyles.tblData}>P-01</td>
                  <td className={AttendanceStyles.tblData}>Marian Rivera</td>
                  <td className={AttendanceStyles.tblData}>Zabarte</td>
                </tr>
            </tbody>
                 </table>
         </div>
    </div>
  )
}

export default PxAttendanceTab
