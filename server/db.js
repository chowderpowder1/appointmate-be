import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool ({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: 5433,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})  

// const connection = async () =>{
//     try{
//         const res = await pool.query('SELECT NOW()');
//         console.log('Connection with database established on: ' + res.rows[0].now);
//     }catch(err){
//         console.log(err);
//     }
// }

export default pool;