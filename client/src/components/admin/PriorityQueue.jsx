import { useState } from "react";

import {
  TriangleAlert,
  ArrowRight,
  MapPin,
} from "lucide-react";

import usePriorityQueue from "../../hooks/usePriorityQueue";
import ReportDrawer from "./ReportDrawer";

export default function PriorityQueue() {
  const {
    data: reports = [],
    isLoading,
  } = usePriorityQueue();

  const [selectedReport, setSelectedReport] =
    useState(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  if (isLoading) {
    return (
      <div className="bg-awaaz-surface rounded-3xl border p-6">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border shadow-sm p-6">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-2xl font-bold">
            🚨 AI Priority Queue
          </h2>

          <span className="text-red-600 font-semibold">
            {reports.length} Active
          </span>

        </div>

        {reports.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            No pending reports
          </div>
        )}

        <div className="space-y-5">

          {reports.map((report) => (

            <div
              key={report._id}
              className="rounded-2xl border p-5 hover:border-red-500 transition"
            >

              <div className="flex justify-between">

                <div>

                  <h3 className="font-bold text-lg">
                    {report.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">

                    <MapPin size={16} />

                    {report.location?.district}

                  </div>

                </div>

                <TriangleAlert className="text-red-500" />

              </div>

              <div className="grid grid-cols-2 gap-3 mt-5 text-sm">

                <div>
                  Severity
                  <div className="font-semibold">
                    {report.severity}
                  </div>
                </div>

                <div>
                  Trust
                  <div className="font-semibold">
                    {report.trustScore}%
                  </div>
                </div>

                <div>
                  Confirmations
                  <div className="font-semibold">
                    {report.confirmations}
                  </div>
                </div>

                <div>
                  Score
                  <div className="text-red-600 font-bold">
                    {report.priorityScore}
                  </div>
                </div>

              </div>

              <div className="flex justify-between items-center mt-6">

                <span className="text-sm">

                  {report.assignedDepartment ||
                    "Unassigned"}

                </span>

                <button
                  onClick={() => {
                    setSelectedReport(report);
                    setDrawerOpen(true);
                  }}
                  className="flex items-center gap-2 text-awaaz-secondary font-semibold hover:text-red-600"
                >

                  View

                  <ArrowRight size={16} />

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      <ReportDrawer
        open={drawerOpen}
        report={selectedReport}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedReport(null);
        }}
      />
    </>
  );
}