import crypto from 'crypto';
import redis from '../redis.js';
import dbConnection from '../db.js';
import bcrypt from 'bcrypt';

export async function generateResetToken(email){
    const userQuery = await dbConnection.query(`SELECT 
    user_id, user_logemail, user_fname FROM awp_users_tbl WHERE user_logemail=$1`,[email])

    if (userQuery.rows.length === 0){
        return { success: true, emailSent: false};
    }

    const user = userQuery.rows[0];
    console.log('mimoo', user)
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    console.log(tokenHash)

    const redisKey = `password-reset${tokenHash}`
    // Current link expiry is 30m change to 900 for 15m
    await redis.setex(redisKey, 1800, JSON.stringify({
        userId: user.user_id,
        email: user.logemail,
        createdAt: Date.now(),
    }))

    return {
        success:true,
        emailSent:true,
        token,
        user:{
            email:user.logemail,
            firstName:user.user_fname,
        }
    }
}

export async function resetPassword(token, newPassword){
    try{
        
    }catch(err){
        console.log(err)
    }
} 

export async function verifyResetToken(token){
    try{
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const redisKey = `password-reset${tokenHash}`;

        const tokenLookup = await redis.get(redisKey);
        const tokenData = JSON.parse(tokenLookup);
        console.log('Test',tokenLookup)
        if (!tokenLookup){
            return { valid: false, error: 'Invalid or expired token'};
        }
        return { valid: true, user: tokenData.userId}
    }catch(err){
        console.log(err)
    }
} 

