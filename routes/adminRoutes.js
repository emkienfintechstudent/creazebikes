import express from "express";
import AdminProductController from "../controllers/admin/adminProductController.js";
import AdminOrderController from "../controllers/admin/adminOrdersController.js";
import AdminAdminController from "../controllers/admin/adminAdminController.js";
import AdminUserController from "../controllers/admin/adminUserController.js";
import AdminFeedbackController from "../controllers/admin/adminFeedbackController.js";
import AdminProductCategoryController from "../controllers/admin/adminProductCategoryController.js";

import { getDashboardOverview1,  getAdminProfile, getDataOverview1 } from "../controllers/adminController.js";
import StatusController from "../controllers/admin/statusController.js";
import auth from "../middleware/auth.js";

const router = express.Router();
// GET
router.get("/admin/products", AdminProductController().index);
router.get("/admin/productsubcategories", AdminProductController().productSubCategories);
router.get("/admin/productcategories", AdminProductCategoryController().index);

router.get("/admin/products/detail", AdminProductController().AdminDetailProduct);
router.get("/admin/orders", AdminOrderController().index);
router.get("/admin/admins", AdminAdminController().index);
router.get("/admin/users",AdminUserController().index );
router.get("/admin/profile", getAdminProfile);
router.get("/admin/feedbacks", AdminFeedbackController().index);
router.get("/admin/oveview/1", getDashboardOverview1);
router.get("/admin/product/:id", AdminProductController().AdminDetailProduct)
router.get("/admin/feedback/:id", AdminFeedbackController().detail)
// POST
router.get("/api/chart-data", getDataOverview1);
router.get("/admin/order/:id",AdminOrderController().detail );
router.post("/admin/update/status", StatusController().update)
router.post("/admin/admin/role", AdminAdminController().updateAdminRole);
router.post("/admin/feedback/:id/rep", AdminFeedbackController().rep);
router.post("/admin/product/:id/edit", AdminProductController().editProduct);
router.post("/admin/add/user",AdminUserController().addUser);
router.post("/admin/add/admin",AdminAdminController().addAdmin);
router.post("/admin/add/productcategory",AdminProductCategoryController().addNew);


export default router;
