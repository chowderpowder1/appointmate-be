import dbConnection from '../db.js';
import dayjs from "dayjs";
import { v2 as cloudinary} from 'cloudinary';

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
            const userAppointmentsResponse = await dbConnection.query(`SELECT * FROM awp_appt_tbl WHERE patient_id=$1 ORDER BY created_at DESC`,[req.session.user.patientId])
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

async function getMyRecords(req, res){
    try{
         if (req?.session?.user || req?.user) {
            const patientUserId = req?.session?.user?.id || req?.user?.id || null;
            console.log(`User ID Exists:`,patientUserId)
            const patientIdQuery = await dbConnection.query(`SELECT patient_id from awp_patient_tbl WHERE user_id=$1`,[patientUserId])
            const patientId = patientIdQuery.rows[0].patient_id;
            console.log('does it exist?', patientId)
            const activeApptQuery = await dbConnection.query(`SELECT appt_id from awp_appt_tbl where patient_id=$1 ORDER BY CREATED_AT desc limit 1;`,[patientId])
            const activeAppt = activeApptQuery.rows[0].appt_id

            const evalQuery = await dbConnection.query(`SELECT * from awp_ptneval_tbl where patient_id=$1`,[patientId])
            const evalData = evalQuery.rows[0]

            const medHistoryQuery = await dbConnection.query(`SELECT * from awp_ptnmedhistory_tbl where patient_id=$1`,[patientId])
            const medhistoryData = medHistoryQuery.rows[0]

            const palpationQuery = await dbConnection.query(`SELECT * from awp_ptnpalpation_tbl where patient_id=$1`,[patientId])
            const palpationData = palpationQuery.rows[0]

            const painQuery = await dbConnection.query(`SELECT * from awp_ptnpain_tbl where patient_id=$1`,[patientId])
            const painData = painQuery.rows[0]

            const {
              eval_diagnosis = '',
              eval_chfcomplaint = '',
              eval_specnotes = '',
              eval_othernotes = '',
            } = evalData || {};
                
            const {
                ptn_hasctscan,
                ptn_hasxray,
                ptn_hasmri,
                ptn_hasallergies,
                ptn_allergyinfo,
                ptn_hasdse,
                ptn_hospitalization,
                ptn_hascancer,
                ptn_hasdiabetes,
                ptn_hashypertens,
                ptn_medhistorynotes,
                } = medhistoryData

            const {
                ptn_edemaon: edemaOn = false,
                ptn_edemanotes: edemaNotes = "",
                ptn_noduleon: nodulesOn = false,
                ptn_nodulesnotes: nodulesNotes = "",
                ptn_muscleson: musclesOn = false,
                ptn_musclessnotes: musclesNotes = "",
                ptn_tautbandson: tautBandsOn = false,
                ptn_tautbandsnotes: tautBandNotes = "",
                ptn_jtinfusionon: jtEffusionOn = false,
                ptn_jtinfusionnotes: jtEffusionNotes = "",
                ptn_lomon: lomOn = false,
                ptn_lomnotes: lomNotes = "",
                ptn_tendernesson: tendernessOn = false,
                ptn_tendernessnotes: tendernessNotes = ""
            } = palpationData;

            const{
                ptn_pain_id,
                pain_type_id,
                ptn_locarea,
                ptn_reliefby,
                ptn_elicitedby,
                
            } = painData

            const painTypeQuery = await dbConnection.query(`SELECT * from awp_ptnpaintype_tbl where pain_type_id=$1`,[pain_type_id])
            const painType = painTypeQuery?.rows[0]

            const oIQuery = await dbConnection.query(`SELECT * from awp_ptnobvimp_tbl where appt_id=$1`,[activeAppt])
            const oIData = oIQuery?.rows[0]

            const apptServiceIdQuery = await dbConnection.query(`SELECT service_id from awp_appt_tbl where appt_id=$1`,[activeAppt])
            const apptServiceIdData = apptServiceIdQuery?.rows[0]?.service_id
            
            const appServiceQuery = await dbConnection.query(`SELECT service_name FROM awp_apptservice_tbl where service_id=$1`, [apptServiceIdData])
            const appServiceData = appServiceQuery?.rows[0]?.service_name

            
const {
    ptn_posturaldev = '',
    ptn_atrophy = '',
    ptn_swellingon = '',
    ptn_erythemaon = '',
    ptn_ambulatory = '',
    ptn_deformity = '',
    ptn_othernotes = '',
    ptn_erythemanotes = '',
    ptn_swellingnotes = ''
} = oIData || {};

const {
    pain_scale = 0,
    pain_type = ''
} = painType || {};

var payload = { 
    // Diagnosis & Complaints
    diagnosis: eval_diagnosis || '',
    complaint: eval_chfcomplaint || '',
    otherNotes: eval_othernotes || '',
    specNotes: eval_specnotes || '',
    
    // Med History
    CTScan: ptn_hasctscan || false,
    XRay: ptn_hasxray || false,
    mri: ptn_hasmri || false,
    allergies: ptn_hasallergies || false,
    allergyInfo: ptn_allergyinfo || '',
    cardioPulmoDSE: ptn_hasdse || false,
    hospitalization: ptn_hospitalization || '',
    cancer: ptn_hascancer || false,
    diabetesMellitus: ptn_hasdiabetes || false,
    hypertension: ptn_hashypertens || false,
    medHistoryNotes: ptn_medhistorynotes || '',
    
    // Palpation
    edemaOn: edemaOn || '',
    edemaNotes: edemaNotes || '',
    nodulesOn: nodulesOn || '',
    nodulesNotes: nodulesNotes || '',
    musclesOn: musclesOn || '',
    musclesNotes: musclesNotes || '',
    tautBandsOn: tautBandsOn || '',
    tautBandNotes: tautBandNotes || '',
    jtEffusionOn: jtEffusionOn || '',
    jtEffusionNotes: jtEffusionNotes || '',
    lomOn: lomOn || '',
    lomNotes: lomNotes || '',
    tendernessOn: tendernessOn || '',
    tendernessNotes: tendernessNotes || '',
    
    // Pain
    localizedOnArea: ptn_locarea || '',
    reliefBy: ptn_reliefby || '',
    elicitedBy: ptn_elicitedby || '',
    
    // Pain Details
    painScale: pain_scale || 0,
    painType: pain_type || '',
    
    // Objective Information
    posturalDeviation: ptn_posturaldev || '',
    atrophy: ptn_atrophy || '',
    swellingOn: ptn_swellingon || '',
    erythemaOn: ptn_erythemaon || '',
    ambulatory: ptn_ambulatory || '',
    deformity: ptn_deformity || '',
    othersOi: ptn_othernotes || '',
    erythemaNotes: ptn_erythemanotes || '',
    swellingNotes: ptn_swellingnotes || '',
    
    therapyService: appServiceData || ''
};

            console.log('Payload:', payload)
            for (const pain in pain_type){
                var temp = pain_type[pain]
                payload = {
                    ...payload,
                    [temp]:true
                }
                
            }
            return res.json(payload)            
        }
        console.log('Get Initial Eval Endpoint')
    }catch(err){
        console.log(err)
    }
};

