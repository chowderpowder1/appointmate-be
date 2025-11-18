import dbConnection from '../db.js';
import bcrypt from 'bcrypt'; // Hashing library

async function login(req, res){
    console.log(req.body);
    // console.log(req);
    try{
        // console.log(req.session.username);
        // console.log(req.session.id);
        const { email, password } = req.body;
        const user = await dbConnection.query('SELECT * FROM login WHERE EMAIL = $1',[email]);
        console.log(user.rows);
        // if(user){
        //     const isSame = await bcrypt.compare(password, user.rows[0].password_hash);

        //     if(!isSame){
        //         return res.send("Incorrect Password")
        //     }
        //     req.session.username = user.rows[0].email;
        //     return res.send('User Logged in');

        // }else {
        //     return res.send('Email is not registered')
        // }
        if (user.rows.length === 0) {
            return res.send("Email is not registered");
        }

        const dbUser = user.rows[0];
        const isSame = await bcrypt.compare(password, dbUser.password_hash);

        if (!isSame) {
            return res.send("Incorrect Password");
        }

        req.session.email = user.rows[0].email;
        console.log(req.session)
        return res.send("User Logged in");

    } catch(err){
        console.log(err);
    }
}

async function signup(req, res){
    try{
        const { email, password, contact_number, first_name, last_name} = req.body;
        const user = await dbConnection.query('SELECT * FROM login WHERE EMAIL = $1', [email])

            if(user.rows.length === 0){
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            await dbConnection.query('INSERT INTO login ( email, password_hash, contact_number, first_name, last_name)values( $1, $2, $3, $4, $5)', [email, hashedPassword, contact_number, first_name, last_name])
            res.send('Account Created');

        }else{
            return res.send('User Already Registered')
        }
        
    }catch(err){
        console.log(err);
    }
}

async function session (req, res) {

    try{
    const email = req.session.email;

    const userData = await dbConnection.query('SELECT * FROM login WHERE EMAIL = $1', [email]);
    console.log(userData);

    if (req.session.email) {
    return res.json({
      loggedIn: true,
      email: req.session.email,
      contact_number: userData.rows[0].contact_number,
      first_name: userData.rows[0].first_name,
      last_name: userData.rows[0].last_name,
      userID : userData.rows[0].id
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