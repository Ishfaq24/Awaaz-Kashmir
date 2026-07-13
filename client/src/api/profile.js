import api from "../lib/api";

export const getProfile = async (clerkId) => {
  const { data } = await api.get(
    `/users/profile/${clerkId}`
  );

  return data.data;
};