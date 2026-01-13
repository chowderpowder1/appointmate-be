import { React, useState, useEffect } from 'react'
import AppointmentStyles from './AppointmentPage.module.css'
import HeroGen from '../../components/Ui/HeroGen'
import RedHeader from '../../components/Ui/RedHeader'
import Box from '@mui/material/Box';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import AppointmentBg from '../../assets/appointmentBg.png'
import { Link } from 'react-router';

// Date Picker Dependencies
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Modal from '../../components/Ui/Modal'

import dayjs from "dayjs";

// Icons
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

import AwZabarte from '../../assets/AwZabarte.jpg'
import AwValenzuela from '../../assets/AwValenzuela.jpg'

import axios from 'axios';
import { useUsers } from '../../queries/users'
import { useGetTherapists } from '../../queries/useEmployees'
import { useGetBookedDates, useBookAppt } from '../../queries/apptData'

// Imports fixed time slots of AWP
import {timeSlots} from '../../features/timeSlots'
import { ToastContainer, toast } from 'react-toastify';

const AppointmentPage = () => {
  const branchData = [
    {
      branchId: 0,
      branchName: 'Zabarte',
      branchLoc: 'Zabarte, Quezon City, 141231231',
      branchPhone: '+69 321 312 312',
      branchEmail: 'Zoey@gmail.com',
      branchImgSrc: AwZabarte
  },
    {
      branchId: 1,
      branchName: 'Valenzuela',
      branchLoc: 'Valenzuela, Valenzuela City, 141231231',
      branchPhone: '+69 912 453 334',
      branchEmail: 'Rumi@gmail.com',
      branchImgSrc: AwValenzuela
  },
    {
      branchId: 2,
      branchName: 'Disneyland',
      branchLoc: 'Valenzuela, Valenzuela City, 141231231',
      branchPhone: '+69 912 453 334',
      branchEmail: 'Rumi@gmail.com',
      branchImgSrc: AwValenzuela
  },
    {
      branchId: 3,
      branchName: 'Happy farm',
      branchLoc: 'Valenzuela, Valenzuela City, 141231231',
      branchPhone: '+69 912 453 334',
      branchEmail: 'Rumi@gmail.com',
      branchImgSrc: AwValenzuela
  },
  ]

  const hmoProvider = [
            { Hmo: 'amaphil' },
            { Hmo: 'caritas Health Shield' },
            { Hmo: 'cocoLife' },
            { Hmo: 'eastWest' },
            { Hmo: 'firstLife' },
            { Hmo: 'hartmann' },
            { Hmo: 'hmi' },
            { Hmo: 'hppi' },
            { Hmo: 'iCare' },
            { Hmo: 'medAsia' },
            { Hmo: 'pacific Cross' },
            { Hmo: 'bpiPhilam' },
            { Hmo: 'coop Health' },
            { Hmo: 'generali' },
            { Hmo: 'inLife' },
            { Hmo: 'lacson Lacson' },
            { Hmo: 'mediCard' },
            { Hmo: 'mediLink' },
            { Hmo: 'medoCare' },
            { Hmo: 'philam Life' },
            { Hmo: 'sunLife Grepa' },
            { Hmo: 'valuCare' },
            { Hmo: 'wellCare' }
  ]
  const [ selectedTherapist, setSelectedTherapist] = useState(null);
  const bookApptMutation = useBookAppt()
  const {data : userData, isLoading: userDataIsLoading, error: userDataError} = useUsers();

  const { data: therapistData, isLoading: therapistDataIsLoading, error: therapistDataError} = useGetTherapists();

  const { data: bookedApptData, isLoading: bookedApptDataisLoading, error: bookedApptDataError, refetch: refetchBookedApptData } = useGetBookedDates(selectedTherapist);

  const [ activeTab, setActiveTab ] = useState(0);
  const [ disabledSlots, setDisabledSlots] = useState([]);
  const [ disabledDates, setDisabledDates] = useState([]);
  const [ isOpen, setIsOpen] = useState(true);
  const [ mop, setMop ] = useState('');
  const [ appointmentForm, setAppointmentForm] = useState({
    // firstName:'',
    // lastName: '',
    // email: '',
    // contactNumber: '',
    apptDate: '',
    apptTime:'',
    apptTherapist: '',
    apptId:'',
    mop:'',
    hmoProvider: '',
  });
  const inputHandler = (e) => {
    const {name, value} = e.target;
    console.log("Payload Structure before send: ", appointmentForm)
    setAppointmentForm( prev => ({
      ...prev, 
      [name] : value
    }))
    // calculateDisabledSlots()
  }

useEffect(()=>{

    const newTimeSlots = []
    const disabledDates = []
    setDisabledSlots('')
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
        console.log(bookedApptData.appointments)
        if(bookedApptData.appointments.hasOwnProperty(key)){
          if(bookedApptData.appointments[key].length >= 10){
            console.log(key)
            disabledDates.push(dayjs(key).format('YYYY-MM-DD'))
          }
          // if(dayjs().isAfter(dayjs('03:30 PM', 'hh:mm A')) && dayjs().isBefore(dayjs().add(1, 'day'))){
          //   console.log('its today')
          //   disabledDates.push(dayjs(key).format('YYYY-MM-DD'))
          // }
          console.log(key + '=>' + bookedApptData.appointments[key].length)
        }
      }
      setDisabledDates(disabledDates)
    }
  bookApptMutation.mutate(appointmentForm)
},[appointmentForm.apptDate, bookedApptData])

  const toggleTab = (index) => {
    setActiveTab(index);
  }

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
  
  if (userDataIsLoading || bookedApptDataisLoading || therapistDataIsLoading) return <div>Loading...</div>;
  if (userDataError || bookedApptDataError || therapistDataError) return <div>Error: {bookedApptDataError.message || userDataError.message}</div>;
  // const disabledDates = new Set(Object.keys(bookedApptData.appointments));
  // const disabledTimes = new Set(Object.values(bookedApptData.appointments));
  // console.log(bookedApptData);
  // console.log(disabledDates);
  // console.log(disabledTimes);

  const submitFormData = async (e) => {
    e.preventDefault();
    // console.log("Payload Structure before send: "+ JSON.stringify(appointmentForm))
    // console.log(appointmentForm)
    bookApptMutation.mutate(appointmentForm)
    toast('Appointment Successfully Booked')
    setAppointmentForm({
      apptDate: '',
      apptTime:'',
      apptTherapist: '',
      mop:'',
      hmoProvider: '',
    })
  }
  console.log(therapistData)
  return (
    <div className={AppointmentStyles.appointmentContainer}>

      <HeroGen bgSrc={AppointmentBg} header='Book an appointment!'> 
      </HeroGen>
      {userData.loggedIn && <><div className={AppointmentStyles.appointmentSubContainer}>
        <div className={AppointmentStyles.formsContainer}>
          <form onSubmit={submitFormData}>
          <Box 
          sx={{
                display:'flex',
                flexDirection:'column',
                gap:2
            }}>

            <TextField required slotProps={{input: {readOnly: true,}}} value={userData.firstName} fullWidth id="outlined-basic" label="First Name" variant="outlined" />
            <TextField required slotProps={{input: {readOnly: true,}}} value={userData.lastName} fullWidth id="outlined-basic" label="Last Name" variant="outlined" />
            <TextField required slotProps={{input: {readOnly: true,}}} value={userData.email}fullWidth id="outlined-basic" label="Email" variant="outlined" />
            <TextField required slotProps={{input: {readOnly: true,}}} value={userData.contact_number} fullWidth id="outlined-basic" label="Contact Number" variant="outlined" />
              <FormControl fullWidth required>
             <InputLabel id="demo-simple-select-label">Choose Physical Therapist</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Choose Physical Therapist"
                onChange= {(e) => {
                  inputHandler(e)
                  setSelectedTherapist(e.target.value)
                }}

                name='apptTherapist'
                value={appointmentForm.apptTherapist}

                >
                 { therapistData.map((e)=>(
                    <MenuItem value={e.therapistId}>{e.therapistName}</MenuItem>
                  ))}
                {/* <MenuItem value={'Rafael Ong'}>Rafael Ong</MenuItem>
                <MenuItem value={'Lucia Reyes'}>Lucia Reyes</MenuItem>
                <MenuItem value={'shiquina reyes'}>Shiquina Reyes</MenuItem> */}
              </Select>
              </FormControl>
              <Box sx={{
                width:'100%',
                display:'flex',
                gap:3,
                justifyContent:'space-between'
                }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                  
                    label="Pick an Appointment Date"
                    onChange={(e)=> {
                      const formattedDate = dayjs(e).format("YYYY-MM-DD")                        
                      inputHandler({target: { name: 'apptDate', value: formattedDate}})                    
                    }}    
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
                    minDate={dayjs()} // prevents selecting future dates
                    // shouldDisableDate={(day)=> {
                    //   const formatted= day.format("YYYY-MM-DD")
                    //   return disabledDates.has(formatted)
                    // }}
                  />
                    
                    {/* Time Slot Picker */}
                <FormControl sx={{flexDirection:'row', gap:'1rem'}} required fullWidth>
                <InputLabel sx={{width:'300px'}} id="demo-simple-select-label">Pick a time slot</InputLabel>
                <Select sx={{width:'300px'}}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={appointmentForm.apptTime}
                  name='apptTime'
                  label="Pick a time slot"
                  onChange={inputHandler}
                  disabled={!appointmentForm.apptDate}
                >
                  {timeSlots.map((e)=>(
                    <MenuItem disabled={timeSlotGenerator(e.value)} 
                    value={e.value}>{(e.label).toUpperCase()}</MenuItem>
                  ))}
                </Select>

              </FormControl>
                </LocalizationProvider>
              </Box>    


            {/* <FormControl fullWidth>
             <InputLabel id="demo-simple-select-label">Select Branch</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="apptBranch"
                onChange={inputHandler}
                label="Select Branch">
                
                <MenuItem value={'Quezon City'}>Quezon City</MenuItem>
                <MenuItem value={'Caloocan'}>Caloocan</MenuItem>
                <MenuItem value={'Manila'}>Manila</MenuItem>
                <MenuItem value={'Oritgas'}>Ortigas</MenuItem>
              </Select>
              </FormControl> */}

        
                <Box sx={{flexDirection:'row', gap:'1rem'}}fullWidth>


{/* <FormControl>
  <FormLabel id="demo-radio-buttons-group-label">Mode of Payment:</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="female"
    name="radio-buttons-group"
  >
    <FormControlLabel value="HMO" control={<Radio />} label="HMO" />
    <FormControlLabel value="CASH" control={<Radio />} label="CASH" />
  </RadioGroup>
</FormControl> */}
<ToggleButtonGroup
required
      fullWidth
        sx={{
    gap: 1,
    "& .MuiToggleButtonGroup-grouped:not(:first-of-type)": {
      borderLeft: "1px solid rgba(0,0,0,0.23)",
    },
    "& .MuiToggleButtonGroup-grouped": {
      borderRadius: "8px", // prevents weird clipped corners
    }
  }}
      value={appointmentForm.mop}
      exclusive
      name='mop'
      onChange={(event, nextView)=>{
        console.log(appointmentForm.mop);
        if(nextView == appointmentForm.mop || appointmentForm.mop == null){
          console.log('its the same')
          inputHandler({target:{name:'mop', value: ''}})
        }
        inputHandler({target:{name: 'mop', value: nextView }})
        setMop(nextView)
        // setAppointmentForm.mop(nextView)
      }}
>
    <ToggleButton
      value='HMO'
              sx={{
          "&.Mui-selected": {
            backgroundColor: "#4791DD",
            color: "white",
            "&:hover": {
              backgroundColor: "#4791DD", // keeps hover same as selected
            },
          },
        }}
>
      <p>HMO</p>
    </ToggleButton>
    <ToggleButton
    
      value='CASH'
              sx={{
          "&.Mui-selected": {
            backgroundColor: "#4791DD",
            color: "white",
            "&:hover": {
              backgroundColor: "#4791DD", // keeps hover same as selected
            },
          },
        }}
    >
      <p>CASH</p>
    </ToggleButton>
</ToggleButtonGroup>
                </Box>

                 <FormControl sx={{flexDirection:'row', gap:'1rem'}} fullWidth>
                <InputLabel fullWidth id="demo-simple-select-label">HMO Provider</InputLabel>
                <Select fullWidth
                required={ appointmentForm.mop == 'HMO' ? true : false}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={appointmentForm.hmo}
                  disabled={ appointmentForm.mop =='CASH' || appointmentForm.mop=='' || appointmentForm.mop == null}
                  name='hmoProvider'
                  label="HMO Provider"
                  onChange={inputHandler}
                >
                  {hmoProvider.map((e)=>(
                    <MenuItem 
                  
                    value={e.Hmo}>{(e.Hmo).toUpperCase()}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            <Button type="submit" sx={{padding:'1rem'}} variant="contained">Book My Appointment</Button>
          </Box>

        </form>
        </div>
        
        <div className={AppointmentStyles.infoContainer}>
          <div>
            <h1 className={AppointmentStyles.titleText}>Set an Appointment</h1>
            <p className={AppointmentStyles.subText}>Getting an accurate diagnosis can be one of the most impactful experiences that you can have - especially if you've been in search of that answer for a while. We can help you get there.</p>
          </div>

          <div className={AppointmentStyles.branchContainer}>
{/* 
              <div className={AppointmentStyles.branchTabs}>
                <span onClick={ ()=> toggleTab(0)} className={`${AppointmentStyles.branchItem} ${activeTab === 0 ? AppointmentStyles.activeTab:''}`}>Zabarte</span>
                <span onClick={ ()=> toggleTab(1)} className={`${AppointmentStyles.branchItem} ${activeTab === 1 ? AppointmentStyles.activeTab:''}`}>Caloocan</span>
                <span onClick={ ()=> toggleTab(2)}  className={`${AppointmentStyles.branchItem} ${activeTab === 2 ? AppointmentStyles.activeTab:''}`}>Manila</span>
                <span onClick={ ()=> toggleTab(3)}  className={`${AppointmentStyles.branchItem} ${activeTab === 3 ? AppointmentStyles.activeTab:''}`}>Ortigas</span>
                <div className={AppointmentStyles.divider}/>
              </div> */}

                {branchData.map((slide, index)=>(
                  <div key={slide.id} className={`${AppointmentStyles.branchSlide} ${ activeTab === index ? `${AppointmentStyles.branchSlideActive}` : ''}`}>
                    <h1 className={AppointmentStyles.branchTitle}>{slide.branchName} Branch</h1>
                    

                    <div className={AppointmentStyles.branchInfoPanel}>
                      
                        <div className={AppointmentStyles.branchImage}>
                              <img src={slide.branchImgSrc} alt="" />
                        </div>

                        <div className={AppointmentStyles.branchIconContainer}>
                          <h1> Quezon City</h1>
                          <div className={AppointmentStyles.branchIconRows}>
                            <FaLocationDot />
                            <p>{slide.branchLoc}</p>
                          </div>
                          <div className={AppointmentStyles.branchIconRows}>
                            <FaPhoneAlt/>
                            <p>{slide.branchPhone}</p>
                          </div>
                          <div className={AppointmentStyles.branchIconRows}>
                            <IoIosMail/>
                            <p>{slide.branchEmail}</p>
                          </div>
                        </div>

                      </div>

                    <div className={AppointmentStyles.branchHours}>
                      <p>Opening Hours</p>
                      <div className={AppointmentStyles.branchHoursRow}>
                        <p>Mon-Tues</p>
                        <p>6am - 10pm </p>
                      </div>

                      <div className={AppointmentStyles.divider}></div>
                      <div className={AppointmentStyles.branchHoursRow}>
                        <p>Mon-Tues</p>
                        <p>6am - 10pm </p>
                      </div>

                      <div className={AppointmentStyles.divider}></div>
                      
                    </div>
                  
              </div>
                 ))}
          </div>
        </div>
      </div>
      
      <div className={AppointmentStyles.footerContainer}>
        <h1 className={AppointmentStyles.footerTitle}>
          Stay Connected with AWPC
        </h1>
        <div className={AppointmentStyles.footerSocials}>
          <div className={AppointmentStyles.footerContact}>
            <FaFacebook className={AppointmentStyles.footerIcon}/>
            <p>Accelerated Wellness and Pain Clinic </p>
          </div>
          <div className={AppointmentStyles.footerContact}>
            <FaInstagram className={AppointmentStyles.footerIcon}/>
            <p>@accelerated_wellness</p>
          </div>
        </div>
      </div></>}

    {!userData.loggedIn && <>
    <div style={{
      margin: 'auto',
      textAlign: 'center',
      padding: '40px 20px'
    }}>
      <h1>Please Log in to your account to book an appointment</h1>
      <p style={{
        marginBottom:'1rem'
      }}>-appointmate team c:</p>

      <Button variant="contained" > <Link style={{color:'white'}} to='/login'>Login / Signup</Link></Button>
    </div>
    </>}
     <ToastContainer/>

    </div>
  )
}

export default AppointmentPage
