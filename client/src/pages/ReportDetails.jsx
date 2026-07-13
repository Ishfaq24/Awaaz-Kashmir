import {
  ArrowLeft,
  MapPin,
  Calendar,
  Building2,
  TriangleAlert,
  User,
} from "lucide-react";
import MiniMap from "../components/map/MiniMap";
import NearbyReports from "../components/report/NearbyReports";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

import api from "../lib/api";
import Loading from "../components/common/Loading";

const fetchReport = async (id) => {
  const { data } = await api.get(`/reports/${id}`);
  return data.data;
};

export default function ReportDetails() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { user } = useUser();
  const [comment, setComment] = useState("");
  const {
    data: report,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["report", id],
    queryFn: () => fetchReport(id),
  });

  const { data: comments = [] } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const { data } = await api.get(`/reports/${id}/comments`);

      return data.data;
    },
  });

  const confirmMutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.post(`/reports/${id}/confirm`, {
        clerkId: user?.id || "guest-user",
      });

      return data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["report", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["reports"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard-stats"],
      });
    },
  });

  const commentMutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.post(`/reports/${id}/comments`, {
        clerkId: user?.id || "guest-user",
        name: user?.fullName || "Citizen",
        image: user?.imageUrl || "",
        message: comment,
      });

      return data.data;
    },

    onSuccess: () => {
      setComment("");

      queryClient.invalidateQueries({
        queryKey: ["comments", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["report", id],
      });
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error || !report) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-2xl font-bold text-red-500">Report not found.</h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link
        to="/reports"
        className="inline-flex items-center gap-2 text-awaaz-secondary font-medium"
      >
        <ArrowLeft size={18} />
        Back to Reports
      </Link>

      <div className="grid xl:grid-cols-5 gap-8">
        {/* Image */}

        <div className="xl:col-span-2">
          <img
            src={
              report.images?.[0]?.url ||
              "https://placehold.co/600x400?text=No+Image"
            }
            alt={report.title}
            className="rounded-3xl w-full h-64 md:h-[420px] object-cover"
          />
        </div>

        {/* Details */}

        <div className="xl:col-span-3 space-y-6">
          <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-4 md:p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-4xl font-semibold md:font-bold">{report.title}</h1>

                <p className="text-awaaz-muted mt-3">{report.description}</p>
              </div>

              <span
                className={`px-4 py-2 rounded-full font-semibold
    ${
      report.severity === "High"
        ? "bg-red-100 text-red-600"
        : report.severity === "Medium"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-green-100 text-green-700"
    }`}
              >
                {report.severity}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <InfoCard
                icon={<MapPin />}
                title="Location"
                value={report.location?.address || "Unknown"}
              />

              <InfoCard
                icon={<Building2 />}
                title="Department"
                value={report.assignedDepartment || "Not Assigned"}
              />

              <InfoCard
                icon={<User />}
                title="Reported By"
                value={report.createdBy?.name || "Anonymous"}
              />

              <InfoCard
                icon={<Calendar />}
                title="Created"
                value={new Date(report.createdAt).toLocaleString()}
              />
            </div>
          </div>

          {/* Status */}

          <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold md:font-bold mb-4 md:mb-6">Report Status</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              <StatusCard title="Status" value={report.status} />

              <StatusCard title="Category" value={report.category} />

              <StatusCard title="Trust Score" value={`${report.trustScore}%`} />

              <StatusCard
                title="Community Support"
                value={`${report.confirmations} 👍`}
              />
              <div className="md:col-span-4 mt-6">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Trust Score</span>

                  <span className="font-bold text-awaaz-secondary">
                    {report.trustScore}%
                  </span>
                </div>

                <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-awaaz-secondary transition-all duration-500"
                    style={{
                      width: `${report.trustScore}%`,
                    }}
                  />
                </div>
              </div>
              <div className="md:col-span-4 mt-6">
                <button
                  onClick={() => confirmMutation.mutate()}
                  disabled={confirmMutation.isPending}
                  className="
      w-full
      rounded-2xl
      bg-awaaz-secondary
      text-white
      py-4
      font-semibold
      hover:opacity-90
      disabled:opacity-50
      transition
    "
                >
                  {confirmMutation.isPending
                    ? "Confirming..."
                    : "👍 Confirm This Issue"}
                </button>
              </div>
            </div>
          </div>

          {/* AI */}

          <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold md:font-bold mb-4 md:mb-6">AI Analysis</h2>

            <div className="space-y-4">
              <p>
                <strong>Confidence:</strong>{" "}
                {report.aiAnalysis?.confidence ?? "N/A"}
              </p>

              <p>
                <strong>Generated Title:</strong>{" "}
                {report.aiAnalysis?.title || report.title}
              </p>

              <p>
                <strong>Description:</strong>{" "}
                {report.aiAnalysis?.description || report.description}
              </p>
            </div>
          </div>
<MiniMap report={report} />
          {/* Timeline */}

          <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold md:font-bold mb-4 md:mb-6">Timeline</h2>

            <div className="space-y-5">
              {report.timeline?.map((item) => (
                <div key={item._id} className="flex gap-4">
                  <div className="text-2xl">{timelineIcon(item.status)}</div>

                  <div>
                    <h3 className="font-semibold">{item.status}</h3>

                    <p className="text-awaaz-muted">{item.message}</p>

                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold md:font-bold mb-4 md:mb-6">Community Comments</h2>

            <div className="space-y-5">
              {comments.length === 0 ? (
                <p className="text-awaaz-muted">No comments yet.</p>
              ) : (
                comments.map((item) => (
                  <div key={item._id} className="border rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={item.image || "https://placehold.co/40"}
                        className="w-10 h-10 rounded-full"
                      />

                      <div>
                        <h3 className="font-semibold">{item.name}</h3>

                        <p className="text-xs text-gray-500">
                          {new Date(item.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <p>{item.message}</p>
                  </div>
                ))
              )}
            </div>
<NearbyReports reportId={report._id} />
            <div className="mt-8 space-y-4">
              <textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment..."
                className="
        w-full
        rounded-2xl
        border
        border-awaaz-border
        p-4
        resize-none
      "
              />

              <button
                onClick={() => commentMutation.mutate()}
                disabled={!comment.trim() || commentMutation.isPending}
                className="
        bg-awaaz-secondary
        text-white
        px-8
        py-3
        rounded-2xl
        hover:opacity-90
        disabled:opacity-50
      "
              >
                {commentMutation.isPending ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const timelineIcon = (status) => {
  switch (status) {
    case "Submitted":
      return "📤";

    case "Verified":
      return "🤖";

    case "Assigned":
      return "🏢";

    case "In Progress":
      return "🚧";

    case "Resolved":
      return "✅";

    case "Confirmed":
      return "👍";

    case "Comment":
      return "💬";

    default:
      return "📍";
  }
};

function InfoCard({ icon, title, value }) {
  return (
    <div className="flex gap-3">
      <div className="text-awaaz-secondary">{icon}</div>

      <div>
        <p className="text-sm text-awaaz-muted">{title}</p>

        <h3 className="text-sm md:text-base font-medium md:font-semibold">{value}</h3>
      </div>
    </div>
  );
}

function StatusCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-awaaz-background p-5 text-center">
      <p className="text-sm text-awaaz-muted">{title}</p>

      <h3 className="text-lg md:text-xl font-semibold md:font-bold mt-1 md:mt-2">{value}</h3>
    </div>
  );
}
