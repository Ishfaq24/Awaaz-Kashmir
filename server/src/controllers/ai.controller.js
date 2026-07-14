import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { analyzeImageWithFallback } from "../services/ai.service.js";
import { findDuplicateReports } from "../services/duplicate.service.js";

export const analyzeReportImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Image file is required.");
  }

  const userDescription = req.body.description?.trim() || "";
  const lat = req.body.lat ? Number(req.body.lat) : undefined;
  const lng = req.body.lng ? Number(req.body.lng) : undefined;

  const analysis = await analyzeImageWithFallback(req.file, userDescription);

  let duplicates = [];

  if (lat !== undefined && lng !== undefined && analysis.category) {
    duplicates = await findDuplicateReports({
      lat,
      lng,
      category: analysis.category,
    });
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        ...analysis,
        duplicates,
        hasDuplicates: duplicates.length > 0,
      },
      "Image analyzed successfully"
    )
  );
});

export const checkDuplicates = asyncHandler(async (req, res) => {
  const { lat, lng, category } = req.body;

  if (lat === undefined || lng === undefined || !category) {
    throw new ApiError(400, "Latitude, longitude, and category are required.");
  }

  const duplicates = await findDuplicateReports({
    lat: Number(lat),
    lng: Number(lng),
    category,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        duplicates,
        hasDuplicates: duplicates.length > 0,
      },
      "Duplicate check completed"
    )
  );
});
