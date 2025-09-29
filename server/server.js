import express from 'express'; // Node framework
import Posts from './routes/posts.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js'
import notFound from './middleware/notFound.js';
import dotenv from 'dotenv'; // Environment Variables
import dbConnection from './db.js';
import authRouter from './routes/auth.js'
import path from 'path';
import cors from 'cors'; // Cross origin resource sharing
import session from 'express-session'; //Cookie Session
import connectPgSimple from 'connect-pg-simple' // Used by session to configure session store

dotenv.config();

const PORT = process.env.PORT;
const app = express();
const pgSession = connectPgSimple(session);
// dbConnection();
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
  optionsSuccessStatus: 200
}));

// Body parser middleware - used in dev for post requests
app.use(express.json())            
app.use(express.urlencoded({ extended: false }));

// Session config
app.use(session({
    store: new pgSession({
        pool: dbConnection,
        tableName: 'session'
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.use('/auth', authRouter);

// app.use('/login', )
app.get('/users', (req, res) => {
    res.json(users);
})


// app.post('/users', async (req, res) => {
//     try{
//         const salt = await bcrypt.genSalt();
//         const hashedPassword = await bcrypt.hash(req.body.password, salt);
//         const user = { name: req.body.name, password: hashedPassword };
//         users.push(user)
//         res.status(201).send();
//     }catch(error){
//         console.log(error);
//         res.status(500).send();
//     }
// })

app.post('/users/login', async (req, res)=> {
    const user = users.find(user => user.name = req.body.name)
    if ( user == null){
        return res.status(400).send('Cannot find user')
    }
    try { 
        if (await bcrypt.compare(req.body.password, user.password)){
            res.send('Success');
        } else{
            res.send('Incorrect Password');
        }
    } catch {
        res.status(500).send()
    }
})
// logger middlware
app.use(logger);

// Routes
app.use('/api/posts', Posts);

app.use(notFound)

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server online in PORT: ${PORT}`))
