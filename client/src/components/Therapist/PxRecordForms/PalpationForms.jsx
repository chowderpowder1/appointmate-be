import React from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import PalpationStyles from './PalpationForms.module.css'

const PalpationForms = () => {
  return (
    <div className={PalpationStyles.container}>
        <p>Palpation</p>
         <FormGroup>
          <FormControlLabel control={<Checkbox/>} label="Edema on:" />
          <FormControlLabel control={<Checkbox/>} label="Nodule/s on:" />
          <FormControlLabel control={<Checkbox/>} label="Muscle/s on:" />
          <FormControlLabel control={<Checkbox/>} label="Taut Band/s on:" />
          <FormControlLabel control={<Checkbox/>} label="Jt Effusion on:" />
          <FormControlLabel control={<Checkbox/>} label="LOM on:" />
          <FormControlLabel control={<Checkbox/>} label="Tenderness on:" />          
        </FormGroup>
    </div>
  )
}

export default PalpationForms
