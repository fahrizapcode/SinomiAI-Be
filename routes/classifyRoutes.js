import express from "express";
import { classifyWaste } from "../controllers/classifyController.js";
import { upload } from "../utils/uploadMulter.js";

const router = express.Router();

router.post("/", upload.single('image'), classifyWaste);

export default router;