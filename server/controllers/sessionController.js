import dbConnection from '../db.js';
import {searchService} from '../utils/getService.js'
export async function updateSession(req, res) {
  try {
    console.log('Text fields:', req.body);
    console.log('File:', req.file);

    const {
      sessionId,
      patientId,
      appointmentId,
      sessionNum,
      serviceId,
      subjective = '',
      objective = '',
      assessment = '',
      plan = '',
      notes = ''
    } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: 'sessionId is required for update' });
    }

    const query = `
      UPDATE awp_apptsession_tbl
      SET
        session_notes = $1,
        subjective = $2,
        objective = $3,
        assessment = $4,
        plan = $5,
        service_id = $6,
        patient_id = $7,
        updated_at = NOW(),
        session_num =$8
      WHERE session_id = $9
      RETURNING *;
    `;

    const values = [
      notes || null,
      subjective,
      objective,
      assessment,
      plan,
      serviceId || null,
      patientId || null,
      sessionNum || 1,
      sessionId
    ];

    const result = await dbConnection.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json({ message: 'Session updated', session: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getSessionData(req, res) {
  try {
    if(req?.params?.sessionId){
        const session_id = req?.params?.sessionId
        const sessionQuery = await dbConnection.query(`SELECT * from awp_apptsession_tbl WHERE session_id=$1`,[session_id])
        const sessionResult = sessionQuery.rows
        console.log(sessionResult)
        const numberOfSessions = sessionQuery.rowCount
        return res.json({success:true, sessionResult, numberOfSessions})
    }else{
        return res.json({success:false, message: 'No session ID'})
    }

  }catch(err){
    console.log(err)
  }
}

// patient only endpoint
export async function getPatientSessionsIds(req, res) {
  try {
    
        const patient_id = req?.session?.user?.patientId
        const result = await dbConnection.query(
          `SELECT * FROM awp_apptsession_tbl WHERE patient_id = $1`,
          [patient_id]
        );

        // This already contains ALL rows
        const sessions = result.rows;

        return res.json({
          success: true,
          sessions
        });
        // const patient_id = req.session.patient_id
        // await dbConnection.query(`SELECT * from awp_apptsession_tbl WHERE patient_id=$1`,[])

  }catch(err){
    console.log(err)
  }
}

// employee endpoint
export async function getPatientSessions(req, res) {
  try {

        const patient_id = req.params.patientId
        const result = await dbConnection.query(
          `SELECT * FROM awp_apptsession_tbl WHERE patient_id = $1`,
          [patient_id]
        );

        const sessions = result.rows;

        return res.json({
          success: true,
          sessions
        });
        // const patient_id = req.session.patient_id
        // await dbConnection.query(`SELECT * from awp_apptsession_tbl WHERE patient_id=$1`,[])

  }catch(err){
    console.log(err)
  }
}

export async function updateApptSession(req, res) {
  try {
        const submitted_id = req.body?.selectedSessionId
        const appt_data = req.body?.apptData
        const getSession = await dbConnection.query(`SELECT * FROM awp_apptsession_tbl WHERE session_id=$1`,[submitted_id])
        const getSessionResult = getSession.rows[0]
        const sessionLength = getSession.rowCount

        const createService = await dbConnection.query(`INSERT INTO awp_apptsession_tbl (appt_id, session_num, service_id, patient_id, session_id) values($1, $2, $3, $4, $5) RETURNING *`, [appt_data.apptId,sessionLength+1,getSessionResult.service_id||'', appt_data.patientID, submitted_id])
        console.log(createService.code)
        if( createService.rowCount === 1) {
            console.log('Service plan successfully created')
            return res.json({success:true, message: 'Service plan created'})
        } else{
            return res.json({success:false, message: 'There was a problem with your request. Please try again.'})
        }
    }catch(err){
        if(err.code == 23505)
        {
            console.log('Appointment already is assigned to a Service Plan')
            return res.json({success:false, message:'This appointment is already assigned to a session. If you wish to change it, reassign the appointment.'})
        }
        console.log(err)
    }
        // const patient_id = req.session.patient_id
        // await dbConnection.query(`SELECT * from awp_apptsession_tbl WHERE patient_id=$1`,[])
}

// export async function getSessionData(req, res) {
//   try {
//         console.log(yay)    


//         // return res.json({
//         //   success: true,

//         // });
//         // // const patient_id = req.session.patient_id
//         // await dbConnection.query(`SELECT * from awp_apptsession_tbl WHERE patient_id=$1`,[])

//   }catch(err){
//     console.log(err)
//   }
// }
