import {
  MapPin,
  Clock3,
  TriangleAlert,
  CircleCheckBig,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const severityColor = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

const statusColor = {
  Submitted: "bg-blue-100 text-blue-700",
  Verified: "bg-purple-100 text-purple-700",
  Assigned: "bg-orange-100 text-orange-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  Resolved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function ReportCard({ report }) {
  const image =
    report.images?.[0]?.url ||
    "https://placehold.co/600x400?text=No+Image";

  const location =
    report.location?.district ||
    report.location?.address ||
    "Unknown Location";

  const createdAt = report.createdAt
    ? new Date(report.createdAt).toLocaleString()
    : "Just now";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-awaaz-surface rounded-3xl border border-awaaz-border overflow-hidden shadow-sm hover:shadow-lg transition-all"
    >
      <img
        src={image}
        alt={report.title}
        className="h-52 w-full object-cover"
      />

      <div className="p-6">
        <div className="flex justify-between">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              severityColor[report.severity] ||
              "bg-gray-100 text-gray-700"
            }`}
          >
            {report.severity}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              statusColor[report.status] ||
              "bg-gray-100 text-gray-700"
            }`}
          >
            {report.status}
          </span>
        </div>

        <h2 className="text-2xl font-bold mt-5">
          {report.title}
        </h2>

        <p className="mt-3 text-awaaz-muted line-clamp-2">
          {report.description}
        </p>

        <div className="flex items-center gap-2 mt-4 text-awaaz-muted">
          <MapPin size={18} />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2 mt-2 text-awaaz-muted">
          <Clock3 size={18} />
          <span>{createdAt}</span>
        </div>

        <div className="flex items-center gap-2 mt-2 text-awaaz-muted">
          <TriangleAlert size={18} />
          <span>
            {report.assignedDepartment || "Not Assigned"}
          </span>
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            to={`/reports/${report._id}`}
            className="flex-1"
          >
            <button className="w-full rounded-xl bg-awaaz-secondary hover:opacity-90 text-white py-3 flex items-center justify-center gap-2">
              <Eye size={18} />
              View Details
            </button>
          </Link>

          <button className="w-12 h-12 rounded-xl border flex items-center justify-center hover:bg-awaaz-background">
            <CircleCheckBig size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}