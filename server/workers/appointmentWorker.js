import dbConnection from '../db.js';
import {notificationQueue} from '../Queues/appointmentQueue.js'
import {sendNotification} from '../Services/sendNotification.js'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

  setInterval(() => {
  console.log('worker heartbeat');
}, 5000);  


notificationQueue.process('send-reminder', async(job)=> {
    // const { appointmentId, userId, appointmentTime } = job.data;
  // console.log('Processing bull job:', job.data);  
    // console.log('before format:', job.data.apptData.appt_start)
    // console.log('frieren', dayjs.utc(job.data.apptData.appt_start).tz('Asia/Manila').format('MMMM D, YYYY h:mm A'));
    console.log(job.data.type)


  try {

      const patientQuery = await dbConnection.query(`SELECT a.* FROM awp_users_tbl AS a INNER JOIN awp_patient_tbl as B ON a.user_id = b.user_id WHERE B.patient_id=$1;`,[ job.data.apptData.patient_id])

  // const patientIdQuery = await dbConnection.query(`SELECT patient_id FROM awp_patients_tbl WHERE `)
  const therapistId = job.data.apptData.therapist_id
  const therapistName = await dbConnection.query(`SELECT b.* FROM awp_pthera_tbl AS a INNER JOIN awp_users_tbl AS b ON a.user_id = b.user_id WHERE a.pthera_id=$1;`, [therapistId])
  const name = patientQuery.rows[0].user_fname.slice(0,1).toUpperCase()+patientQuery.rows[0].user_fname.slice(1);
  const email = patientQuery.rows[0].user_logemail;
  const date =  dayjs.utc(job.data.apptData.appt_start).tz('Asia/Manila').format('MMMM D, YYYY')
  const time =  dayjs.utc(job.data.apptData.appt_start).tz('Asia/Manila').format('h:mm A')

  if(job.data.type='confirmation'){
      console.log('If block form confirmation triggered')
      const subject = `Appointment Confirmation with Accelerated Wellness & Pain Clinic on ${date}`

    const message = `Hi ${name},

        Your appointment has been approved. Here are the details:

        Date: ${date}
        Time: ${time}
        Location: JDC Building Blk 5 Lot 9 Zabarte Road, Hobart Village, Brgy Kaligayahan, Novaliches, Quezon City , Quezon City        
        Staff/Provider: ${therapistName.rows[0].user_fname.slice(0,1).toUpperCase()+ therapistName.rows[0].user_fname.slice(1)} ${therapistName.rows[0].user_lname}

        If you need to reschedule or cancel, please let us know at least in advance by updating the status of your appointment or by replying to this email.

        We look forward to seeing you!

        Best regards,
        Accelerated Wellness & Pain Clinic
        0981 263 3658 | Appointmate.com`;

      sendNotification(email, message, subject)

  } else if(job.data.type='reminder'){
     const subject = `Friendly Reminder: Your Upcoming Appointment with Accelerated Wellness & Pain Clinic on ${date}`

    const message = 

        `Hi ${name},

        This is a reminder that you have an appointment scheduled on ${date} at [${time}.

        If you need to reschedule or cancel, please let us know at your earliest convenience.

        We look forward to seeing you!

        Best regards,
        Accelerated Wellness & Pain Clinic
        0981 263 3658 | Appointmate.com`;

      sendNotification(email, message, subject)
  }


    console.log('Successfull Bull job')    
    return { success: true };
    
  } catch (error) {
    console.error('❌ Job failed:', error);
  }
});

// const test = await dbConnection.query('SELECT appt_start, appt_date from awp_appt_tbl');
// const testDate = dayjs('02-14-2026')

// console.log(test.rows[0].appt_date)
// console.log(dayjs(testDate).subtract(1, 'day').format('YYYY DD MM'));
// console.log((dayjs(testDate).subtract(1, 'day')).valueOf() - Date.now());