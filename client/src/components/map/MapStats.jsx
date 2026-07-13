import {
  ClipboardList,
  Clock3,
  CircleCheckBig,
  TriangleAlert,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

const fetchStats = async () => {
  const { data } = await api.get("/dashboard/stats");
  return data.data;
};

export default function MapStats() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchStats,
  });

  const stats = [
    {
      title: "Reports",
      value: data?.totalReports ?? 0,
      icon: ClipboardList,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Pending",
      value: data?.pending ?? 0,
      icon: Clock3,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Resolved",
      value: data?.resolved ?? 0,
      icon: CircleCheckBig,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Critical",
      value: data?.critical ?? 0,
      icon: TriangleAlert,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-awaaz-surface rounded-3xl border border-awaaz-border shadow-sm hover:shadow-lg transition-all p-6"
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}
            >
              <Icon size={24} />
            </div>

            <p className="mt-6 text-awaaz-muted">
              {item.title}
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {isLoading ? "..." : item.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}