import {React, useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {useState,} from 'react'

import FormControl from '@mui/material/FormControl';
import { RadioGroup,Radio } from '@mui/material';
import { Grid } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';

import AddStyles from './EditPatientRecordPage.module.css'
import MedicalHistoryForms from '../../components/Therapist/PxRecordForms/PastMedicalHistory'
import OiForms from '../../components/Therapist/PxRecordForms/OiForms'
import PtMxForms from '../../components/Therapist/PxRecordForms/PtMxForms'
import PalpationForms from '../../components/Therapist/PxRecordForms/PalpationForms'

import dayjs from 'dayjs';
import { useParams } from 'react-router';
 
import {usePatchInitialEval, useGetPatientEval} from '../../queries/useEmployees.js'

const EditPatientRecordPage = () => {
  const { id } = useParams();
    const {mutate: updatePatientEvalMutation} = usePatchInitialEval();
    const {data : patientEvalData, isLoading: patientEvalDataIsLoading, error: patientEvalDataError} = useGetPatientEval(id);

    
    const [updatePatientEval, setUpdatePatientEval] = useState({
      
    // Chief Complaint
    chiefComplaint: undefined,

    // Diagnosis
    diagnosis: undefined,

    // Coverage Expiration
    coverageExpiration: undefined, // Date string (e.g., YYYY-MM-DD) // Not working

    hypertension: undefined, // "controlled" | "uncontrolled"
    diabetesMellitus: undefined, // "controlled" | "uncontrolled"
    MRI: undefined,
    XRay: undefined,
    CTScan: undefined,
    
    cardioPulmoDSE: undefined,
    cancer: undefined,
    hospitalization: undefined,
    allergies: undefined,


    // Physical Therapy Services
    radiofrequency: undefined,
    dryNeedle: undefined,
    manualTherapy: undefined,
    HEP: undefined,
    accumatic: undefined,
    shockwaveMagneto: undefined,

    // Palpation
    edemaOn: undefined,
    edemaNotes:undefined,
    nodulesOn: undefined,
    nodulesNotes:undefined,
    musclesOn: undefined,
    musclesNotes:undefined,
    tautBandsOn: undefined,
    tautBandNotes:undefined,
    jtEffusionOn: undefined,
    jtEffusionNotes:undefined,
    lomOn: undefined,
    lomNotes:undefined,
    tendernessOn: undefined,
    tendernessNotes:undefined,

    // Oi
    ambulatory: undefined,
    deformity: undefined,
    erythemaOn: undefined,
    erythemaNotes:undefined,
    swellingOn: undefined,
    swellingNotes:undefined,
    atrophy: undefined,
    posturalDeviation: undefined,
    othersOi: undefined,

    // Pain Description
    intermittent: false,
    constant: undefined,
    dull: undefined,
    deep: undefined,
    burning: undefined,
    numbing: undefined,
    tingling: undefined,
    radiating: undefined,
    sharp: undefined,
    throbbing: undefined,
    shooting: undefined,
    stabbing: undefined,
    cramping: undefined,
    nagging: undefined,
    heavy: undefined,


    // Pain Scale
    painScale: undefined,
    localizedOnArea:undefined,
    reliefBy:undefined,
    elicitedBy:undefined,

    // Notes
    otherNotes:undefined,
    specialNotes: undefined,

    therapyService:undefined,
    });

    const inputHandler = (e) => {
      const { name, value } = e.target;
      setUpdatePatientEval(prev => ({
        ...prev,
        [name]: value
      }));
    };


// For DatePicker
  const dateHandler = (key, value) => {
    setUpdatePatientEval((prev) => ({
      ...prev,
      [key]: value ? value.format("YYYY-MM-DD") : undefined,
    }));
  };
  
console.log(updatePatientEval.therapyService)
  useEffect(() => {
    if (patientEvalData) {
      setUpdatePatientEval({
        diagnosis: patientEvalData.diagnosis || "",
        chiefComplaint: patientEvalData.complaint || "",
        otherNotes: patientEvalData.otherNotes || "",
        specialNotes: patientEvalData.specNotes || "",

        hypertension: patientEvalData.hypertension, // "controlled" | "uncontrolled"
        diabetesMellitus: patientEvalData.diabetesMellitus, // "controlled" | "uncontrolled"
        MRI: patientEvalData.mri,
        XRay: patientEvalData.XRay,
        CTScan: patientEvalData.CTScan,

        cardioPulmoDSE: patientEvalData.cardioPulmoDSE,
        cancer: patientEvalData.cancer,
        hospitalization: patientEvalData.hospitalization,
        allergies: patientEvalData.allergies,

        edemaOn: patientEvalData.edemaOn,
        edemaNotes: patientEvalData.edemaNotes,
        nodulesOn: patientEvalData.nodulesOn,
        nodulesNotes: patientEvalData.nodulesNotes,
        musclesOn: patientEvalData.musclesOn,
        musclesNotes: patientEvalData.musclesNotes,
        tautBandsOn: patientEvalData.tautBandsOn,
        tautBandNotes: patientEvalData.tautBandNotes,
        jtEffusionOn: patientEvalData.jtEffusionOn,
        jtEffusionNotes: patientEvalData.jtEffusionNotes,
        lomOn: patientEvalData.lomOn,
        lomNotes: patientEvalData.lomNotes,
        tendernessOn: patientEvalData.tendernessOn,
        tendernessNotes: patientEvalData.tendernessNotes,
        
        // Pain
        localizedOnArea:  patientEvalData.localizedOnArea,
        reliefBy:  patientEvalData.reliefBy,
        elicitedBy: patientEvalData.elicitedBy,
        // Pain Details
        painScale: patientEvalData.painScale,

        // Pain Description
        intermittent: patientEvalData.intermittent,
        constant: patientEvalData.constant,
        dull: patientEvalData.dull,
        deep: patientEvalData.deep,
        burning: patientEvalData.burning,
        numbing: patientEvalData.numbing,
        tingling: patientEvalData.tingling,
        radiating: patientEvalData.radiating,
        sharp: patientEvalData.sharp,
        throbbing: patientEvalData.throbbing,
        shooting: patientEvalData.shooting,
        stabbing: patientEvalData.stabbing,
        cramping: patientEvalData.cramping,
        nagging: patientEvalData.nagging,
        heavy: patientEvalData.heavy,

        //  Oi
        ambulatory: patientEvalData.ptn_ambulatory,
        deformity: patientEvalData.ptn_deformity,
        erythemaOn: patientEvalData.ptn_erythemaon,
        erythemaNotes:patientEvalData.ptn_erythemanotes,
        swellingOn: patientEvalData.ptn_swellingon,
        swellingNotes:patientEvalData.ptn_swellingnotes,
        atrophy: patientEvalData.ptn_atrophy,
        posturalDeviation: patientEvalData.ptn_posturaldev,
        othersOi: patientEvalData.ptn_othernotes,

        therapyService: patientEvalData.appt_service,
      });
    }
  }, [patientEvalData]);
    // console.log(patientEvalData.painType )
    console.log(updatePatientEval.pastMedicalHistory) // Not working
    console.log(updatePatientEval.chiefComplaint) // Not working
  
    if (  patientEvalDataIsLoading ) return <div>Loading...</div>;
    if (  patientEvalDataError ) return <div>Error: {patientEvalDataError.message}</div>;
  console.log(patientEvalData)
    return (
    <div className={AddStyles.container}>
        <p className={AddStyles.header}>Initial Evaluation</p>

        <div className={AddStyles.initialEvalContainer}>
          <Grid container spacing={2}
          sx={{
            width:'100%',
          }}>
          <Grid item size={6}>
            <TextField  onChange={inputHandler}
            name='chiefComplaint' id="outlined-required" 
            value={updatePatientEval.chiefComplaint || ''}
            label="Chief Complaint" fullWidth multiline rows={4}/>
          </Grid>
                    
          <Grid item container spacing={1} size={6}>
            <TextField id="outlined-required" name='diagnosis' onChange={inputHandler} label="Diagnosis" fullWidth value={updatePatientEval.diagnosis || ''}/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
                label="Coverage Expiration"
                value={updatePatientEval.coverageExpiration ? dayjs(updatePatientEval.coverageExpiration) : null}
                sx={{ width: "100%" }} // sets the outer wrapper width
                renderInput={(params) => (
                  <TextField {...params} fullWidth />
                )}                       
              />
            </LocalizationProvider>
          </Grid>

            </Grid>
            <div className={AddStyles.bottomRowContainer}>
              <div className={AddStyles.subContainerLeft}>
                <div className={AddStyles.leftBlock}>

                    

                  <FormGroup>
                    <Grid container rowSpacing={.1} columnSpacing={3}>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox/>} label="Intermittent"
                        checked={updatePatientEval.intermittent ?? false}
                        name="intermittent"
                        onChange={(e) =>
                          setUpdatePatientEval((prev) => ({
                            ...prev,
                            intermittent: e.target.checked
                          }))}                        
                      />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox/>} 
                        name="constant"
                        checked={updatePatientEval.constant || false}
                        onChange={(e)=> {
                          setUpdatePatientEval((prev) => ({
                            ...prev,
                            constant: e.target.checked
                          }))
                        }}
                        label="Constant" />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox/>} label="Dull" 
                        name="dull"
                        checked={updatePatientEval.dull || false}
                        onChange={(e)=> {
                          setUpdatePatientEval((prev) => ({
                            ...prev,
                            dull: e.target.checked
                          }))
                        }}                  
                        />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox/>} label="Deep" 
                        name="deep"
                        checked={updatePatientEval.deep || false}
                        onChange={(e)=> {
                          setUpdatePatientEval((prev) => ({
                            ...prev,
                            deep: e.target.checked
                          }))
                        }}
                        />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox/>} label="Burning" 
                        name="burning"
                        checked={updatePatientEval.burning || false}
                        onChange={(e)=> {
                          setUpdatePatientEval((prev) => ({
                            ...prev,
                            burning: e.target.checked
                          }))
                        }}
                        />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox/>} label="Numbing" 
                        name="numbing"
                        checked={updatePatientEval.numbing || false}
                        onChange={(e)=> {
                          setUpdatePatientEval((prev) => ({
                            ...prev,
                            numbing: e.target.checked
                          }))
                        }}
                        />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox/>} label="Tingling" 
                        name="tingling"
                        checked={updatePatientEval.tingling || false}
                        onChange={(e)=> {
                          setUpdatePatientEval((prev) => ({
                            ...prev,
                            tingling: e.target.checked
                          }))
                        }}
                        />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox />} label="Radiating" 
                        name="radiating"
                        checked={updatePatientEval.radiating || false}
                        onChange={(e)=> {
                          setUpdatePatientEval((prev) => ({
                            ...prev,
                            radiating: e.target.checked
                          }))
                        }}
                        />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox />} label="Sharp" 
                        name="sharp"
                        checked={updatePatientEval.sharp || false}
                        onChange={(e)=> {
                          setUpdatePatientEval((prev) => ({
                            ...prev,
                            sharp: e.target.checked
                          }))
                        }}
                        />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox />} label="Throbbing" 
                        name="throbbing"
                        checked={updatePatientEval.throbbing || false}
                        onChange={(e)=> {
                          setUpdatePatientEval((prev) => ({
                            ...prev,
                            throbbing: e.target.checked
                          }))
                        }}
                        />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox />} label="Shooting" 
                        name="shooting"
                        checked={updatePatientEval.shooting || false}
                        onChange={(e)=> {
                          setUpdatePatientEval((prev) => ({
                            ...prev,
                            shooting: e.target.checked
                          }))
                        }}
                        />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox />} label="Stabbing" 
                        name="stabbing"
                        checked={updatePatientEval.stabbing || false}
                        onChange={(e)=> {
                          setUpdatePatientEval((prev) => ({
                            ...prev,
                            stabbing: e.target.checked
                          }))
                        }}
                        />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox />} label="Cramping" 
                        name="cramping"
                        checked={updatePatientEval.cramping || false}
                        onChange={(e)=> {
                          setUpdatePatientEval((prev) => ({
                            ...prev,
                            cramping: e.target.checked
                          }))
                        }}
                        />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox />} label="Nagging" 
                        name="nagging"
                        checked={updatePatientEval.nagging || false}
                        onChange={(e)=> {
                          setUpdatePatientEval((prev) => ({
                            ...prev,
                            nagging: e.target.checked
                          }))
                        }}
                        />
                      </Grid>
                      <Grid size={4}>
                        <FormControlLabel control={<Checkbox />} label="Heavy" 
                        name="heavy"
                        checked={updatePatientEval.heavy || false}
                        onChange={(e)=> {
                          setUpdatePatientEval((prev) => ({
                            ...prev,
                            heavy: e.target.checked
                          }))
                        }}
                        />
                      </Grid>              
                    </Grid>
                  </FormGroup>
                  <Box sx={{ width: 300 }}>
                    <Typography id="track-inverted-slider" gutterBottom>
                      Pain Scale
                    </Typography>
                    <Slider
                      aria-label="Pain Scale"
                      defaultValue={updatePatientEval.painScale || 2}
                      value={updatePatientEval.painScale || 2}
                      onChange={(e, value) =>
                        setUpdatePatientEval(prev => ({
                          ...prev,
                          painScale: value
                        }))
                      }
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
                    id="outlined-required" 
                    onChange={inputHandler}
                    name='localizedOnArea'
                    label="Localized on area" fullWidth
                    value={updatePatientEval.localizedOnArea || ''}
                    
                    />
                    <TextField
                    id="outlined-required" 
                    onChange={inputHandler}
                    name='elicitedBy'
                    value={updatePatientEval.elicitedBy || ''}
                    label="Elicited By" fullWidth/>
                    <TextField
                    id="outlined-required" 
                    onChange={inputHandler}
                    name='reliefBy'
                    value={updatePatientEval.reliefBy || ''}
                    label="Relief By" fullWidth/>
                  
                </div>
                  <div className={AddStyles.leftBlock}>
                     <div>
                          <p>Physical Therapy Treatment</p>
                        <FormGroup spacing={1} row={true} sx={{
                            textAlign:'left'
                          }}>
                            <RadioGroup
                                name="therapyService"
                                value={updatePatientEval.therapyService || ""}
                                onChange={inputHandler}
                              >
                                <FormControlLabel
                                  value="1"
                                  control={<Radio />}
                                  label="Shockwave Therapy"
                                />
                                <FormControlLabel
                                  value="2"
                                  control={<Radio />}
                                  label="Dry Needling"
                                />
                                <FormControlLabel
                                  value="3"
                                  control={<Radio />}
                                  label="Spinal Manipulation"
                                />
                                <FormControlLabel
                                  value="4"
                                  control={<Radio />}
                                  label="Radiofrequency Therapy"
                                />
                                <FormControlLabel
                                  value="5"
                                  control={<Radio />}
                                  label="Microcurrent Therapy"
                                />
                                <FormControlLabel
                                  value="6"
                                  control={<Radio />}
                                  label="Manual Therapy"
                                />
                              </RadioGroup>

                          </FormGroup>
                        </div>
                  </div>
              <Box display={'flex'} sx={{ gap:'1rem'}}>
                    <div className={AddStyles.oiContainer} >
                      <p>Oi</p>
                      <FormGroup>
                        <FormControlLabel control={<Checkbox/>} label="Ambulatory" 
                        name='ambulatory'
                        checked={updatePatientEval.ambulatory ?? false}                            
                        onChange={(e, value) =>
                        setUpdatePatientEval(prev => ({
                          ...prev,
                          ambulatory: value
                        }))}
                        />
                        <FormControlLabel control={<Checkbox/>} label="Deformity" 
                        name='deformity'              
                        checked={updatePatientEval.deformity ?? false}              
                        onChange={(e, value) => {
                          setUpdatePatientEval(prev => ({
                            ...prev,
                            deformity: value
                          }))
                        }}
                        />
                        <FormControlLabel control={<Checkbox/>} label="Erythema on:" 
                        name='erythemaOn'  
                        checked={updatePatientEval.erythemaOn ?? false}               
                        onChange={(e, value) => {
                          setUpdatePatientEval(prev => ({
                            ...prev,
                            erythemaOn: value
                          }))
                        }}
                        />
                        <TextField id="outlined-required" label="Please Specify" fullWidth
                        onChange={inputHandler}
                        disabled={!updatePatientEval.erythemaOn}
                        value={updatePatientEval.erythemaNotes} 
                        name='erythemaNotes'
                        />
                        <FormControlLabel control={<Checkbox/>} label="Swelling on:" 
                        name='swellingOn'                            
                        checked={updatePatientEval.swellingOn ?? false}               
                        onChange={(e, value) => {
                          setUpdatePatientEval(prev => ({
                            ...prev,
                            swellingOn: value
                          }))
                        }}
                        />
                        <TextField name='swellingNotes' id="outlined-required" label="Please Specify" 
                        onChange={inputHandler}
                        value={updatePatientEval.swellingNotes} 
                        disabled={!updatePatientEval.swellingOn}                       
                        fullWidth/>
                        <FormControlLabel control={<Checkbox/>} label="Atrophy" 
                        name='atrophy'                            
                        checked={updatePatientEval.atrophy ?? false}               
                        onChange={(e, value) => {
                          setUpdatePatientEval(prev => ({
                            ...prev,
                            atrophy: value
                          }))
                        }}
                        />
                        <FormControlLabel control={<Checkbox/>} label="Postural Deviation" 
                        name='posturalDeviation'                            
                        checked={updatePatientEval.posturalDeviation ?? false}               
                        onChange={(e, value) => {
                          setUpdatePatientEval(prev => ({
                            ...prev,
                            posturalDeviation: value
                          }))
                        }}
                        />
                       <TextField name='othersOi'
                       onChange={inputHandler}
                       value={updatePatientEval.othersOi}
                       id="outlined-required" label="Others" fullWidth/>
                                  
                      </FormGroup>
                    </div>
                        
                  </Box>
              </div>
                
                <div className={AddStyles.subContainerRight} style={{width:'100%'}}>
                   <div>
                    <p className={AddStyles.medicalHistorySubHeader}>Past Medical History</p>
                    <div className={AddStyles.medicalHistoryContainer}>
                        <div className={AddStyles.medicalHistorySubContainer}>
                          <Box fullWidth  display={'flex'} sx={{
                            gap:'2rem'
                        }}>
                            <Box display={'flex'} sx={{flexDirection:'column'}}>
                            <FormControl component="fieldset">
                              <Typography>Hypertension</Typography>
                              <RadioGroup
                                name="hypertension"
                                value={updatePatientEval.hypertension || ""}
                                onChange={inputHandler}
                              >
                                <FormControlLabel
                                  value="controlled"
                                  control={<Radio />}
                                  label="Controlled"
                                />
                                <FormControlLabel
                                  value="uncontrolled"
                                  control={<Radio />}
                                  label="Uncontrolled"
                                />
                              </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset">
                              <Typography>Diabetes Mellitus</Typography>
                              <RadioGroup
                                name="diabetesMellitus"
                                value={updatePatientEval.diabetesMellitus || ""}
                                onChange={inputHandler}
                              >
                                <FormControlLabel
                                  value="controlled"
                                  control={<Radio />}
                                  label="Controlled"
                                />
                                <FormControlLabel
                                  value="uncontrolled"
                                  control={<Radio />}
                                  label="Uncontrolled"
                                />
                              </RadioGroup>
                            </FormControl>
                            </Box>
                      
                            <Box>
                              <Typography >Laboratories</Typography>
                              <FormGroup>
                                <FormControlLabel control={<Checkbox/>} label="MRI" 
                                name='MRI'             
                                checked={Boolean(updatePatientEval.MRI)}            
                                onChange={inputHandler}
                                />
                                <FormControlLabel control={<Checkbox/>} label="X-Ray" 
                                name='XRay'    
                                checked={Boolean(updatePatientEval.XRay)}                        
                                onChange={inputHandler}
                                />
                                <FormControlLabel control={<Checkbox/>} label="CT Scan" 
                                name='CTScan'     
                                checked={Boolean(updatePatientEval.CTScan)}                        
                                onChange={inputHandler}
                                />
                              </FormGroup>
                            </Box>
                            <Box>
                              <FormGroup>
                              <Typography >Others</Typography>
                                
                                <FormControlLabel control={<Checkbox/>} label="Cardio / Pulmo DSE" 
                                name='cardioPulmoDSE'
                                checked={Boolean(updatePatientEval.cardioPulmoDSE)}                             
                                onChange={inputHandler}
                                />
                                <FormControlLabel control={<Checkbox/>} label="Cancer" 
                                checked={Boolean(updatePatientEval.cancer)}
                                name='cancer'                            
                                onChange={inputHandler}
                                />
                                <FormControlLabel control={<Checkbox/>} label="Hospitalization" 
                                checked={Boolean(updatePatientEval.hospitalization)}
                                name='hospitalization'                            
                                onChange={inputHandler}
                                />
                                <FormControlLabel control={<Checkbox/>} label="Allergies" 
                                checked={Boolean(updatePatientEval.allergies)}
                                name='allergies'                            
                                onChange={inputHandler}
                                />
                              </FormGroup>
                            </Box>
                        </Box>
                        </div>
          {/* <div className={AddStyles.medicalHistorySubContainerTwo}>
           
          </div> */}
