import { useUser } from "@clerk/clerk-react";
import {
  ClipboardList,
  Clock3,
  CircleCheck,
  TriangleAlert,
} from "lucide-react";

// import useSyncUser from "../hooks/useSyncUser";
import useDashboard from "../hooks/useDashboard";

import StatCard from "../components/dashboard/StatCard";
import ReportsTrendChart from "../components/dashboard/ReportsTrendChart";
import IssueCategoryChart from "../components/dashboard/IssueCategoryChart";
import RecentReportCard from "../components/dashboard/RecentReportCard";
import AIInsights from "../components/dashboard/AIInsights";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import NotificationPanel from "../components/dashboard/NotificationPanel";
import DepartmentPerformance from "../components/dashboard/DepartmentPerformance";
import TopDistricts from "../components/dashboard/TopDistricts";
import QuickActions from "../components/dashboard/QuickActions";
import Loading from "../components/common/Loading";

export default function Home() {
  const { user } = useUser();

  // Enable later
  // useSyncUser();

  const {
    stats,
    recent,
    categories,
    trends,
    districts,
  } = useDashboard();

  if (
    stats.isLoading ||
    recent.isLoading ||
    categories.isLoading ||
    trends.isLoading ||
    districts.isLoading
  ) {
    return <Loading />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">
            Welcome Back, {user?.firstName || "Citizen"} 👋
          </h1>

          <p className="text-awaaz-muted mt-2">
            Monitor and manage civic issues across Kashmir.
          </p>
        </div>

        <QuickActions />
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Reports"
          value={stats.data?.totalReports || 0}
          icon={ClipboardList}
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Pending"
          value={stats.data?.pending || 0}
          icon={Clock3}
          color="bg-yellow-100 text-yellow-600"
        />

        <StatCard
          title="Resolved"
          value={stats.data?.resolved || 0}
          icon={CircleCheck}
          color="bg-awaaz-background text-awaaz-secondary"
        />

        <StatCard
          title="Critical"
          value={stats.data?.critical || 0}
          icon={TriangleAlert}
          color="bg-red-100 text-red-600"
        />
      </div>

      {/* Charts */}

      <div className="grid xl:grid-cols-2 gap-8">
        <ReportsTrendChart data={trends.data || []} />

        <IssueCategoryChart data={categories.data || []} />
      </div>

      {/* Reports + AI */}

      <div className="grid xl:grid-cols-2 gap-8">
        <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-4 md:p-6">
          <h2 className="text-2xl font-bold mb-6">
            Recent Reports
          </h2>

          <div className="space-y-5">
            {recent.data?.length > 0 ? (
              recent.data.map((report) => (
                <RecentReportCard
                  key={report._id}
                  report={report}
                />
              ))
            ) : (
              <div className="text-center py-10 text-awaaz-muted">
                No reports found.
              </div>
            )}
          </div>
        </div>

        <AIInsights />
      </div>

      {/* Activity */}

      <div className="grid xl:grid-cols-2 gap-8">
        <ActivityFeed />

        <NotificationPanel />
      </div>

      {/* Bottom */}

      <div className="grid xl:grid-cols-2 gap-8">
        <DepartmentPerformance />

        <TopDistricts data={districts.data || []} />
      </div>
    </div>
  );
}