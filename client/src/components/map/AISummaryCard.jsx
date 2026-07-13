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
    <div className="pointer-events-auto w-full min-w-0 max-w-full box-border xl:absolute xl:top-5 xl:left-5 xl:w-80 xl:max-w-[calc(100%-2.5rem)] bg-awaaz-surface rounded-2xl xl:rounded-3xl shadow-xl border border-awaaz-border p-4 sm:p-6 overflow-hidden">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5 min-w-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-awaaz-background flex items-center justify-center shrink-0">
          <Brain className="text-awaaz-secondary" size={20} />
        </div>

        <div className="min-w-0">
          <h2 className="font-bold text-base sm:text-xl truncate">
            AI Live Summary
          </h2>

          <p className="text-xs sm:text-sm text-awaaz-muted truncate">
            Generated from live reports
          </p>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-5 text-xs sm:text-sm">
        <div className="flex gap-2 sm:gap-3 min-w-0">
          <TrendingUp
            size={16}
            className="text-green-600 mt-0.5 shrink-0"
          />

          <p className="min-w-0 break-words">
            <strong>{stats?.totalReports ?? 0}</strong> reports
            have been submitted across Kashmir.
          </p>
        </div>

        <div className="flex gap-2 sm:gap-3 min-w-0">
          <TriangleAlert
            size={16}
            className="text-red-500 mt-0.5 shrink-0"
          />

          <p className="min-w-0 break-words">
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

        <div className="flex gap-2 sm:gap-3 min-w-0">
          <ClipboardCheck
            size={16}
            className="text-blue-600 mt-0.5 shrink-0"
          />

          <p className="min-w-0 break-words">
            <strong>{stats?.resolved ?? 0}</strong> reports
            have already been resolved.
          </p>
        </div>
      </div>
    </div>
  );
}
