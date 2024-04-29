import express from "express";
import HomeController from "../controllers/homeController.js";
import ProductController from "../controllers/productController.js";
import OrderController from "../controllers/customers/orderController.js";
import CartController from "../controllers/customers/cartController.js";
import FeedbackController from "../controllers/customers/feedbackController.js";
import AccountController from "../controllers/customers/accountController.js";
import AuthController from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", HomeController().index);
router.get("/home", HomeController().index);
router.get("/category/:category/subcategory/:subcategory", ProductController().index);
router.get("/category/:category/product/detail/:id", ProductController().detailProduct);
router.get("/feedback", auth, FeedbackController().index);
router.get("/shopping-cart", CartController().index);
router.get("/user/account/profile", AccountController().index);
router.get("/customer/orders", auth, OrderController().index);
router.post("/order", OrderController().store);
router.get("/user/account/profile/password", auth, AccountController().getUpdatePassword);
router.post("/user/account/profile/save/password", AccountController().postUpdatePassword);
router.post("/feedback", FeedbackController().storeFeedback);
router.post("/login", AuthController().postLogin);
router.get("/logout", AuthController().logout);
router.get("/user/order/:id", OrderController().show);

export default router;
