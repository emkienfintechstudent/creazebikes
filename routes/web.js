import express from "express";
import userRoutes from "./userRoutes.js";
import adminRoutes from "./adminRoutes.js";
import adminProductRouters  from "./admin/productRouters.js"
import cartRouters from "./user/cartRouters.js"
import productRouters from "./user/productRouters.js"
const router = express.Router();

router.use("/", userRoutes);
router.use("/", adminRoutes);
router.use("/",  adminProductRouters);
router.use("/",  cartRouters);
router.use("/",  productRouters);

export default router;
