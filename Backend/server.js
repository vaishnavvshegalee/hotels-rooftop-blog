import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import {config as cnf} from 'dotenv';
cnf();
import router from './src/routes/blog.route.js';
const port =process.env.PORT || 5000;
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));



// connection
mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(port,()=>{
        console.log(`server is listening on port ${port}`);
        
    });
    console.log('Database connected successfully.');
    
}).catch((err)=>{
    console.log('Something went wrong',err);
    
})
app.use('/api/v1',router);
