import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  getPriorityQueueService,
} from "../services/admin.service.js";

export const getPriorityQueue = asyncHandler(
  async (req, res) => {
    const reports =
      await getPriorityQueueService();

    return res.status(200).json(
      new ApiResponse(
        200,
        reports,
        "Priority queue fetched successfully"
      )
    );
  }
);