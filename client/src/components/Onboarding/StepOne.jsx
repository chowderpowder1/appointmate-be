import { React, useRef, useContext } from 'react'

import OneStyles from './StepOne.module.css'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { FaCamera } from "react-icons/fa";

// Mui radio button dependencies
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const StepOne = () => {

    const { formData, updateFormData } = useStepperContext();
    const fileInputRef = useRef();

    const handleClick = () => {
        fileInputRef.current.click();
    }

    const handleChange = (e) => {
    const file = e.target.files[0]
    console.log('Selected file:', file)
    }
  return (
    <div className={OneStyles.container}>
        <div className={OneStyles.leftContainer}>
            <h1 className={OneStyles.header}>Personal Information</h1>
            <Box display='flex' sx={{
                gap:'1rem'
            }}>
                <TextField id="outlined-basic" label="First Name" variant="outlined" value={formData.firstName}
                onChange={(e) => updateFormData('firstName', e.target.value)}
      />
                <TextField id="outlined-basic" label="Last Name" variant="outlined" />
                <TextField id="outlined-basic" label="Middle Initial" variant="outlined" />
            </Box>
            <Box display='flex' sx={{
                gap:'1rem'
            }}>
                <TextField id="outlined-basic" label="Age" variant="outlined" />
                <TextField id="outlined-basic" label="Date of Birth" variant="outlined" />
            </Box>
            <h1 className={OneStyles.header}>Company Information</h1>
            <TextField id="outlined-basic" label="Enter your Company" variant="outlined" />
        </div>
        <div className={OneStyles.rightContainer}>
            <div className={OneStyles.uploadPhotoContainer}>
                    <FaCamera onClick={handleClick} className={OneStyles.icon}/>
                    <label className={OneStyles.upload} htmlFor="">
                        <input  ref={fileInputRef} type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
                    </label>
                    
            </div>
            <p>Add Photo</p>
                <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup row>
                        <FormControlLabel value='female' control={<Radio/>} label='Female'></FormControlLabel>
                        <FormControlLabel value='male' control={<Radio/>} label='Male'></FormControlLabel>
                    </RadioGroup>
                </FormControl>
        </div>
    </div>
  )
}

export default StepOne
