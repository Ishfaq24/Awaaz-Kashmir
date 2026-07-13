import api from "../lib/api";

export const getNotifications = async (clerkId, role) => {
  const { data } = await api.get(
    `/notifications/${clerkId}?role=${role || 'citizen'}`
  );
  return data.data;
};

export const markAsRead = async (id) => {
  const { data } = await api.patch(
    `/notifications/read/${id}`
  );
  return data.data;
};

export const markAllAsRead = async (clerkId, role) => {
  const { data } = await api.patch(
    `/notifications/read-all/${clerkId}?role=${role || 'citizen'}`
  );
  return data.data;
};

export const deleteNotification = async (id) => {
  const { data } = await api.delete(
    `/notifications/${id}`
  );
  return data.data;
};