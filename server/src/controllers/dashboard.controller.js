import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  getDashboardStatsService,
  getRecentReportsService,
  getCategoryStatsService,
  getTopDistrictsService,
  getMonthlyTrendService,
  getPriorityQueueService,
  getAISummaryService,
  getDepartmentPerformanceService,
} from "../services/dashboard.service.js";

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

export const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await getDashboardStatsService();

  return res.status(200).json(
    new ApiResponse(
      200,
      stats,
      "Dashboard statistics fetched successfully"
    )
  );
});

export const getRecentReports = asyncHandler(async (req, res) => {
  const reports = await getRecentReportsService();

  return res.status(200).json(
    new ApiResponse(
      200,
      reports,
      "Recent reports fetched successfully"
    )
  );
});

export const getCategoryStats = asyncHandler(async (req, res) => {
  const categories = await getCategoryStatsService();

  return res.status(200).json(
    new ApiResponse(
      200,
      categories,
      "Category statistics fetched successfully"
    )
  );
});

export const getTopDistricts = asyncHandler(async (req, res) => {
  const districts = await getTopDistrictsService();

  return res.status(200).json(
    new ApiResponse(
      200,
      districts,
      "Top districts fetched successfully"
    )
  );
});

export const getMonthlyTrend = asyncHandler(async (req, res) => {
  const trend = await getMonthlyTrendService();

  return res.status(200).json(
    new ApiResponse(
      200,
      trend,
      "Monthly trend fetched successfully"
    )
  );
});

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

export const getPriorityQueue = asyncHandler(async (req, res) => {
  const reports = await getPriorityQueueService();

  return res.status(200).json(
    new ApiResponse(
      200,
      reports,
      "Priority queue fetched successfully"
    )
  );
});

export const getAISummary = asyncHandler(async (req, res) => {
  const summary = await getAISummaryService();

  return res.status(200).json(
    new ApiResponse(
      200,
      summary,
      "AI summary fetched successfully"
    )
  );
});

export const getDepartmentPerformance = asyncHandler(async (req, res) => {
  const performance =
    await getDepartmentPerformanceService();

  return res.status(200).json(
    new ApiResponse(
      200,
      performance,
      "Department performance fetched successfully"
    )
  );
});