<div className={AddStyles.palpationContainer}>
                          <p>Palpation</p>
                           <FormGroup>
                            <FormControlLabel control={<Checkbox/>} label="Edema on:" 
                            name='edemaOn'       
                            checked={!!updatePatientEval.edemaOn}
                                                 
                            onChange={(e) =>
                              setUpdatePatientEval((prev) => ({
                                ...prev,
                                edemaOn: e.target.checked
                              }))
                            }
                            />
                            <TextField
                            id="outlined-required" name='edemaNotes' label="Please Specify" 
                            fullWidth disabled={(!updatePatientEval.edemaOn)}
                            value={updatePatientEval.edemaNotes || ""}
                            onChange={inputHandler}/>
                            
                            <FormControlLabel control={<Checkbox/>} label="Nodule/s on:" 
                            name='nodulesOn'                            
                            checked={!!updatePatientEval.nodulesOn}
                                                 
                            onChange={(e) =>
                              setUpdatePatientEval((prev) => ({
                                ...prev,
                                nodulesOn: e.target.checked
                              }))}
                            />
                            <TextField
                            id="outlined-required" name='nodulesNotes' label="Please Specify" fullWidth disabled={(!updatePatientEval.nodulesOn)}
                            onChange={inputHandler}
                            value={updatePatientEval.nodulesNotes || ""}/>

                            <FormControlLabel control={<Checkbox/>} label="Muscle/s on:" 
                            name='musclesOn'                            
                            checked={!!updatePatientEval.musclesOn}                
                            onChange={(e) =>
                              setUpdatePatientEval((prev) => ({
                                ...prev,
                                musclesOn: e.target.checked
                              }))}
                            />
                            
                            <TextField
                            id="outlined-required" name='musclesNotes' label="Please Specify" fullWidth
                            disabled={(!updatePatientEval.musclesOn)}
                            value={updatePatientEval.musclesNotes || ""}
                            onChange={inputHandler}/>

                            <FormControlLabel control={<Checkbox/>} label="Taut Band/s on:" 
                            name='tautBandsOn'                            
                            checked={!!updatePatientEval.tautBandsOn}                
                            onChange={(e) =>
                              setUpdatePatientEval((prev) => ({
                                ...prev,
                                tautBandsOn: e.target.checked
                              }))}
                            />
                            <TextField
                            disabled={(!updatePatientEval.tautBandsOn)}
                            id="outlined-required" name='tautBandNotes' label="Please Specify" fullWidth
                            value={updatePatientEval.tautBandNotes || ""}
                            onChange={inputHandler}/>

                            <FormControlLabel control={<Checkbox/>} label="Jt Effusion on:" 
                            name='jtEffusionOn'
                            checked={!!updatePatientEval.jtEffusionOn}                
                            onChange={(e) =>
                              setUpdatePatientEval((prev) => ({
                                ...prev,
                                jtEffusionOn: e.target.checked
                              }))}
                            />
                            <TextField
                            disabled={(!updatePatientEval.jtEffusionOn)}
                            id="outlined-required" name='jtEffusionNotes' label="Please Specify" fullWidth
                            value={updatePatientEval.jtEffusionNotes || ""}
                            onChange={inputHandler}/>
                            
                            <FormControlLabel control={<Checkbox/>} label="LOM on:" 
                            name='lomOn'
                            checked={!!updatePatientEval.lomOn}                
                            onChange={(e) =>
                              setUpdatePatientEval((prev) => ({
                                ...prev,
                                lomOn: e.target.checked
                              }))}
                            />
                            <TextField
                            disabled={(!updatePatientEval.lomOn)}
                            id="outlined-required" name='lomNotes' label="Please Specify" fullWidth
                            onChange={inputHandler}
                            value={updatePatientEval.lomNotes || ""}
                            />

                            <FormControlLabel control={<Checkbox/>} label="Tenderness on:" 
                            name='tendernessOn'
                            checked={!!updatePatientEval.tendernessOn}                
                            onChange={(e) =>
                              setUpdatePatientEval((prev) => ({
                                ...prev,
                                tendernessOn: e.target.checked
                              }))}
                            />
                            <TextField
                            disabled={(!updatePatientEval.tendernessOn)}
                            value={updatePatientEval.tendernessNotes || ""}
                            id="outlined-required" name='tendernessNotes' label="Please Specify" fullWidth
                            onChange={inputHandler}/>  

                          </FormGroup>
                        </div>          
        </div>
    </div>
                  
                  <Box display='flex' sx={{flexFlow:'column',gap:'1rem', height:'100%'}}>
                    <TextField  onChange={inputHandler}
                    name='otherNotes' id="outlined-required" label="Other Notes" fullWidth multiline rows={3.5}
                    sx={{}}
                    value={updatePatientEval.otherNotes || ''}
                    />
                    <TextField  onChange={inputHandler}
                    name='specialNotes' id="outlined-required" 
                    value={updatePatientEval.specialNotes || ''}
                     label="Special Notes" fullWidth multiline rows={3}/>
                  </Box>
                </div>
            </div>
        </div>

        <div className={AddStyles.btnContainer}>
          {/* <Button variant="contained">Reset Form</Button> */}
          <Button variant="contained"
          
           onClick={()=>{
              updatePatientEvalMutation({id, payload:updatePatientEval},{
                          onSuccess: (data) => {
                              console.log('success')
                              toast('All data updated successfully')
                          }
                      })
          }}
          >Save Record</Button>
        </div>
              <ToastContainer />
    </div>
  )
}

export default EditPatientRecordPage
