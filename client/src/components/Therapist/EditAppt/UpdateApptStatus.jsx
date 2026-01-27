import { useState } from 'react'
import UpdateStyles from './UpdateApptStatus.module.css'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useGetServicesList, useGetTherapists, usePatchReschedule } from '../../../queries/useEmployees'

const UpdateApptStatus = ({apptData, userData}) => {
  const {mutate} = usePatchReschedule();
  const { data: therapistData, isLoading: therapistDataIsLoading, error: therapistDataError} = useGetTherapists();
  const { data: servicesData, isLoading: servicesDataIsLoading, error: servicesDataError} = useGetServicesList();
  console.log(therapistData)
  console.log(apptData)
  const [apptStatus, setapptStatus] = useState('');
  const [apptForm, setApptForm] = useState(
    {
      apptId:apptData?.apptId || '',
      apptStatus:apptData?.apptStatus || '',
      apptTherapist: apptData?.therapistID||'',
      service:apptData?.apptService || '',
    }
  )
  
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
  
  if (therapistDataIsLoading) return <div>Loading...</div>;
  if (therapistDataError) return <div>Error: {therapistDataError.message}</div>;
  console.log(userData)
  
  return (
    <div className={UpdateStyles.container}>
        <p>Update Appointment Status</p>
        <Box component="form" onSubmit={handleSubmit} sx={{ minWidth: 120 }}>
         <FormControl sx={{ display: 'flex', gap: '1rem' }} fullWidth>
<FormControl fullWidth>
  <InputLabel id="appt-status-label">Appointment Status</InputLabel>
  <Select
    labelId="appt-status-label"
    id="appt-status-select"
    name='apptStatus'
    value={apptForm.apptStatus}
    label="Appointment Status"
    onChange={inputHandler} 
  >
    <MenuItem value={'scheduled'}>Scheduled</MenuItem>
    <MenuItem value={'approved'}>Approved</MenuItem>
    <MenuItem value={'pending'}>Pending</MenuItem>
    <MenuItem value={'cancelled'}>Cancelled</MenuItem>
    <MenuItem value={'reschedule'}>Request for Reschedule</MenuItem>
  </Select>
</FormControl>
{/* Change Therapist */}
<FormControl fullWidth>
  <InputLabel id="therapist-action-label">Assigned Therapist</InputLabel>
  
  <Select
    disabled={userData.userRoleId === 3}
    labelId="therapist-action-label"
    id="therapist-action-select"
    name='apptTherapist'
    value={apptForm.apptTherapist}
    label="Change Therapist"
    onChange={inputHandler}
  >
 {therapistData.map((t)=>(
    <MenuItem key={t.therapistEmployeeId} value={t.therapistEmployeeId}>{t.therapistName}</MenuItem>
  ))}
  </Select>
</FormControl>

<FormControl fullWidth>
  <InputLabel id="service-action-label">Select Patient Treatment</InputLabel>
  <Select
  disabled={userData.userRoleId === 4}
    labelId="service-action-label"
    id="service-action-select"
    name='service'
    value={apptForm.service}
    label="Select Patient Treatment"
    onChange={inputHandler}
  >
 {servicesData.map((s)=>(
    <MenuItem key={s.serviceID} value={s.serviceID}>{s.serviceName}</MenuItem>
  ))}
  </Select>
</FormControl>

            <Button type='submit' sx={{ borderRadius:'10px', boxShadow:'none'}}variant="contained">Update Status</Button>
          </FormControl>
        </Box>
    </div>
  )
}
export default UpdateApptStatus