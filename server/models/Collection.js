import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
    creatorId:{
        type: String,
        require: true,
    },
     title:{
        type: String,
        require: true,
    },
     subscriberedUsers:{
        type: [String],
        require: true,
    },
     type:{
        type: String, //subscriberedFolders, subscriberedUsers, subscriberedGroups
        require: true,
    },
    

    }, { timestamps: true }
);

export default mongoose.model("Collection", CollectionSchema);