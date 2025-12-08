import express from 'express'; // Node framework
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js'
import notFound from './middleware/notFound.js';
import dotenv from 'dotenv'; // Environment Variables
import dbConnection from './db.js';
import authRouter from './routes/auth.js'
import userRoutes from './routes/userRoutes.js'
import clinicRoutes from './routes/clinicRoutes.js'
// import pxData from './routes/pxData.js'
import path from 'path';
import cors from 'cors'; // Cross origin resource sharing
import session from 'express-session'; //Cookie Session
import connectPgSimple from 'connect-pg-simple' // Used by session to configure session store

import apptRoutes from './routes/apptRoutes.js'
import nodemailer from 'nodemailer';

// google auth dependencies
import passport from 'passport'
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

dotenv.config();

const PORT = process.env.PORT;
const app = express();
const pgSession = connectPgSimple(session);
// dbConnection();
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
//   optionsSuccessStatus: 200
}));

// Body parser middleware - used in dev for post requests
app.use(express.json())            
app.use(express.urlencoded({ extended: true }));

// Session config
app.use(session({
    store: new pgSession({
        pool: dbConnection,
        tableName: 'session'
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        sameSite: 'lax'
     }
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('Block One')
        try{
            const googleId = profile.id
            const email = profile.emails[0].value;
            const name = profile.displayName;
            const photo = profile.photos[0].value;
            
            let user = await dbConnection.query(`SELECT * from awp_users_tbl WHERE google_id = $1`, [googleId]);

            // console.log(user)
            // console.log(user.rows)
            // console.log(profile)
            if (user.rows.length === 0){
                user = await dbConnection.query(`INSERT INTO awp_users_tbl ( user_role, user_fname, user_lname, user_logemail, password_hash, google_id, is_verified)values( $1, $2, $3, $4, $5, $6, $7) RETURNING user_id`,[5, name, 'z', email, null, googleId, true ])
            }

            done(null, user)
    }catch (err){
        console.log(err)
    }}
))

passport.serializeUser((user, done) => {
    // console.log('Serialize user block one' + user)
    console.log('Block Three');
    console.log(user.rows[0].user_id)
    done(null, user.rows[0].user_id)
})
passport.deserializeUser( async (id, done) => {
    console.log('deserializing')
    const result = await dbConnection.query("SELECT * FROM awp_users_tbl WHERE user_id = $1", [id]);
    console.log(result.rows[0]);
    const row = result.rows[0]
    const user = {
        loggedIn:true,
        email: row.user_logemail,
        id: row.user_id,
        firstName: row.user_fname,
    }
    done(null, user);
});


app.get("/auth/google", passport.authenticate('google', {scope: ["profile", "email"]}))

app.get("/auth/google/callback", (req, res, next) => {
    console.log('Callback Endpoint Reached')
    req.session.user
    passport.authenticate('google', (err, user, info)=> {
        // console.log(user)
        if (err) {
        console.error("Authentication error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (!user) {
        return res.status(401).json({ error: "Login failed" });
      }
      // Log in via session
      req.login(user, (err) => {
        if (err) return res.status(500).json({ error: "Login failed" });
        // { id: rows.user_id, fname: rows.user_fname, email: rows.user_logemail }
        
        return res.redirect('http://localhost:5173/patient/dashboard');
      });
    })(req, res, next);
   
        }
    )

// Routes
app.use('/auth', authRouter);

        // let transporter = nodemailer.createTransport({
        //     service: "Gmail", 
        //     // smtp.gmail.com
        //     auth:{
        //         user:'jessee.dan.catli@gmail.com',
        //         pass: 'oulz vxxd cejw rpwj'
        //     },
        //     tls: {
        //         rejectedUnauthorized: false,
        //     }
        // })
// app.get('/test', async (req, res) => {
//     const noparamres = await fetch('https://noparam.com/api/v1/verify', {
//         method: 'POST',
//         headers: {
//           'Authorization': 'Bearer 528503cd-c741-4603-9ad9-b7e636485d80'
//         },
//         body: JSON.stringify({
//           "email": "test@test.com"
//         })
//     })    
//     console.log(noparamres);
// })
app.use('/userData', userRoutes);
app.use('/appt', apptRoutes);
app.use('/clinic', clinicRoutes);

// app.use('/login', )
app.get('/users', (req, res) => {
    res.json(users);
})

// logger middlware
app.use(logger);

// Routes

app.use(notFound)

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server online in PORT: ${PORT}`))
