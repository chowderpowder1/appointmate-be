import express from 'express';
import Posts from './routes/posts.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const app = express();

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/api/posts', Posts);

app.listen(PORT, () => console.log(`Server online in PORT: ${PORT}`))
