import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import { currentUser } from "../middleware/auth.middleware.js";

export const me = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        clerkId: currentUser(req),
      },
      "Authenticated"
    )
  );
});