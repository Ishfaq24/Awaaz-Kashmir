import {
  ClipboardList,
  CircleCheck,
  Clock3,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

const fetchStats = async () => {
  const { data } = await api.get("/dashboard/stats");
  return data.data;
};

export default function FloatingStats() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchStats,
  });

  const stats = [
    {
      title: "Total Reports",
      value: data?.totalReports ?? 0,
      icon: ClipboardList,
      color: "text-awaaz-secondary",
    },
    {
      title: "Pending",
      value: data?.pending ?? 0,
      icon: Clock3,
      color: "text-awaaz-accent",
    },
    {
      title: "Resolved",
      value: data?.resolved ?? 0,
      icon: CircleCheck,
      color: "text-green-600",
    },
  ];

  return (
    <div className="absolute top-6 right-6 z-[1000] space-y-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-awaaz-surface rounded-2xl shadow-xl p-5 w-52"
          >
            <div className="flex items-center justify-between">
              <Icon className={item.color} />

              <h3 className="text-3xl font-bold">
                {isLoading ? "..." : item.value}
              </h3>
            </div>

            <p className="text-awaaz-muted mt-2">
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}