import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/authRouter.routes.js"; //authRouter is imported from routes/authRouter.routes.js
import cookiParser from "cookie-parser"; //importing cookie-parser to parse cookies
dotenv.config();

const app = express(); //express initiallization

const port = process.env.PORT || 5000;



app.use("/api/auth", authRouter); //authRouter is imported from routes/authRouter.routes.js
app.use(express.json()); //middleware to parse JSON bodies
app.use(cookiParser()); //middleware to parse cookies



/*app.get("/",(req,res)=>{
    res.send("Hi Response sent")
})*/

app.listen(port, () => {
  connectDb(); //connected to database
  console.log(`Server is running on port ${port}`);
});
 
