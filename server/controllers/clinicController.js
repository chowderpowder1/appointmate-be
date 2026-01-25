import e from 'express';
import dbConnection from '../db.js';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js'

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
        const allPatientsQuery = await dbConnection.query(`
            SELECT * from awp_users_tbl AS u
            INNER JOIN awp_patient_tbl AS p
            ON u.user_id = p.user_id ORDER BY u.user_id`);
            console.log('Patient Query', allPatientsQuery)
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
        }
    
    ))

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

async function getPatientEval(req, res){
    try{
  
        if(req.session.user.id){
           const isAuthorized = await dbConnection.query(`SELECT user_role from awp_users_tbl WHERE user_id=$1`, [req.session.user.id])

           if( isAuthorized.rows[0].user_role < 5){
                console.log('User is Authorized for Get Patient Eval')

                const patientUserId = req.query.userId
                const patientIdQuery = await dbConnection.query(`SELECT patient_id from awp_patient_tbl WHERE user_id=$1`,[patientUserId])
                const patientId = patientIdQuery.rows[0].patient_id;
                
                const activeApptQuery = await dbConnection.query(`SELECT appt_id from awp_appt_tbl where patient_id=$1 ORDER BY CREATED_AT desc limit 1;`,[patientId])
                const activeAppt = activeApptQuery.rows[0].appt_id

                const evalQuery = await dbConnection.query(`SELECT * from awp_ptneval_tbl where appt_id=$1`,[activeAppt])
                const evalData = evalQuery.rows[0]

                const medHistoryQuery = await dbConnection.query(`SELECT * from awp_ptnmedhistory_tbl where appt_id=$1`,[activeAppt])
                const medhistoryData = medHistoryQuery.rows[0]

                const palpationQuery = await dbConnection.query(`SELECT * from awp_ptnpalpation_tbl where appt_id=$1`,[activeAppt])
                const palpationData = palpationQuery.rows[0]

                // const painQuery = await dbConnection.query(`SELECT * from awp_ptnpaintype_tbl where appt_id=$1`,[activeAppt])
                // const painData = painQuery.rows[0]
                
                const painQuery = await dbConnection.query(`SELECT * from awp_ptnpain_tbl where appt_id=$1`,[activeAppt])
                const painData = painQuery.rows[0]

                console.log('Pain data', painData)

const {
    eval_diagnosis = '',
    eval_chfcomplaint = '',
    eval_specnotes = '',
    eval_othernotes = ''
} = evalData || {};

const {
    ptn_hasctscan = false,
    ptn_hasxray = false,
    ptn_hasmri = false,
    ptn_hasallergies = false,
    ptn_allergyinfo = '',
    ptn_hasdse = false,
    ptn_hospitalization = '',
    ptn_hascancer = false,
    ptn_hasdiabetes = false,
    ptn_hashypertens = false,
    ptn_medhistorynotes = ''
} = medhistoryData || {};

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
} = palpationData || {};


const {
    ptn_pain_id = null,
    pain_type_id = null,
    ptn_locarea = '',
    ptn_reliefby = '',
    ptn_elicitedby = ''
} = painData || {};

                const painTypeQuery = await dbConnection.query(`SELECT * from awp_ptnpaintype_tbl where pain_type_id=$1`,[pain_type_id])
                const painType = painTypeQuery.rows[0]

                const oIQuery = await dbConnection.query(`SELECT * from awp_ptnobvimp_tbl where appt_id=$1`,[activeAppt])
                const oIData = oIQuery.rows[0]

                const apptServiceQuery = await dbConnection.query(`SELECT service_id from awp_appt_tbl where appt_id=$1`,[activeAppt])
                const appt_service = apptServiceQuery.rows[0].service_id
                
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
    
    // Med History - Imaging
    CTScan: ptn_hasctscan || false,
    XRay: ptn_hasxray || false,
    mri: ptn_hasmri || false,
    
    // Med History - Conditions
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
    
    // Physical Examination
    posturalDev: ptn_posturaldev || '',
    atrophy: ptn_atrophy || '',
    swellingOn: ptn_swellingon || '',
    erythemaOn: ptn_erythemaon || '',
    ambulatory: ptn_ambulatory || '',
    deformity: ptn_deformity || '',
    otherNotesPhysical: ptn_othernotes || '',
    erythemaNotes: ptn_erythemanotes || '',
    swellingNotes: ptn_swellingnotes || '',
    
    // Service
    apptService: appt_service || ''
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
        }}

    }catch(err){
        console.log(err)
    }
}

