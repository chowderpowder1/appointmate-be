import { React, useRef, useState } from 'react'
import TwoStyles from './StepTwo.module.css'

// Icon Imports
import { FaCamera } from "react-icons/fa";

// Mui dependencies
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';

const StepTwo = () => {

  const [religion, setReligion] = useState('');

  const handleChange = (event) => {
    setReligion(event.target.value);
  };
  return (
    <div>   

        <div className={TwoStyles.formContainer}>
          <p className={TwoStyles.header}>Contact Information</p>
          <Box display='flex' sx={{
            gap:'1rem'
          }}>
            <TextField id="outlined-basic" label="Unit" variant="outlined" />
            <TextField id="outlined-basic" label="Street" variant="outlined" />
            <TextField id="outlined-basic" label="Barangay" variant="outlined" />
            <TextField id="outlined-basic" label="City" variant="outlined" />
          </Box>
          <Grid container spacing={2}>
            <Grid size={3}>
              <TextField required id="outlined-required" label="Zipcode" fullWidth/>
            </Grid>
            <Grid size={4.5}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Religion</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={religion}
                  label="Religion"
                  onChange={handleChange}
                >
                  <MenuItem value={'Iglesia ni Chris Brown'}>Iglesia ni Chris Brown</MenuItem>
                  <MenuItem value={20}>Ipinanganak Muli</MenuItem>
                  <MenuItem value={30}>Bisayawa</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={4.5}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={religion}
                  label="Religion"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Philippines</MenuItem>
                  <MenuItem value={20}>Japan</MenuItem>
                  <MenuItem value={30}>China</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          
            <p className={TwoStyles.header}>Contact Details</p>
            <Grid container spacing={2}>
            <Grid size={5}>
              <TextField fullWidth id="outlined-basic" label="Contact Number" variant="outlined" />
            </Grid>
            <Grid size={7}>
              <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" />
            </Grid>
          </Grid>
        </div>
    </div>
  )
}

export default StepTwo
