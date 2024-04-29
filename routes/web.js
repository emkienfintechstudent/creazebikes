import express from "express";
import userRoutes from "./userRoutes.js";
import adminRoutes from "./adminRoutes.js";

const router = express.Router();

router.use("/", userRoutes);
router.use("/", adminRoutes);

export default router;
