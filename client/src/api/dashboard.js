import api from "../lib/api";

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

export const getDashboardStats = async () => {
  const { data } = await api.get("/dashboard/stats");
  return data.data;
};

export const getRecentReports = async () => {
  const { data } = await api.get("/dashboard/recent");
  return data.data;
};

export const getCategoryStats = async () => {
  const { data } = await api.get("/dashboard/categories");
  return data.data;
};

export const getMonthlyTrends = async () => {
  const { data } = await api.get("/dashboard/trends");
  return data.data;
};

export const getTopDistricts = async () => {
  const { data } = await api.get("/dashboard/districts");
  return data.data;
};

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

export const getPriorityQueue = async () => {
  const { data } = await api.get("/dashboard/priority");
  return data.data;
};

export const getAISummary = async () => {
  const { data } = await api.get("/dashboard/ai-summary");
  return data.data;
};

export const getDepartmentPerformance = async () => {
  const { data } = await api.get(
    "/dashboard/department-performance"
  );

  return data.data;
};