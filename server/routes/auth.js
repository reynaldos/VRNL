import express from "express";
import { signin, signup, googleAuth, available } from "../controllers/auth.js";

const router = express.Router();

// CREATE A USER
router.post("/signup", signup);

// SIGN IN
router.post("/signin", signin);

// GOOGLE AUTH
router.post("/google", googleAuth);

// CHECK IF AVAILABLE
router.post("/available", available);



export default router; 