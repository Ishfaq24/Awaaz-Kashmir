import {
  MapPin,
  Clock3,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function RecentReportCard({ report }) {
  const image =
    report.images?.[0]?.url ||
    "https://placehold.co/200x200?text=No+Image";

  const location =
    report.location?.district ||
    report.location?.address ||
    "Unknown Location";

  const createdAt = report.createdAt
    ? new Date(report.createdAt).toLocaleString()
    : "Just now";

  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex justify-between items-center p-5 rounded-2xl border border-awaaz-border hover:border-awaaz-secondary transition-all"
    >
      <div className="flex gap-5">
        <img
          src={image}
          alt={report.title}
          className="w-20 h-20 rounded-2xl object-cover"
        />

        <div>
          <h3 className="font-bold text-lg">
            {report.title}
          </h3>

          <div className="flex gap-4 mt-3 text-awaaz-muted text-sm">
            <span className="flex items-center gap-1">
              <MapPin size={15} />
              {location}
            </span>

            <span className="flex items-center gap-1">
              <Clock3 size={15} />
              {createdAt}
            </span>
          </div>
        </div>
      </div>

      <Link to={`/reports/${report._id}`}>
        <button className="w-12 h-12 rounded-xl bg-awaaz-background hover:bg-awaaz-secondary hover:text-white transition-all flex items-center justify-center">
          <ArrowRight size={20} />
        </button>
      </Link>
    </motion.div>
  );
}