import e from 'express';
import dbConnection from '../db.js';
import dayjs from 'dayjs';

async function getServices(req, res){
    try{
         if(req.session.user.id){
           const isAuthorized = await dbConnection.query(`SELECT user_role from awp_users_tbl WHERE user_id=$1`, [req.session.user.id])

           if( isAuthorized.rows[0].user_role < 5){
        const servicesResponse = await dbConnection.query(`SELECT * from awp_apptservice_tbl;`)

        const allServices = await Promise.all(servicesResponse.rows.map( async (s)=>{
            return{
                serviceID: s.service_id,
                serviceName: s.service_name,
                serviceTotalSessions: s.total_session,
            }
        }))
        return res.json(allServices)
            }
        }
    }catch(err){
        console.log(err)
    }
}

async function getTherapists(req, res){
    try{
        // if(req.session.user.id){
            const therapistIDs = await dbConnection.query(`SELECT  user_id from awp_pthera_tbl`)
            // const ids = therapistIDs.rows.map(id => id.pthera_id)
            const therapistList = await Promise.all(therapistIDs.rows.map(async (r) => {
                const therapist = await dbConnection.query(`SELECT user_fname, user_lname from awp_users_tbl WHERE user_id = $1`,[r.user_id])
            
                return{
                    therapistId: r.user_id,
                    therapistName: `${therapist.rows[0].user_fname} ${therapist.rows[0].user_lname}`
                }
            }))
        // }
            // console.log(therapistList)
        return res.json(therapistList)
    }catch(err){
        console.log(err)
    }
}

async function getPatients(req, res){

    try{
        const allPatientsQuery = await dbConnection.query(`SELECT * from awp_users_tbl ORDER BY user_id`);
        
        const patientsList = await Promise.all(allPatientsQuery.rows.map(async (p) => {

            const patientMostRecentPaymentMethod = await dbConnection.query(`SELECT ptn_hmoprov from awp_patient_tbl WHERE user_id=$1 limit 1;`,[p.user_id])
            // console.log(patientMostRecentPaymentMethod.rows[0].ptn_hmoprov)
            return {
                patientId: p.user_id,
                patientName: `${p.user_fname} ${p.user_lname}`,
                branch: 'Zabarte',
                paymentMethod: patientMostRecentPaymentMethod.rows[0]?.ptn_hmoprov ?? 'CASH or N/A',
                dateCreated: dayjs(p.created_at).format('DD MMM YYYY')
            }
        }))
        return res.json(patientsList)
    }catch(err){
        console.log(err)
    }
}

async function getPatientData(req, res){
    const patientId = req.query.patientId
    try{

         const patientData = await dbConnection.query('Select * from awp_patient_tbl where user_id=$1',[patientId])
            // console.log(patientData.rows[0])
        // if (patientData === undefined){
        //     res.json({
        //         success: false, 
        //         error: 'Patient Data missing',
        //         message: "Patient Data Missing"
        //     })
        // }
         if (patientData.rows.length === 0){
            return res.status(404).json({
                success: false,
                message: 'Patient not found',
                is_profile_complete: false
            })
        }
        const calculateAge = await dbConnection.query(`SELECT *, DATE_PART('year', AGE(ptn_dob)) AS age FROM awp_patient_tbl where user_id=$1`, [patientId])
        const extractDob = await dbConnection.query(`SELECT TO_CHAR(ptn_dob, 'YYYY-MM-DD') AS dob FROM awp_patient_tbl WHERE user_id = $1`, [patientId])
       

        const patient = patientData.rows[0]
        const patientAge = calculateAge.rows[0].age
        console.log(patient)
        res.json({
            success: true,
            message: "Fetched successfully",
            patientData: {
                patientId: patient.patient_id,
                dob: extractDob.rows[0].dob,
                age: patientAge,
                gender: patient.ptn_sex,
                unit:patient.ptn_addrunit,
                street:patient.ptn_addrst,
                barangay:patient.ptn_addrbrgy,
                city: patient.ptn_addrcity,
                zipcode: patient.zipcode,
                hmoCardPresented: patient?.ptn_hmoprov ?? null,
                hmoNumber: patient?.ptn_hmoidnum ?? null,
                id: patient.ptn_validtype,
                idNumber: patient.ptn_validnum,
                employer: patient.ptn_employer,
                econtact: patient.ptn_econtactname,
                enumber: patient.ptn_econtactnum,
            },
 
        })
        
    }catch(err){
        console.log(err)
    }
}

async function getUserPersonalData(req, res){
    try{
        const userId = req.query.userId

        const userDataQuery = await dbConnection.query(`SELECT a.user_logemail AS email, a.user_id AS id, b.patient_id AS pxId, a.user_fname AS firstName, a.user_mname AS middleName ,a.user_lname AS lastName, c.contact_value AS contact_number, a.is_profile_complete FROM awp_users_tbl AS a LEFT JOIN awp_patient_tbl AS b ON a.user_id = b.user_id LEFT JOIN awp_ucontacts_tbl AS c ON a.user_id = c.user_id WHERE a.user_id=$1;`, [userId])
        const userData = userDataQuery.rows[0]

        return res.json({
            email: userData.email,
            firstName: userData.firstname,
            middleName: userData.middlename,
            lastName: userData.lastname,
            contact_number: userData.contact_number,
        });
    }catch(err){
        console.log(err)
    }
}
export { getServices, getTherapists, getPatients, getPatientData, getUserPersonalData}