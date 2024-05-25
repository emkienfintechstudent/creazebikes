import express from "express";
import userRoutes from "./userRoutes.js";
import adminRoutes from "./adminRoutes.js";
import adminProductRouters  from "./admin/productRouters.js"
import cartRouters from "./user/cartRouters.js"
const router = express.Router();

router.use("/", userRoutes);
router.use("/", adminRoutes);
router.use("/",  adminProductRouters);
router.use("/",  cartRouters);

export default router;
