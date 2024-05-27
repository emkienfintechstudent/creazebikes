import express from "express";
const router = express.Router();
import ProductController from "../../controllers/productController.js";
router.post("/products/sort",ProductController().productSort );

export default router;