import React from 'react'
import PtMxStyles from './PtMxForms.module.css'

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const PtMxForms = () => {
  return (
    <div>
      <p>Physical Therapy Treatment</p>
      <FormGroup spacing={1} row={true} sx={{
        textAlign:'left'
      }}>
        <FormControlLabel control={<Checkbox/>} label="Radiofrequency" />
        <FormControlLabel control={<Checkbox/>} label="Dry Needle" />
        <FormControlLabel control={<Checkbox/>} label="Manual Therapy" />
        <FormControlLabel control={<Checkbox/>} label="HEP" />
        <FormControlLabel control={<Checkbox/>} label="Accumatic" />
        <FormControlLabel control={<Checkbox/>} label="Shockwave / Magneto" />
      </FormGroup>
    </div>
  )
}

export default PtMxForms
