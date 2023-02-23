import express from "express";
import { addCollection, deleteCollection, getCollection, updateCollection } from "../controllers/collection.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// CREATE COLLECTION
router.post("/", verifyToken, addCollection);

// UPDATE COLLECTION
router.put("/:collectionId", verifyToken, updateCollection);

// DELETE COLLECTION
router.delete("/:collectionId", verifyToken, deleteCollection);

// GET COLLECTION
router.get("/:collectionId", verifyToken, getCollection);


export default router; 