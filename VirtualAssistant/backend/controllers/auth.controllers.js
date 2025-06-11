import genToken from "../config/token.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signUp=async (req,res)=>{
    try {
        const {name,email,password}=req.body

        const existEmail = await User.findOne({ email });
        if(existEmail){
            return res.status(400).json({message:"Email already exists"})
        }

        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters long "})
        }
        //we will not directly store password to database hence we are using bcrypt for hashing 
        const hashedPassword= await bcrypt.hash(password,10)

        const user=await User.create({
            name,password:hashedPassword,email
        })

        //token generate
        const token=await genToken(user._id) //mongodb(_id) is used to get user id

        //cookie parse
        res.cookie("token", token,{
            httpONLY:true,
            maxAge:"7*24*60*60*1000", //7 days in milliseconds
            sameSite:"strict",
            secure:false

        })

        return res.status(201).json(user)  //201 means created successfully


        
    }  catch (error) {
    console.error("Signup Error:", error); // for backend logs
    return res.status(500).json({ message: `Sign up error: ${error.message}` });
}

    }

    export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate token
        const token = await genToken(user._id);

        
        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
            sameSite: "strict",
            secure: false,
        });
        
        
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: `Login error: ${error.message}` });
    }
}

export const logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: false, // set to true in production (HTTPS)
        });

        return res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ message: `Logout error: ${error.message}` });
    }
};

