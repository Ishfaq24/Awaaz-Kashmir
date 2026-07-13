import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  verifyReport,
  assignDepartment,
  changeReportStatus,
  resolveReport,
  getReports,
} from "../../api/report";

export default function ReportTable() {
  const queryClient = useQueryClient();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });

  const refresh = () =>
    queryClient.invalidateQueries({
      queryKey: ["reports"],
    });

  const verifyMutation = useMutation({
    mutationFn: (id) => verifyReport(id),
    onSuccess: refresh,
  });

  const assignMutation = useMutation({
    mutationFn: ({ id, department }) =>
      assignDepartment(id, department),
    onSuccess: refresh,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) =>
      changeReportStatus(id, status),
    onSuccess: refresh,
  });

  const resolveMutation = useMutation({
    mutationFn: (id) =>
      resolveReport(id, "Issue resolved by authority."),
    onSuccess: refresh,
  });

  if (isLoading)
    return (
      <div className="bg-white rounded-3xl border p-8">
        Loading Reports...
      </div>
    );

  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">
          Manage Reports
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-awaaz-background">
            <tr>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Severity</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Department</th>
              <th className="text-center p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr
                key={report._id}
                className="border-b hover:bg-awaaz-background/40"
              >
                <td className="p-4 font-medium">
                  {report.title}
                </td>

                <td className="p-4">
                  {report.category}
                </td>

                <td className="p-4">
                  {report.severity}
                </td>

                <td className="p-4">
                  {report.status}
                </td>

                <td className="p-4">
                  {report.assignedDepartment ||
                    "-"}
                </td>

                <td className="p-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() =>
                        verifyMutation.mutate(
                          report._id
                        )
                      }
                      className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm"
                    >
                      Verify
                    </button>

                    <button
                      onClick={() =>
                        assignMutation.mutate({
                          id: report._id,
                          department: "PWD",
                        })
                      }
                      className="px-3 py-2 rounded-lg bg-orange-500 text-white text-sm"
                    >
                      Assign
                    </button>

                    <button
                      onClick={() =>
                        statusMutation.mutate({
                          id: report._id,
                          status: "In Progress",
                          clerkId: user.id,
                        })
                      }
                      className="px-3 py-2 rounded-lg bg-purple-600 text-white text-sm"
                    >
                      Progress
                    </button>

                    <button
                      onClick={() =>
                        resolveMutation.mutate({
                          id: report._id,
                          notes,
                          clerkId: user.id,
                        })
                      }
                      className="px-3 py-2 rounded-lg bg-green-600 text-white text-sm"
                    >
                      Resolve
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {reports.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-12 text-gray-500"
                >
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}