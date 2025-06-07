import mongoose from "mongoose"

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Db connected")
        
    } catch (error) {

        console.errorlog(error)
        
    }
}

export default connectDb