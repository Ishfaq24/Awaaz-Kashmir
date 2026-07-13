import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../api/notifications";

export default function useNotifications(
  clerkId
) {
  return useQuery({
    queryKey: [
      "notifications",
      clerkId,
    ],
    queryFn: () =>
      getNotifications(clerkId),
    enabled: !!clerkId,
    refetchInterval: 5000,
  });
}