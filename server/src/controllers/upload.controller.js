import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

import { uploadImage } from "../services/upload.service.js";

export const uploadReportImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Image is required");
  }

  const uploaded = await uploadImage(req.file);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        image: {
          url: uploaded.secure_url,
          publicId: uploaded.public_id,
        },
      },
      "Image uploaded successfully"
    )
  );
});