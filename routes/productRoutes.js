import express from "express";
import { getProducts, getProductById, addProduct } from "../controllers/productController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/uploadMulter.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authenticateToken, upload.single('image'), addProduct);

export default router;