import {useState, useEffect, React} from 'react'
import AddStyles from './FdRescheduleTab.module.css'
import TextField from '@mui/material/TextField';
import MockTherapist from '../../assets/mock-therapist.jpg'
// import DatePicker from '../../components/PatientPortal/DatePicker'

// Mui Components
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Date
import dayjs from "dayjs";


// Tanstack Imports
import { useUsers } from '../../queries/users'
import { useGetBookedDates } from '../../queries/apptData'
import { useGetAllPatients, useGetServicesList, useGetTherapists, useGetPatientsPendingAppt, useUpdateAppt} from '../../queries/useEmployees'

import { ToastContainer, toast } from 'react-toastify';
// Imports fixed time slots of AWP
import {timeSlots} from '../../features/timeSlots'

const FdRescheduleTab = () => {
    
    const { mutate, data, isSuccess, isError } = useUpdateAppt();    
    const { data: therapistData, isLoading: therapistDataIsLoading, error: therapistDataError} = useGetTherapists();
    const [ selectedTherapist, setSelectedTherapist] = useState(null);
    
    const {data : userData, isLoading: userDataIsLoading, error: userDataError} = useUsers();
    const {data : servicesData, isLoading: servicesDataIsLoading, error: servicesDataError} = useGetServicesList();
    const {data : allPatientsData, isLoading: allPatientsDataIsLoading, error: allPatientsDataError} = useGetAllPatients();
    const { data: bookedApptData, isLoading: bookedApptDataisLoading, error: bookedApptDataError, refetch: refetchBookedApptData} = useGetBookedDates(selectedTherapist);

    const [ disabledSlots, setDisabledSlots] = useState([]);
    const [ disabledDates, setDisabledDates] = useState([]);
    const [ selectedSlot, setSelectedSlot] = useState('');
    const [ appointmentForm, setAppointmentForm] = useState({
        patientID:'',
        apptId:'',
        apptDate: '',
        apptTime:'',
        apptTherapist: '',
        service:'',
        mop:'',
    });
    console.log(appointmentForm)
    const { data: patientsPendingAppt =[], isLoading: patientsPendingApptIsLoading, error: patientsPendingApptError} = useGetPatientsPendingAppt(appointmentForm.patientID, {enabled: !!appointmentForm.patientID});

    const handleSelectedSlot = (timeSlot) =>{
        setSelectedSlot(timeSlot)
    }

    const inputHandler = (e) => {
    const {name, value} = e.target;
    setAppointmentForm( prev => ({
      ...prev, 
      [name] : value
    }))
    calculateDisabledSlots()
  }
    useEffect(()=>{
    
        const newTimeSlots = []
        const disabledDates = []
        console.log(appointmentForm)
        setDisabledSlots('')
        refetchBookedApptData()
        if(bookedApptData?.appointments){
          for ( const [key, val] of Object.entries(bookedApptData.appointments)){
            console.log( 'key value pair for disabled slots:', key, val);
            if ( (appointmentForm.apptDate).toString() == key){
              // console.log(key)
              // console.log(val)
              val.forEach((timeSlot)=> {
                // console.log(timeSlot)
                // console.log(newTimeSlots);
                newTimeSlots.push(timeSlot)
                setDisabledSlots(newTimeSlots);
                // console.log(disabledSlots);
              })
              // 
            }
          }
    
          for (var key in bookedApptData.appointments){
            if(bookedApptData.appointments.hasOwnProperty(key)){
              if(bookedApptData.appointments[key].length > 10){
                console.log(key)
                disabledDates.push(dayjs(key).format('YYYY-MM-DD'))
              }
              // console.log(key + '=>' + bookedApptData.appointments[key].length)
            }
          }
          setDisabledDates(disabledDates)
        }
        // bookApptMutation.mutate(appointmentForm)
    },[appointmentForm.apptDate, bookedApptData, selectedTherapist, data, isSuccess])
            console.log(bookedApptData)


    // Returns boolean values for disabled timeslots 
    const  timeSlotGenerator = (timeSlot) => {
        // console.log(timeSlot)
        const now = dayjs().format('HH:mm')
        // console.log(now)
        const day = dayjs().format('YYYY-MM-DD')
        // console.log(day)

        if(appointmentForm.apptDate <= day && timeSlot <= now){
          return true;
        }
        return disabledSlots.includes(timeSlot)
    }

    // Tanstack Error Checking
    if (userDataIsLoading || bookedApptDataisLoading || allPatientsDataIsLoading ||servicesDataIsLoading || therapistDataIsLoading || patientsPendingApptIsLoading) return <div>Loading...</div>;
    if (userDataError || bookedApptDataError || allPatientsDataError || servicesDataError || therapistDataError || patientsPendingApptError) return <div>Error: {bookedApptDataError.message || userDataError.message}</div>;
    // const x = Object.keys(allPatientsData.allPatients).map((key)=>{
    //     console.log(allPatientsData.allPatients[key].patientName)
    // })

    const submitFormData = async (e) => {
    e.preventDefault();
    // console.log("Payload Structure before send: "+ JSON.stringify(appointmentForm))
    // console.log(appointmentForm)
    mutate(appointmentForm, {
        onSuccess: (data) => {
            toast.success('Patients loaded successfully!');
        },
        onError: (error) => {
            toast.error('Failed to load patients');
        }
    })
    setSelectedSlot('')
    
    setAppointmentForm({
        patientID:'',
        patientName: '',
        apptDate: '',
        apptTime:'',
        apptTherapist: '',
        service:'',
        mop:'',
    })
  }
    console.log(patientsPendingAppt)

  return (
    <div className={AddStyles.mainContainer}>
      <h2> ADD NEW APPOINTMENT</h2>
      <form onSubmit={submitFormData}>
       <div className={AddStyles.dataContainer}>
            <div className={AddStyles.columnOne}>
                <div>
                    <h3 className={AddStyles.headerText}>APPOINTMENT FOR:</h3>
                    <FormControl sx={{flexDirection:'row', gap:'1rem'}} required fullWidth>
                    <InputLabel sx={{width:'300px'}} id="demo-simple-select-label">Select a patient</InputLabel>
                    <Select sx={{width:'300px'}}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={appointmentForm.patientID}
                      name='patientID'
                      label="Select a patient"
                      onChange={(e) => {
                        const selectedID = e.target.value;
                        const selected = allPatientsData.find(patient => patient.patientID === selectedID);                        
                        inputHandler({ target: { name: "patientID", value: selected.patientID }});
                        inputHandler({ target: { name: "patientName", value: selected.patientName }});
                    }}
                    >
                      {allPatientsData.map((a)=>(
                         <MenuItem key={a.patientID} value={a.patientID}>
                        {a.patientName}
                        </MenuItem>
                      ))}
                      {/* {Object.keys(allPatientsData.allPatients).map((key) => {
                        const patient = allPatientsData.allPatients[key];

                        return (
                        <MenuItem key={patient.patientID} value={patient.patientID}>
                        {patient.patientName}
                        </MenuItem>
    );
  })} */}
                    </Select>
                    </FormControl>                    
                </div>

                <div>
                    <h3 className={AddStyles.headerText}>Service Type:</h3>
                    <FormControl sx={{flexDirection:'row', gap:'1rem'}} required fullWidth>
                    <InputLabel sx={{width:'300px'}} id="demo-simple-select-label">Select a service</InputLabel>
                    <Select sx={{width:'300px'}}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={appointmentForm.service}
                      name='service'
                      label="Pick a service"
                      onChange={inputHandler}
                    >
                      {Object.keys(servicesData).map((e)=>(
                        <MenuItem
                        value={servicesData[e].serviceName}>{servicesData[e].serviceName}</MenuItem>
                      ))}
                    </Select>
                    </FormControl>     
                </div>

                <div>
                    <h3 className={AddStyles.headerText}>Reschedule appointment:</h3>
                    <FormControl sx={{flexDirection:'row', gap:'1rem'}} required fullWidth>
                    <InputLabel sx={{width:'300px'}} id="demo-simple-select-label">Select Appointment</InputLabel>
                    <Select sx={{width:'300px'}}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={appointmentForm.apptId}
                      name='apptId'
                      label="Pick a pending appointment"
                      onChange={inputHandler}
                    >
                     {patientsPendingAppt.map((t)=>(
                            <MenuItem key={t.appt_id} value={t.appt_id}>Appointment ID: {t.appt_id} - Date: {t.appt_dateTime} </MenuItem>

                          ))}

                    </Select>
                    </FormControl>     
                </div>
                
                <div>
                  <h3 className={AddStyles.headerText}>Assigned to:</h3>
                   <FormControl sx={{flexDirection:'row', gap:'1rem'}} required fullWidth>
                          <InputLabel sx={{width:'300px'}} id="demo-simple-select-label">Select a Therapist:</InputLabel>
                          <Select sx={{width:'300px'}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={appointmentForm.apptTherapist}
                            name='apptTherapist'
                            label="Select a Therapist"
                            onChange={(e)=>{
                              setSelectedTherapist(e.target.value)
                              inputHandler(e)
                            }}
                          >
                          {therapistData.map((t)=>(
                            <MenuItem key={t.therapistId} value={t.therapistId}>{t.therapistName}</MenuItem>

                          ))}

                          </Select>
                        </FormControl>  
                </div>
                
                {/* <div>
                    <h3 className={AddStyles.headerText}>ASSIGN YOURSELF A SESSION</h3>
                    <button className={AddStyles.claimBtn}>
                        <div className={AddStyles.therapistPhotoContainer}>
                            <img className={AddStyles.therapistPhoto} src={MockTherapist} alt="" />
                        </div>
                        <h4>PT DELA CRUZ</h4>
                    </button>
                </div> */}
            </div>
            <div className={AddStyles.columnTwo}>
                   <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker

                      label="Pick an Appointment Date"
                      onChange={(e)=> {
                        const formattedDate = dayjs(e).format("YYYY-MM-DD")                        
                        inputHandler({target: { name: 'apptDate', value: formattedDate}})                    
                      }}    
                      disabled={!appointmentForm.apptTherapist}
                      shouldDisableDate={(day)=> {
                          const formattedDate = day.format("YYYY-MM-DD")                        
                          return disabledDates.includes(formattedDate)    
                        }}
                      value={dayjs(appointmentForm.apptDate)}
                      name="apptDate"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                        },
                      }}
                      minDate={dayjs()}
                    />
                </LocalizationProvider>                      
                <div className={AddStyles.colTwoSubContainer}>
                  
                    <div>
                        <h3 className={AddStyles.headerText}>SELECT DATE AND TIME</h3>
                        <div className={AddStyles.timeSlotContainer}>
                            {timeSlots.map((slot, index)=>(
                            <Button key={slot} 
                            
                                style={{
                                  padding: "10px 14px",
                                  margin: "5px",
                                  borderRadius: "6px",
                                  backgroundColor: timeSlotGenerator(slot.value) 
                                    ? 'gray' 
                                    : (selectedSlot === slot ? '#079042' : '#1976d2'),                              
                                  color: selectedSlot === slot ? "white": "white",
                                  cursor: "pointer", 
                                }}
                             onClick={() =>{
                              handleSelectedSlot(slot)
                              inputHandler({ target: { name: "apptTime", value: slot.value }});                                
                                
                                
                            }} 
                            disabled={timeSlotGenerator(slot.value)}
                            value={slot.value} >{slot.label}</Button>
                            ))}

                        </div>
                    </div>
                    <div>
                        <h3 className={AddStyles.headerText}>Payment Option:</h3>
                        <FormControl sx={{flexDirection:'row', gap:'1rem'}} required fullWidth>
                          <InputLabel sx={{width:'300px'}} id="demo-simple-select-label">Pick a payment method</InputLabel>
                          <Select sx={{width:'300px'}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={appointmentForm.mop}
                            name='mop'
                            label="Pick a payment Method"
                            onChange={inputHandler}
                          >
                          
                          <MenuItem value='HMO'>HMO</MenuItem>
                          <MenuItem value='CASH'>CASH</MenuItem>

                          </Select>
                        </FormControl>  
                    </div>
                    <button type='submit' className={AddStyles.addApptBtn}>Add Appointment</button>
                </div>
            </div>
        </div>
    </form>

        <div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default FdRescheduleTab
