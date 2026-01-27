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
    // console.log('this is the query:'+req.query)
    // console.log(typeof req.query.therapistId)
    try{
        const selectedTherapist = req.query?.therapistId
        console.log('Selected Therapist', selectedTherapist)
        const therapistIdQuery = await dbConnection.query(`SELECT pthera_id from awp_pthera_tbl WHERE user_id=$1`,[selectedTherapist])
        let therapistId;
        if (therapistIdQuery.rows.legnth === 1){
            therapistId= therapistIdQuery?.rows[0]?.pthera_id
        } else{
            therapistId= req.query?.therapistId
        }

        

        const slots = await dbConnection.query(`select appt_date, appt_start from awp_appt_tbl WHERE therapist_id= $1 AND appt_status != 'cancelled' AND appt_start >= (CURRENT_DATE - INTERVAL '1 days') ORDER BY appt_start;`, [therapistId])
        const bookedSlots = {}
        // console.log('slots', slots.rows)
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

 if (isAuthorized.rows[0].user_role === 3) {
    console.log(`Shiqi is a therapist`); // Fixed: parentheses, not backticks
    
    const therapistID = await dbConnection.query(
        `SELECT pthera_id FROM awp_pthera_tbl WHERE user_id=$1`, 
        [req.session.user.id]
    ); // Fixed: parentheses syntax
    
    const therapistData = await dbConnection.query(
        `SELECT * FROM awp_users_tbl WHERE user_id=$1`,
        [req.session.user.id]
    ); // Fixed: parentheses syntax
    
    const dbActiveAppt = await dbConnection.query(
        `SELECT * FROM awp_appt_tbl 
         WHERE appt_date >= (CURRENT_DATE - INTERVAL '7 days') 
           AND therapist_id = $1`,
        [therapistID.rows[0].pthera_id] // Fixed: extract the actual ID from result
    );
    
    const allActiveAppt = await Promise.all(dbActiveAppt.rows.map(async (r) => {
        const assignedPatientResults = await dbConnection.query(
            `SELECT a.user_fname, a.user_lname 
             FROM awp_users_tbl AS a 
             LEFT JOIN awp_patient_tbl AS b ON a.user_id = b.user_id 
             WHERE b.patient_id=$1`,
            [r.patient_id]
        ); // Fixed: parentheses syntax
        
        return {
            appt_id: r.appt_id,
            patient_id: r.patient_id,
            patient_name: assignedPatientResults.rows[0] 
                ? `${assignedPatientResults.rows[0].user_fname} ${assignedPatientResults.rows[0].user_lname}` 
                : null,
            therapist_id: r.therapist_id,
            therapist_name: therapistData.rows[0] // Fixed: access rows[0]
                ? `${therapistData.rows[0].user_fname} ${therapistData.rows[0].user_lname}` 
                : null,
            appt_status: r.appt_status,
            appt_date: (dayjs(r.appt_date).format('DD MMM YYYY')).toUpperCase(),
            appt_start: dayjs(r.appt_start).format('h:mm A'),
            appt_end: dayjs(r.appt_end).format('h:mm A'),
            mode_of_payment: r.mode_of_payment
        };
    }));
    
    res.json({ allActiveAppt });
}
            if( isAuthorized.rows[0].user_role === 4){

                const dbActiveAppt = await dbConnection.query(`SELECT * FROM awp_appt_tbl WHERE appt_date >= (CURRENT_DATE - INTERVAL '7 days') ORDER BY appt_date ASC, appt_status ;`)

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
        console.log(err)
    }
}

async function bookAppointment (req, res){

    try{
        console.log("Appointment Booking data: "+JSON.stringify(req.body));
        const userId = req.session.user.id
        const therapistUserId = req.body.apptTherapist;

        const therapistIdQuery = await dbConnection.query(`SELECT pthera_id from awp_pthera_tbl WHERE user_id=$1`,[therapistUserId])
        const therapistId= therapistIdQuery.rows[0].pthera_id
        
        // console.log(theraFname)
        // The query below is susceptible to a case where therapists both have the same name and last name, in which case the query would return two users
        // const theraIdLookup = await dbConnection.query(`SELECT pthera_id from awp_pthera_tbl WHERE user_id=(WITH x AS (select * from awp_users_tbl where user_role=3) Select user_id from x WHERE user_fname=$1 AND user_lname=$2);`,[theraFname, theraLname])
        // const theraId = theraIdLookup?.rows[0]?.pthera_id;

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
        const calculatedApptStartTime = dayjs(`${apptDate}T${apptTime}`); 
        const calculatedApptEndTime = (dayjs(calculatedApptStartTime).add(30, 'minute')).format();
        console.log(calculatedApptEndTime)
        // console.log(testVal)
        // console.log(dayjs(apptTime))
        // console.log((dayjs(`${apptDate}T${testVal}`)));
        // console.log(dayjs(apptTime).format("hh:mm"))
        await dbConnection.query(`insert into awp_appt_tbl (patient_id, therapist_id, appt_date, appt_start, appt_end, appt_status,  mode_of_payment) values ($1, $2, $3, $4, $5, 'pending', $6 );`,[patientId, (therapistId || null), apptDate, calculatedApptStartTime, calculatedApptEndTime, mop])

        }
    
    catch(err){
        console.log(err);
        res.send(err);
    }

}

