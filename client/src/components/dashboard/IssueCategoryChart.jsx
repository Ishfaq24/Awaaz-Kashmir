import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const colors = [
  "#16a34a",
  "#2563eb",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#f97316",
];

export default function IssueCategoryChart({
  data = [],
}) {
  const chartData = data.map((item) => ({
    name: item._id || "Other",
    value: item.count,
  }));

  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-6">
      <h2 className="text-xl font-bold mb-6">
        Issue Categories
      </h2>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
              label
            >
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}