async function patchInitialEval(req, res){
    try{

    const {
        painScale,
        intermittent,
        constant,
        dull,
        deep,
        burning,
        numbing,
        tingling,
        radiating,
        sharp,
        throbbing,
        shooting,
        stabbing,
        cramping,
        nagging,
        heavy,

    } = req.body;

    const painTypes = [
        intermittent && "intermittent",
        constant && "constant",
        dull && "dull",
        deep && "deep",
        burning && "burning",
        numbing && "numbing",
        tingling && "tingling",
        radiating && "radiating",
        sharp && "sharp",
        throbbing && "throbbing",
        shooting && "shooting",
        stabbing && "stabbing",
        cramping && "cramping",
        nagging && "nagging",
        heavy && "heavy",
    ].filter(Boolean);

    const insertPainRecord = await dbConnection.query(`INSERT INTO awp_ptnpaintype_tbl (pain_scale, pain_type) values ($1, $2) RETURNING pain_type_id`, [painScale, painTypes])
    const painTypeId = insertPainRecord.rows[0].pain_type_id;


    const TABLE_KEY_MAP = {
      awp_ptneval_tbl: {
        chiefComplaint: 'eval_chfcomplaint',
        diagnosis: 'eval_diagnosis',
        otherNotes:'eval_othernotes',
        specialNotes: 'eval_specnotes',
      },
      awp_ptnmedhistory_tbl: {
        CTScan: 'ptn_hasctscan',
        XRay: 'ptn_hasxray',
        MRI: 'ptn_hasmri',
        // Conditions
        allergies: 'ptn_hasallergies',
        cardioPulmoDSE: 'ptn_hasdse',
        hospitalization: 'ptn_hospitalization',
        cancer: 'ptn_hascancer',
        diabetesMellitus: 'ptn_hasdiabetes',
        hypertension: 'ptn_hashypertens',
      },
      awp_ptnpalpation_tbl:{
        edemaOn: 'ptn_edemaon',
        nodulesOn: 'ptn_noduleon',
        musclesOn: 'ptn_muscleson',
        tautBandsOn: 'ptn_tautbandson',
        jtEffusionOn: 'ptn_jtinfusionon',
        lomOn: 'ptn_lomon',
        tendernessOn: 'ptn_tendernesson',

        edemaNotes: 'ptn_edemanotes',
        nodulesNotes: 'ptn_nodulesnotes',
        musclesNotes: 'ptn_musclessnotes',
        tautBandNotes: 'ptn_tautbandsnotes',
        jtEffusionNotes: 'ptn_jtinfusionnotes',
        lomNotes: 'ptn_lomnotes',
        tendernessNotes: 'ptn_tendernessnotes',

        otherNotes: 'ptn_othernotes',
      },
      awp_ptnobvimp_tbl : {
        ambulatory: 'ptn_ambulatory',
        deformity: 'ptn_deformity',
        erythemaOn: 'ptn_erythemaon',
        erythemaNotes: 'ptn_erythemanotes',
        swellingOn: 'ptn_swellingon',
        swellingNotes: 'ptn_swellingnotes',
        atrophy: 'ptn_atrophy',
        posturalDeviation: 'ptn_posturaldev',
        othersOi: 'ptn_othernotes',       
      },
      awp_ptnpain_tbl:{
        reliefBy: 'ptn_reliefby',
        elicitedBy: 'ptn_elicitedby',
        localizedOnArea : 'ptn_locarea',
        pain_type_id: 'pain_type_id',
      },
      awp_appt_tbl:{
        therapyService : 'service_id',
      }

    };
    // Filter selected pain types

    const { id } = req.params; // patient ID
    var payload = req.body;
    payload = {
        ...payload,
            pain_type_id: String(painTypeId)
    };

    const patientId = await dbConnection.query(`SELECT patient_id from awp_patient_tbl WHERE user_id=$1`,[id])
    const activeAppt = await dbConnection.query(`SELECT appt_id from awp_appt_tbl where patient_id=$1 ORDER BY CREATED_AT desc limit 1;`,[patientId.rows[0].patient_id])
    console.log('patientId', patientId.rows[0])
    console.log('activeAppt', activeAppt.rows[0])
    const updatesByTable = {};

  //Split payload and rename keys
  for (const [table, keyMap] of Object.entries(TABLE_KEY_MAP)) {
    const tablePayload = {};
// console.log(JSON.stringify(keyMap))
    for (const [frontKey, dbColumn] of Object.entries(keyMap)) {
        
      if (
        payload[frontKey] !== undefined &&
        !(Object.keys(payload[frontKey]).length === 0) 
      ) {
        tablePayload[dbColumn] = payload[frontKey];
      }
    }

    if (Object.keys(tablePayload).length > 0) {
      updatesByTable[table] = tablePayload;
    }
  }
    //Update each table dynamically
    const updatedRows = {};

    for (const [table, tablePayload] of Object.entries(updatesByTable)) {
      const fields = Object.keys(tablePayload);
      const values = Object.values(tablePayload);

      const setClause = fields.map((f, i) => `"${f}" = $${i + 1}`).join(', ');

      const query = `
        UPDATE ${table}
        SET ${setClause}
        WHERE appt_id = $${fields.length + 1}
        RETURNING *;
      `;

      const recordExists = await dbConnection.query(`SELECT * FROM ${table} WHERE appt_id=$1;`,[activeAppt.rows[0].appt_id])

        // Check if there is a pre-existing record for the assocaited appt id and creates one otherwise
        if (recordExists.rows == 0){
        console.log('Patient Record does not exist, Creating record')
        const createRecord = await dbConnection.query(`INSERT INTO ${table}(patient_id, appt_id) values ($1,$2)`,[patientId.rows[0].patient_id,activeAppt.rows[0].appt_id])
      }
      const { rows } = await dbConnection.query(query, [...values, activeAppt.rows[0].appt_id]);
      updatedRows[table] = rows[0];
    }

    res.status(200).json({ message: 'Patient evaluation updated successfully', updatedRows });
    }catch(err){
        console.log(err)
    }
}

