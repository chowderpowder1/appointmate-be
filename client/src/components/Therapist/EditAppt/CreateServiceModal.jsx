import {React, useState} from 'react'
import createStyles from './CreateServiceModal.module.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FaFileCirclePlus } from "react-icons/fa6";
import {useGetServicesList, useGetNoServicePlan, usePostServicePlan } from '../../../queries/useEmployees'
import { FaUserInjured } from "react-icons/fa";
import { LuBookPlus } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateServiceModal = ({patientData}) => {
    const { mutate: mutateServicePlan } = usePostServicePlan();
    const { data: servicesData, isLoading: servicesDataIsLoading, error:  servicesDataError} = useGetServicesList();

    const { data: noServicePlanData, isLoading: noServicePlanDataLoading, error:  noServicePlanDataError} = useGetNoServicePlan(patientData.patientID);

    const [servicePlansForms, setServicePlansForms] = useState({
        patient_id:patientData?.patientID || '',
        appointment_id:patientData?.apptId || '',
        treatment_plan:'',
        session_number:servicesData. serviceTotalSessions || '',
    })
    console.log(patientData?.patientID)
    const inputHandler = (e) => {
        const {name, value} = e.target;
        if(name=='treatment_plan'){
            console.log(value)
            const test = servicesData.find((service) => service.serviceID === value)
            setServicePlansForms(prev => ({
                ...prev,
                session_number : test.serviceTotalSessions
            }))
        }
        setServicePlansForms( prev => ({
            ...prev,
            [name] : value
        }))

    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        mutateServicePlan(servicePlansForms,{
            onSuccess: (data) => {
                console.log('Request Successful')
                if(data.success){
                    toast.success(data.message || 'Service plan successfully created.')
                }else{
                    toast.error(data.message || 'There was an problem with your request.')
                }

            },
            onError:(error) => {
                toast.error(data.message)
            }
        });
    } 

    if (servicesDataIsLoading || noServicePlanDataLoading) return <div>Loading...</div>;
    if (servicesDataError || noServicePlanDataError) return <div>Error: {servicesDataError.message}</div>;

    console.log(patientData)
  return (
    <div className={createStyles.newServiceContainer}>
        <div className={createStyles.headerContainer}>
            <FaFileCirclePlus/>
            <h4 className={createStyles.newServiceHeader}>Create Service Plan</h4>
        </div>
      <div className={createStyles.pxDataContainer}>
        <FaUserInjured className={createStyles.icon}/>
          <p>Patient: {patientData?.patientFName 
            || ''} {patientData?.patientLName|| ''}</p>
      </div>
{/* Only renders if appt data is missing which is the case when opened from service plans dashboard. */}
{!patientData ? <FormControl fullWidth>
  <InputLabel id="appointment-action-label">Select an appointment</InputLabel>
  <Select
    labelId="appointment-action-label"
    id="appointmentaction-select"
    name='appointment'
    value={patientData.apptId}
    label="Select Patient Treatment"
    // onChange={inputHandler}
  >
 {servicesData.map((s)=>(
    <MenuItem key={s.serviceID} value={s.serviceID}>{s.serviceName}</MenuItem>
  ))}
  </Select>
</FormControl> :

 <div className={createStyles.pxDataContainer}>
        <LuBookPlus className={createStyles.icon}/>
          <p>Appointment ID: {patientData?.apptId 
            || ''}</p>
      </div>
}

<FormControl fullWidth>
  <InputLabel id="service-action-label">Select Patient Treatment</InputLabel>
  <Select
    labelId="service-action-label"
    id="service-action-select"
    name='treatment_plan'
    value={servicePlansForms.treatment_plan}
    label="Select Patient Treatment"
    onChange={inputHandler}
  >
 {servicesData.map((s)=>(
    <MenuItem key={s.serviceID} value={s.serviceID}>{s.serviceName}</MenuItem>
  ))}
  </Select>
</FormControl>

<TextField
  label="Number of sessions"
  helperText='Recommended number of sessions. You can add more later!'
  value={servicePlansForms.session_number}
  name='session_number'
  onChange={(e) => {
    const v = e.target.value;
    if (/^\d*$/.test(v)) {
      inputHandler(e);
    }
    // inputHandler(e)
  }}
  inputProps={{
    inputMode: 'numeric',
    pattern: '[0-9]*',
  }}
/>
        <Button onClick={handleOnSubmit} sx={{ borderRadius:'10px', boxShadow:'none', fontWeight:'600'}}variant="contained"> Create service plan</Button>

        {/* <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"

        /> */}

    </div>      
  )
}

export default CreateServiceModal
