import User from "../models/User.js";
import Video from "../models/Video.js";
import Collection from "../models/Collection.js";

import { createError } from "../error.js";

// CREATE COLLECTION
export const addCollection = async (req, res, next)=>{
    const newCollection = new Collection({
        creatorId: req.user.id,
        subscriberedUsers: [req.user.id],  // add user to subscriber list
        ... req.body });

    const type = newCollection.type;
    const user = await User.findById(req.user.id);

    try {
        // add collection to correct user list
        if(type === 'subscriberedFolders'){

            // ensure user vournal titles are unique
            const duplicateNameRes = await Promise.all(user.subscriberedFolders.map(async (collectionId)=>{
                const foundCollect = await Collection.findById(collectionId);
                return foundCollect.title.toLowerCase() === newCollection.title.toLowerCase();
            }));

       
            if (duplicateNameRes.includes(true))
                return next(createError(403,'Collections must have unique names'));


            await User.findByIdAndUpdate(req.user.id,{
                $push:{ subscriberedFolders : newCollection._id}
            });

        } else if(type === 'subscriberedUsers'){
            await User.findByIdAndUpdate(req.user.id,{
                $push:{ subscriberedUsers : newCollection._id}
            });
        } else if(type === 'subscriberedGroups'){
            await User.findByIdAndUpdate(req.user.id,{
                $push:{ subscriberedGroups : newCollection._id}
            });
        } else{
            return next(createError(404,'Collection type not found!'));
        } 

        const savedCollection = await newCollection.save();
        res.status(200).json(savedCollection);

         
    } catch (error) {
        next(error);
    }
}

// UPDATE COLLECTION
export const updateCollection = async (req, res, next)=>{
    try {
        // compare user id to video's user id
        const collection = await Collection.findById(req.params.collectionId);
        if(!collection) return next(createError(404, 'Collection not found!'));
        if(!collection.subscriberedUsers.includes(req.user.id))return next(createError(403, 'You most be part of collection to update!'));

        const updatedCollection = await Collection.findByIdAndUpdate(
            req.params.collectionId,
            {$set: req.body,},
            {new: true}
        );
        res.status(200).json(updatedCollection);

    } catch (error) {
        next(error);
    }
  
}

// DELETE COLLECTION
export const deleteCollection = async (req, res, next)=>{
    try {
        const collection = await Collection.findById(req.params.collectionId);
        if(!collection) return next(createError(404, 'Collection not found!'));
        if(!collection.subscriberedUsers.includes(req.user.id))return next(createError(403, 'You most be part of collection to delete!'));

        const collectionId = req.params.collectionId;

        // get user videos from collection
        const userCollectionVideos = await Video.find({ collectionId: collectionId, 
                                                        userId: req.user.id });
        
        // delete all videos made by user
        userCollectionVideos.map(async(video,i)=>{
             await Video.findByIdAndDelete( video._id );
        })

        // remove collection from user collections
        await User.findByIdAndUpdate(
            req.user.id,
            { $pull:{ subscriberedFolders: collectionId,
                    subscriberedUsers: collectionId,
                    subscriberedGroups: collectionId,
                    favorites:  collectionId},},
            {new: true}
        );
        
        // remove user from collection subsciber list
        const updatedCollection = await Collection.findByIdAndUpdate(
            collectionId,
            { $pull: {subscriberedUsers: req.user.id} },
            {new: true});

        // remove collection from DB if no more subscribers
        if( updatedCollection.subscriberedUsers.length === 0 ) await updatedCollection.delete();
        res.status(200).json('Collection has been deleted.');

    } catch (error) {
        next(error);
    }
}

// GET COLLECTION
export const getCollection = async (req, res, next)=>{
    try {
        const collection = await Collection.findById(req.params.collectionId);
        if(!collection) return next(createError(404, 'Collection not found!'));
        if(!collection.subscriberedUsers.includes(req.user.id)) return next(createError(403, 'You most be part of collection to access!'));

        res.status(200).json(collection);``
    } catch (error) {
         next(error);
    }
}
