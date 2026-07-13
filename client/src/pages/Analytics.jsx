import {
  TrendingUp,
  TriangleAlert,
  CircleCheckBig,
  Clock3,
  Loader2,
} from "lucide-react";

import StatCard from "../components/dashboard/StatCard";
import useDashboard from "../hooks/useDashboard";
import Loading from "../components/common/Loading";

export default function Analytics() {
  const { stats, categories, performance } = useDashboard();

  if (stats.isLoading || categories.isLoading || performance.isLoading) {
    return <Loading />;
  }

  const s = stats.data;
  const cats = categories.data || [];
  const perfs = performance.data || [];

  const totalCatCount = cats.reduce((acc, c) => acc + c.count, 0);

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Analytics Dashboard
        </h1>

        <p className="text-awaaz-muted mt-2">
          AI-powered civic insights and reporting trends.
        </p>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Reports"
          value={s?.totalReports?.toLocaleString() || 0}
          icon={TrendingUp}
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Critical"
          value={s?.critical?.toLocaleString() || 0}
          icon={TriangleAlert}
          color="bg-red-100 text-red-600"
        />

        <StatCard
          title="Resolved"
          value={s?.resolved?.toLocaleString() || 0}
          icon={CircleCheckBig}
          color="bg-awaaz-background text-awaaz-secondary"
        />

        <StatCard
          title="Avg Resolution"
          value={`${s?.avgResolutionTime || 0}h`}
          icon={Clock3}
          color="bg-yellow-100 text-yellow-600"
        />

      </div>

      <div className="grid xl:grid-cols-2 gap-8">

        <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-8">

          <h2 className="text-2xl font-bold mb-6">
            Reports by Category
          </h2>

          <div className="space-y-6">

            {cats.map((c, i) => {
              const colors = [
                "bg-red-500",
                "bg-green-500",
                "bg-blue-500",
                "bg-yellow-500",
                "bg-purple-500",
                "bg-indigo-500",
                "bg-pink-500",
                "bg-orange-500",
              ];
              const pct =
                totalCatCount > 0
                  ? Math.round((c.count / totalCatCount) * 100)
                  : 0;
              return (
                <Progress
                  key={c._id}
                  title={c._id}
                  value={pct}
                  color={colors[i % colors.length]}
                />
              );
            })}
            {cats.length === 0 && (
              <p className="text-awaaz-muted">No data available.</p>
            )}

          </div>

        </div>

        <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-8">

          <h2 className="text-2xl font-bold mb-6">
            Department Performance
          </h2>

          <div className="space-y-6">

            {perfs.map((p) => (
              <Department
                key={p.department}
                name={p.department}
                resolved={`${p.performance}%`}
              />
            ))}
            {perfs.length === 0 && (
              <p className="text-awaaz-muted">No data available.</p>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

function Progress({
  title,
  value,
  color,
}) {
  return (
    <div>

      <div className="flex justify-between mb-2">

        <span>{title}</span>

        <span>{value}%</span>

      </div>

      <div className="h-3 rounded-full bg-awaaz-border overflow-hidden">

        <div
          className={`h-full ${color}`}
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>
  );
}

function Department({
  name,
  resolved,
}) {
  return (
    <div className="flex justify-between items-center border rounded-2xl p-5">

      <h3 className="font-semibold">
        {name}
      </h3>

      <span className="text-awaaz-secondary font-bold">
        {resolved}
      </span>

    </div>
  );
}