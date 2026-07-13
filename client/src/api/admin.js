import api from "../lib/api";

export const getPriorityQueue = async (clerkId) => {
  const { data } = await api.get(
    "/admin/priority",
    {
      headers: {
        "x-clerk-id": clerkId,
      },
    }
  );

  return data.data;
};