async function getPatientDocumentsList(req,res){
    try{
        if (req?.session?.user || req?.user) {
            const isAuthorized = await dbConnection.query(`SELECT user_role from awp_users_tbl WHERE user_id=$1`, [req.session.user.id])
           if( isAuthorized.rows[0].user_role < 5){

                const userId = req.session.user.id
                const allDocQuery = await dbConnection.query(`SELECT ptn_doc_id, patient_id, file_name, file_type, upload_date, doc_status FROM awp_ptndocs_tbl ORDER BY created_at DESC, doc_status DESC`)
                    console.log(allDocQuery.rows)
                  const patientDocumentList = await Promise.all(allDocQuery.rows.map(async (p) => {
                        console.log(p)
                        const patientUserIdQuery = await dbConnection.query(`SELECT user_id from awp_patient_tbl WHERE patient_id=$1`,[p.patient_id])
                        const patientUserId = patientUserIdQuery.rows[0].user_id;

                        const patientName = await dbConnection.query(`SELECT user_fname, user_lname FROM awp_users_tbl WHERE user_id=$1`,[patientUserId])
                        const patientAvatar = await dbConnection.query(`SELECT image_url FROM user_avatars WHERE user_id=$1`,[patientUserId])
                        console.log(patientAvatar.rows[0].image_url)
                    return {
                        documentId:p.ptn_doc_id,
                        patientAvatar:patientAvatar.rows[0].image_url,
                        patientName: `${patientName.rows[0].user_fname} ${patientName.rows[0].user_lname}`,
                        file_name: p.file_name,
                        file_type: p.file_type, 
                        upload_date: p.upload_date,
                        doc_status: p. doc_status 
                    }
                }))

                // console.log('User ID requesting Avatar: ',userId)
                // const avatarQuery = await dbConnection.query(`SELECT image_url FROM user_avatars where user_id=$1 ORDER BY created_at desc`, [userId])
                // const avatarResult = avatarQuery.rows[0].image_url
                
                return res.json(patientDocumentList);
           }
        } else{
            res.status(400).json({message: 'User is not logged in'})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'Document List Fetch Failed'});
    }
};

