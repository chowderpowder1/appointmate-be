import { React, useState, useEffect } from 'react'
import AppointmentStyles from './AppointmentPage.module.css'
import HeroGen from '../../components/Ui/HeroGen'
import RedHeader from '../../components/Ui/RedHeader'
import Box from '@mui/material/Box';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import AppointmentBg from '../../assets/appointmentBg.png'

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

// Icons
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

import AwZabarte from '../../assets/AwZabarte.jpg'
import AwValenzuela from '../../assets/AwValenzuela.jpg'

const AppointmentPage = () => {
  const [ activeTab, setActiveTab ] = useState(0);

  const toggleTab = (index) => {
    setActiveTab(index);
  }

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

  return (
    <div className={AppointmentStyles.appointmentContainer}>
      <HeroGen bgSrc={AppointmentBg} header='Book an appointment!'> 
      </HeroGen>
      <div className={AppointmentStyles.appointmentSubContainer}>
        <div className={AppointmentStyles.formsContainer}>
          <Box 
          sx={{
                display:'flex',
                flexDirection:'column',
                gap:2
              }}
          >
            <TextField fullWidth id="outlined-basic" label="First Name" variant="outlined" />
            <TextField fullWidth id="outlined-basic" label="Last Name" variant="outlined" />
            <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" />
            <TextField fullWidth id="outlined-basic" label="Contact Number" variant="outlined" />
              <Box sx={{
                width:'100%',
                display:'flex',
                gap:3,
                justifyContent:'space-between'
                }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer  components={['DatePicker']}>
                      <DatePicker sx={{width:'300px'}} label="Basic date picker" />
                    </DemoContainer>
                    <DemoContainer components={['TimePicker']}>
                      <TimePicker sx={{width:'300px'}} label="Basic time picker" />
                    </DemoContainer>
                </LocalizationProvider>
              </Box>    
            <FormControl fullWidth>
             <InputLabel id="demo-simple-select-label">Select Branch</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"

                label="Select Branch">
                {/* onChange={handleChange} */}
              
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              </FormControl>
            <FormControl fullWidth>
             <InputLabel id="demo-simple-select-label">Choose Physical Therapist</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"

                label="Choose Physical Therapist">
                {/* onChange={handleChange} */}
              
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              </FormControl>
              <p>Mode of Payment:</p>
              <FormControl sx={{flexDirection:'row', gap:'1rem'}} fullWidth>
                <InputLabel sx={{width:'300px'}} id="demo-simple-select-label">HMO</InputLabel>
              <Select sx={{width:'300px'}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="HMO">
                {/* onChange={handleChange} */}
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
                <Button sx={{width:'300px', color: 'gray', borderColor:'gray'}} variant="outlined">Cash</Button>
              </FormControl>
            <Button sx={{padding:'1rem'}} variant="contained">Book An Appointment</Button>
            
          </Box>
        </div>
        
        <div className={AppointmentStyles.infoContainer}>
          <div>
            <h1 className={AppointmentStyles.titleText}>Make Appointment</h1>
            <p className={AppointmentStyles.subText}>Getting an accurate diagnosis can be one of the most impactful experiences that you can have - especially if you've been in search of that answer for a while. We can help you get there.</p>
          </div>

          <div className={AppointmentStyles.branchContainer}>

              <div className={AppointmentStyles.branchTabs}>
                <span onClick={ ()=> toggleTab(0)} className={`${AppointmentStyles.branchItem} ${activeTab === 0 ? AppointmentStyles.activeTab:''}`}>Zabarte</span>
                <span onClick={ ()=> toggleTab(1)} className={`${AppointmentStyles.branchItem} ${activeTab === 1 ? AppointmentStyles.activeTab:''}`}>Caloocan</span>
                <span onClick={ ()=> toggleTab(2)}  className={`${AppointmentStyles.branchItem} ${activeTab === 2 ? AppointmentStyles.activeTab:''}`}>Manila</span>
                <span onClick={ ()=> toggleTab(3)}  className={`${AppointmentStyles.branchItem} ${activeTab === 3 ? AppointmentStyles.activeTab:''}`}>Ortigas</span>
                <div className={AppointmentStyles.divider}></div>
              </div>

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
      </div>
    </div>
  )
}

export default AppointmentPage
