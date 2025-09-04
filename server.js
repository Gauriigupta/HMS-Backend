import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

const allowedOrigins = [
    "https://hms-user-frontend-l4bc.vercel.app",
    "https://hms-user-frontend-7wsv.vercel.app",
    "http://localhost:5173"
]

// CORS middleware
app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    credentials: true
}))

// Handle preflight OPTIONS requests
app.options("*", cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    credentials: true
}))

app.use(express.json())

app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.json({ message: 'Backend API running' })
})

app.listen(port, () => console.log(`Server started on port ${port}`))
