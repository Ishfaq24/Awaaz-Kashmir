import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { getRecentReports } from "../../api/dashboard";
import { timeAgo } from "../../utils/timeAgo";

export default function ActivityFeed() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["dashboard-recent"],
    queryFn: getRecentReports,
  });

  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-6">
      <h2 className="text-xl font-bold mb-6">Live Activity</h2>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-awaaz-secondary" size={28} />
        </div>
      ) : data.length === 0 ? (
        <p className="text-awaaz-muted text-center py-10">
          No recent activity yet.
        </p>
      ) : (
        <div className="space-y-6">
          {data.map((item) => (
            <div key={item._id} className="flex gap-4">
              <div className="w-3 h-3 mt-2 rounded-full bg-awaaz-secondary shrink-0" />

              <div>
                <h3 className="font-medium">
                  {item.title} — {item.status}
                </h3>

                <p className="text-sm text-awaaz-muted">
                  {item.category} · {timeAgo(item.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
