import express from "express";
import { generateProducts, generateSteps } from "../controllers/generateController.js";

const router = express.Router();

router.post("/products", generateProducts);
router.post("/steps", generateSteps);

export default router;