import Notification from "../models/Notification.js";
import Report from "../models/Report.js";
import { getIO } from "../socket.js";

export const createNotification = async (data) => {
  const notification = await Notification.create(data);
  const populated = await notification.populate("report", "title location");
  
  // Emit in real-time
  getIO().emit("notification", populated);
  
  return populated;
};

export const getNotifications = async (clerkId, role) => {
  const query = {};
  
  if (role === "admin") {
    query.recipientType = "Admin";
  } else {
    query.recipientType = "Citizen";
    query.recipientClerkId = clerkId;
  }

  return Notification.find(query)
    .populate("report", "title location")
    .sort({ createdAt: -1 })
    .limit(50); // limit for performance
};

export const markAsRead = async (id) => {
  return Notification.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true }
  );
};

export const markAllAsRead = async (clerkId, role) => {
  const query = {};
  if (role === "admin") {
    query.recipientType = "Admin";
  } else {
    query.recipientType = "Citizen";
    query.recipientClerkId = clerkId;
  }
  
  await Notification.updateMany(
    { ...query, isRead: false },
    { isRead: true }
  );

  return true;
};

export const deleteNotificationService = async (id) => {
  return Notification.findByIdAndDelete(id);
};

export const notifyUser = async (report, title, message, type) => {
  if (!report.createdBy?.clerkId) return;

  return createNotification({
    title,
    message,
    type,
    report: report._id,
    recipientType: "Citizen",
    recipientClerkId: report.createdBy.clerkId,
  });
};

export const notifyAdmin = async (report, title, message, type) => {
  return createNotification({
    title,
    message,
    type,
    report: report._id,
    recipientType: "Admin",
  });
};

export const notifyNearbyCitizens = async (report, title, message, type) => {
  if (!report.location?.coordinates?.lat || !report.location?.coordinates?.lng) return;
  
  const lat = report.location.coordinates.lat;
  const lng = report.location.coordinates.lng;
  
  // Approximate 1km roughly 0.01 degrees
  const nearbyReports = await Report.find({
    "location.coordinates.lat": { $gte: lat - 0.01, $lte: lat + 0.01 },
    "location.coordinates.lng": { $gte: lng - 0.01, $lte: lng + 0.01 },
  });

  const uniqueCitizens = [...new Set(nearbyReports.map(r => r.createdBy.clerkId))];
  
  const notifications = [];
  for (const clerkId of uniqueCitizens) {
    // Don't notify the person who created the action
    if (clerkId && clerkId !== report.createdBy.clerkId) {
      const notif = await createNotification({
        title,
        message,
        type,
        report: report._id,
        recipientType: "Citizen",
        recipientClerkId: clerkId,
      });
      notifications.push(notif);
    }
  }
  return notifications;
};