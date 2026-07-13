import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function ReportsTrendChart({
  data = [],
}) {
  const chartData = data.map((item) => ({
    month: item.month,
    reports: item.reports,
  }));

  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-6">
      <h2 className="text-xl font-bold mb-6">
        Monthly Reports
      </h2>

      <div className="h-[320px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient
                id="colorReports"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#16a34a"
                  stopOpacity={0.5}
                />

                <stop
                  offset="95%"
                  stopColor="#16a34a"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="reports"
              stroke="#16a34a"
              strokeWidth={3}
              fill="url(#colorReports)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}