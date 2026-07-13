import {
  TriangleAlert,
  Clock3,
  CircleCheck,
  ClipboardList,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

const fetchStats = async () => {
  const { data } = await api.get("/dashboard/stats");
  return data.data;
};

export default function MapLegend() {
  const { data } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchStats,
  });

  const items = [
    {
      icon: TriangleAlert,
      color: "text-red-500",
      title: "Critical",
      subtitle: `${data?.critical ?? 0} reports require immediate attention`,
    },
    {
      icon: Clock3,
      color: "text-yellow-500",
      title: "Pending",
      subtitle: `${data?.pending ?? 0} reports awaiting action`,
    },
    {
      icon: CircleCheck,
      color: "text-green-600",
      title: "Resolved",
      subtitle: `${data?.resolved ?? 0} reports completed`,
    },
    {
      icon: ClipboardList,
      color: "text-blue-600",
      title: "Total Reports",
      subtitle: `${data?.totalReports ?? 0} reports in the system`,
    },
  ];

  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">
        Live Statistics
      </h2>

      <div className="space-y-5">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-awaaz-background flex items-center justify-center">
                <Icon
                  size={20}
                  className={item.color}
                />
              </div>

              <div>
                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="text-sm text-awaaz-muted">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}