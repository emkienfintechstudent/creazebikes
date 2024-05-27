import express from "express";

import { getDashboardOverview1, getDataOverview1 } from "../controllers/adminController.js";
import StatusController from "../controllers/admin/statusController.js";
import AdminSalesController from "../controllers/admin/adminSalesController.js"
import ChartData from "../controllers/admin/chartData.js";
import Requirements from "../controllers/admin/requirements.js";
import RfmAnalysis from "../controllers/admin/rfmAnalysisController.js";
import CohortAnalysis from "../controllers/admin/cohortAnalysisController.js";
import admin from "../middleware/admin.js"

const router = express.Router();


router.get("/admin/oveview/1",admin, getDashboardOverview1);

// POST
router.get("/api/chart-data", getDataOverview1);
router.post("/admin/update/status", StatusController().update)


router.get("/admin/sales/charts",admin, AdminSalesController().chart);
router.get("/admin/chart/data/revenueprofit12months",ChartData().revenueProfit12Months)
router.get("/admin/chart/data/revenuebycategory",ChartData().revenueByCategory)
router.get("/admin/chart/data/ordersbycategory",ChartData().ordersByCategory)
router.get("/admin/chart/data/totalcustomers",ChartData().totalCustomers)
router.get("/admin/chart/data/revenuepercustomer",ChartData().revenuePerCustomer)
router.get("/admin/requirements",admin,Requirements().index)
router.get("/admin/rfmanalysis",admin,RfmAnalysis().index)
router.get("/admin/cohortanalysis",admin,CohortAnalysis().index)
router.get("/admin/chart/data/ordersbymonth",ChartData().ordersByMonth)


export default router;
