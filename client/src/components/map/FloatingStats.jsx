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
    <div className="pointer-events-auto flex gap-2 min-w-0 w-full max-w-full xl:absolute xl:top-6 xl:right-6 xl:bottom-auto xl:left-auto xl:w-auto xl:flex-col xl:gap-0 xl:space-y-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex-1 min-w-0 bg-awaaz-surface rounded-xl xl:rounded-2xl shadow-xl p-3 xl:p-5 xl:flex-none xl:w-52"
          >
            <div className="flex items-center justify-between gap-1">
              <Icon className={`shrink-0 h-4 w-4 xl:h-6 xl:w-6 ${item.color}`} />

              <h3 className="text-xl xl:text-3xl font-bold">
                {isLoading ? "..." : item.value}
              </h3>
            </div>

            <p className="text-awaaz-muted mt-1 xl:mt-2 text-xs xl:text-base truncate">
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
