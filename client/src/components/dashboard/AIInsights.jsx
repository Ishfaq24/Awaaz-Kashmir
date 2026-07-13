import {
  Brain,
  TrendingUp,
  TriangleAlert,
  Sparkles,
} from "lucide-react";

export default function AIInsights() {
  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-6">

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-xl bg-awaaz-background flex items-center justify-center">
          <Brain className="text-awaaz-secondary" />
        </div>

        <div>

          <h2 className="text-xl font-bold">
            AI Insights
          </h2>

          <p className="text-awaaz-muted text-sm">
            Today's analysis
          </p>

        </div>

      </div>

      <div className="space-y-5 mt-8">

        <div className="flex gap-3">

          <TrendingUp className="text-awaaz-secondary mt-1" />

          <p className="text-awaaz-muted">
            Road damage reports increased by
            <span className="font-semibold"> 18% </span>
            compared to yesterday.
          </p>

        </div>

        <div className="flex gap-3">

          <TriangleAlert className="text-awaaz-accent mt-1" />

          <p className="text-awaaz-muted">
            Bemina and Rajbagh have the highest
            number of critical reports.
          </p>

        </div>

        <div className="flex gap-3">

          <Sparkles className="text-awaaz-secondary mt-1" />

          <p className="text-awaaz-muted">
            AI recommends prioritizing Roads &
            Buildings Department today.
          </p>

        </div>

      </div>

    </div>
  );
}
