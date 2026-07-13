import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/profile";

export default function useProfile(clerkId) {
  return useQuery({
    queryKey: ["profile", clerkId],
    queryFn: () => getProfile(clerkId),
    enabled: !!clerkId,
  });
}