import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";

const getIntensity = (report) => {
  if (report.severity === "High") return 1.0;
  if (report.severity === "Medium") return 0.8;
  return 0.5;
};

export default function HeatMapLayer({ reports = [] }) {
  const map = useMap();

  useEffect(() => {
    const points = reports
      .map((report) => {
        const lat = report.location?.coordinates?.lat;
        const lng = report.location?.coordinates?.lng;

        if (lat === undefined || lng === undefined) {
          return null;
        }

        return [lat, lng, getIntensity(report)];
      })
      .filter(Boolean);

    if (!points.length) {
      return undefined;
    }

    const layer = L.heatLayer(points, {
      radius: 65,
      blur: 45,
      maxZoom: 15,
      max: 1.0,
      gradient: {
        0.2: "#22c55e",
        0.45: "#eab308",
        0.7: "#f97316",
        1: "#dc2626",
      },
    }).addTo(map);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, reports]);

  return null;
}
