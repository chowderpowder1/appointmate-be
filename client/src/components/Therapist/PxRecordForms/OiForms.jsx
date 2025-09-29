import React from 'react'
import OiStyles from './OiForms.module.css'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

const OiForms = () => {
  return (
    <div className={OiStyles.container} >
        <p>Oi</p>
        <FormGroup>
          <FormControlLabel control={<Checkbox/>} label="Ambulatory" />
          <FormControlLabel control={<Checkbox/>} label="Deformity" />
          <FormControlLabel control={<Checkbox/>} label="Erythema on:" />
          <FormControlLabel control={<Checkbox/>} label="Swelling on:" />
          <FormControlLabel control={<Checkbox/>} label="Atrophy" />
          <FormControlLabel control={<Checkbox/>} label="Postural Deviation" />
          <FormControlLabel control={<Checkbox/>} label="Others:" />          
        </FormGroup>
    </div>
  )
}

export default OiForms
