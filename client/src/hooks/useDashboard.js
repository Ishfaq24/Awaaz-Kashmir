import { useQuery } from "@tanstack/react-query";

import {
  getDashboardStats,
  getRecentReports,
  getCategoryStats,
  getMonthlyTrends,
  getTopDistricts,
} from "../api/dashboard";

export default function useDashboard() {
  const stats = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });

  const recent = useQuery({
    queryKey: ["dashboard-recent"],
    queryFn: getRecentReports,
  });

  const categories = useQuery({
    queryKey: ["dashboard-categories"],
    queryFn: getCategoryStats,
  });

  const trends = useQuery({
    queryKey: ["dashboard-trends"],
    queryFn: getMonthlyTrends,
  });

  const districts = useQuery({
    queryKey: ["dashboard-districts"],
    queryFn: getTopDistricts,
  });

  return {
    stats,
    recent,
    categories,
    trends,
    districts,
  };
}