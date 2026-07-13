import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import ReportCard from "../components/report/ReportCard";
import { getReports } from "../api/report";
import Loading from "../components/common/Loading";

export default function Reports() {
  const {
    data: reports = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h2 className="text-xl text-red-500">
          Failed to load reports.
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Community Reports
        </h1>

        <p className="text-awaaz-muted mt-2">
          Browse all reported civic issues.
        </p>
      </div>

      <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-4 md:p-5">
        <div className="relative">
          <Search
            className="absolute left-4 top-4 text-awaaz-muted"
            size={18}
          />

          <input
            placeholder="Search reports..."
            className="w-full rounded-xl border py-3 pl-11 pr-4"
          />
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-16 text-awaaz-muted">
          No reports found.
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {reports.map((report) => (
            <ReportCard
              key={report._id}
              report={report}
            />
          ))}
        </div>
      )}
    </div>
  );
}