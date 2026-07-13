import {
  Brain,
  TrendingUp,
  TriangleAlert,
  ClipboardCheck,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

const fetchStats = async () => {
  const { data } = await api.get("/dashboard/stats");
  return data.data;
};

const fetchCategories = async () => {
  const { data } = await api.get("/dashboard/categories");
  return data.data;
};

export default function AISummaryCard() {
  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchStats,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["dashboard-categories"],
    queryFn: fetchCategories,
  });

  const topCategory =
    categories.length > 0
      ? [...categories].sort((a, b) => b.count - a.count)[0]
      : null;

  return (
    <div className="absolute top-5 left-5 z-[1000] w-80 bg-awaaz-surface rounded-3xl shadow-xl border border-awaaz-border p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-2xl bg-awaaz-background flex items-center justify-center">
          <Brain className="text-awaaz-secondary" />
        </div>

        <div>
          <h2 className="font-bold text-xl">
            AI Live Summary
          </h2>

          <p className="text-sm text-awaaz-muted">
            Generated from live reports
          </p>
        </div>
      </div>

      <div className="space-y-5 text-sm">
        <div className="flex gap-3">
          <TrendingUp
            size={18}
            className="text-green-600 mt-1"
          />

          <p>
            <strong>{stats?.totalReports ?? 0}</strong> reports
            have been submitted across Kashmir.
          </p>
        </div>

        <div className="flex gap-3">
          <TriangleAlert
            size={18}
            className="text-red-500 mt-1"
          />

          <p>
            {topCategory ? (
              <>
                <strong>{topCategory._id}</strong> is the
                most reported issue (
                {topCategory.count} reports).
              </>
            ) : (
              <>No issue trends available yet.</>
            )}
          </p>
        </div>

        <div className="flex gap-3">
          <ClipboardCheck
            size={18}
            className="text-blue-600 mt-1"
          />

          <p>
            <strong>{stats?.resolved ?? 0}</strong> reports
            have already been resolved.
          </p>
        </div>
      </div>
    </div>
  );
}