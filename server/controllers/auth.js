import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../error.js";

const defaultAvatarUrl = 'https://firebasestorage.googleapis.com/v0/b/vrnl-5055e.appspot.com/o/defaultAvatar.jpg?alt=media&token=faabde89-1119-4819-be57-2c7fc7e294db';

// CREATE A USER
export const signup = async(req,res, next) =>{
    // console.log(req.body);
    try{

        const nameTaken = await User.findOne({name: req.body.name});
        if(nameTaken) return next(createError(403, "Username taken!"));

        const emailTaken = await User.findOne({email: req.body.email});
        if(emailTaken) return next(createError(403, "Email taken!"));
        
        // encrypt password 
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = User({...req.body, password: hash, image: defaultAvatarUrl}); // new user object
        await newUser.save() // saves to DB
        res.status(200).send("User has been created!");

    }catch(err){
        // fire off error handling
        next(err);
    }
}

// SIGN IN
export const signin = async(req,res, next) =>{
    // console.log(req.body);
    try{
        
       const userByName = await User.findOne({name: req.body.usernameEmail});
       const userByEmail = await User.findOne({email: req.body.usernameEmail});


        // send custom error msg if user not found
       if(!userByName && !userByEmail) return next(createError(404, "User not found!"));

       const user = userByName || userByEmail;
       const isCorrect = await bcrypt.compare(req.body.password, user.password);

        // send custom error msg if password wrong
       if(!isCorrect) return next(createError(400, "Wrong Credentials!"));
        
        // creates web token and return user info
        const token = jwt.sign({id:user._id}, process.env.JWT);
        const {password, ...userInfo} = user._doc;

        // console.log(token)
        res.cookie("access_token", token,{
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        }).status(200).json(userInfo);

    }catch(err){
        // fire off error handling
        next(err);
    }
}


export const googleAuth = async (req, res, next) =>{
    try{
        const user = await User.findOne({email: req.body.email});

        // check if google user exists
        if(user){
            const token = jwt.sign({id:user._id}, process.env.JWT);
             res.cookie("access_token", token,{
                httpOnly: true
            }).status(200).json(user._doc);
        
        }else{ // create new user with google info
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            });

            const savedUser = await newUser.save();
            const token = jwt.sign({id:savedUser._id}, process.env.JWT);
             res.cookie("access_token", token,{
                httpOnly: true
            }).status(200).json(savedUser._doc);
        }
    }
    catch(err){
        next(err); 
    }
}


export const available = async (req, res, next) =>{
    // console.log(req.body);

    try{

        
        const nameTaken = await User.findOne({name: req.body.name});
        if(nameTaken) return next(createError(403, "Username taken!"));

        const emailTaken = await User.findOne({email: req.body.email});
        if(emailTaken) return next(createError(403, "Email taken!"));
        
        // if(!req.body.name && !req.body.email) return next(createError(400, "No info given!"));

        res.status(200).send("Username/email is available!");

    }catch(err){
        // fire off error handling
        next(err);
    }
}