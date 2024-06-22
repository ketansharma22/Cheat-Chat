import {connect} from 'mongoose'
import { config } from 'dotenv'
config()
export async function connectToDatabase(){
    try{
        await connect(process.env.MONGODB_URL)
        console.log("done");
    }
    catch(error){
        console.log("no");
        throw new Error("cannot connect to database")
    }
}