async function updateDocumentStatus(req, res){
    console.log('Update Document Endpoint')
    try{    

        if (req?.session?.user || req?.user) {
            const isAuthorized = await dbConnection.query(`SELECT user_role from awp_users_tbl WHERE user_id=$1`, [req.session.user.id])
           if( isAuthorized.rows[0].user_role < 5){

                const documentId = req.params.id
                const documentStatus = req.body.status
                console.log(documentStatus)
                const updateDocumentQuery = await dbConnection.query(`UPDATE awp_ptndocs_tbl SET doc_status=$1 WHERE ptn_doc_id=$2`,[documentStatus,documentId ])
                if (updateDocumentQuery.rowCount === 1){
                    res.status(200).json({message: 'Update Successful'})
                } else {
                    res.status(500).json({message: 'There was a problem with your request'})
                }
           }
        }
    }catch(err){
        console.log(err)
    }
}

async function bookAppointmentForPatient (req, res){

    try{
        console.log("Appointment Booking data: "+JSON.stringify(req.body));
        const userId = req.body.patientID
        const therapistUserId = req.body.apptTherapist;

        const therapistIdQuery = await dbConnection.query(`SELECT pthera_id from awp_pthera_tbl WHERE user_id=$1`,[therapistUserId])
        const therapistId= therapistIdQuery.rows[0].pthera_id
        
        // console.log(theraFname)
        // The query below is susceptible to a case where therapists both have the same name and last name, in which case the query would return two users
        // const theraIdLookup = await dbConnection.query(`SELECT pthera_id from awp_pthera_tbl WHERE user_id=(WITH x AS (select * from awp_users_tbl where user_role=3) Select user_id from x WHERE user_fname=$1 AND user_lname=$2);`,[theraFname, theraLname])
        // const theraId = theraIdLookup?.rows[0]?.pthera_id;

        const patientIdLookup = await dbConnection.query(`SELECT patient_id from awp_patient_tbl WHERE user_id=$1;`,[userId])
        const patientId= patientIdLookup.rows[0].patient_id
        console.log(patientId)
        // console.log('Patient Id Lookup' + patientIdLookup.rows[0].patient_id)
        
        const {           
            apptDate,
            apptTime,
            apptTherapist,
            mop,
            hmoProvider,
        } = req.body
        // console.log(apptTime)
        // console.log(apptDate)
        const calculatedApptStartTime = dayjs(`${apptDate}T${apptTime}`); 
        const calculatedApptEndTime = (dayjs(calculatedApptStartTime).add(30, 'minute')).format();
        // console.log(calculatedApptEndTime)
        // console.log(testVal)
        // console.log(dayjs(apptTime))
        // console.log((dayjs(`${apptDate}T${testVal}`)));
        // console.log(dayjs(apptTime).format("hh:mm"))
        const apptResult = await dbConnection.query(`insert into awp_appt_tbl (patient_id, therapist_id, appt_date, appt_start, appt_end, appt_status,  mode_of_payment) values ($1, $2, $3, $4, $5, 'pending', $6 );`,[patientId, (therapistId || null), apptDate, calculatedApptStartTime, calculatedApptEndTime, mop])

        }
    
    catch(err){
        console.log(err);
        res.send(err);
    }

}

async function getPatientsPendingAppointments(req, res) {
    try{
        if (req?.session?.user || req?.user) {
            const isAuthorized = await dbConnection.query(`SELECT user_role from awp_users_tbl WHERE user_id=$1`, [req.session.user.id])
           if( isAuthorized.rows[0].user_role < 5){
            const patientUserId = req.query.patientID

            const patientIdLookup = await dbConnection.query(`SELECT patient_id from awp_patient_tbl WHERE user_id=$1;`,[patientUserId])
            const patientId= patientIdLookup.rows[0].patient_id

            const result = await dbConnection.query(`SELECT appt_id, appt_status, appt_date, appt_start FROM awp_appt_tbl WHERE patient_id=$1 AND appt_status=$2 ORDER BY appt_id DESC`,[patientId, 'pending'])
            const pendingAppts = await Promise.all(result.rows.map(async (p) => {
                return{
                    appt_id:p.appt_id,
                    appt_status:p.appt_status,
                    appt_dateTime:dayjs(p.appt_start).tz("Asia/Manila").format("YYYY-MM-DD HH:mm"),
                }
            }))
            return res.json(pendingAppts)
           }
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error:'there was a problem with your request'})
    }
}

