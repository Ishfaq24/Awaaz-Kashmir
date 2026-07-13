import {
  MapPin,
  CalendarDays,
} from "lucide-react";

export default function ReportHero({
  report,
}) {
  return (
    <div className="rounded-3xl border overflow-hidden">

      {report.images?.length > 0 ? (
        <img
          src={report.images[0].url}
          alt={report.title}
          className="w-full h-72 object-cover"
        />
      ) : (
        <div className="h-72 bg-gray-100 flex items-center justify-center text-gray-400">
          No Image Available
        </div>
      )}

      <div className="p-6">

        <div className="flex justify-between items-start">

          <div>

            <h2 className="text-3xl font-bold">
              {report.title}
            </h2>

            <p className="text-gray-500 mt-2">
              {report.description}
            </p>

          </div>

          <div className="flex gap-2">

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                report.severity === "High"
                  ? "bg-red-100 text-red-700"
                  : report.severity === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {report.severity}
            </span>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                report.status === "Resolved"
                  ? "bg-green-100 text-green-700"
                  : report.status === "In Progress"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {report.status}
            </span>

          </div>

        </div>

        <div className="flex flex-wrap gap-6 mt-6 text-gray-600">

          <div className="flex items-center gap-2">

            <MapPin size={18} />

            <span>
              {report.location?.district || "Unknown"}
            </span>

          </div>

          <div className="flex items-center gap-2">

            <CalendarDays size={18} />

            <span>
              {new Date(
                report.createdAt
              ).toLocaleString()}
            </span>

          </div>

          <div className="flex items-center gap-2">

            <strong>Category:</strong>

            {report.category}

          </div>

        </div>

      </div>

    </div>
  );
}