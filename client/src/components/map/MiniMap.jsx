import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

export default function MiniMap({ report }) {
  const lat =
    report.location?.coordinates?.lat || 34.0837;

  const lng =
    report.location?.coordinates?.lng || 74.7973;

  const icon = L.divIcon({
    className: "",
    html: `
      <div
        style="
          width:18px;
          height:18px;
          background:#C1440E;
          border-radius:50%;
          border:3px solid white;
          box-shadow:0 0 10px rgba(0,0,0,.3);
        "
      ></div>
    `,
  });

  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-6">
      <h2 className="text-2xl font-bold mb-5">
        Exact Location
      </h2>

      <div className="h-[350px] rounded-2xl overflow-hidden">
        <MapContainer
          center={[lat, lng]}
          zoom={15}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap"
          />

          <Marker
            position={[lat, lng]}
            icon={icon}
          >
            <Popup>
              <strong>{report.title}</strong>

              <br />

              {report.location?.address}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}