import { useState } from 'react'
import UpdateStyles from './UpdateServicePlan.module.css'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useGetServicesList, useGetTherapists, usePatchReschedule, useGetApptServicePlan} from '../../../queries/useEmployees'

import Modal from '../../../components/Ui/Modal'

const UpdateServicePlan = ({apptData, userData}) => {

  // Modal state control :DDDDDD meow meow meow
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);
  const {mutate} = usePatchReschedule();
  const { data: therapistData, isLoading: therapistDataIsLoading, error: therapistDataError} = useGetTherapists();
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
  
  if (therapistDataIsLoading || apptServiceDataIsLoading ) return <div>Loading...</div>;
  if (therapistDataError || apptServiceDataError) return <div>Error: {therapistDataError.message}</div>;
  console.log(apptServiceData)
  console.log(Array.isArray(apptServiceData))
  
  return (
    <div className={UpdateStyles.container}>
        <p className={UpdateStyles.headerText} style={{color:''}}>Patient Service Plan</p>
        {!Array.isArray(apptServiceData) ? <p>Patient has no ongoing service plan</p>: ''}

        <Box component="form" onSubmit={handleSubmit} sx={{ minWidth: 120 }}>
         <FormControl sx={{ display: 'flex', gap: '1rem' }} fullWidth>
<FormControl fullWidth>
  <InputLabel id="appt-status-label">Assign to a Service plan</InputLabel>
  <Select
    labelId="appt-status-label"
    id="appt-status-select"
    name='apptStatus'
    // value='Session ID: 85684'
    // error='true'
    // {apptForm.apptStatus}
    disabled={!Array.isArray(apptServiceData)}
    label="Is this the 1st Appointment?"
    onChange={inputHandler} 
  >
    {Array.isArray(apptServiceData) ?( apptServiceData.map((p)=> (
      <MenuItem key={p.sessionId} value={p.sessionId}>{p.sessionId}</MenuItem>
    ))):
      <MenuItem disabled></MenuItem>
  }
{/*     
    <MenuItem value={'approved'}>Approved</MenuItem>
    <MenuItem value={'pending'}>Pending</MenuItem>
    <MenuItem value={'cancelled'}>Cancelled</MenuItem>
    <MenuItem value={'reschedule'}>Request for Reschedule</MenuItem> */}
  </Select>

</FormControl>
{/* Change Therapist */}



          

            <Button type='submit' sx={{ borderRadius:'10px', boxShadow:'none'}}variant="contained"
            disabled={!Array.isArray(apptServiceData)}
            >Submit Changes</Button>
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