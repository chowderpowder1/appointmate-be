import dbConnection from '../db.js';
import bcrypt from 'bcrypt'; // Hashing library

async function login(req, res){
    try{
        console.log(req.session.username);
        console.log(req.session.id);
        const { email, password } = req.body;
        const user = await dbConnection.query('SELECT * FROM login WHERE EMAIL = $1',[email]);
        if(user){
            const isSame = await bcrypt.compare(password, user.rows[0].password_hash);
            if(!isSame){
                return res.send("Incorrect Password")
            }
            req.session.username = user.rows[0].email;
            return res.send('User Logged in');
        }else {
            return res.send('Email is not registered')
        }
        
    } catch(err){
        console.log(err);
    }
}

async function signup(req, res){
    try{
        const { email, password } = req.body;
        
        const user = await dbConnection.query('SELECT * FROM login WHERE EMAIL = $1', [email])

            if(user.rows.length === 0){
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            await dbConnection.query('INSERT INTO login ( email, password_hash)values( $1, $2)', [email, hashedPassword])
            
            res.send('Account Created');
            
        }else{
            return res.send('User Already Registered')
        }
        
    }catch(err){
        console.log(err);
    }
}

async function again (req, res) {
    try{
    if (req.session.username) {
    return res.json({
      loggedIn: true,
      username: req.session.username
    });
    res.end;
  } else {
    return res.json({ loggedIn: false });
  }
    }catch(err){ 
        console.log(err)
    }
}

export { signup, login, again };