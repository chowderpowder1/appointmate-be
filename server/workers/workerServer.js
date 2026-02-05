import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
console.log('Environment Check', process.env.DATABASE_PASSWORD)
const pool = new Pool ({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: 5433,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})  


pool.on('connect', () => {
  console.log('✅ PostgreSQL connected');
});

export default pool;