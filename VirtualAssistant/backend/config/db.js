import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config({ path: './.env' }); // if running from backend/


const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Db connected")
        
    } catch (error) {

        console.log(error)
        
    }
}

export default connectDb