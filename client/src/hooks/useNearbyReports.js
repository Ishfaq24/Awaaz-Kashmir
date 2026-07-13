import { useQuery } from "@tanstack/react-query";
import { getNearbyReports } from "../api/report";

export default function useNearbyReports(reportId) {
  return useQuery({
    queryKey: ["nearby", reportId],
    queryFn: () => getNearbyReports(reportId),
    enabled: !!reportId,
  });
}