async function patchRescheduleAppt (req, res){

    try{
        // console.log("Appointment Booking data: "+JSON.stringify(req.body));
        const userId = req.session.user.id
        const patientUserId = req.body.apptTherapist;

        const therapistIdQuery = await dbConnection.query(`SELECT pthera_id from awp_pthera_tbl WHERE user_id=$1`,[req.body.apptTherapist])
        const therapistId= therapistIdQuery.rows[0].pthera_id;
        
        const patientUserIdQuery = await dbConnection.query(`SELECT patient_id from awp_patient_tbl WHERE user_id=$1;`,[patientUserId])
        const patientId= patientUserIdQuery?.rows[0]?.patient_id;
        
        const {           
            apptDate,
            apptId,
            apptTime,
            apptTherapist,
            service,
            mop,
            hmoProvider,
        } = req.body

        const therapistQuery = await dbConnection.query(`SELECT * from awp_pthera_tbl where pthera_id=$1`,[apptTherapist])
        const therapistResult = therapistQuery.rows[0]
        // console.log(therapistResult)
        const calculatedApptStartTime = dayjs(`${apptDate}T${apptTime}`); 
        const calculatedApptEndTime = (dayjs(calculatedApptStartTime).add(30, 'minute')).format();
        
        const result = await dbConnection.query(`UPDATE awp_appt_tbl SET therapist_id=$1, appt_date=$2, appt_start=$3, appt_end=$4, appt_status=$5, mode_of_payment=$6 WHERE appt_id=$7 ;`,[therapistId, apptDate, calculatedApptStartTime, calculatedApptEndTime, 'pending',mop, req.body.apptId])
            console.log('Query Status:', result.rowCount)
        }
    
    catch(err){
        console.log(err);
        res.send(err);
    }

}

async function getAllUpcomingAppts(req, res) {
    try{
        if (req?.session?.user || req?.user) {
            const isAuthorized = await dbConnection.query(`SELECT user_role from awp_users_tbl WHERE user_id=$1`, [req.session.user.id])
           if( isAuthorized.rows[0].user_role < 5){

            const result = await dbConnection.query(`SELECT appt_id, patient_id, appt_status, appt_date, appt_start, appt_end FROM awp_appt_tbl WHERE appt_status=$1 ORDER BY created_at DESC`,['scheduled'])

            const scheduledAppts = await Promise.all(result.rows.map(async (p) => {

                const patientUserIdQuery = await dbConnection.query(`SELECT user_id from awp_patient_tbl WHERE patient_id=$1`,[p.patient_id]);
                const patientUserId = patientUserIdQuery.rows[0].user_id;
                const patientName = await dbConnection.query(`SELECT user_fname, user_lname FROM awp_users_tbl WHERE user_id=$1`,[patientUserId]);
                const patientAvatar = await dbConnection.query(`SELECT image_url FROM user_avatars WHERE user_id=$1`,[patientUserId]);            
                // console.log(patientName.rows[0])
                return{
                    patientName: `${patientName.rows[0].user_fname} ${patientName.rows[0].user_lname}`,
                    patientAvatar:patientAvatar?.rows[0]?.image_url || '',
                    appt_id:p.appt_id,
                    appt_status:p.appt_status,
                    appt_date: (dayjs(p.appt_date).format('DD MMM YYYY')).toUpperCase(),
                    appt_start: dayjs(p.appt_start).format('h:mm A'),
                    appt_end: dayjs(p.appt_end).format('h:mm A'),
                }
            }))

            // console.log('Upcoming:', result)
            return res.json(scheduledAppts)
           }
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error:'there was a problem with your request'})
    }
}

