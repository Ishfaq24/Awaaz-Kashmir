import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import { syncUserService } from "../services/auth.service.js";

export const syncUser = asyncHandler(async (req, res) => {
  const user = await syncUserService(req.auth.sub);

  return res.status(200).json(
    new ApiResponse(
      200,
      user,
      "User synchronized successfully"
    )
  );
});