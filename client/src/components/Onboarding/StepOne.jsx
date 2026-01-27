import { React, useRef, useContext, useState } from 'react'

import OneStyles from './StepOne.module.css'
import TextField from '@mui/material/TextField';
import { FaCamera } from "react-icons/fa";

// Mui radio button dependencies
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import {useAppContext} from './AppContext.jsx'

// axios
import { useUsers } from '../../queries/users.js'

const StepOne = () => {

    const {data : userData, isLoading: userDataIsLoading, error: userDataError} = useUsers();
    const {formData, setFormData} = useAppContext();
    const [religion, setReligion] = useState('');
    const fileInputRef = useRef();
    const [tempDob, setTempDob] = useState();
    const handleClick = () => {
        fileInputRef.current.click();
    }

    const handleInputChange = (section) => (e) => {
        console.log(e.target);
        const { name, value} = e.target;

        setFormData( prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [name]: value
        }}))  
        console.log(formData);
    }

    // const handleDateInput => (e) {
    //     setFormData( prev => ({

    //     }))
    // }

    const handleChange = (e) => {
    const file = e.target.files[0]
    console.log('Selected file:', file)
    }

    if (userDataIsLoading) return <div>Loading...</div>;
    if (userDataError) return <div>Error: {error.message}</div>;

  return (
    <div className={OneStyles.container}>

        <div className={OneStyles.leftContainer}>
            <h1 className={OneStyles.header}>Personal Information</h1>
            <Box display='flex' sx={{gap:'1rem'}}>
                <TextField slotProps={{input: {readOnly: true,}}} onChange={handleInputChange('personalInfo')} value={userData.firstName} id="outlined-basic" name="firstName" label="First Name" variant="outlined" />
                <TextField slotProps={{input: {readOnly: true,}}} onChange={handleInputChange('personalInfo')} value={userData.lastName} id="outlined-basic" name="lastName" label="Last Name" variant="outlined" />
                <TextField slotProps={{input: {readOnly: userData.contact_number ? true : false }}} onChange={handleInputChange('contactInfo')} value={userData.contact_number} id="outlined-basic" name="contactNumber" label="Contact Number" variant="outlined" />

            </Box>

            <Box display='flex' sx={{gap:'1rem'}}>
                <TextField onChange={handleInputChange('personalInfo')} value={formData.personalInfo.middleName} id="outlined-basic" name="middleName" label="Middle Initial" variant="outlined" 
                  slotProps={{
                  input: {
                    inputProps: {
                      maxLength: 1
                    }
                  }
                }}
                />
                {/* <TextField id="outlined-basic" label="Age" variant="outlined" /> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    onChange={(newVal) => {handleInputChange('personalInfo')({
                        target: {name: 'dob', value: newVal}
                    })}}    
                    value={formData.personalInfo.dob ? dayjs(formData.personalInfo.dob) : null}
                    name="dob"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                    maxDate={dayjs()} // prevents selecting future dates
                  />
                </LocalizationProvider>
            </Box>

            <h1 className={OneStyles.header}>Company Information</h1>
            <TextField onChange={handleInputChange('contactInfo')} id="outlined-basic" value={formData.contactInfo.employer} label="Enter your Company" variant="outlined" name="employer" />

            <h1 className={OneStyles.header}>Religion</h1> 
             <TextField name='religion' value={formData.contactInfo.religion} onChange={handleInputChange('contactInfo')} required id="outlined-required" label="Religion" fullWidth/>
        </div>

        <div className={OneStyles.rightContainer}>
            {/* <div className={OneStyles.uploadPhotoContainer}>
                    <FaCamera onClick={handleClick} className={OneStyles.icon}/>
                    <label className={OneStyles.upload} htmlFor="">
                        <input  ref={fileInputRef} type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
                    </label>
                    
            </div>
            <p>Add Photo</p> */}
                <FormControl
                  sx={{ 
                      alignSelf: 'flex-end',
                      marginTop: 'auto'
                    }}>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup row
                        name='gender'
                        value={formData.personalInfo.gender}
                        onChange={handleInputChange('personalInfo')}
                    >
                        <FormControlLabel value='female' control={<Radio/>} label='Female'></FormControlLabel>
                        <FormControlLabel value='male' control={<Radio/>} label='Male'></FormControlLabel>
                    </RadioGroup>
                </FormControl>
        </div>
    </div>
  )
}

export default StepOne
