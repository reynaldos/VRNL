import User from "../models/User.js";
import Video from "../models/Video.js";

// import {Collection } from "../models/Collection.js";
import {createError} from "../error.js";
import { query } from "express";



// UPDATE USER
export const update = async (req, res, next) => { 
    // check if current user matches user to update
    if(req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body
            },{
                new: true
            });
            res.status(200).json(updatedUser);

        } catch (error) {
            next(error);
        }
    } else{
        return next(createError(403, "You can only update your account!"));
    }
}

// DELETE USER
export const deleteUser = async (req, res, next) => { 
        // check if current user matches user to update
    if(req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(
                req.params.id
            );
            res.status(200).json("User has been deleted.");

        } catch (error) {
            next(error);
        }
    } else{
        return next(createError(403, "You can only delete your account!"));
    }
}

// GET A USER
export const getUser = async (req, res, next) => { 
     try {
           const user = await User.findById(req.params.id);
           res.status(200).json(user);

        } catch (error) {
            next(error);
        }

}

// SUBSCRIBE A USER
export const subscribe = async (req, res, next) => { 
    try {
        // add user to subscribe to
        await User.findByIdAndUpdate(req.params.id,{
            $push:{subscriberedUsers: req.params.id}
        });

        // increase subscriber number to user being subscribe to
            await User.findByIdAndUpdate(req.params.id,{
            // $inc: {subscribers: 1}
            });

        res.status(200).json('Subsciption successful!');


    } catch (error) {
        next(error);
    }
}

// UNSUBSCRIBE A USER
export const unSubscribe = async (req, res, next) => { 
    try {
        // add user to subscribe to
        await User.findByIdAndUpdate(req.params.id,{
            $pull:{subscribedUser: req.params.id}
        });

        // increase subscriber number to user being subscribe to
            await User.findByIdAndUpdate(req.params.id,{
            $inc: {subscribers: -1}
            });

        res.status(200).json('Unsubsciption successful!');


    } catch (error) {
        next(error);
    }
}

// LIKE A VIDEO
export const like = async (req, res, next) => { 
    const id = req.user.id;
    const videoId = req.params.videoId;

    try {
          await Video.findByIdAndUpdate(videoId, {
            $addToSet: {likes: id},
            $pull: {dislikes: id},
          })
          res.status(200).json('The video has been liked.')
    } catch (error) {
        next(error);
    }
}

// DISLIKE A VIDEO
export const dislike = async (req, res, next) => { 
    const id = req.user.id;
    const videoId = req.params.videoId;

    try {
          await Video.findByIdAndUpdate(videoId, {
            $addToSet: {dislikes: id},
            $pull: {likes: id},
          })
          res.status(200).json('The video has been disliked.')
    } catch (error) {
        next(error);
    }
}


// SEARCH FOR USERS
export const searchUsers = async (req, res, next) => { 
    const searchedName = req.query.username;
     try {
           const users = await User.find({name: { $regex: searchedName, $option: "i" }
            }).limit(20);
            
           res.status(200).json(users);

        } catch (error) {
            next(error);
        }

}