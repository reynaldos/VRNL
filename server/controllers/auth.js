import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../error.js";

export const signup = async(req,res, next) =>{
    console.log(req.body);
    try{
        
        // encrypt password 
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = User({...req.body, password: hash}); // new user object
        await newUser.save() // saves to DB
        res.status(200).send("User has been created!");

    }catch(err){
        // fire off error handling
        next(err);
    }
}

export const signin = async(req,res, next) =>{
    console.log(req.body);
    try{
        
       const user = await User.findOne({name: req.body.name});

        // send custom error msg if user not found
       if(!user) return next(createError(404, "User not found!"));

       const isCorrect = await bcrypt.compare(req.body.password, user.password);

        // send custom error msg if password wrong
       if(!isCorrect) return next(createError(400, "Wrong Credentials!"));
        
        const token = jwt.sign({id:user_id}, process.env.JWT);

        res.cookie("access_token", token,{
            httpOnly: true
        }).status(200)

    }catch(err){
        // fire off error handling
        next(err);
    }
}