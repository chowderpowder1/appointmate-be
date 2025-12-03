import React from 'react'
import FourStyles from './StepFour.module.css'

// Mui dependencies
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';

import {useAppContext} from './AppContext.jsx'

const StepFour = () => {
    const {formData, setFormData} = useAppContext();
    const relOptions =[
      { relationship: "Parent" },
      { relationship: "Spouse" },
      { relationship: "Child" },
      { relationship: "Sibling" },
      { relationship: "Grandparent" },
      { relationship: "Guardian" },
      { relationship: "Relative" },
      { relationship: "Friend" },
      { relationship: "Colleague" },
      { relationship: "Other" }
    ]
    const handleInputChange = (section) => (e) => {
        const { name, value} = e.target 
        setFormData( prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [name]: value
        }}))  
      }
    
  return (
    <div className={FourStyles.container}>
        <p className={FourStyles.header}>Emergency Contact Information</p>
        <Grid container fullWidth rowSpacing={2} columnSpacing={2}>
            <Grid size={6}>
                <TextField fullWidth name='contactPerson' value={formData.emergencyInfo.contactPerson} onChange={handleInputChange('emergencyInfo')} id="outlined-basic" label="Contact Person" variant="outlined" />
            </Grid>

        <Grid size={6}>
            <FormControl fullWidth> 
                <InputLabel id="demo-simple-select-label">Relationship</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.emergencyInfo.relationship}
                  name='relationship'
                  label="Relationship"
                  onChange={handleInputChange('emergencyInfo')}
                >
                  {relOptions.map((e)=>(
                    <MenuItem value={e.relationship}>{(e.relationship).toUpperCase()}</MenuItem>
                  ))}
                </Select>
              </FormControl>
        </Grid>
            <Grid size={6}>
                <TextField fullWidth id="outlined-basic" label="Contact Number" variant="outlined" name='contactNumber' value={formData.emergencyInfo.contactNumber} onChange={handleInputChange('emergencyInfo')}  />
            </Grid>
            <Grid size={6}>
                <TextField fullWidth id="outlined-basic" label="Alternate Number" variant="outlined" name='altNumber' value={formData.emergencyInfo.altNumber} onChange={handleInputChange('emergencyInfo')}/>
            </Grid>
        </Grid>
    </div>
  )
}

export default StepFour
