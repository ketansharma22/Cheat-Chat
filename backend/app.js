import express from 'express'
import cors from "cors"
import morgan from 'morgan'
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv'
config()
// "https://cheat-chatf-ketansharma22s-projects.vercel.app"
const app= express();
const origins = [
    'https://cheat-chatf-ketansharma22s-projects.vercel.app',
    'http://localhost:5173'
]

app.use(cors({
    credentials: true,
    origin: origins,
  }))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(morgan("dev"))
app.get("/",(req,res)=>{
    res.send("welcome")
})
app.use('/api/v1',appRouter)

export default app;

//https://cheat-chat-production.up.railway.app/