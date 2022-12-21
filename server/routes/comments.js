import express from "express";
import { addComment, deleteComment, getComment } from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// ADD COMMENT
router.post("/", verifyToken, addComment);

// DELETE COMMENT
router.delete("/:id", verifyToken, deleteComment);

// GET COMMENTS
router.get("/:videoId", verifyToken, getComment);

export default router; 