import AdminOrderController from "../../controllers/admin/adminOrdersController.js";

import express from "express";
import admin from "../../middleware/admin.js"
const router = express.Router();
router.get("/admin/orders",admin, AdminOrderController().index);
router.get("/admin/order/:id",admin,AdminOrderController().detail );

export default router