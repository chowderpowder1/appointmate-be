import dbConnection from '../db.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import duration from 'dayjs/plugin/duration.js';
// Extend dayjs with the plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(duration)

async function getBookedDates (req, res) {

    // Fetches all booked dates from the current day onwards

    try{
        const slots = await dbConnection.query(`select appt_date, appt_start from awp_appt_tbl WHERE appt_status != 'cancelled' AND appt_start >= (CURRENT_DATE - INTERVAL '1 days') ORDER BY appt_start;`)
        const bookedSlots = {}

        slots.rows.forEach(row => {
            const tzConvertedDate = dayjs(row.appt_start).tz("Asia/Manila").format("YYYY-MM-DD HH:mm")          
              const date = tzConvertedDate.split(' ')[0];
              const time = tzConvertedDate.split(' ')[1];
            // const date = row.appt_start.toISOString().split('T')[0];
            // const time = row.appt_start.toISOString().substr(11,5);

            if(!bookedSlots[date]) bookedSlots[date] = [];
            bookedSlots[date].push(time);
        })
        console.log('Booked Slots', bookedSlots)
        res.send({ appointments: bookedSlots })
    }catch(err){
        console.log(err)
    }

}

async function getAllApptData(req, res) {
    try{
        if(req.session.user.id){
            const isAuthorized = await dbConnection.query(`SELECT user_role from awp_users_tbl WHERE user_id=$1`, [req.session.user.id])

            if( isAuthorized.rows[0].user_role === 4){

                const dbActiveAppt = await dbConnection.query(`SELECT * FROM awp_appt_tbl WHERE appt_date >= (CURRENT_DATE - INTERVAL '7 days');`)

                const allActiveAppt = await Promise.all( dbActiveAppt.rows.map( async (r)=>{
                {
                    const assignedTherapistResult = await dbConnection.query(
                      `SELECT u.*
                       FROM awp_users_tbl AS u
                       INNER JOIN awp_pthera_tbl AS p
                       ON u.user_id = p.user_id
                       WHERE p.pthera_id = $1`,
                      [r.therapist_id])

                      const assignedPatientResults = await dbConnection.query(`SELECT a.user_fname, a.user_lname FROM awp_users_tbl AS a LEFT JOIN awp_patient_tbl AS b ON a.user_id = b.user_id WHERE b.patient_id=$1`,[r.patient_id])
                    //   console.log('Test Value: ', assignedPatientResults.rows[0])
                    const assignedTherapist = assignedTherapistResult.rows[0];

                    return {
                        appt_id: r.appt_id,
                        patient_id: r.patient_id,
                        patient_name: assignedPatientResults.rows[0] ? `${assignedPatientResults.rows[0].user_fname} ${assignedPatientResults.rows[0].user_lname}` : null ,
                        therapist_id: r.therapist_id,
                        therapist_name: assignedTherapist ? `${assignedTherapist.user_fname} ${assignedTherapist.user_lname}`: null,
                        appt_status: r.appt_status,
                        appt_date: (dayjs(r.appt_date).format('DD MMM YYYY')).toUpperCase(),
                        appt_start: dayjs(r.appt_start).format('h:mm A'),
                        appt_end: dayjs(r.appt_end).format('h:mm A'),
                        mode_of_payment: r.mode_of_payment
                    }                
                }
            }))
            res.json({allActiveAppt})
            }
        } else{
            res.json({message:'User not authorized.'})
        }

    }catch(err){

    }
}

async function bookAppointment (req, res){

    try{
        console.log("Appointment Booking data: "+JSON.stringify(req.body));
        const userId = req.session.user.id
        const theraFname = req.body.apptTherapist.split(' ')[0]
        const theraLname = req.body.apptTherapist.split(' ')[1]
        // console.log(theraFname)
        // The query below is susceptible to a case where therapists both have the same name and last name, in which case the query would return two users
        const theraIdLookup = await dbConnection.query(`SELECT pthera_id from awp_pthera_tbl WHERE user_id=(WITH x AS (select * from awp_users_tbl where user_role=3) Select user_id from x WHERE user_fname=$1 AND user_lname=$2);`,[theraFname, theraLname])
        console.log('Therapist ID LOOKUP:', theraIdLookup.rows[0])
        const theraId = theraIdLookup.rows[0].pthera_id;

        const patientIdLookup = await dbConnection.query(`SELECT patient_id from awp_patient_tbl WHERE user_id=$1;`,[userId])
        const patientId= patientIdLookup?.rows[0]?.patient_id
        // console.log('Patient Id Lookup' + patientIdLookup.rows[0].patient_id)
        
        const {           
            apptDate,
            apptTime,
            apptTherapist,
            mop,
            hmoProvider,
        } = req.body
        console.log(apptTime)
        console.log(apptDate)
        const calculatedApptStartTime = new Date(`${apptDate}T${apptTime}`) 
        const calculatedApptEndTime = (dayjs(calculatedApptStartTime).add(30, 'minute')).format();
        console.log(calculatedApptEndTime)
        // console.log(testVal)
        // console.log(dayjs(apptTime))
        // console.log((dayjs(`${apptDate}T${testVal}`)));
        // console.log(dayjs(apptTime).format("hh:mm"))
        await dbConnection.query(`insert into awp_appt_tbl (patient_id, therapist_id, appt_date, appt_start, appt_end, appt_status,  mode_of_payment) values ($1, $2, $3, $4, $5, 'pending', $6 );`,[patientId, (theraId || null), apptDate, calculatedApptStartTime, calculatedApptEndTime, mop])

        }
    
    catch(err){
        console.log(err);
        res.send(err);
    }

    // dbConnection.query(`INSERT INTO awp_appt_tbl () values ()`)
}

