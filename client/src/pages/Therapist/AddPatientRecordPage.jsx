import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Grid } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import AddStyles from './AddPatientRecordPage.module.css'
import MedicalHistoryForms from '../../components/Therapist/PxRecordForms/PastMedicalHistory'
import OiForms from '../../components/Therapist/PxRecordForms/OiForms'
import PtMxForms from '../../components/Therapist/PxRecordForms/PtMxForms'
import PalpationForms from '../../components/Therapist/PxRecordForms/PalpationForms'

const AddPatientRecordPage = () => {
  return (
    <div className={AddStyles.container}>
        <p className={AddStyles.header}>Add Patient Record</p>

        <div className={AddStyles.rowOne}>
          <TextField
          required
          id="outlined-required"
          label="Therapist Assigned"
          />
          <TextField
          required
          id="outlined-required"
          label="Elicited By:"
          />
          <TextField
          required
          id="outlined-required"
          label="Relief By"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer sx={{
                padding:0,
              }} components={['DatePicker']}>
              <DatePicker
              label="Basic date picker" />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <p className={AddStyles.subHeader}>PERSONAL INFORMATION</p>
        <div className={AddStyles.rowTwo}>
          <div className={AddStyles.fieldGrid}>

                <Grid container spacing={3}>
                  <Grid size={3.5}>
                    <TextField required id="outlined-required" label="Last Name" fullWidth/>
                  </Grid>
                  <Grid size={3.5}>
                    <TextField required id="outlined-required" label="First Name" fullWidth/>
                  </Grid>
                  <Grid size={1}>
                    <TextField required id="outlined-required" label="M.I." fullWidth/>
                  </Grid>
                  <Grid size={1}>
                    <TextField required id="outlined-required" label="Age" fullWidth/>
                  </Grid>

                  <Grid fullWidth size={3}>
                    <LocalizationProvider  dateAdapter={AdapterDayjs}>
                        <DatePicker fullWidth label="Birth Date" />
                    </LocalizationProvider>
                  </Grid>

                   {/* Row Two      */}
                  <Grid size={5}>
                    <TextField required id="outlined-required" label="Home Address" fullWidth/>                
                  </Grid>

                  <Grid size={2}>
                    <TextField required id="outlined-required" label="City" fullWidth/>                
                  </Grid>

                  <Grid size={2}>
                    <TextField required id="outlined-required" label="Gender" fullWidth/>                
                  </Grid>

                  <Grid size={3}>
                    <TextField required id="outlined-required" label="Phone Number" fullWidth/>                
                  </Grid>

                  {/* Row Three */}
                  <Grid size={5}>
                    <TextField required id="outlined-required" label="HMO Card Represented" fullWidth/>                
                  </Grid>

                  <Grid size={2}>
                    <TextField required id="outlined-required" label="HMO ID Number" fullWidth/>                
                  </Grid>

                  <Grid size={2}>
                    <TextField required id="outlined-required" label="Valid ID Presented" fullWidth/>                
                  </Grid>

                  <Grid size={3}>
                    <TextField required id="outlined-required" label="Valid ID Number" fullWidth/>                
                  </Grid>

                  {/* Row Four */}

                  <Grid size={4}>
                    <TextField required id="outlined-required" label="Company" fullWidth/>                
                  </Grid>

                  <Grid size={4}>
                    <TextField required id="outlined-required" label="Occupation" fullWidth/>                
                  </Grid>

                  <Grid size={4}>
                    <TextField required id="outlined-required" label="Personal Email Address" fullWidth/>                
                  </Grid>

                  {/* Row Five */}

                  <Grid size={4}>
                    <TextField required id="outlined-required" label="Emergency Contact Person" fullWidth/>                
                  </Grid>

                  <Grid size={4}>
                    <TextField required id="outlined-required" label="Phone Number" fullWidth/>                
                  </Grid>

                  <Grid size={4}>
                    <TextField id="outlined-required" label="How did you hear about us?" fullWidth/>                
                  </Grid>

                </Grid>
          </div>
        </div>
        <p className={AddStyles.subHeader}>INITIAL EVALUATION</p>
        <div className={AddStyles.initialEvalContainer}>
          <Grid container spacing={2}
          sx={{
            width:'100%',
          }}>
          <Grid item size={8}>
            <TextField id="outlined-required" label="Chief Complaint" fullWidth multiline rows={4}/>
          </Grid>
                    
          <Grid item container spacing={1} size={4}>
            <TextField id="outlined-required" label="Diagnosis" fullWidth/>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{
                  width:'100%'
                }} label="Coverage Expiration" />
              </LocalizationProvider>
          </Grid>

            </Grid>
            <div className={AddStyles.bottomRowContainer}>
              <div className={AddStyles.subContainerLeft}>
                <div className={AddStyles.leftBlock}>
                  <FormGroup>
                    <Grid container rowSpacing={.1} columnSpacing={3}>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox/>} label="Intermittent" />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox/>} label="Constant" />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox/>} label="Dull" />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox/>} label="Deep" />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox/>} label="Burning" />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox/>} label="Numbing" />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox/>} label="Tingling" />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Radiating" />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Sharp" />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Throbbing" />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Shooting" />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Stabbing" />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Cramping" />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Nagging" />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Heavy" />
                      </Grid>
                    </Grid>
                  </FormGroup>
                    <Box sx={{ width: 300 }}>
                      <Typography id="track-inverted-slider" gutterBottom>
                        Pain Scale
                      </Typography>
                      <Slider
                        aria-label="Pain Scale"
                        defaultValue={2}
                        getAriaValueText=''
                        valueLabelDisplay="auto"
                        shiftStep={1}
                        step={1}
                        marks
                        min={1}
                        max={10}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                       <Typography
                         variant="body2"
                         sx={{ cursor: 'pointer' }}
                       >
                         Minimal Pain
                       </Typography>
                       <Typography
                         variant="body2"
                         sx={{ cursor: 'pointer' }}
                       >
                         Painful
                       </Typography>
                      </Box>
                    </Box>
                    <TextField
                    id="outlined-required" label="Localized on area" fullWidth/>
                  
                </div>
                  <div className={AddStyles.leftBlock}>
                    <PtMxForms/>
                  </div>
              </div>
                
                <div className={AddStyles.subContainerRight} style={{width:'100%'}}>
                  <MedicalHistoryForms/>
                  <Box display={'flex'} sx={{ gap:'1rem'}}>
                    <OiForms/>
                    <PalpationForms/>
                  </Box>
                </div>
            </div>
        </div>

        <div className={AddStyles.btnContainer}>
          <Button variant="contained">Reset Form</Button>
          <Button variant="contained">Save Record</Button>
        </div>
    </div>
  )
}

export default AddPatientRecordPage
