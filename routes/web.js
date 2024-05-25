import express from "express";
import userRoutes from "./userRoutes.js";
import adminRoutes from "./adminRoutes.js";
import adminProductRouters  from "./admin/productRouters.js"
const router = express.Router();

router.use("/", userRoutes);
router.use("/", adminRoutes);
router.use("/",  adminProductRouters);

export default router;
