import { Pool } from 'pg';

const pool = new Pool ({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "9952983Loona223!",
    database: "seline"
})  

const connection = async () =>{
    try{
        const res = await pool.query('SELECT NOW()');
        console.log('Connection with database established on:' + res.rows[0]);
    }catch(err){
        console.log(err);
    }
}