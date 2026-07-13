import {
  ClipboardList,
  Clock3,
  CircleCheck,
  TriangleAlert,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import ReportTable from "../components/admin/ReportTable";
import DepartmentPerformance from "../components/admin/DepartmentPerformance";


import {
  getDashboardStats,
} from "../api/dashboard";

import StatCard from "../components/dashboard/StatCard";
import PriorityQueue from "../components/admin/PriorityQueue";
import AISummaryPanel from "../components/admin/AISummaryPanel";

export default function AdminDashboard() {
  const {
    data: stats,
    isLoading,
  } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getDashboardStats,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-2xl font-bold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Authority Dashboard
        </h1>

        <p className="text-awaaz-muted mt-2">
          Manage reports and coordinate response across Kashmir.
        </p>
      </div>

      <div className="grid xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Reports"
          value={stats.totalReports}
          icon={ClipboardList}
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Pending"
          value={stats.pending}
          icon={Clock3}
          color="bg-yellow-100 text-yellow-600"
        />

        <StatCard
          title="Resolved"
          value={stats.resolved}
          icon={CircleCheck}
          color="bg-green-100 text-green-600"
        />

        <StatCard
          title="Critical"
          value={stats.critical}
          icon={TriangleAlert}
          color="bg-red-100 text-red-600"
        />
      </div>

      <div className="grid xl:grid-cols-2 gap-8">
        <PriorityQueue />

        <AISummaryPanel />

        <ReportTable />
        <DepartmentPerformance />
      </div>
    </div>
  );
}