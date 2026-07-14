import Report from "../models/Report.js";
import { calculateDistance } from "../utils/geo.js";

export const findDuplicateReports = async ({
  lat,
  lng,
  category,
  radiusKm = 0.15,
  limit = 5,
}) => {
  if (lat === undefined || lng === undefined || !category) {
    return [];
  }

  const reports = await Report.find({
    category,
    status: { $ne: "Resolved" },
    "location.coordinates.lat": { $exists: true },
    "location.coordinates.lng": { $exists: true },
  }).lean();

  return reports
    .map((report) => {
      const reportLat = report.location?.coordinates?.lat;
      const reportLng = report.location?.coordinates?.lng;

      if (reportLat === undefined || reportLng === undefined) {
        return null;
      }

      const distanceKm = calculateDistance(lat, lng, reportLat, reportLng);

      return {
        _id: report._id,
        title: report.title,
        category: report.category,
        severity: report.severity,
        status: report.status,
        confirmations: report.confirmations,
        distanceKm: Number(distanceKm.toFixed(3)),
        distanceMeters: Math.round(distanceKm * 1000),
        address: report.location?.address || "Nearby location",
        image: report.images?.[0]?.url || "",
      };
    })
    .filter(Boolean)
    .filter((report) => report.distanceKm <= radiusKm)
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit);
};
