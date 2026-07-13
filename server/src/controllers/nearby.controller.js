import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import Report from "../models/Report.js";

const calculateDistance = (
  lat1,
  lon1,
  lat2,
  lon2
) => {
  const R = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
};

export const getNearbyReports = asyncHandler(
  async (req, res) => {
    const { id } = req.params;

    const current =
      await Report.findById(id);

    if (!current) {
      return res.status(404).json(
        new ApiResponse(
          404,
          null,
          "Report not found"
        )
      );
    }

    const lat =
      current.location?.coordinates?.lat;

    const lng =
      current.location?.coordinates?.lng;

    if (
      lat === undefined ||
      lng === undefined
    ) {
      return res.json(
        new ApiResponse(
          200,
          [],
          "Coordinates not available"
        )
      );
    }

    const reports = await Report.find({
      _id: { $ne: id },
    });

    const nearby = reports
      .map((report) => {
        const rLat =
          report.location?.coordinates?.lat;

        const rLng =
          report.location?.coordinates?.lng;

        if (
          rLat === undefined ||
          rLng === undefined
        )
          return null;

        const distance =
          calculateDistance(
            lat,
            lng,
            rLat,
            rLng
          );

        const sameCategory =
          report.category ===
          current.category;

        const sameSeverity =
          report.severity ===
          current.severity;

        let similarity = 0;

        if (sameCategory)
          similarity += 50;

        if (sameSeverity)
          similarity += 20;

        similarity += Math.max(
          0,
          30 - distance * 3
        );

        return {
          ...report.toObject(),

          distance: Number(
            distance.toFixed(2)
          ),

          similarity: Math.round(
            similarity
          ),
        };
      })
      .filter(Boolean)
      .filter(
        (report) => report.distance <= 5
      )
      .sort((a, b) => {
        if (
          b.similarity !== a.similarity
        ) {
          return (
            b.similarity -
            a.similarity
          );
        }

        return (
          a.distance - b.distance
        );
      })
      .slice(0, 5);

    return res.json(
      new ApiResponse(
        200,
        nearby,
        "Nearby reports fetched successfully"
      )
    );
  }
);