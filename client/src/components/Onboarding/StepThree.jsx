import { React, useState } from 'react'
import ThreeStyles from './StepThree.module.css'
// Mui dependencies
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';

const StepThree = () => {
    const [idType, setIdType] = useState('');
    const [hmoCard, setHmoCard] = useState('');

    const handleHmo = (e) => {
    setHmoCard(e.target.value)
    }
    const handleId = (e) => {
    setIdType(e.target.value)
    }

  return (
    <div className={ThreeStyles.container}>
      <p className={ThreeStyles.header}>Coverage & Identification</p>
      <Grid container fullWidth rowSpacing={2} columnSpacing={2}>
        <Grid item size={7}>
           <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">HMO Card Presented</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={hmoCard}
                  label="HMO Card Presented"
                  onChange={handleHmo}
                >
                  <MenuItem value={'Iglesia ni Chris Brown'}>Iglesia ni Chris Brown</MenuItem>
                  <MenuItem value={20}>Ipinanganak Muli</MenuItem>
                  <MenuItem value={30}>Bisayawa</MenuItem>
                </Select>
              </FormControl>
        </Grid>
        <Grid item size={5}>
          <TextField fullWidth id="outlined-basic" label="HMO Card Number" variant="outlined" />
        </Grid>

        <Grid item size={7}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Valid ID Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={idType}
              label="Valid ID Type"
              onChange={setIdType}>
              <MenuItem value={'Iglesia ni Chris Brown'}>Iglesia ni Chris Brown</MenuItem>
              <MenuItem value={20}>Ipinanganak Muli</MenuItem>
              <MenuItem value={30}>Bisayawa</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item size={5}>
          <TextField fullWidth id="outlined-basic" label="Valid ID Number" variant="outlined" />
        </Grid>
    </Grid>
    </div>
  )
}

export default StepThree
