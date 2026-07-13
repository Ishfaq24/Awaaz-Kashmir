import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";

import { getPriorityQueue } from "../api/admin";

export default function usePriorityQueue() {
  const { user } = useUser();

  return useQuery({
    queryKey: ["priority-queue"],
    queryFn: () =>
      getPriorityQueue(user?.id),
    enabled: !!user,
    refetchInterval: 5000,
  });
}