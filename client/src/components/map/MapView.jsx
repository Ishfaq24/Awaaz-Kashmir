import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";

const getMarkerColor = (severity) => {
  switch (severity) {
    case "High":
      return "#ef4444";
    case "Medium":
      return "#f59e0b";
    default:
      return "#22c55e";
  }
};

export default function MapView({ reports = [] }) {
  return (
    <MapContainer
      center={[34.0837, 74.7973]}
      zoom={9}
      scrollWheelZoom
      className="w-full h-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {reports.map((report) => {
        const lat = report.location?.coordinates?.lat;
        const lng = report.location?.coordinates?.lng;

        if (
          lat === undefined ||
          lng === undefined
        )
          return null;

        const icon = L.divIcon({
          className: "",
          html: `
            <div
              style="
                width:20px;
                height:20px;
                background:${getMarkerColor(
                  report.severity
                )};
                border-radius:50%;
                border:3px solid white;
                box-shadow:0 0 10px rgba(0,0,0,.35);
              "
            ></div>
          `,
        });

        return (
          <Marker
            key={report._id}
            position={[lat, lng]}
            icon={icon}
          >
            <Popup>
              <div className="w-64">
                <img
                  src={
                    report.images?.[0]?.url ||
                    "https://placehold.co/400x250?text=No+Image"
                  }
                  alt={report.title}
                  className="rounded-lg h-32 w-full object-cover"
                />

                <h2 className="font-bold text-lg mt-3">
                  {report.title}
                </h2>

                <p className="text-sm text-gray-600 mt-1">
                  {report.description}
                </p>

                <div className="mt-3 space-y-1 text-sm">
                  <p>
                    📍{" "}
                    {report.location?.address ||
                      "Unknown"}
                  </p>

                  <p>
                    Severity:
                    <strong>
                      {" "}
                      {report.severity}
                    </strong>
                  </p>

                  <p>
                    Status:
                    <strong>
                      {" "}
                      {report.status}
                    </strong>
                  </p>

                  <p>
                    Trust:
                    <strong>
                      {" "}
                      {report.trustScore}%
                    </strong>
                  </p>

                  <p>
                    Confirmations:
                    <strong>
                      {" "}
                      {report.confirmations}
                    </strong>
                  </p>
                </div>

                <Link
                  to={`/reports/${report._id}`}
                >
                  <button className="w-full mt-4 rounded-lg bg-awaaz-secondary text-white py-2 hover:opacity-90">
                    View Report
                  </button>
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}