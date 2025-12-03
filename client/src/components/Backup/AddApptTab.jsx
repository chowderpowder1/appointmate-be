import React from 'react'
import AddStyles from './AddApptTab.module.css'
import TextField from '@mui/material/TextField';
import MockTherapist from '../../assets/mock-therapist.jpg'
import DatePicker from '../../components/PatientPortal/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from "dayjs";

const AddApptTab = () => {

    const timeSlots = [
      { id: 1, time: '08:00', display: '9:00 AM', available: true },
      { id: 2, time: '08:30', display: '9:30 AM', available: true },
      { id: 3, time: '9:00', display: '10:00 AM', available: false },
      { id: 4, time: '9:30', display: '10:30 AM', available: true },
      { id: 5, time: '10:00', display: '11:00 AM', available: true },
      { id: 6, time: '10:30', display: '11:30 AM', available: false },
      { id: 7, time: '11:00', display: '2:00 PM', available: true },
      { id: 8, time: '11:30', display: '2:30 PM', available: true },
      { id: 9, time: '12:00', display: '3:00 PM', available: true },
      { id: 10, time: '12:30', display: '3:30 PM', available: false }
    ];


  return (
    <div className={AddStyles.mainContainer}>
      <h2> ADD NEW APPOINTMENT</h2>
       <div className={AddStyles.dataContainer}>
            <div className={AddStyles.columnOne}>

                <div>
                    <h3 className={AddStyles.headerText}>APPOINTMENT FOR:</h3>
                    <TextField id="outlined-basic" label="Select a patient" variant="outlined" sx={{width:'100%'}} />
                </div>

                <div>
                    <h3 className={AddStyles.headerText}>Service Type:</h3>
                    <TextField id="outlined-basic" label="Select a service" variant="outlined" sx={{width:'100%'}} />
                </div>
                
                <div>
                    <h3 className={AddStyles.headerText}>ASSIGN YOURSELF A SESSION</h3>
                    <button className={AddStyles.claimBtn}>
                        <div className={AddStyles.therapistPhotoContainer}>
                            <img className={AddStyles.therapistPhoto} src={MockTherapist} alt="" />
                        </div>
                        <h4>PT DELA CRUZ</h4>
                    </button>
                </div>
            </div>
            <div className={AddStyles.columnTwo}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker

                      label="Pick an Appointment Date"
                    //   onChange={(e)=> {
                    //     const formattedDate = dayjs(e).format("YYYY-MM-DD")                        
                    //     inputHandler({target: { name: 'apptDate', value: formattedDate}})                    
                    //   }}    
                    //   shouldDisableDate={(day)=> {
                    //       const formattedDate = day.format("YYYY-MM-DD")                        
                    //       return disabledDates.includes(formattedDate)    
                    //     }}
                    //   value={dayjs(appointmentForm.apptDate)}
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
                </LocalizationProvider>
                                
                <div className={AddStyles.colTwoSubContainer}>
                    <div>
                        <h3 className={AddStyles.headerText}>SELECT DATE AND TIME</h3>
                        <div className={AddStyles.timeSlotContainer}>
                            {timeSlots.map((slide, index)=>(
                            <span>{slide.display}</span>
                            ))}

                        </div>
                    </div>
                    <div>
                        <h3 className={AddStyles.headerText}>Payment Option:</h3>
                        <TextField id="outlined-basic" label="Select a payment option" variant="outlined" sx={{width:'100%'}} />
                    </div>
                    <button className={AddStyles.addApptBtn}>Add Appointment</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddApptTab
