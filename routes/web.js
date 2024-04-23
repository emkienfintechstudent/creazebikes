import express from "express";
import HomeController from "../controllers/homeController.js";
import ProductController from "../controllers/productController.js";
import OrderController from "../controllers/customers/orderController.js";
import CartController from "../controllers/customers/cartController.js";
import FeedbackController from "../controllers/customers/feedbackController.js";
import AccountController from "../controllers/customers/accountController.js";
import AuthController from "../controllers/authController.js";
import AdminProductController from "../controllers/admin/adminProductController.js";
import AdminOrderController from "../controllers/admin/adminOrdersController.js";
import AdminAdminController from "../controllers/admin/adminAdminController.js";
import AdminUserController from "../controllers/admin/AdminUserController.js";
import AdminFeedbackController from "../controllers/admin/adminFeedbackController.js";
import { setupProductCategory, keys, getALLProductCategory } from "../utils/products/productCategorySetup.js";
import { getDashboardOverview1,  getAdminProfile, getDataOverview1 } from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// User routes
router.get("/", HomeController().index);
router.get("/api/chart-data", getDataOverview1);
router.get("/login", AuthController().login);
router.get("/home", HomeController().index);
router.get("/category/:category/subcategory/:subcategory", ProductController().index);
router.get("/category/:category/product/detail/:id", ProductController().detailProduct);
router.get("/feedback", auth, FeedbackController().index);
router.get("/shopping-cart", CartController().index);
router.get("/user/account/profile", AccountController().index);
router.get("/logout", AuthController().logout);
router.get("/customer/orders", auth, OrderController().index);
router.post("/order", OrderController().store);
router.get("/user/account/profile/password", auth, AccountController().getUpdatePassword);
router.post("/user/account/profile/save/password", AccountController().postUpdatePassword);


// Post feedback(contact)
router.post("/feedback", FeedbackController().storeFeedback);
router.post("/login", AuthController().postLogin);
router.get("/auth/google", AuthController().googleAuth);
router.get("/auth/google/shopping-cart", AuthController().googleAuthCallback);
router.post("/signup", AuthController().signup);
router.post("/update-cart", CartController().update);
router.post("/user/account/profile/save", AccountController().update);
router.get("/user/order/:id", OrderController().show);

// Admin routes
router.get("/admin/products", AdminProductController().index);
router.get("/admin/products/detail", AdminProductController().AdminDetailProduct);
router.get("/admin/orders", AdminOrderController().index);
router.get("/admin/admin", AdminAdminController().index);
router.get("/admin/users",AdminUserController().index );
router.get("/admin/profile", getAdminProfile);
router.get("/admin/feedbacks", AdminFeedbackController().index);
router.post("/admin/order/status", AdminOrderController().update);
router.post("/admin/user/status", AdminUserController().update );
router.post("/user/search/products", ProductController().searchProduct);
router.post("/admin/admin", AdminAdminController().postAdminAdmin);
router.post("/admin/admin/role", AdminAdminController().updateAdminRole);
router.post("/admin/feedback/:id/rep", AdminFeedbackController().rep);

router.get("/admin/feedback/:id", AdminFeedbackController().detail);
// Dashboard routes
router.get("/admin/oveview/1", getDashboardOverview1);

export default router;
