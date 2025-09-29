import React from 'react'
import HistoryStyles from './PastMedicalHistory.module.css'
import { Box, Grid } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

const PastMedicalHistory = () => {
  return (

    <div>
      <p className={HistoryStyles.subHeader}>Past Medical History</p>
      <div className={HistoryStyles.container}>
          <div className={HistoryStyles.subContainer}>
            <Box fullWidth  display={'flex'} sx={{
              gap:'2rem'
          }}>
              <Box display={'flex'}>
                  <FormGroup>
                      <Typography >Hypertension</Typography>
                      <FormControlLabel control={<Checkbox/>} label="Controlled" />
                      <FormControlLabel control={<Checkbox/>} label="Uncontrolled" />
                  </FormGroup>
                  <FormGroup>
                      <Typography >Diabetes Mellitus</Typography>
                      <FormControlLabel control={<Checkbox/>} label="Controlled" />
                      <FormControlLabel control={<Checkbox/>} label="Uncontrolled" />
                  </FormGroup>
              </Box>
      
              <Box>
                <Typography >Laboratories</Typography>
                  <FormGroup>
                      <FormControlLabel control={<Checkbox/>} label="MRI" />
                      <FormControlLabel control={<Checkbox/>} label="X-Ray" />
                      <FormControlLabel control={<Checkbox/>} label="CT Scan" />
                  </FormGroup>
              </Box>
          </Box>
          </div>
          <div className={HistoryStyles.subContainerTwo}>
             <Box>
                  <FormGroup>
                      <FormControlLabel control={<Checkbox/>} label="Cardio / Pulmo DSE" />
                      <FormControlLabel control={<Checkbox/>} label="Cancer" />
                      <FormControlLabel control={<Checkbox/>} label="Hospitalization" />
                      <FormControlLabel control={<Checkbox/>} label="Allergies" />
                  </FormGroup>
              </Box>
          </div>
        </div>
    </div>
  )
}

export default PastMedicalHistory
