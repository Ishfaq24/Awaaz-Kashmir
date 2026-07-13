import { useState } from "react";
import {
  MapPin,
  FileText,
  RefreshCw,
  TriangleAlert,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import useNearbyReports from "../../hooks/useNearbyReports";


export default function ReportForm({
  description,
  setDescription,
  location,
  setLocation,
  reportId
}) {

  const { data: duplicates = [] } =
  useNearbyReports(reportId);

  const refreshLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          address: "Current Location",
        });
      },
      () => alert("Unable to fetch location.")
    );
  };

  return (
    <div className="space-y-8">

      {/* Duplicate Detection */}

      {duplicates.length > 0 && (
        <div className="rounded-3xl border border-yellow-300 bg-yellow-50 p-6">

          <div className="flex items-center gap-3">

            <TriangleAlert className="text-yellow-600" />

            <div>

              <h2 className="font-bold text-lg">
                Similar reports found nearby
              </h2>

              <p className="text-sm text-gray-600">
                Check before creating a duplicate report.
              </p>

            </div>

          </div>

          <div className="space-y-4 mt-6">

            {duplicates.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center rounded-2xl border bg-white p-4"
              >
                <div>

                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    📍 {item.location}
                  </p>

                  <div className="flex gap-4 mt-2 text-sm">

                    <span>
                      {item.distance} km away
                    </span>

                    <span className="font-semibold text-green-600">
                      {item.similarity}% Match
                    </span>

                  </div>

                </div>

                <div className="flex gap-3">

                  <button className="rounded-xl bg-green-600 text-white px-4 py-2">
                    Confirm
                  </button>

                  <Link
                    to={`/reports/${item._id}`}
                    className="rounded-xl border px-4 py-2 flex items-center gap-2"
                  >
                    <Eye size={16} />
                    View
                  </Link>

                </div>

              </div>
            ))}

          </div>

        </div>
      )}

      {/* Location */}

      <div>

        <label className="text-sm font-semibold mb-3 block">
          Current Location
        </label>

        <div className="flex items-center justify-between rounded-2xl border px-5 py-4 bg-awaaz-background">

          <div className="flex gap-3">

            <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center">

              <MapPin className="text-awaaz-secondary" />

            </div>

            <div>

              <h3 className="font-semibold">
                {location.address || "Location not detected"}
              </h3>

              <p className="text-sm text-gray-500">

                {location.latitude
                  ? `${location.latitude.toFixed(
                      5
                    )}, ${location.longitude.toFixed(5)}`
                  : "Click refresh to detect"}

              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={refreshLocation}
            className="flex gap-2 items-center text-awaaz-secondary"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

        </div>

      </div>

      {/* Description */}

      <div>

        <label className="text-sm font-semibold mb-3 block">
          Description
        </label>

        <div className="relative">

          <FileText
            className="absolute left-5 top-5 text-gray-400"
            size={20}
          />

          <textarea
            rows={6}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            maxLength={300}
            placeholder="Describe the issue..."
            className="w-full rounded-2xl border pl-14 pr-5 py-5 resize-none bg-awaaz-background"
          />

        </div>

        <div className="flex justify-between mt-3 text-sm text-gray-500">

          <span>
            AI will improve your description.
          </span>

          <span>
            {description.length}/300
          </span>

        </div>

      </div>

    </div>
  );
}