async function getApptOverview(req, res) {

    try{
        if(req?.session?.user?.id){
            const isAuthorized = await dbConnection.query(`SELECT user_role from awp_users_tbl WHERE user_id=$1`, [req.session.user.id])
            console.log(isAuthorized.rows[0].user_role)
            if( isAuthorized.rows[0].user_role === 3){
                const therapistID = await dbConnection.query(`SELECT pthera_id from awp_pthera_tbl WHERE user_id=$1`, [req.session.user.id])
                const totalAppt = await dbConnection.query('SELECT COUNT(appt_id) from awp_appt_tbl WHERE therapist_id=$1;',[therapistID.rows[0].pthera_id])
                const scheduledAppt = await dbConnection.query(`SELECT COUNT(appt_id) from awp_appt_tbl WHERE therapist_id=$1 AND appt_status='scheduled' AND appt_date >= (CURRENT_DATE - INTERVAL \'7 days\');`,[therapistID.rows[0].pthera_id])
                const servedAppt = await dbConnection.query(
                    'SELECT COUNT(*) FROM awp_appt_tbl WHERE therapist_id=$1 AND appt_date = CURRENT_DATE AND appt_status=$2;',
                    [therapistID.rows[0].pthera_id, 'completed']
                );

                const pendingAppt = await dbConnection.query(
                    'SELECT COUNT(*) FROM awp_appt_tbl WHERE therapist_id=$1 AND appt_status=$2 AND appt_date >= (CURRENT_DATE - INTERVAL \'7 days\');',
                    [therapistID.rows[0].pthera_id, 'pending']
                );

                const cancelledAppt = await dbConnection.query(
                    'SELECT COUNT(*) FROM awp_appt_tbl WHERE therapist_id=$1 AND appt_date >= (CURRENT_DATE - INTERVAL \'7 days\') AND appt_status=$2;',
                    [therapistID.rows[0].pthera_id, 'cancelled']
                );

                const rescheduledAppt = await dbConnection.query(
                    'SELECT COUNT(*) FROM awp_appt_tbl WHERE therapist_id=$1 AND appt_date >= (CURRENT_DATE - INTERVAL \'7 days\') AND appt_status=$2;',
                    [therapistID.rows[0].pthera_id, 'rescheduled']
                );                
                res.json({
                    scheduledAppt:scheduledAppt.rows[0].count,
                    totalAppt:totalAppt.rows[0].count,
                    servedAppt:servedAppt.rows[0].count,
                    pendingAppt:pendingAppt.rows[0].count,
                    cancelledAppt:cancelledAppt.rows[0].count,
                    rescheduledAppt:rescheduledAppt.rows[0].count
                })
            }
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
        console.log(err);
        res.status(404).send('idk')
    }
}

async function updateApptStatus(req, res){
    try{
        if(req.session.user.id){
            console.log('Update Endpoint reached')
            const isAuthorized = await dbConnection.query(`SELECT user_role from awp_users_tbl WHERE user_id=$1`, [req.session.user.id])
            if( isAuthorized.rows[0].user_role === 4){
                // console.log('Update Payload: ',req.body)
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

                const patientListResponse = await dbConnection.query(`SELECT a.* FROM awp_users_tbl a INNER JOIN awp_patient_tbl b ON a.user_id = b.user_id`)

                const allPatients = await Promise.all(patientListResponse.rows.map( async (p)=>{
                    return {
                        patientName: `${p.user_fname} ${p.user_lname}`,
                        patientID: p.user_id
                    }
                }))
                res.json(allPatients)
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
            // const currentUserID = req?.session?.user?.id || req?.user?.id || null;
            const appointmentID = req.query.apptID;
            const apptDetails = await dbConnection.query(`SELECT * from awp_appt_tbl WHERE appt_id=$1`,[appointmentID])
            const apptRows = apptDetails.rows[0]

            const therapistID = apptRows.therapist_id
            const therapistSpecialization = await dbConnection.query(`SELECT * from awp_pthera_tbl WHERE pthera_id=$1`,[therapistID])
            const therapistUserID = therapistSpecialization.rows[0].user_id;
                        // console.log('PUTANGINA MO', therapistUserID)

                        const therapistDetails = await dbConnection.query(`SELECT * from awp_users_tbl WHERE user_id=$1`,[therapistUserID])
            const therapistContact = await dbConnection.query(`SELECT contact_value from awp_ucontacts_tbl WHERE user_id=$1`,[therapistUserID])
            const assignedTherapistResult = await dbConnection.query(
              `SELECT u.*
               FROM awp_users_tbl AS u
               INNER JOIN awp_pthera_tbl AS p
               ON u.user_id = p.user_id
               WHERE p.pthera_id = $1`,
              [therapistID])            
            const assignedTherapist = assignedTherapistResult.rows[0];
            const userID = await dbConnection.query(`SELECT user_id from awp_patient_tbl where patient_id=$1`,[apptRows.patient_id])
            const patientData = await dbConnection.query(`SELECT * from awp_users_tbl where user_id=$1`,[userID.rows[0].user_id])
            const patientDataRows = patientData.rows[0]
                // console.log(`APPT DETAILS ENDPOINT: `,patientData.rows[0])
            return res.json({
                patientID: apptRows.patient_id,
                patientFName: patientDataRows.user_fname,
                patientLName: patientDataRows.user_lname,
                patientEmail: patientDataRows.user_logemail,
                patientHmo: patientDataRows.ptn_hmoprov,
                therapistID: therapistID,
                therapistEmail: therapistDetails.rows[0].user_logemail,
                therapistContactNumber: therapistContact.rows[0].contact_value,
                assignedTherapist: assignedTherapist ? `${assignedTherapist.user_fname} ${assignedTherapist.user_lname}`: null,
                therapistSpecialization: therapistSpecialization.rows[0].pthera_special,
                apptStatus : apptRows.appt_status,
                mop: apptRows.mode_of_payment,
                appt_date: (dayjs(apptRows.appt_date).format('DD MMM YYYY')).toUpperCase(),
                appt_start: dayjs(apptRows.appt_start).format('h:mm A'),
                appt_end: dayjs(apptRows.appt_end).format('h:mm A'),        
            })
        } else{
            return res.status.json({
                success:false,
                message:'User not authorized'
            })
        }
    }catch(err){
        console.log(err)
    }
}

async function patientUpdateApptStatus (req, res){
    try{
        // YES the apptID works, im too lazy to change the payload
        const apptID = req.body.apptID.apptID 
        const newApptStatus = req.body.apptNewStatus

        const updateRes = await dbConnection.query(`UPDATE awp_appt_tbl SET appt_status=$1 WHERE appt_id=$2`,[newApptStatus, apptID])
        if (updateRes.rowCount > 0 ){
            return res.status(200).json({
                success:true,
                message:'Appointment Successfully Cancelled'
            })
        }
            return res.status(400).json({
                success:false,
                message:'There was a problem with your request'
            })
        console.log(updateRes.rowCount);
    }catch(err){
        console.log(err)
    }
}

// Therapists

async function getTherapistAppointments(req,res){
    try{
        if(req.session.user.id){
            const isAuthorized = await dbConnection.query(`SELECT user_role from awp_users_tbl WHERE user_id=$1`, [req.session.user.id])
            const therapistID = await dbConnection.query(`SELECT pthera_id from awp_pthera_tbl WHERE user_id=$1`, [req.session.user.id])

            if( isAuthorized.rows[0].user_role === 3){
                const totalAppt = await dbConnection.query('SELECT COUNT(appt_id) from awp_appt_tbl where therapist_id=$1;',[therapistID])

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
                
            }else{
                res.json({message:'User is not a Therapist'})
            }
        }else{
            res.json({message:'User not authorized.'})
        }

    }catch(err){
        console.log(err);
        res.status(404).send('idk')
    }
}

async function patchRescheduleMyAppt (req, res){
    console.log('patient rechedule patch')
    console.log(req.body)
    try{
        // console.log("Appointment Booking data: "+JSON.stringify(req.body));
        const userId = req.session.user.id
        const patientUserId = req.body.patientID;

        const therapistId= req.body.therapistID;
        
        
        const {           
            apptDate,
            apptId,
            apptTime,
            apptTherapist,
            service,
            mop,
            hmoProvider,
        } = req.body

        // const therapistQuery = await dbConnection.query(`SELECT * from awp_pthera_tbl where pthera_id=$1`,[apptTherapist])
        // const therapistResult = therapistQuery.rows[0]
        // console.log(therapistResult)
        const formattedDate=dayjs(apptDate).format('YYYY-MM-DD');
        console.log()
        // return res.json({message:'cut'})
        const calculatedApptStartTime = dayjs(`${formattedDate}T${apptTime}`); 
        console.log('Calculated Start', dayjs(calculatedApptStartTime).format('YYYY-MM-DD'))
        return res.json({message:'cut'})
        const calculatedApptEndTime = (dayjs(calculatedApptStartTime).add(30, 'minute')).format();
        
        const result = await dbConnection.query(`UPDATE awp_appt_tbl SET appt_date=$1, appt_start=$2, appt_end=$3, appt_status=$4, mode_of_payment=$5 WHERE appt_id=$6 ;`,[ apptDate, calculatedApptStartTime, calculatedApptEndTime, 'reschedule',mop, req.body.apptId.apptId])
            console.log('Query Status:', result.rowCount)
        }
    
    catch(err){
        console.log(err);
        res.send(err);
    }

}


export {patchRescheduleMyAppt, getBookedDates, bookAppointment, getApptOverview, getAllApptData, updateApptStatus, getPatientsList, getApptDetails, patientUpdateApptStatus, getTherapistAppointments};