import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getProfileService } from "../services/user.service.js";

export const getProfile = asyncHandler(async (req, res) => {
  const profile = await getProfileService(req.params.clerkId);

  return res.status(200).json(
    new ApiResponse(200, profile, "Profile fetched successfully")
  );
});
