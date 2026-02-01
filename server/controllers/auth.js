import dbConnection from '../db.js';
import bcrypt from 'bcrypt'; // Hashing library
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator'
async function login(req, res){
    console.log('Otp is part of payload confirmation:', req.body.otp)
    try{
        
        const { email, password, otp } = req.body;
        // const patientIdLookup = await dbConnection.query(`SELECT patient_id from awp_patient_tbl WHERE user_id=$1;`,[user.rows[0].user_id,])
        // const patientId= patientIdLookup.rows[0].patient_id
        // const userContact = await dbConnection.query('SELECT contact_value FROM awp_ucontacts_tbl WHERE user_id = $1',[user.rows[0].user_id]);
        if(!email || !password){
            console.log('Missing Fields')
            res.status(400).json({message:'All field are required'})
        }
        
        const user = await dbConnection.query('SELECT * FROM awp_users_tbl WHERE user_logemail = $1',[email]);

        if (user.rows.length === 0) {
            return res.status(422).send("Email is not registered");
        }

        let isVerified = await dbConnection.query(`SELECT is_verified FROM awp_users_tbl WHERE user_logemail=$1`,[email])

        console.log(isVerified.rows[0])
        console.log('This is the otp payload', otp )
        console.log('Assigned otp as per table', user.rows[0].otp )

        // let updateVerification = null;

        if(otp == user.rows[0].otp){
            console.log('Login Handler Verified Confirmation')
            isVerified = await dbConnection.query(`UPDATE awp_users_tbl SET is_verified=true WHERE user_logemail = $1 RETURNING is_verified`,[email])

            // return res.json({
            //     'success': true,
            //     'requireOtp': false,
            //     'message': 'Email has been verified'
            // })
        }
        console.log(isVerified.rows[0])
        if (!isVerified.rows[0].is_verified) {
            console.log('User is not verified')
            createOtp(req,res);
            return res.json({
                'success': false,
                'requireOtp': true,
                'message': 'Please verify your email to continue'
            })
        }
        console.log('user is verified')
        

        const dbUser = user.rows[0];
        if(dbUser.password_hash == null){
            console.log('Sign in with Gmail')
            return res.json({
                'success': false,
                'gmailAccount': true,
                'requireOtp': false,
                'message': 'Please use the Sign in with Gmail button'
            })
        }
        const isSame = await bcrypt.compare(password, dbUser.password_hash);
        if (!isSame) {
            return res.status(401).send("Incorrect Password");
        }
        req.session.user = {
          id: user.rows[0].user_id,
        //   pxId: patientId,
        //   email: user.rows[0].user_logemail,
        //   firstName: user.rows[0].user_fname,
        //   lastName: user.rows[0].user_lname,
        //   contact_number: userContact.rows[0].contact_value,
        //   is_profile_complete: user.rows[0].is_profile_complete
        };
        console.log('This is the role', dbUser.user_role)
        if (dbUser.user_role === 3){
            console.log('redirecting to front desk')
            return res.status(200).json({redirectTo: 'http://localhost:5173/therapist/dashboard'})
        }
        if (dbUser.user_role === 4){
            console.log('redirecting to front desk')
            return res.status(200).json({redirectTo: 'http://localhost:5173/front-desk/dashboard'})
        }
        if (dbUser.user_role === 5){
            console.log('redirecting to Patient Landing Page')
            return res.status(200).json({redirectTo: 'http://localhost:5173/patient/dashboard'})
        }
        return res.send("User Logged in");

    } catch(err){
        console.log(err);
    }
}

async function signup(req, res){
    try{
        const { 
            email, 
            password, 
            cpassword, 
            contact_number, 
            first_name, 
            middle_name,
            last_name} 
        = req.body;

        const user_role=5;
        const user = await dbConnection.query('SELECT * FROM awp_users_tbl WHERE user_logemail = $1', [email])
        if(password != cpassword){
            console.log(`password not match`)
            return res.json({message:'Submitted Password does not match'})
        }

        if(user.rows.length === 0){
            console.log('creating account')
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const userIdResult = await dbConnection.query('INSERT INTO awp_users_tbl ( user_role, user_fname, user_mname, user_lname, user_logemail, password_hash)values( $1, $2, $3, $4, $5, $6) RETURNING user_id', [user_role, first_name, middle_name, last_name, email, hashedPassword])
            
            const userId= userIdResult.rows[0].user_id;
            const defaultContactType= 1;
            await dbConnection.query('INSERT INTO awp_ucontacts_tbl (user_id, contact_value, contact_type_id) values ($1, $2, $3)',[userId, contact_number, defaultContactType])

            return res.status(200).json({redirectTo: 'http://localhost:5173/login', message: 'Account Successfully registered. Redirecting to login page'})

        }else{
            return res.send('User Already Registered')
        }
        
    }catch(err){
        console.log(err);
    }
}

