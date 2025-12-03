import dbConnection from '../db.js';

async function getServices(req, res){
    try{
         if(req.session.user.id){
           console.log('Update Endpoint reached')
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

export { getServices, }