async function uploadAvatar(req,res){
    console.log('upload avatar endpoint')
    try{
        if (req?.session?.user || req?.user) {
            const userId = req.session.user.id
            // const userId = req.session
            console.log('Upload Avatar Endpoint')
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;

            
            const result = await cloudinary.uploader.upload(dataURI, {
                folder: 'user_avatars',
                resource_type:'auto'
            })
            
            const {
                format,
                url,
                public_id
            } = result

            const avatarUrl = cloudinary.url(public_id,{
                crop: 'fill',
                width: 500,
                height: 500,
                gravity: 'auto',
                quality: 'auto',
                fetch_format: 'auto'
            })
            
            const createAvatarRecord = await dbConnection.query(`INSERT INTO user_avatars(user_id, image_url, public_id, image_type) values($1, $2, $3, $4)`,[userId, url, public_id, format ])
            console.log('Upload Result', result)
            // res.json({
            //     success: true,
            //     url: result.secure_url,
            //     public_id: result.public_id,
            // });
        }
        
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Upload failed' });
    }
};

async function getAvatar(req,res){
    try{
        if (req?.session?.user || req?.user) {
        const userId = req.session.user.id
        console.log('User ID requesting Avatar: ',userId)
        const avatarQuery = await dbConnection.query(`SELECT image_url FROM user_avatars where user_id=$1 ORDER BY created_at desc`, [userId])
        const avatarResult = avatarQuery.rows[0].image_url
        return res.json(avatarResult);}
        else{
            return res.json({loggedIn:false})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'Avatar Fetch Failed'});
    }
};


