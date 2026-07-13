import {
  TrendingUp,
  TriangleAlert,
  CircleCheckBig,
  Clock3,
} from "lucide-react";

import StatCard from "../components/dashboard/StatCard";

export default function Analytics() {
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
          value="1,284"
          icon={TrendingUp}
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Critical"
          value="57"
          icon={TriangleAlert}
          color="bg-red-100 text-red-600"
        />

        <StatCard
          title="Resolved"
          value="881"
          icon={CircleCheckBig}
          color="bg-awaaz-background text-awaaz-secondary"
        />

        <StatCard
          title="Avg Resolution"
          value="22h"
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

            <Progress title="Road Damage" value={85} color="bg-red-500" />
            <Progress title="Garbage" value={60} color="bg-green-500" />
            <Progress title="Water Supply" value={42} color="bg-blue-500" />
            <Progress title="Electricity" value={31} color="bg-yellow-500" />
            <Progress title="Drainage" value={18} color="bg-purple-500" />

          </div>

        </div>

        <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-8">

          <h2 className="text-2xl font-bold mb-6">
            Department Performance
          </h2>

          <div className="space-y-6">

            <Department
              name="Roads & Buildings"
              resolved="82%"
            />

            <Department
              name="Municipality"
              resolved="91%"
            />

            <Department
              name="PHE"
              resolved="74%"
            />

            <Department
              name="Electricity"
              resolved="88%"
            />

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