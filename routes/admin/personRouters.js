import AdminUserController from "../../controllers/admin/adminUserController.js";
import AdminAdminController from "../../controllers/admin/adminAdminController.js";
import admin from "../../middleware/admin.js"

import express from 'express'
const router = express.Router();

router.get("/admin/users", admin, AdminUserController().index );
router.post("/admin/add/user",AdminUserController().addUser);
router.get("/admin/user/:id",admin,AdminUserController().detail)
router.get("/admin/admin/:id",admin,AdminUserController().detail)


router.get("/admin/admins",admin, AdminAdminController().index);
router.post("/admin/admin/role", AdminAdminController().updateAdminRole);
router.post("/admin/add/admin",AdminAdminController().addAdmin);
export default router