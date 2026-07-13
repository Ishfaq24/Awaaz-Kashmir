import { useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useUser } from "@clerk/clerk-react";

import {
  ShieldCheck,
  Building2,
 CheckCircle2,
  Trash2,
  Loader2,
} from "lucide-react";

import {
  verifyReport,
  assignDepartment,
  changeReportStatus,
  resolveReport,
  deleteReport,
} from "../../../api/report";

export default function AdminActions({
  report,
   resolutionImage,
}) {
  const queryClient = useQueryClient();

  const { user } = useUser();

  const [department, setDepartment] =
    useState(
      report.assignedDepartment || ""
    );

  const [status, setStatus] = useState(
    report.status
  );

  const refresh = () => {
    queryClient.invalidateQueries({
      queryKey: ["priority-queue"],
    });

    queryClient.invalidateQueries({
      queryKey: ["reports"],
    });

    queryClient.invalidateQueries({
      queryKey: ["dashboard-stats"],
    });
  };

  const verifyMutation = useMutation({
    mutationFn: () =>
      verifyReport(report._id, user.id),
    onSuccess: refresh,
  });

  const assignMutation = useMutation({
    mutationFn: () =>
      assignDepartment(
        report._id,
        department,
        user.id
      ),
    onSuccess: refresh,
  });

  const statusMutation = useMutation({
    mutationFn: () =>
      changeReportStatus(
        report._id,
        status,
        user.id
      ),
    onSuccess: refresh,
  });

  const resolveMutation = useMutation({
  mutationFn: () =>
    resolveReport(
      report._id,
      "Resolved by authority",
      user.id,
      resolutionImage
    ),
  onSuccess: refresh,
});

  const deleteMutation = useMutation({
    mutationFn: () =>
      deleteReport(report._id, user.id),
    onSuccess: refresh,
  });

  return (
    <div className="rounded-3xl border bg-white p-6">

      <h2 className="text-xl font-bold mb-6">
        Authority Actions
      </h2>

      <div className="space-y-6">

        {/* Verify */}

        <button
          onClick={() =>
            verifyMutation.mutate()
          }
          disabled={
            verifyMutation.isPending
          }
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 flex justify-center items-center gap-2"
        >
          {verifyMutation.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <ShieldCheck size={20} />
          )}

          Verify Report
        </button>

        {/* Department */}

        <div>

          <label className="font-medium">
            Assign Department
          </label>

          <div className="flex gap-3 mt-2">

            <select
              value={department}
              onChange={(e) =>
                setDepartment(
                  e.target.value
                )
              }
              className="flex-1 border rounded-xl px-4 py-3"
            >
              <option value="">
                Select Department
              </option>

              <option value="PWD">
                PWD
              </option>

              <option value="SMC">
                Srinagar Municipal Corporation
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

            <button
              onClick={() =>
                assignMutation.mutate()
              }
              className="bg-orange-600 text-white px-5 rounded-xl"
            >
              <Building2 />
            </button>

          </div>

        </div>

        {/* Status */}

        <div>

          <label className="font-medium">
            Report Status
          </label>

          <div className="flex gap-3 mt-2">

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
              className="flex-1 border rounded-xl px-4 py-3"
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

            <button
              onClick={() =>
                statusMutation.mutate()
              }
              className="bg-indigo-600 text-white px-5 rounded-xl"
            >
              Update
            </button>

          </div>

        </div>

        {/* Resolve */}

        <button
          onClick={() =>
            resolveMutation.mutate()
          }
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 flex justify-center gap-2"
        >

          <CheckCircle2 />

          Mark Resolved

        </button>

        {/* Delete */}

        <button
          onClick={() => {
            if (
              window.confirm(
                "Delete this report permanently?"
              )
            ) {
              deleteMutation.mutate();
            }
          }}
          className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 flex justify-center gap-2"
        >

          <Trash2 />

          Delete Report

        </button>

      </div>

    </div>
  );
}