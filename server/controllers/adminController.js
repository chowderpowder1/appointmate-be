import dbConnection from '../db.js';
import bcrypt from 'bcrypt';

async function createEmployee (req,res) {
    console.log('Request body:', req.body)
    try{
        const {
            firstName,
            lastName,
            role,
            email,
            password,
            licenseNumber,
            specialization,
        } = req.body
        
        console.log('This is the role', role)
        
        const user = await dbConnection.query('SELECT * FROM awp_users_tbl WHERE user_logemail = $1', [email])
        
        if(user.rows.length === 0){
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const userIdResult = await dbConnection.query(
                'INSERT INTO awp_users_tbl (user_role, user_fname, user_lname, user_logemail, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING user_id', 
                [role, firstName, lastName, email, hashedPassword]
            )
            
            const userId = userIdResult.rows[0].user_id;
            
            // Insert role-specific data
            if(role == 4){
                console.log('Creating Front Desk account')
                await dbConnection.query('INSERT INTO awp_fdesk_tbl (user_id) VALUES ($1)', [userId])
            }
            if(role == 3){
                console.log('Creating Therapist account')
                await dbConnection.query('INSERT INTO awp_pthera_tbl (user_id, pthera_licnum, pthera_special) VALUES ($1, $2, $3)', [userId, licenseNumber, specialization])
            }
            if(role == 2){
                console.log('Creating Operations Manager account')
                 await dbConnection.query('INSERT INTO awp_admin_tbl (user_id, admin_acslevel) VALUES ($1, $2)', [userId ,'ops_manager'])
            }
            
            return res.status(200).json({message:'Account created successfully'})
        } else {
            return res.status(409).json({message:'User Already Registered'})
        }
    }catch(err){
        console.log('Error creating employee:', err)
        return res.status(500).json({message: 'Error creating account', error: err.message})
    }
}

async function getAllEmployees(req, res) {
  try {
    const employeesQuery = await dbConnection.query(
      `SELECT * FROM awp_users_tbl WHERE user_role < 5;`
    );

    return res.status(200).json({ employees: employeesQuery.rows });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

export {createEmployee, getAllEmployees}; 