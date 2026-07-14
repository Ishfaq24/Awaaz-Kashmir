import {
  Brain,
  TrendingUp,
  TriangleAlert,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { getAISummary } from "../../api/dashboard";

export default function AIInsights() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-ai-summary"],
    queryFn: getAISummary,
  });

  const insights = data?.insights || [];
  const topCategory = data?.topCategory?._id;

  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-awaaz-background flex items-center justify-center">
          <Brain className="text-awaaz-secondary" />
        </div>

        <div>
          <h2 className="text-xl font-bold">AI Insights</h2>
          <p className="text-awaaz-muted text-sm">Live platform analysis</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-awaaz-secondary" size={28} />
        </div>
      ) : (
        <div className="space-y-5 mt-8">
          {insights.map((insight) => (
            <div key={insight} className="flex gap-3">
              <TrendingUp className="text-awaaz-secondary mt-1 shrink-0" />
              <p className="text-awaaz-muted">{insight}</p>
            </div>
          ))}

          {topCategory && (
            <div className="flex gap-3">
              <TriangleAlert className="text-awaaz-accent mt-1 shrink-0" />
              <p className="text-awaaz-muted">
                <span className="font-semibold">{topCategory}</span> is the most
                reported category right now.
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Sparkles className="text-awaaz-secondary mt-1 shrink-0" />
            <p className="text-awaaz-muted">
              Vision AI is active — new reports are auto-categorized and routed
              to departments.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
