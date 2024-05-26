import express from "express";
const router = express.Router();
import PaymentController from "../../controllers/customers/paymentController.js"
router.post("/payment/ipn",PaymentController().momoComfirm )
export default router;