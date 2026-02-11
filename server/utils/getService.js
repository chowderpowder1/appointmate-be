import dbConnection from '../db.js';

export async function searchService(serviceId){
    try{
        const serviceQuery = await dbConnection.query('SELECT * FROM awp_apptservice_tbl  WHERE service_id=$1', [serviceId])

        if(serviceQuery.rowCount === 0){
            return {valid: false, message:'No service is associated with this ID'}
        }
        const serviceResponse =  serviceQuery.rows[0]
        return {valid:true, serviceName:serviceResponse}
    }catch(err){
        console.log(err)
    }
}