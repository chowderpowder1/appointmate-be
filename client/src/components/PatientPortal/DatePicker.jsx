import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import DateStyles from './DatePicker.module.css'

const DatePicker = () => {
  return (
    <div className={DateStyles.dateContainer}>
          <LocalizationProvider sx={{width:'100%', height:'100%'}} dateAdapter={AdapterDayjs}>
            <DateCalendar />
            
          </LocalizationProvider>
    </div>
  )
}

export default DatePicker
