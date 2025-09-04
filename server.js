// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/mongodb.js'
// import connectCloudinary from './config/cloudinary.js'
// import adminRouter from './routes/adminRoute.js'
// import doctorRouter from './routes/doctorRoute.js'
// import userRouter from './routes/userRoute.js'

// // app config
// const app=express()
// const port=process.env.PORT || 4000
// connectDB()
// connectCloudinary()

// // middleware
// app.use(express.json())
// app.use(cors())

// // api end point
// app.use('/api/admin',adminRouter)
// app.use('/api/doctor',doctorRouter)
// app.use('/api/user',userRouter)

// app.get('/',(req,res)=>{
//     res.send('api')
// })

// app.listen(port,()=>console.log("server started",port))


import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Define allowed origins for CORS
const allowedOrigins = [
    'http://localhost:5173',
    'https://hms-user-frontend-akxp.vercel.app',
    'https://hms-user-frontend-l4bc.vercel.app',
    'https://hms-user-frontend-7wsv.vercel.app',
    'https://hms-user-frontend.vercel.app',
    'https://hms-user-frontend-x3rb.vercel.app',
    'https://hms-user-frontend-slms.vercel.app',
    'https://hms-user-frontend-hzdf.vercel.app',
    // Add any other production frontend URLs here
    
];

// middleware 
app.use(express.json());

// Explicitly handle all preflight requests
app.options('*', cors());

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true
}));

// api end point 
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Backend API running' });
});

app.listen(port, () => console.log(`Server started on port ${port}`));