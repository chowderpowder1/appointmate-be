import React from 'react'
import ReportStyles from './ReportsPage.module.css'
import CircularStepper from '../../components/PatientPortal/CircularStepper'
import { PiNoteFill } from "react-icons/pi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { useState, useEffect } from 'react';
import {useGetSessionData} from '../../queries/useEmployees'
import {useGetMySessionIds} from '../../queries/users.js'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import dayjs from "dayjs";
const ReportsPage = () => {
    const [selectedSessionId, setSelectedSessionId] = useState('')
    const [currentSessionData, setCurrentSessionData] = useState('')
  
    const { data: sessionData, isLoading: sessionDataIsLoading, error: sessionDataError } = useGetSessionData(selectedSessionId);
  
      const {data: sessionIds, isLoading: sessionIdsIsLoading, error: sessionIdsError} = useGetMySessionIds();

useEffect(() => {
  if(selectedSessionId){
  if (!Array.isArray(sessionData.sessionResult)){
    console.log('run')
    return;
  } 

  setCurrentSessionData(sessionData.sessionResult.find(
    session => session.session_id === selectedSessionId
  ))

  // setCurrentSessionData(foundSession || null);
  }
  
}, [sessionData, selectedSessionId]);

  // const sessionHere= sessionData?.sessionResult
  console.log(currentSessionData)
          if (sessionDataIsLoading) return <div>Loading...</div>;
  if (sessionDataError ) return <div>Error: {myAppointmentsDataError.message}</div>;

  return (
    <div className={ReportStyles.reportContainer}>
      {/* Column One */}
      <div className={ReportStyles.columnOne}>
        
        <div className={ReportStyles.reportDownloadableContainer}>
            <h1 className={ReportStyles.reportTitle}>View session Details:</h1>
            <div className={ReportStyles.reportTable}>
               
               <FormControl>
                     <InputLabel labelId="status-label" id="status-label">Select a Session</InputLabel>
                     
                     <Select
                     sx={{
                       width:'250px',
                       '& .MuiOutlinedInput-notchedOutline': {
                       borderRadius: '52px',
                       }
                     }}
                       labelId="status-label"
                       id="status-select"
                       // value={status}
                       label="Select a Session"
                       onChange={(e)=> {
                        setSelectedSessionId(e.target.value)
                        
                       }}
                     >
{  (() => {
    const seen = new Set();
    return sessionIds?.sessions
      .filter(s => {
        if (seen.has(s.session_id)) return false; // skip duplicate
        seen.add(s.session_id);
        return true;
      })
      .map(s => (
        <MenuItem key={s.session_id} value={s.session_id}>
          Session-{s.session_id.slice(0, 5)}
        </MenuItem>
      ));
  })()
}                      
                  </Select>
                </FormControl>
            </div>
        </div>
      </div>

      {/* Column Two */}
      <div className={ReportStyles.columnTwo}>
        <div className={ReportStyles.sessionTitleContainer}>
          <h1 className={ReportStyles.sessionTitle}>MarianoB_PT-Session1</h1>
          <div className={ReportStyles.sessionStatusIndicator}>Done</div>
        </div>
        <div className={ReportStyles.sessionDataContainer}>
          <div>
            <p className={ReportStyles.sessionDataTitle}>Date of Session: {dayjs(currentSessionData?.updated_at).format('MMMM DD, YYYY')}</p>
            <p className={ReportStyles.sessionDataTitle}>Time/Duration: {dayjs(currentSessionData?.updated_at)
  .format("h:mm A")}</p>
          </div>
          <div>
            <p className={ReportStyles.sessionDataTitle}>Session Number: {currentSessionData?.session_num}</p>
          </div>
        </div>
        <div className="divider"></div>
        <div className={ReportStyles.sessionDataContainer}>
          <p className={ReportStyles.sessionDataTitle}>Subjective:</p>
          <p>{currentSessionData?.subjective}</p>
        </div>
        <div className="divider"></div>
        <div className={ReportStyles.sessionDataContainer}>
          <p className={ReportStyles.sessionDataTitle}>Objective:</p>
          <p>{currentSessionData?.objective}</p>
        </div>
        <div className="divider"></div>
        <div className={ReportStyles.sessionDataContainer}>
          <p className={ReportStyles.sessionDataTitle}>Assessment:</p>
          <p>{currentSessionData?.assessment}</p>
        </div>
        <div className="divider"></div>
        <div className={ReportStyles.sessionDataContainer}>
          <p className={ReportStyles.sessionDataTitle}>Plan:</p>
          <p>{currentSessionData?.plan}</p>
        </div>
        <div className="divider"></div>
        <div className={ReportStyles.sessionDataContainer}>
          <div>
            <p className={ReportStyles.sessionDataTitle}>Comments:</p>
            <p>{currentSessionData?.comment}</p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage
