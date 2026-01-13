import dbConnection from '../db.js';
import dayjs from "dayjs";

async function submitUserData(req, res){
    console.log(req.body);
    const profileCompleted = true;
    const {
    id,
    middleName,
    gender,
    dob,
    contactNumber,
    employer,
    street,
    city,
    religion,
    unit,
    barangay,
    zipcode,
    idType,
    idNumber,
    hmoName,
    hmoNumber,
    emergencyContactInfo: {
        contactPerson,
        relationship,
        emergencyContactNumber,
        altNumber,
    },
    } = req.body;
    console.log('THIS IS THE FUCKING ID: ', id)
    try{
        await dbConnection.query('INSERT INTO awp_patient_tbl (user_id, ptn_dob, ptn_employer, ptn_addrst, ptn_addrcity, religion, ptn_addrunit, ptn_addrbrgy, zipcode, ptn_validtype, ptn_validnum, ptn_hmoprov, ptn_hmoidnum, ptn_econtactname, ptn_econtactrelation, ptn_econtactnum, ptn_econtactaltnum, ptn_sex) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) ', [id, dob, employer, street, city, religion, unit, barangay, zipcode, idType, idNumber, hmoName, hmoNumber, contactPerson, relationship, emergencyContactNumber, altNumber, gender ])

        await dbConnection.query('UPDATE awp_users_tbl SET user_mname=$1, is_profile_complete=$2 WHERE user_id=$3', [middleName, profileCompleted, id])

        // await dbConnection.query(`INSERT INTO awp_ucontacts_tbl (user_id, contact_type_id, contact_value) values ( $1, $2, $3)`,[id,1 , contactNumber])

        // await dbConnection.query(`ALTER TABLE awp_users_tbl set is_`)
    } catch (err){
        console.log(err);
    }
    return res.send("Forms Submitted");
}

async function getUserData(req, res){
    const userId= req.session.user.id;
    try{
        const patientData = await dbConnection.query('Select * from awp_patient_tbl where user_id=$1',[userId])
        // if (patientData === undefined){
        //     res.json({
        //         success: false, 
        //         error: 'Patient Data missing',
        //         message: "Patient Data Missing"
        //     })
        // }
        const calculateAge = await dbConnection.query(`SELECT *, DATE_PART('year', AGE(ptn_dob)) AS age FROM awp_patient_tbl where user_id=$1`, [userId])
        const extractDob = await dbConnection.query(`SELECT TO_CHAR(ptn_dob, 'YYYY-MM-DD') AS dob FROM awp_patient_tbl WHERE user_id = $1`, [userId])
        if (patientData.rows.length === 0){
            return res.status(404).json({
                success: false,
                message: 'Patient not found',
                is_profile_complete: false
            })
        }
        const patient = patientData.rows[0]
        const patientAge = calculateAge.rows[0].age
        res.json({
            success: true,
            message: "Fetched successfully",
            patientData: {
                dob: extractDob.rows[0].dob,
                age: patientAge,
                gender: patient.ptn_sex,
                unit:patient.ptn_addrunit,
                street:patient.ptn_addrst,
                barangay:patient.ptn_addrbrgy,
                city: patient.ptn_addrcity,
                zipcode: patient.zipcode,
                hmoCardPresented: patient.ptn_hmoprov,
                hmoNumber: patient.ptn_hmoidnum,
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

async function getMyAppointments(req, res){

    try{    

        if(req.session.user.patientId){
            const userAppointmentsResponse = await dbConnection.query(`SELECT * FROM awp_appt_tbl WHERE patient_id=$1 ORDER BY appt_start DESC`,[req.session.user.patientId])
            const apptRows = userAppointmentsResponse.rows
            // console.log('appt rows', apptRows)
            // const apptDate = ((apptRows[0].appt_date).toString()).split('T')[0]
            // console.log(apptDate)

            const userAppointments = await Promise.all( apptRows.map( async (r)=>{

                {
                    const assignedTherapistResult = await dbConnection.query(
                      `SELECT u.*
                       FROM awp_users_tbl AS u
                       INNER JOIN awp_pthera_tbl AS p
                       ON u.user_id = p.user_id
                       WHERE p.pthera_id = $1`,
                      [r.therapist_id])

                    const assignedTherapist = assignedTherapistResult.rows[0];
                    return {
                        appt_id: r.appt_id,
                        patient_id: r.patient_id,
                        therapist_id: r.therapist_id,
                        therapist_name: assignedTherapist ? `${assignedTherapist.user_fname} ${assignedTherapist.user_lname}`: null,
                        service_id: r.service_id,
                        appt_status: r.appt_status,
                        appt_date: (dayjs(r.appt_date).format('DD MMM YYYY')).toUpperCase(),
                        appt_start: dayjs(r.appt_start).format('h:mm A'),
                        appt_day_of_week: dayjs(r.appt_start).format('dddd'),
                        appt_end: dayjs(r.appt_end).format('h:mm A'),
                        when_range: r.when_range,
                        mode_of_payment: r.mode_of_payment
                    }
                
                }
        }))
            res.json({userAppointments})
        }

    }catch(err){
        console.log(err)
    }
}

async function updateUserData(req,res){
    console.log('update endpoint reached')
    try{
        if (req?.session?.user || req?.user) {
            const currentUserID = req?.session?.user?.id || req?.user?.id || null;
            console.log(`User ID Exists:`,currentUserID)
            const {
              middleInitial,
              firstName,
              lastName,
              contact_number,
              ...patientData
            } = req.body;
        
            const userData = {
              middleInitial,
              firstName,
              lastName,
              contact_number
            };   
            
            const userDataUpdate = await dbConnection.query(
              `UPDATE awp_users_tbl 
               SET user_fname = $1,
                   user_mname = $2,
                   user_lname = $3
               WHERE user_id = $4`,
              [
                userData.firstName,
                userData.middleInitial,
                userData.lastName,
                currentUserID
              ]
            );            
            if(userDataUpdate.rowCount > 0){
                console.log(`userData Update successful`)
            }else{
                console.log('Problem with data update of patient')
                res.status(400).json({message:'There was a problem in updating your information'})
            }
            const userContactUpdate = await dbConnection.query(
                `UPDATE awp_ucontacts_tbl
                SET contact_value= $1
                WHERE user_id= $2`,
                [
                    userData.contact_number,
                    currentUserID
                ])

            if(userContactUpdate.rowCount > 0){
                console.log(`User Contact Update successful`)
                
            }else{
                console.log('Problem with data update of patient')
                res.status(400).json({message:'There was a problem in updating your information'})
            }                
                const patientDataUpdate = await dbConnection.query(
                  `UPDATE awp_patient_tbl 
                   SET ptn_dob = $1,
                       ptn_sex = $2,
                       ptn_addrunit = $3,
                       ptn_addrst = $4,
                       ptn_addrbrgy = $5,
                       ptn_addrcity = $6,
                       zipcode = $7,
                       ptn_hmoprov = $8,
                       ptn_hmoidnum = $9,
                       ptn_validtype = $10,
                       ptn_validnum = $11,
                       ptn_employer = $12,
                       ptn_econtactname = $13,
                       ptn_econtactnum = $14,
                       updated_at = NOW()
                   WHERE patient_id = $15`,
                  [
                    patientData.dob,
                    patientData.gender,
                    patientData.unit,
                    patientData.street,
                    patientData.barangay,
                    patientData.city,
                    patientData.zipcode,
                    patientData.hmoCardPresented,
                    patientData.hmoNumber,
                    patientData.id,
                    patientData.idNumber,
                    patientData.employer,
                    patientData.econtact,
                    patientData.enumber,
                    req.session.user.patientId
                  ]
                );
                
            if(patientDataUpdate.rowCount > 0){
                console.log(`Patient Data Update successful`)
            } else{
                console.log('Problem with data update of patient')
                res.status(400).json({message:'There was a problem in updating your information'})
            }

            res.status(200).json({message:'All Data updated successfully'})
        }else{
            return res.json({message: 'User is not authorized'})
        }
    }catch(err){
        console.log(err)
    }
}
export {submitUserData, getUserData, getMyAppointments, updateUserData};