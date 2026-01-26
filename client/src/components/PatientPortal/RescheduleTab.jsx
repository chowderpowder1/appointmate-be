import {useState, useEffect, React} from 'react'
import AddStyles from './RescheduleTab.module.css'
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

const RescheduleTab = () => {
    
//     const { mutate, data, isSuccess, isError } = useUpdateAppt();    
//     const { data: therapistData, isLoading: therapistDataIsLoading, error: therapistDataError} = useGetTherapists();
//     const [ selectedTherapist, setSelectedTherapist] = useState(null);
    
//     const {data : userData, isLoading: userDataIsLoading, error: userDataError} = useUsers();
//     const {data : servicesData, isLoading: servicesDataIsLoading, error: servicesDataError} = useGetServicesList();
//     const {data : allPatientsData, isLoading: allPatientsDataIsLoading, error: allPatientsDataError} = useGetAllPatients();
//     const { data: bookedApptData, isLoading: bookedApptDataisLoading, error: bookedApptDataError, refetch: refetchBookedApptData} = useGetBookedDates(selectedTherapist);

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
//     console.log(appointmentForm)
//     const { data: patientsPendingAppt =[], isLoading: patientsPendingApptIsLoading, error: patientsPendingApptError} = useGetPatientsPendingAppt(appointmentForm.patientID, {enabled: !!appointmentForm.patientID});

    const handleSelectedSlot = (timeSlot) =>{
        setSelectedSlot(timeSlot)
    }

//     const inputHandler = (e) => {
//     const {name, value} = e.target;
//     setAppointmentForm( prev => ({
//       ...prev, 
//       [name] : value
//     }))
//     calculateDisabledSlots()
//   }
//     useEffect(()=>{
    
//         const newTimeSlots = []
//         const disabledDates = []
//         console.log(appointmentForm)
//         setDisabledSlots('')
//         refetchBookedApptData()
//         if(bookedApptData?.appointments){
//           for ( const [key, val] of Object.entries(bookedApptData.appointments)){
//             console.log( 'key value pair for disabled slots:', key, val);
//             if ( (appointmentForm.apptDate).toString() == key){
//               // console.log(key)
//               // console.log(val)
//               val.forEach((timeSlot)=> {
//                 // console.log(timeSlot)
//                 // console.log(newTimeSlots);
//                 newTimeSlots.push(timeSlot)
//                 setDisabledSlots(newTimeSlots);
//                 // console.log(disabledSlots);
//               })
//               // 
//             }
//           }
    
//           for (var key in bookedApptData.appointments){
//             if(bookedApptData.appointments.hasOwnProperty(key)){
//               if(bookedApptData.appointments[key].length > 10){
//                 console.log(key)
//                 disabledDates.push(dayjs(key).format('YYYY-MM-DD'))
//               }
//               // console.log(key + '=>' + bookedApptData.appointments[key].length)
//             }
//           }
//           setDisabledDates(disabledDates)
//         }
//         // bookApptMutation.mutate(appointmentForm)
//     },[appointmentForm.apptDate, bookedApptData, selectedTherapist, data, isSuccess])
//             console.log(bookedApptData)


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

//     // Tanstack Error Checking
//     if (userDataIsLoading || bookedApptDataisLoading || allPatientsDataIsLoading ||servicesDataIsLoading || therapistDataIsLoading || patientsPendingApptIsLoading) return <div>Loading...</div>;
//     if (userDataError || bookedApptDataError || allPatientsDataError || servicesDataError || therapistDataError || patientsPendingApptError) return <div>Error: {bookedApptDataError.message || userDataError.message}</div>;
//     // const x = Object.keys(allPatientsData.allPatients).map((key)=>{
//     //     console.log(allPatientsData.allPatients[key].patientName)
//     // })

//     const submitFormData = async (e) => {
//     e.preventDefault();
//     // console.log("Payload Structure before send: "+ JSON.stringify(appointmentForm))
//     // console.log(appointmentForm)
//     mutate(appointmentForm, {
//         onSuccess: (data) => {
//             toast.success('Patients loaded successfully!');
//         },
//         onError: (error) => {
//             toast.error('Failed to load patients');
//         }
//     })
//     setSelectedSlot('')
    
//     setAppointmentForm({
//         patientID:'',
//         patientName: '',
//         apptDate: '',
//         apptTime:'',
//         apptTherapist: '',
//         service:'',
//         mop:'',
//     })
//   }
//     console.log(patientsPendingAppt)

  return (
    <div className={AddStyles.mainContainer}>
      <form 
    //   onSubmit={submitFormData}
      >
       <div className={AddStyles.dataContainer}>

         <div className={AddStyles.columnOne}>
            <h3> Reschedule Your Appointment</h3>
            <div className={AddStyles.apptDetailsContainer}>
                <h4>Your Appointment Details</h4>
                <p>Physical Therapist:</p>
                <p>PT Lee Ji-eun</p>
                <p>Physical Therapist:</p>
                <p>PT Lee Ji-eun</p>
                <p>Payment Method:</p>
                <p>HMO, Maxicare</p>
            </div>
            <div className={AddStyles.rescheduleReasonContainer}>
                <h4>Your Appointment Details</h4>
                <p>Physical Therapist:</p>
                <p>PT Lee Ji-eun</p>
                <p>Physical Therapist:</p>
                <p>PT Lee Ji-eun</p>
                <p>Payment Method:</p>
                <p>HMO, Maxicare</p>
            </div>
         </div>
            <div className={AddStyles.columnTwo}>
                   <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                      sx={{
    '& .MuiPickersToolbar-root': {
      display: 'none',
    },
  }}
                      label="Pick an Appointment Date"
                      onChange={(e)=> {
                        const formattedDate = dayjs(e).format("YYYY-MM-DD")                        
                        inputHandler({target: { name: 'apptDate', value: formattedDate}})                    
                      }}    
                    //   disabled={!appointmentForm?.apptTherapist}
                      shouldDisableDate={(day)=> {
                          const formattedDate = day.format("YYYY-MM-DD")                        
                          return disabledDates.includes(formattedDate)    
                        }}
                    //   value={dayjs(appointmentForm?.apptDate)}
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
                            {timeSlots?.map((slot, index)=>(
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
                        <p  className={AddStyles.alertContainer}> Approval may take time depending on therapist availability. You’ll be notified once the new schedule is confirmed. For urgent concerns, please contact the clinic.</p>
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

export default RescheduleTab
