import express from 'express'
import cors from "cors"
import morgan from 'morgan'
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv'
config()

const app= express();

app.use(cors({origin:"https://cheat-chatfrontend-ndkbptf2i-ketansharma22s-projects.vercel.app", credentials:true}))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(morgan("dev"))
app.use('/',appRouter)


export default app;