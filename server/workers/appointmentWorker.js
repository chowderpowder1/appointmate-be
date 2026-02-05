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

const test = await dbConnection.query(`SELECT * from awp_appt_tbl`)

notificationQueue.process('send-reminder', async(job)=> {
    // const { appointmentId, userId, appointmentTime } = job.data;
  // console.log('Processing bull job:', job.data);  
    // console.log('before format:', job.data.pot.appt_start)
    // console.log('frieren', dayjs.utc(job.data.pot.appt_start).tz('Asia/Manila').format('MMMM D, YYYY h:mm A'));

  const patientQuery = await dbConnection.query(`SELECT a.* FROM awp_users_tbl AS a INNER JOIN awp_patient_tbl as B ON a.user_id = b.user_id WHERE B.patient_id=$1;`,[ job.data.pot.patient_id])

  // const patientIdQuery = await dbConnection.query(`SELECT patient_id FROM awp_patients_tbl WHERE `)

  const name = patientQuery.rows[0].user_fname.slice(0,1).toUpperCase()+patientQuery.rows[0].user_fname.slice(1);
  const date =  dayjs.utc(job.data.pot.appt_start).tz('Asia/Manila').format('MMMM D, YYYY')
  const time =  dayjs.utc(job.data.pot.appt_start).tz('Asia/Manila').format('h:mm A')
  const message = `Hi ${name},

        Your appointment has been successfully scheduled. Here are the details:

        Service: {{service_name}}
        Date: ${date}
        Time: ${time}
        Location: JDC Building Blk 5 Lot 9 Zabarte Road, Hobart Village, Brgy Kaligayahan, Novaliches, Quezon City , Quezon City        
        Staff/Provider: {{provider_name}}

        If you need to reschedule or cancel, please let us know at least {{cancellation_policy_hours}} hours in advance by replying to this email or contacting us at 0981 263 3658.

        We look forward to seeing you!

        Best regards,
        Accelerated Wellness & Pain Clinic
        0981 263 3658 | Appointmate.com`;

  // sendNotification('hello world')
        console.log('fuck you', message)  
  try {
    
    console.log('Successfull Bull job')    
    return { success: true };
    
  } catch (error) {
    console.error('❌ Job failed:', error);
  }
});
const pot = test.rows[0]
await notificationQueue.add('send-reminder',{
  pot
})