import {
  Brain,
  TrendingUp,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import { getAISummary } from "../../api/dashboard";

export default function AISummaryPanel() {
  const {
    data: summary,
    isLoading,
  } = useQuery({
    queryKey: ["ai-summary"],
    queryFn: getAISummary,
  });

  if (isLoading) {
    return (
      <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border shadow-sm p-6">
        <h2 className="text-2xl font-bold">
          Loading AI Summary...
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border shadow-sm p-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-awaaz-background flex items-center justify-center">
          <Brain className="text-awaaz-secondary" />
        </div>

        <div>
          <h2 className="font-bold text-xl">
            AI Summary
          </h2>

          <p className="text-awaaz-muted">
            Generated from live reports
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="rounded-2xl bg-awaaz-background p-4 text-center">
          <h3 className="text-3xl font-bold">
            {summary.totalReports}
          </h3>

          <p className="text-sm text-awaaz-muted">
            Reports
          </p>
        </div>

        <div className="rounded-2xl bg-awaaz-background p-4 text-center">
          <h3 className="text-3xl font-bold text-red-600">
            {summary.highSeverity}
          </h3>

          <p className="text-sm text-awaaz-muted">
            Critical
          </p>
        </div>

        <div className="rounded-2xl bg-awaaz-background p-4 text-center">
          <h3 className="text-3xl font-bold text-yellow-600">
            {summary.pending}
          </h3>

          <p className="text-sm text-awaaz-muted">
            Pending
          </p>
        </div>
      </div>

      <div className="space-y-5 mt-8">
        <div className="flex gap-3">
          <TrendingUp className="text-blue-600 mt-1" />

          <p>
            Most reported category:
            <strong>
              {" "}
              {summary.topCategory?._id || "N/A"}
            </strong>
          </p>
        </div>

        {summary.insights.map((item, index) => (
          <div
            key={index}
            className="flex gap-3"
          >
            {index % 2 === 0 ? (
              <TriangleAlert className="text-red-500 mt-1" />
            ) : (
              <Sparkles className="text-awaaz-secondary mt-1" />
            )}

            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}