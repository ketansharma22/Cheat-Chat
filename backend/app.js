import express from 'express'
import cors from "cors"
import morgan from 'morgan'
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv'
config()

const app= express();

app.use(cors({origin:"http://localhost:5173", credentials:true}))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(morgan("dev"))
app.get("/",(req,res)=>{
    res.send("welcome")
})
app.use('/api/v1',appRouter)

export default app;