async function getApptDetailsOverview(req, res) {
    try{
        if (req?.session?.user || req?.user) {
            const isAuthorized = await dbConnection.query(`SELECT user_role from awp_users_tbl WHERE user_id=$1`, [req.session.user.id])
           if( isAuthorized.rows[0].user_role < 5){

            const apptId = req.query.apptId
            // console.log('Appt details id:', apptId)

            const apptDetailsQuery = await dbConnection.query(`SELECT * FROM awp_appt_tbl WHERE appt_id=$1 ORDER BY created_at DESC`,[apptId])
            const apptDetailsData = apptDetailsQuery.rows[0];
            // console.log(apptDetailsData)

            const {                
                  patient_id,
                  therapist_id,
                  service_id,
                  appt_date,
                  appt_start,
                  appt_end,
                  appt_status,
                  appt_cancelreason,
                  created_at,
                  updated_at,
                  when_range,
                  mode_of_payment                
                } = apptDetailsData
            // const scheduledAppts = await Promise.all(result.rows.map(async (p) => {

            //     const patientUserIdQuery = await dbConnection.query(`SELECT user_id from awp_patient_tbl WHERE patient_id=$1`,[p.patient_id]);
            //     const patientUserId = patientUserIdQuery.rows[0].user_id;
            //     const patientName = await dbConnection.query(`SELECT user_fname, user_lname FROM awp_users_tbl WHERE user_id=$1`,[patientUserId]);
            //     const patientAvatar = await dbConnection.query(`SELECT image_url FROM user_avatars WHERE user_id=$1`,[patientUserId]);            
            //     console.log(patientName.rows[0])
            //     return{
            //         patientName: `${patientName.rows[0].user_fname} ${patientName.rows[0].user_lname}`,
            //         patientAvatar:patientAvatar?.rows[0]?.image_url || '',
            //         appt_id:p.appt_id,
            //         appt_status:p.appt_status,
            //         appt_date: (dayjs(p.appt_date).format('DD MMM YYYY')).toUpperCase(),
            //         appt_start: dayjs(p.appt_start).format('h:mm A'),
            //         appt_end: dayjs(p.appt_end).format('h:mm A'),
            //     }
            // }))
            return res.json({message:'fookiko'})
            // console.log('Upcoming:', result)
            // return res.json(scheduledAppts)
           }
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error:'there was a problem with your request'})
    }
}

async function getApptDocuments(req,res){
    console.log('get apt documents')
    try{
        if (req?.session?.user || req?.user) {
            const isAuthorized = await dbConnection.query(`SELECT user_role from awp_users_tbl WHERE user_id=$1`, [req.session.user.id])
           if( isAuthorized.rows[0].user_role < 5){
                const patientId = req.params.id

                const allDocQuery = await dbConnection.query(`SELECT ptn_doc_id, patient_id, file_name, file_type, upload_date, doc_status FROM awp_ptndocs_tbl WHERE patient_id=$1 ORDER BY created_at DESC, doc_status DESC`, [patientId])
                    console.log(allDocQuery.rows)
                  const patientDocumentList = await Promise.all(allDocQuery.rows.map(async (p) => {
                        console.log(p)
                        const patientUserIdQuery = await dbConnection.query(`SELECT user_id from awp_patient_tbl WHERE patient_id=$1`,[p.patient_id])
                        const patientUserId = patientUserIdQuery.rows[0].user_id;

                        const patientName = await dbConnection.query(`SELECT user_fname, user_lname FROM awp_users_tbl WHERE user_id=$1`,[patientUserId])
                        const patientAvatar = await dbConnection.query(`SELECT image_url FROM user_avatars WHERE user_id=$1`,[patientUserId])
                        console.log(patientAvatar.rows[0].image_url)
                    return {
                        documentId:p.ptn_doc_id,
                        patientAvatar:patientAvatar.rows[0].image_url,
                        patientName: `${patientName.rows[0].user_fname} ${patientName.rows[0].user_lname}`,
                        file_name: p.file_name,
                        file_type: p.file_type, 
                        upload_date: p.upload_date,
                        formatted_date: dayjs(p.upload_date).format('MMM DD, YYYY'),
                        doc_status: p. doc_status 
                    }
                }))

                // console.log('User ID requesting Avatar: ',userId)
                // const avatarQuery = await dbConnection.query(`SELECT image_url FROM user_avatars where user_id=$1 ORDER BY created_at desc`, [userId])
                // const avatarResult = avatarQuery.rows[0].image_url
                
                return res.json(patientDocumentList);
           }
        } else{
            res.status(400).json({message: 'User is not logged in'})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'Document List Fetch Failed'});
    }
};

export { getApptDocuments, getApptDetailsOverview,getAllUpcomingAppts, patchRescheduleAppt, getPatientsPendingAppointments, bookAppointmentForPatient, updateDocumentStatus, getPatientDocumentsList, patchInitialEval, getPatientEval, getServices, getTherapists, getPatients, getPatientData, getUserPersonalData}