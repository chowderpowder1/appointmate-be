import dbConnection from '../db.js';
import bcrypt from 'bcrypt'; // Hashing library

async function login(req, res){
    try{
        const { email, password } = req.body;
        const user = await dbConnection.query('SELECT * FROM awp_users_tbl WHERE user_logemail = $1',[email]);
        // const patientIdLookup = await dbConnection.query(`SELECT patient_id from awp_patient_tbl WHERE user_id=$1;`,[user.rows[0].user_id,])
        // const patientId= patientIdLookup.rows[0].patient_id
        // const userContact = await dbConnection.query('SELECT contact_value FROM awp_ucontacts_tbl WHERE user_id = $1',[user.rows[0].user_id]);
        if (user.rows.length === 0) {
            return res.send("Email is not registered");
        }
        const dbUser = user.rows[0];
        const isSame = await bcrypt.compare(password, dbUser.password_hash);
        if (!isSame) {
            return res.send("Incorrect Password");
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
        if (dbUser.user_role === 4){
            console.log('redirecting to front desk')
            return res.status(200).json({redirectTo: 'http://localhost:5173/front-desk/dashboard'})
        }
        return res.send("User Logged in");

    } catch(err){
        console.log(err);
    }
}

async function signup(req, res){
    try{
        const { email, password, contact_number, first_name, last_name} = req.body;
        console.log(req.body);
        const user_role=5;
        const user = await dbConnection.query('SELECT * FROM awp_users_tbl WHERE user_logemail = $1', [email])

        if(user.rows.length === 0){
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const userIdResult = await dbConnection.query('INSERT INTO awp_users_tbl ( user_role, user_fname, user_lname, user_logemail, password_hash)values( $1, $2, $3, $4, $5) RETURNING user_id', [user_role, first_name, last_name, email, hashedPassword])
            console.log(userIdResult.rows[0])
            const userId= userIdResult.rows[0].user_id;

            const defaultContactType= 1;

            await dbConnection.query('INSERT INTO awp_ucontacts_tbl (user_id, contact_value, contact_type_id) values ($1, $2, $3)',[userId, contact_number, defaultContactType])

            res.send('Account Created');

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

    try{

    if (req.session.user || req.user) {
        const currentUserID = req.session.user.id;
        const currentUserRole = await dbConnection.query(`SELECT user_role FROM awp_users_tbl WHERE user_id=$1`,[currentUserID])
        const employeeUserData = await dbConnection.query('SELECT * FROM awp_users_tbl WHERE user_id = $1', [currentUserID]);
        
        // Front Desk
        if(currentUserRole.rows[0].user_role === 4){
            console.log('Employee Endpoint', employeeUserData.rows[0])
            return res.json({
                loggedIn:true,
                firstName: employeeUserData.rows[0].user_fname,
                userRole: 'Front-Desk'
            })
        }
        console.log(req.user)

        // Patient
    
        
        const id = req.session?.user?.id || req.user?.id || null;
        console.log(id)
        const userData = await dbConnection.query('SELECT * FROM awp_users_tbl WHERE user_id = $1', [id]);
        
        const userId= userData.rows[0].user_id

        // (!req.session.user.id ? req.session.passport.user : req.session.user.id  )
        // req.session.user.id || req.session.passport.user;
        const isComplete = await dbConnection.query(`SELECT a.user_logemail AS email, a.user_id AS id, b.patient_id AS pxId, a.user_fname AS firstName, a.user_lname AS lastName, c.contact_value AS contact_number, a.is_profile_complete FROM awp_users_tbl AS a LEFT JOIN awp_patient_tbl AS b ON a.user_id = b.user_id LEFT JOIN awp_ucontacts_tbl AS c ON a.user_id = c.user_id WHERE a.user_id=$1;`, [userId])
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

        // console.log('Here it is niel', (rows))

// is_profile_complete
    return res.json({
        loggedIn: true,
        email: rows.email,
        id: rows.id,
        pxId: rows.pxid,
        firstName: rows.firstname,
        lastName: rows.lastname,
        contact_number: rows.contact_number,
        is_profile_complete: rows.is_profile_complete
    });

    } else {
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

export { signup, login, session, logout };