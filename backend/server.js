
import app from "./app.js"
import { connectToDatabase } from './db/connection.js'

connectToDatabase()
    .then(()=>{
        app.listen(5000,()=> console.log("server is open"))
    }).catch((error)=> console.log("error"))
