import { useState } from 'react'
import UpdateStyles from './UpdateServicePlan.module.css'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormHelperText } from '@mui/material';
import {useGetServicesList, useGetTherapists, usePatchReschedule, useGetApptServicePlan, useGetPatientSessions, useAssignApptSession} from '../../../queries/useEmployees'

import Modal from '../../../components/Ui/Modal'

const UpdateServicePlan = ({apptData, userData, serviceData}) => {
  const {mutate: submitNewApptSession} = useAssignApptSession();
  // Modal state control :DDDDDD meow meow meow
  const [selectedSessionId, setSelectedSessionId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);
  const {mutate} = usePatchReschedule();
  console.log(apptData)
  const { data: therapistData, isLoading: therapistDataIsLoading, error: therapistDataError} = useGetTherapists();
  
  const { data: patientSessions, isLoading: patientSessionsIsLoading, error: patientSessionsDataError} = useGetPatientSessions(apptData?.patientID);

  const { data: servicesData, isLoading: servicesDataIsLoading, error: servicesDataError} = useGetServicesList();

  const { data: apptServiceData, isLoading: apptServiceDataIsLoading, error: apptServiceDataError} = useGetApptServicePlan(apptData?.apptId);

  const [apptStatus, setapptStatus] = useState('');
  const [apptForm, setApptForm] = useState(
    {
      apptId:apptData?.apptId || '',
      apptStatus:apptData?.apptStatus || '',
      apptTherapist: apptData?.therapistID||'',
      service:apptData?.apptService || '',
    }
  )
  
  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsOpen(true);  
  }

  const handleChange = (status) => {
    setapptStatus(status.target.value);
  };
  
  const inputHandler = (e) => {
    const {name, value} = e.target;
    setApptForm( prev => ({
      ...prev, 
      [name] : value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(apptForm, {
      onSuccess: (data) => {
        console.log('Update successful:', data);
        // Optional: Add success notification or redirect
      },
      onError: (error) => {
        console.error('Update failed:', error);
        // Optional: Add error notification
      }
    });
  }
  
  if (therapistDataIsLoading || apptServiceDataIsLoading || patientSessionsIsLoading ) return <div>Loading...</div>;
  if (therapistDataError || apptServiceDataError || patientSessionsDataError) return <div>Error: {therapistDataError.message}</div>;

  console.log(patientSessions.sessions)
  console.log(apptData)
             console.log(selectedSessionId)

  return (
    <div className={UpdateStyles.container}>
        <p className={UpdateStyles.headerText} style={{color:''}}>Patient Service Plan</p>

        <Box component="form"  sx={{ minWidth: 120 }}>
         <FormControl sx={{ display: 'flex', gap: '1rem' }} fullWidth>
<FormControl fullWidth>
  <InputLabel id="appt-status-label">Assign to a Service plan</InputLabel>
  <Select
    labelId="appt-status-label"
    id="appt-status-select"
    name='apptStatus'
    value={selectedSessionId}
    // error='true'
    // {apptForm.apptStatus}
    disabled={serviceData.sessionId}
    label="Is this the 1st Appointment?"
    onChange={(e)=>{
      
      setSelectedSessionId(e.target.value)
    }} 
    error={serviceData.sessionId ? true : false}
  >
    { patientSessions.sessions.map((p)=> (
      <MenuItem key={p.session_id} value={p.session_id}>Session_{p.session_id.slice(0,5)}</MenuItem>
    ))}
  
  </Select>
{serviceData.sessionId && <FormHelperText>Appointment already assigned</FormHelperText>}
</FormControl>
{/* Change Therapist */}



          

            <Button onClick={(e)=>{
           e.preventDefault();
          submitNewApptSession({selectedSessionId, apptData},
            {
                onSuccess: (data) => {
                    console.log('SUCCESS:', data);
                    toast.success('Session assigned!');
                },
                onError: (error) => {
                    console.log('ERROR:', error);
                    console.log('Error response:', error.response?.data);
                    toast.error('Failed to assign session');
                }})
        }}
        sx={{ borderRadius:'10px', boxShadow:'none'}}variant="contained"

            disabled={!selectedSessionId}
            >Submit</Button>
          </FormControl>
        </Box>

        <Modal  open={isOpen} onClose={() => setIsOpen(false)}>
          <div className={UpdateStyles.newServiceContainer}>
            <h1>This is a modal</h1>
          </div>
          
        </Modal>
    </div>
  )
}
export default UpdateServicePlan