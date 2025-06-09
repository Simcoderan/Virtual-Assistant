import express from "express";
import { signUp, login, logout } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

// Routes
authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logout); // or .get() based on preference

export default authRouter;
// This file defines the user-related routes for authentication.
// It imports the necessary modules and controllers, sets up the routes for user signup, login, and logout,