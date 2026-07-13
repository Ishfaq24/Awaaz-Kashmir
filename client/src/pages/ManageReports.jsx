import { useMemo, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useUser } from "@clerk/clerk-react";

import {
  Search,
  CheckCircle2,
  Loader,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import {
  getReports,
  verifyReport,
  assignDepartment,
  changeReportStatus,
  resolveReport,
  deleteReport,
} from "../api/report";
import Modal from "../components/common/Modal";
import Loading from "../components/common/Loading";

export default function ManageReports() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [severity, setSeverity] = useState("All");

  const [reportToDelete, setReportToDelete] = useState(null);
  const [reportToResolve, setReportToResolve] = useState(null);
  const [resolutionNotes, setResolutionNotes] = useState("");

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });

  const refresh = () => {
    queryClient.invalidateQueries({
      queryKey: ["reports"],
    });

    queryClient.invalidateQueries({
      queryKey: ["dashboard-stats"],
    });
  };

  const verifyMutation = useMutation({
    mutationFn: ({ id, clerkId }) =>
      verifyReport(id, clerkId),
    onSuccess: refresh,
  });

  const assignMutation = useMutation({
    mutationFn: ({ id, department, clerkId }) =>
      assignDepartment(id, department, clerkId),
    onSuccess: refresh,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status, clerkId }) =>
      changeReportStatus(id, status, clerkId),
    onSuccess: refresh,
  });

  const resolveMutation = useMutation({
    mutationFn: ({ id, notes, clerkId }) =>
      resolveReport(id, notes, clerkId),
    onSuccess: refresh,
  });

  // Moved out of the render loop — hooks must never be called
  // conditionally or inside a map()/callback.
  const deleteMutation = useMutation({
    mutationFn: ({ id, clerkId }) =>
      deleteReport(id, clerkId),
    onSuccess: refresh,
  });

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        report.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        report.location?.address
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "All" ||
        report.status === status;

      const matchesSeverity =
        severity === "All" ||
        report.severity === severity;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSeverity
      );
    });
  }, [reports, search, status, severity]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Manage Reports
        </h1>

        <p className="text-awaaz-muted mt-2">
          Authority Control Panel
        </p>
      </div>

      <div className="bg-awaaz-surface rounded-3xl border p-6 flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[250px]">
          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search reports..."
            className="w-full border rounded-xl pl-11 pr-4 py-3"
          />
        </div>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="border rounded-xl px-4"
        >
          <option>All</option>
          <option>Submitted</option>
          <option>Verified</option>
          <option>Assigned</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Rejected</option>
        </select>

        <select
          value={severity}
          onChange={(e) =>
            setSeverity(e.target.value)
          }
          className="border rounded-xl px-4"
        >
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <div className="bg-awaaz-surface rounded-3xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-awaaz-background">
            <tr>
              <th className="p-4 text-left">
                Report
              </th>
              <th>Status</th>
              <th>Severity</th>
              <th>Department</th>
              <th>Trust</th>
              <th className="text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredReports.map((report) => (
              <tr
                key={report._id}
                className="border-b hover:bg-awaaz-background/40"
              >
                <td className="p-4">
                  <div className="font-semibold">
                    {report.title}
                  </div>

                  <div className="text-sm text-gray-500">
                    {report.location?.address ||
                      "Unknown"}
                  </div>
                </td>

                <td>{report.status}</td>

                <td>{report.severity}</td>

                <td>
                  {report.assignedDepartment ||
                    "-"}
                </td>

                <td>{report.trustScore}%</td>

                <td>
                  <div className="flex flex-wrap items-center gap-2 justify-center p-2">

                    {/* Verify */}

                    <button
                      onClick={() =>
                        verifyMutation.mutate({
                          id: report._id,
                          clerkId: user.id,
                        })
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-2"
                    >
                      <ShieldCheck size={16} />
                    </button>

                    {/* Department */}

                    <select
                      defaultValue=""
                      onChange={(e) => {
                        if (!e.target.value)
                          return;

                        assignMutation.mutate({
                          id: report._id,
                          department: e.target.value,
                          clerkId: user.id,
                        });
                      }}
                      className="border rounded-lg px-2 py-2 text-sm"
                    >
                      <option value="">
                        Department
                      </option>

                      <option value="PWD">
                        PWD
                      </option>

                      <option value="SMC">
                        SMC
                      </option>

                      <option value="PHE">
                        PHE
                      </option>

                      <option value="KPDCL">
                        KPDCL
                      </option>

                      <option value="Traffic Police">
                        Traffic Police
                      </option>

                      <option value="R&B">
                        Roads & Buildings
                      </option>
                    </select>

                    {/* Status */}

                    <select
                      value={report.status}
                      onChange={(e) =>
                        statusMutation.mutate({
                          id: report._id,
                          status: e.target.value,
                          clerkId: user.id,
                        })
                      }
                      className="border rounded-lg px-2 py-2 text-sm"
                    >
                      <option>
                        Submitted
                      </option>

                      <option>
                        Verified
                      </option>

                      <option>
                        Assigned
                      </option>

                      <option>
                        In Progress
                      </option>

                      <option>
                        Resolved
                      </option>

                      <option>
                        Rejected
                      </option>
                    </select>

                    {/* Resolve */}

                    <button
                      onClick={() => {
                        setReportToResolve(report);
                        setResolutionNotes("");
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-3 py-2"
                    >
                      <CheckCircle2
                        size={16}
                      />
                    </button>

                    {/* Delete */}

                    <button
                      onClick={() => setReportToDelete(report)}
                      className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-3 py-2"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>
                </td>
              </tr>
            ))}

            {filteredReports.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-16 text-gray-500"
                >
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={!!reportToDelete}
        onClose={() => setReportToDelete(null)}
        title="Delete Report"
        actionButton={
          <button
            onClick={() => {
              if (reportToDelete) {
                deleteMutation.mutate({
                  id: reportToDelete._id,
                  clerkId: user.id,
                });
                setReportToDelete(null);
              }
            }}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium"
          >
            Delete
          </button>
        }
      >
        <p className="text-gray-600">Are you sure you want to delete this report? This action cannot be undone.</p>
      </Modal>

      <Modal
        isOpen={!!reportToResolve}
        onClose={() => setReportToResolve(null)}
        title="Resolve Report"
        actionButton={
          <button
            onClick={() => {
              if (reportToResolve && resolutionNotes) {
                resolveMutation.mutate({
                  id: reportToResolve._id,
                  notes: resolutionNotes,
                  clerkId: user.id,
                });
                setReportToResolve(null);
              }
            }}
            disabled={!resolutionNotes}
            className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium disabled:opacity-50"
          >
            Resolve
          </button>
        }
      >
        <div className="space-y-4">
          <p className="text-gray-600">Please enter resolution notes for this report.</p>
          <textarea
            value={resolutionNotes}
            onChange={(e) => setResolutionNotes(e.target.value)}
            className="w-full border rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={4}
            placeholder="Resolution Notes..."
          />
        </div>
      </Modal>
    </div>
  );
}