async function getApptOverview(req, res) {
    try{
        if(req.session.user.id){
            const isAuthorized = await dbConnection.query(`SELECT user_role from awp_users_tbl WHERE user_id=$1`, [req.session.user.id])

            if( isAuthorized.rows[0].user_role === 4){
                const totalAppt = await dbConnection.query('SELECT COUNT(appt_id) from awp_appt_tbl;')

                const servedAppt = await dbConnection.query(`SELECT COUNT(*) FROM awp_appt_tbl WHERE appt_date = CURRENT_DATE AND appt_status='completed';`)

                const pendingAppt = await dbConnection.query(`SELECT COUNT(*) FROM awp_appt_tbl WHERE appt_status='pending';`)

                const cancelledAppt = await dbConnection.query(`SELECT COUNT(*) FROM awp_appt_tbl WHERE appt_date >= (CURRENT_DATE - INTERVAL '7 days') AND appt_status='cancelled';`)

                const rescheduledAppt = await dbConnection.query(`SELECT COUNT(*) FROM awp_appt_tbl WHERE appt_date >= (CURRENT_DATE - INTERVAL '7 days') AND appt_status='rescheduled';`)

                res.json({
                    totalAppt:totalAppt.rows[0].count,
                    servedAppt:servedAppt.rows[0].count,
                    pendingAppt:pendingAppt.rows[0].count,
                    cancelledAppt:cancelledAppt.rows[0].count,
                    rescheduledAppt:rescheduledAppt.rows[0].count
                })
            }
        }else{
            res.json({message:'User not authorized.'})
        }

    }catch(err){
        res.status(404).send('idk')
    }
}

async function updateApptStatus(req, res){
    try{
        if(req.session.user.id){
            console.log('Update Endpoint reached')
            const isAuthorized = await dbConnection.query(`SELECT user_role from awp_users_tbl WHERE user_id=$1`, [req.session.user.id])
            if( isAuthorized.rows[0].user_role === 4){
                console.log('Update Payload: ',req.body)
                const {
                    appt_id,
                    appt_status
                } = req.body
                const updateResult = await dbConnection.query(`UPDATE awp_appt_tbl SET appt_status='scheduled' WHERE appt_id=$1`, [appt_id])

                if( updateResult.rowCount === 0){
                    return res.status(404).json({sucess: false, message: 'Appointment Not found'})
                }

                return res.status(200).json({ success:true, message: "Updated"})
            }
        } 
        else{
            res.json({message: 'User not Authorized'})
        }
    }catch(err){
        res.send({message: 'There was a problem with your request'})
    }
}

async function getPatientsList(req, res){
    try{
        if(req.session.user.id){
           console.log('Update Endpoint reached')
           const isAuthorized = await dbConnection.query(`SELECT user_role from awp_users_tbl WHERE user_id=$1`, [req.session.user.id])

           if( isAuthorized.rows[0].user_role < 5){
                const patientListResponse = await dbConnection.query(`select user_id, user_fname, user_lname from awp_users_tbl WHERE user_role=5 ORDER BY user_fname`)

                const allPatients = await Promise.all(patientListResponse.rows.map( async (p)=>{
                    return {
                        patientName: `${p.user_fname} ${p.user_lname}`,
                        patientID: p.user_id
                    }
                }))
                res.json({allPatients})
            }
        }
        else if(!req.session.user.id){
            res.json({message: 'User not authorized.'})
        }
    }catch(err){
        console.log(err)
    }
}

async function getApptDetails(req,res){
    console.log('Appt Details Endpoint')
    try{
        if (req.session.user || req.user) {
            const appointmentID = req.query.apptID;
            const apptDetails = await dbConnection.query(`SELECT * from awp_appt_tbl WHERE appt_id=$1`,[appointmentID])
            const apptRows = apptDetails.rows[0]
            const therapistID = apptRows.therapist_id
            const assignedTherapistResult = await dbConnection.query(
              `SELECT u.*
               FROM awp_users_tbl AS u
               INNER JOIN awp_pthera_tbl AS p
               ON u.user_id = p.user_id
               WHERE p.pthera_id = $1`,
              [therapistID])            
                console.log(assignedTherapistResult.rows[0])
            console.log(apptRows)
            return res.status(200).json({
                assignedTherapist: assignedTherapist ? `${assignedTherapist.user_fname} ${assignedTherapist.user_lname}`: null,
                
            })
        }
    }catch(err){

    }
}
export {getBookedDates, bookAppointment, getApptOverview, getAllApptData, updateApptStatus, getPatientsList, getApptDetails};