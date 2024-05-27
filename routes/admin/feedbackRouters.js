import AdminFeedbackController from "../../controllers/admin/adminFeedbackController.js";
import admin from "../../middleware/admin.js"

import express from "express";
const router = express.Router();
router.get("/admin/feedbacks",admin, AdminFeedbackController().index);
router.get("/admin/feedback/:id",admin, AdminFeedbackController().detail)
router.post("/admin/feedback/:id/rep", AdminFeedbackController().rep);
export default router;