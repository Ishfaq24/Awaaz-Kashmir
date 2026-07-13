import api from "../lib/api";

export const getNotifications = async (
  clerkId
) => {
  const { data } = await api.get(
    `/notifications/${clerkId}`
  );

  return data.data;
};

export const markAsRead = async (
  id
) => {
  const { data } = await api.patch(
    `/notifications/read/${id}`
  );

  return data.data;
};

export const markAllAsRead = async (
  clerkId
) => {
  const { data } = await api.patch(
    `/notifications/read-all/${clerkId}`
  );

  return data.data;
};