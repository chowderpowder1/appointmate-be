import React from 'react'
import TherapistGreet from '../../components/Therapist/TherapistGreet'
import SchedulePxNotification from '../../components/Therapist/ScheduledPxNotification'
import DashboardStyles from './TherapistDashboard.module.css'
import NotificationBelt from '../../components/Therapist/NotificationBelt'
import UpcomingAppt from '../../components/Therapist/UpcomingAppt'
import DatePicker from '../../components/PatientPortal/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const TherapistDashboard = () => {
  return (
    <div className={DashboardStyles.container}>
      <h1 className={DashboardStyles.header}>Dashboard</h1>
      <div className={DashboardStyles.row}>
        <TherapistGreet/>
        <SchedulePxNotification/>
      </div>
      <div className={DashboardStyles.row}>
        <NotificationBelt/>
      </div>
      <div className={DashboardStyles.apptDataContainer}>
        <div className={DashboardStyles.calendarContainer}>

             <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DateCalendar
    sx={{
      overflow: 'visible',
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      
      '& .MuiPickersCalendarHeader-root': {
        fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
        padding: 'clamp(8px, 2vw, 16px)',
      },
      
      '& .MuiDayCalendar-root': {
        // Remove fixed dimensions, use percentage/flexible sizing
        minHeight: 'clamp(250px, 60vh, 400px)',
        width: '100%',
        maxWidth: '100%',
      },
      
      '& .MuiDayCalendar-slideTransition': {
        minHeight: 'clamp(32px, 8vh, 48px)',
      },
      
      '& .MuiDayCalendar-weekContainer': {
        margin: 'clamp(2px, 1vh, 4px) 0', // Responsive vertical spacing
        justifyContent: 'space-around', // Distribute days evenly
      },
      
      '& .MuiPickersDay-root': {
        // Responsive day buttons that scale with container
        width: 'clamp(32px, 8vw, 48px)',
        height: 'clamp(32px, 8vw, 48px)',
        fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
        margin: 'clamp(2px, 0.5vw, 4px)',
      },
      
      '& .MuiDayCalendar-weekDayLabel': {
        // Match day button sizing for consistency
        width: 'clamp(32px, 8vw, 48px)',
        height: 'clamp(24px, 6vw, 32px)',
        fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
        margin: 'clamp(2px, 0.5vw, 4px)',
      }
    }}
    slotProps={{
      calendarHeader: {
        sx: {
          '& .MuiPickersCalendarHeader-label': {
            fontSize: 'clamp(0.875rem, 2vw, 1rem)'
          }
        },
      },
      day: {
        sx: {
          '& .MuiDayCalendar-header': {
            fontSize: 'clamp(1.5rem, 4vw, 3rem)'
          }
        }
      }    
    }}
  />
</LocalizationProvider>
        </div>
        <div className={DashboardStyles.upcomingApptContainer}>
          <UpcomingAppt/>
        </div>
      </div>
    </div>
  )
}

export default TherapistDashboard
