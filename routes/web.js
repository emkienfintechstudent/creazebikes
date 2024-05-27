import express from "express";
import userRoutes from "./userRoutes.js";
import adminRoutes from "./adminRoutes.js";
import adminProductRouters  from "./admin/productRouters.js"
import cartRouters from "./user/cartRouters.js"
import productRouters from "./user/productRouters.js"
import personRouters from "./admin/personRouters.js"
import feedbackRouters from "./admin/feedbackRouters.js"
import orderRouters from "./admin/orderRouters.js"

const router = express.Router();

router.use("/", userRoutes);
router.use("/", adminRoutes);
router.use("/",  adminProductRouters);
router.use("/",  cartRouters);
router.use("/",  productRouters);
router.use("/",   personRouters);
router.use("/",  feedbackRouters);
router.use("/",  orderRouters);

export default router;