async function uploadDocument (req, res ){
    console.log('Upload Document Endpoint reached')
    console.log(req.file)
    try{
         if (req?.session?.user || req?.user) {
            const userId = req.session.user.id
            const patientIdQuery = await dbConnection.query(`SELECT patient_id from awp_patient_tbl WHERE user_id=$1`,[userId])
            const patientId = patientIdQuery.rows[0].patient_id;
            // const userId = req.session
            console.log('Upload Document Endpoint')
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;

            const fileName = req.file.originalname
            const fileSize = req.file.size
            const result = await cloudinary.uploader.upload(dataURI, {
                folder: 'user_documents',
                type: 'authenticated',
            })
            
            const {
                format,
                url,
                public_id
            } = result

            // console.log(result)
            // console.log('Upload Attempted')
            const createDocumentRecord = await dbConnection.query(`INSERT INTO awp_ptndocs_tbl(patient_id, file_name, file_path, file_type, file_size, uploaded_by, doc_status, public_id) values($1, $2, $3, $4, $5, $6, $7, $8)`,[patientId, fileName, url, format, fileSize, 5, 'pending', public_id ])
            console.log('Upload Result', result)
            // res.json({
            //     success: true,
            //     url: result.secure_url,
            //     public_id: result.public_id,
            // });
        } else{
            res.status(404).json({error:'User not found'})
        }
    }catch(err){
        console.log(err)
    }
}

async function getMyDocumentsList(req,res){
    console.log('get Document Endoint')
    try{
        if (req?.session?.user || req?.user) {
        const userId = req.session.user.id
        
        const patientIdQuery = await dbConnection.query(`SELECT patient_id from awp_patient_tbl WHERE user_id=$1`,[userId])
        const patientId = patientIdQuery.rows[0].patient_id;

        const docQuery = await dbConnection.query(`SELECT ptn_doc_id, file_name, file_type, upload_date FROM awp_ptndocs_tbl WHERE patient_id=$1 ORDER BY created_at DESC`,[patientId])
        const docResult = docQuery.rows
        // console.log('User ID requesting Avatar: ',userId)
        // const avatarQuery = await dbConnection.query(`SELECT image_url FROM user_avatars where user_id=$1 ORDER BY created_at desc`, [userId])
        // const avatarResult = avatarQuery.rows[0].image_url
        return res.json(docResult);
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'Document List Fetch Failed'});
    }
};

async function getDocumentSignedUrl(req,res){
    console.log('get Document Signed Url Endoint')
    try{
        if (req?.session?.user || req?.user) {
        const userId = req.session.user.id
        const documentId = req.query.documentId

        const patientIdQuery = await dbConnection.query(`SELECT patient_id from awp_patient_tbl WHERE user_id=$1`,[userId])
        const patientId = patientIdQuery.rows[0].patient_id;

        const docQueryOwner = await dbConnection.query(`SELECT patient_id FROM awp_ptndocs_tbl WHERE ptn_doc_id=$1`,[documentId])
        const docOwner = docQueryOwner.rows[0].patient_id

        if(docOwner === patientId){
            console.log('User is authorized')
            const docPublicIdQuery = await dbConnection.query(`SELECT public_id FROM awp_ptndocs_tbl WHERE ptn_doc_id=$1` ,[documentId])
            const docPublicId = docPublicIdQuery.rows[0].public_id
            console.log(docPublicId)

            const signedUrl = cloudinary.url(docPublicId, {
                type: 'authenticated',
                sign_url: true,

                expires_at: Math.floor(Date.now() / 1000) + 300, // 5 minutes
            });
            console.log('Signed Url: ',signedUrl)
            res.json({ url: signedUrl });

        } else{
            console.log('User is not authorized')
        }
        // const docQuery = await dbConnection.query(`SELECT ptn_doc_id, file_name, file_type, upload_date FROM awp_ptndocs_tbl WHERE patient_id=$1 ORDER BY created_at DESC`,[patientId])
        // const docResult = docQuery.rows

        // console.log(docResult)
        // return res.json(docResult);
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'Signed Url Fetch Failed'});
    }
};


export {getDocumentSignedUrl, getAvatar, uploadAvatar, submitUserData, getUserData, getMyAppointments, updateUserData, getMyRecords, uploadDocument, getMyDocumentsList};