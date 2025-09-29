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

const StepFour = () => {
  return (
    <div className={FourStyles.container}>
        <p className={FourStyles.header}>Emergency Contact Information</p>
        <Grid container fullWidth rowSpacing={2} columnSpacing={2}>
            <Grid size={6}>
                <TextField fullWidth id="outlined-basic" label="Contact Person" variant="outlined" />
            </Grid>
            <Grid size={6}>
                <TextField fullWidth id="outlined-basic" label="Relationship" variant="outlined" />
            </Grid>
            <Grid size={6}>
                <TextField fullWidth id="outlined-basic" label="Contact Number" variant="outlined" />
            </Grid>
            <Grid size={6}>
                <TextField fullWidth id="outlined-basic" label="Alternate Number" variant="outlined" />
            </Grid>
        </Grid>
    </div>
  )
}

export default StepFour
