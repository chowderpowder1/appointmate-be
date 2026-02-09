import { useState } from 'react'
import CreateServiceStyles from './CreateServicePlan.module.css'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useGetServicesList, useGetTherapists, usePatchReschedule } from '../../../queries/useEmployees'

import CreateServiceModal from './CreateServiceModal';
import Modal from '../../Ui/Modal'

const CreateServicePlan = ({apptData, userData}) => {
  
  // Modal state control :DDDDDD meow meow meow
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);

  const {mutate} = usePatchReschedule();
  const { data: therapistData, isLoading: therapistDataIsLoading, error: therapistDataError} = useGetTherapists();
  const { data: servicesData, isLoading: servicesDataIsLoading, error: servicesDataError} = useGetServicesList();

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
  
  if (therapistDataIsLoading) return <div>Loading...</div>;
  if (therapistDataError) return <div>Error: {therapistDataError.message}</div>;
  console.log(apptData)
  return (
    <div className={CreateServiceStyles.container}>
        <p className={CreateServiceStyles.headerText} style={{color:''}}>New Service Plan</p>
        <p>No existing service plan?</p>
          <Button onClick={() => handleOpenModal(true)} sx={{ borderRadius:'10px', boxShadow:'none'}}variant="contained"> Create service plan</Button>
        <Box component="form" onSubmit={handleSubmit} sx={{ minWidth: 120 }}>
         <FormControl sx={{ display: 'flex', gap: '1rem' }} fullWidth>

          </FormControl>
        </Box>

        <Modal  open={isOpen} onClose={() => setIsOpen(false)}>
          <CreateServiceModal patientData={apptData}/>
        </Modal>
    </div>
  )
}
export default CreateServicePlan