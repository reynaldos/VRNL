import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        unique: true
    },
     email:{
        type: String,
        require: true,
        unique: true
    },
     password:{
        type: String,
        require: true,
    },
     image:{
        type: String,
    },
     subscribers:{
        type: Number,
        default: 0
    },
    subscriberedFolders:{
        type: [String],
    },
     subscriberedUsers:{
        type: [String],
    },
     subscriberedGroups:{
        type: [String],
    },
}, { timestamps: true }
);

export default mongoose.model("User", UserSchema);