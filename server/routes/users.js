import express from "express";
import { deleteUser, dislike, getUser, like, subscribe, unSubscribe, update } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// UPDATE USER
router.put("/:id", verifyToken, update);
 
// DELETE USER
router.delete("/:id", verifyToken, deleteUser);

// GET A USER
router.get("/find/:id", verifyToken, getUser);

// SUBSCRIBE A USER
router.put("/sub/:id", verifyToken, subscribe);

// UNSUBSCRIBE A USER
router.put("/ubsub/:id", verifyToken, unSubscribe);

// LIKE A VIDEO
router.put("/like/:videId", verifyToken, like);

// DISLIKE A VIDEO
router.put("/dislike/:videId", verifyToken, dislike);


export default router; 