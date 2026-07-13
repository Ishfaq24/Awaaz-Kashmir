import { Router } from "express";

import {
  getDashboardStats,
  getRecentReports,
  getCategoryStats,
  getTopDistricts,
  getMonthlyTrend,
  getPriorityQueue,
  getAISummary,
  getDepartmentPerformance,
} from "../controllers/dashboard.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

router.get("/stats", getDashboardStats);

router.get("/recent", getRecentReports);

router.get("/categories", getCategoryStats);

router.get("/districts", getTopDistricts);

router.get("/trends", getMonthlyTrend);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

router.get("/priority", getPriorityQueue);

router.get("/ai-summary", getAISummary);

router.get(
  "/department-performance",
  getDepartmentPerformance
);

export default router;