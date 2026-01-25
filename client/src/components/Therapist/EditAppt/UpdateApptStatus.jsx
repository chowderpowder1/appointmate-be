import { useState } from 'react'
import UpdateStyles from './UpdateApptStatus.module.css'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UpdateApptStatus = () => {

  const [apptStatus, setapptStatus] = useState('');

  const handleChange = (status) => {
    setapptStatus(status.target.value);
  };

  return (
    <div className={UpdateStyles.container}>
        <p>Update Appointment Status</p>

        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{display:'flex', gap:'1rem' }} fullWidth>
            <InputLabel id="demo-simple-select-label">Appointment Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={apptStatus}
              label="Appointment Status"
              onChange={handleChange}
            >
              <MenuItem value={10}>Request for Reschedule</MenuItem>
              <MenuItem value={20}>Request for Cancellation</MenuItem>
            </Select>
            <InputLabel id="demo-simple-select-label">Appointment Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={apptStatus}
              label="Appointment Status"
              onChange={handleChange}
            >
              <MenuItem value={10}>Request for Reschedule</MenuItem>
              <MenuItem value={20}>Request for Cancellation</MenuItem>
            </Select>
            {/* <InputLabel htmlFor="email">Email Address</InputLabel> */}
            <TextField
                id="outlined-multiline-static"
                label="Add a Note"
                multiline
                rows={4}
                // defaultValue="Add a Note"
            />
            <Button sx={{ borderRadius:'10px', boxShadow:'none'}}variant="contained">Update Status</Button>
          </FormControl>
        </Box>
    </div>
  )
}

export default UpdateApptStatus
