import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../services/notification.service.js";

export const getUserNotifications = asyncHandler(
  async (req, res) => {
    const { clerkId } = req.params;

    const notifications =
      await getNotifications(clerkId);

    return res.status(200).json(
      new ApiResponse(
        200,
        notifications,
        "Notifications fetched successfully"
      )
    );
  }
);

export const readNotification = asyncHandler(
  async (req, res) => {
    const notification =
      await markAsRead(req.params.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        notification,
        "Notification marked as read"
      )
    );
  }
);

export const readAllNotifications =
  asyncHandler(async (req, res) => {
    await markAllAsRead(
      req.params.clerkId
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        {},
        "All notifications marked as read"
      )
    );
  });