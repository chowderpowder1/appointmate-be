import React from 'react'
import AddStyles from './AddUserTab.module.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddUserTab = () => {
  return (
    <div className={AddStyles.container}>
      <h4 className={AddStyles.header}>Add User</h4>
        <Box fullWidth display='flex' sx={{
            gap:'1rem',
            flexFlow:'column'
        }}>
           <Box fullWidth display='flex' sx={{
                gap:'1rem'
           }}>
               <TextField
                  required
                  id="outlined-required"
                  label="First Name"
                  fullWidth
                />
                 <TextField
                  required
                  id="outlined-required"
                  label="Last Name"
                  fullWidth
                />
                 <TextField
                  required
                  id="outlined-required"
                  label="Role"
                  fullWidth
                />
           </Box>
           <Box fullWidth display='flex' sx={{
                gap:'1rem'
           }}>
               <TextField
                  required
                  id="outlined-required"
                  label="ID Number"
                  fullWidth
                />
                 <TextField
                  required
                  id="outlined-required"
                  label="Password"
                  fullWidth
                />
                 <TextField
                  required
                  id="outlined-required"
                  label="Confirm Password"
                  fullWidth
                />
           </Box>
       </Box>
        <Button className={AddStyles.addBtn} variant="contained" href="#contained-buttons"
        sx={{
            position:'absolute',
            bottom:'15px',
            right:'20px',
        }}>
        Add User
      </Button>
    </div>
  )
}

export default AddUserTab
