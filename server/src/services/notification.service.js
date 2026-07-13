import Notification from "../models/Notification.js";

export const createNotification = async ({
  clerkId,
  name,
  report,
  title,
  message,
  type,
  actionUrl,
}) => {
  return Notification.create({
    recipient: {
      clerkId,
      name,
    },
    report,
    title,
    message,
    type,
    actionUrl,
  });
};

export const getNotifications = async (
  clerkId
) => {
  return Notification.find({
    "recipient.clerkId": clerkId,
  }).sort({
    createdAt: -1,
  });
};

export const markAsRead = async (id) => {
  return Notification.findByIdAndUpdate(
    id,
    {
      isRead: true,
    },
    {
      new: true,
    }
  );
};

export const markAllAsRead = async (
  clerkId
) => {
  await Notification.updateMany(
    {
      "recipient.clerkId": clerkId,
      isRead: false,
    },
    {
      isRead: true,
    }
  );

  return true;
};
export const notifyUser = async (
  report,
  title,
  message,
  type
) => {
  if (!report.createdBy?.clerkId) return;

  return createNotification({
    clerkId: report.createdBy.clerkId,
    name: report.createdBy.name,
    report: report._id,
    title,
    message,
    type,
    actionUrl: `/reports/${report._id}`,
  });
};