import express from "express";
import { addVideo, deleteVideo, getVideo, updateVideo, addView, sub } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// CREATE VIDEO
router.post("/", verifyToken, addVideo);

// UPDATE VIDEO
router.put("/:id", verifyToken, updateVideo);

// DELETE VIDEO
router.delete("/:id", verifyToken, deleteVideo);

// GET VIDEO
router.get("/find/:id", verifyToken, getVideo);

// ADD VIEW COUNT OF VIDEO
router.put("/view/:id", verifyToken, addView);

// GET VIDEOS OF SUBSCRIBED collection
router.get("/sub/:collectionid", verifyToken, sub)

export default router; 