async function session (req, res) {

    // Role Fetch - not sure if this logic is necessary yet, was planning to use this on comparative operators
    // const userRoles = await dbConnection.query(`SELECT * from awp_urole_tbl`)
    // const userRolesRow = userRoles.rows[0]
    (console.log('session endpoint'))
    try{

    if (req.session.user || req.user) {
        const currentUserID = req?.session?.user?.id || req?.user?.id || null;
        const currentUserRole = await dbConnection.query(`SELECT user_role FROM awp_users_tbl WHERE user_id=$1`,[currentUserID])
        const employeeUserData = await dbConnection.query('SELECT * FROM awp_users_tbl WHERE user_id = $1', [currentUserID]);
        
        // Front Desk
        if(currentUserRole.rows[0].user_role === 4){
            return res.json({
                loggedIn:true,
                firstName: employeeUserData.rows[0].user_fname,
                userRole: 'Front-Desk',
                userRoleId:4
            })
        }
        if(currentUserRole.rows[0].user_role === 3){
            return res.json({
                loggedIn:true,
                firstName: employeeUserData.rows[0].user_fname,
                userRole: 'Therapist',
                userRoleId:3
            })
        }

        // Patient
        
        const id = req.session?.user?.id || req.user?.id || null;
        console.log(id)
        const userData = await dbConnection.query('SELECT * FROM awp_users_tbl WHERE user_id = $1', [id]);
        
        const userId= userData.rows[0].user_id

        const isComplete = await dbConnection.query(`SELECT a.user_logemail AS email, a.user_id AS id, b.patient_id AS pxId, a.user_fname AS firstName, a.user_lname AS middleName, a.user_lname AS lastName, c.contact_value AS contact_number, a.is_profile_complete FROM awp_users_tbl AS a LEFT JOIN awp_patient_tbl AS b ON a.user_id = b.user_id LEFT JOIN awp_ucontacts_tbl AS c ON a.user_id = c.user_id WHERE a.user_id=$1;`, [userId])
        const rows = isComplete.rows[0]
        if (!rows) {
            console.log('User Record Incomplete')
            return res.status(404).json({ error: "User record incomplete" });
        } else{
            req.session.user = {
            patientId: rows.pxid,
            id: rows.id,
            }
        }

    return res.json({
        loggedIn: true,
        email: rows.email,
        id: rows.id,
        pxId: rows.pxid,
        firstName: rows.firstname,
        middleName: rows.middleName || 'N/A',
        lastName: rows.lastname,
        contact_number: rows.contact_number,
        is_profile_complete: rows.is_profile_complete
    });

    } else {
        console.log('not logged in')
    return res.json({ loggedIn: false });
    }

    }catch(err){ 
        console.log(err) 
    }
}

async function logout (req, res) {
    req.session.destroy((err) => {
        if (err){
            console.log('Unable to Logout'+err);
            return res.status(500).json({error : 'logout failed'});
        }
        res.clearCookie('connect.sid', { path: "/" })
        console.log('Logout Successful')
        res.json({msg: 'Logged out Successfully'})
    })
}

//  This is a quick workaround - currently the same column is used for login and signup otp. Revise and create a separate table
async function createOtp (req, res) {
    try{

        // const currentUserID = req?.session?.user?.id || req?.user?.id || null;
        const email = req.body.email
        // await dbConnection.query('SELECT user_logemail FROM awp_users_tbl WHERE id = $1',[currentUserID]);
        //     console.log(email)
        let otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });

        await dbConnection.query(`UPDATE awp_users_tbl SET otp = $2 WHERE user_logemail=$1 `, [email, otp])
        console.log('Sample generated OTP:', otp);
        
        const transporter = nodemailer.createTransport({
            service: "gmail", 
            // smtp.gmail.com
            auth:{
                user:'jessee.dan.catli@gmail.com',
                pass: 'oulz vxxd cejw rpwj'
            },
            tls: {
                rejectedUnauthorized: false,
            }
        })

        const info = await transporter.sendMail({
            from: '"Accelerated Wellness & Pain Clinic" <jessee.dan.catli@gmail.com>',
            to: `${email}, ${email}`,
            subject:"AppointMate Verification Code",
            text:`Hi there,

            Use the verification code below to complete your login to AppointMate:

            Your OTP Code: ${otp}

            This code will expire in 5 minutes. If you did not request this code, you can safely ignore this message.

            Thank you,  
            The AppointMate Team`,
        })

        console.log("Message sent:", info.messageId);
    
    }catch(err){
        console.log(err)
    }
}

async function receiveOtp (req, res) {
    const { email, otp } = req.body

    try{
        const emailExists = await dbConnection.query(`SELECT * from awp_users_tbl WHERE user_logemail = $1`,[email])
        const emailExistsRow = emailExists.rows[0];
        if(emailExists){
            if(otp == emailExistsRow.otp){
                await dbConnection.query(`UPDATE awp_users_tbl SET is_verified=true WHERE user_logemail = $1`,[email])

                return res.json({
                    'success': true,
                    'requireOtp': false,
                    'message': 'Email has been verified'
                })

            }
        }
    } catch(err){
            console.log(err)
        }
}
export { signup, login, session, logout, createOtp, receiveOtp };