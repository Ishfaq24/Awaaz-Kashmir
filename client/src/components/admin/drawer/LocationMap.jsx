import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

export default function LocationMap({
  report,
}) {
  const lat =
    report.location?.coordinates?.lat;

  const lng =
    report.location?.coordinates?.lng;

  if (!lat || !lng) {
    return (
      <div className="rounded-3xl border p-8 text-center text-gray-500">
        Location unavailable
      </div>
    );
  }

  return (
    <div className="rounded-3xl overflow-hidden border">

      <div className="p-5 border-b">

        <h2 className="text-xl font-bold">
          Incident Location
        </h2>

      </div>

      <MapContainer
        center={[lat, lng]}
        zoom={15}
        className="h-[350px] w-full"
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[lat, lng]}>
          <Popup>
            {report.title}
          </Popup>
        </Marker>

      </MapContainer>

    </div>
  );
}