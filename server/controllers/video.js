import User from "../models/User.js";
import Video from "../models/Video.js";
import { createError } from "../error.js";

// CREATE VIDEO
export const addVideo = async (req, res, next)=>{
    const newVideo = new Video({
        userId: req.user.id, ... req.body });

    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
        
    } catch (error) {
        next(error);
    }
}

// UPDATE VIDEO
export const updateVideo = async (req, res, next)=>{
    try {
        // compare user id to video's user id
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404, 'Video not found!'));
        if(req.user.id === video.userId){
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {$set: req.body,},
                {new: true}
            );
            res.status(200).json(updatedVideo);
        } else{
            return next(createError(403, "You can only update your video!"));
        }
    } catch (error) {
        next(error);
    }
  
}

// DELETE VIDEO
export const deleteVideo = async (req, res, next)=>{
    try {
        // compare user id to video's user id
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404, 'Video not found!'));
        if(req.user.id === video.userId){
            const updatedVideo = await Video.findByIdAndDelete(
                req.params.id,
            );
            res.status(200).json('Video has been deleted.');
        } else{
            return next(createError(403, "You can only delete your video!"));
        }
    } catch (error) {
        next(error);
    }
}

// GET VIDEO
export const getVideo = async (req, res, next)=>{
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    } catch (error) {
         next(error);
    }
}

// ADD VIEW COUNT OF VIDEO
export const addView = async (req, res, next)=>{
    try {
        const video = await Video.findByIdAndUpdate(req.params.id,{
            $inc:{view:1}
        });
        res.status(200).json('Videos views increased');
    } catch (error) {
         next(error);
    }
}

// GET VIDEOS OF SUBSCRIBED
export const sub = async (req, res, next)=>{
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscriberedUsers;

        // loop through subscribed to list and return model of Video
        const list = await Promise.all(
            subscribedChannels.map((channelId)=>{
                return Video.find({userId: channelId});
            })
        );

        res.status(200).json(list.flat().sort((a,b)=> b.createdAt - a.createdAt));
    } catch (error) {
         next(error);
    }
}