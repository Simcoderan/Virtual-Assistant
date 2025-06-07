import express from "express"
import dotenv from 'dotenv'
import connectDb from "./config/db.js"

dotenv.config()

const app=express() //express initiallization

const port=process.env.PORT || 5000

/*app.get("/",(req,res)=>{
    res.send("Hi Response sent")
})*/ 

app.listen(port,()=>{
    connectDb() //connected to database
    console.log(`Server is running on port ${port}`)
})

