import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotificationService,
} from "../services/notification.service.js";

export const getUserNotifications = asyncHandler(
  async (req, res) => {
    const { clerkId } = req.params;
    const { role } = req.query; // pass ?role=admin to fetch admin notifications

    const notifications = await getNotifications(clerkId, role);

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
    const notification = await markAsRead(req.params.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        notification,
        "Notification marked as read"
      )
    );
  }
);

export const readAllNotifications = asyncHandler(
  async (req, res) => {
    const { clerkId } = req.params;
    const { role } = req.query;
    
    await markAllAsRead(clerkId, role);

    return res.status(200).json(
      new ApiResponse(
        200,
        {},
        "All notifications marked as read"
      )
    );
  }
);

export const deleteNotification = asyncHandler(
  async (req, res) => {
    await deleteNotificationService(req.params.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        {},
        "Notification deleted"
      )
    );
  }
);