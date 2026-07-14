import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications } from "../api/notifications";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

let socket;

export default function useNotifications(clerkId, role = "citizen") {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      socket = io(import.meta.env.VITE_API_BASE_URL || "http://localhost:5000");
    }

    const handleNotification = (newNotification) => {
      // Check if notification belongs to this user
      if (
        (role === "admin" && newNotification.recipientType === "Admin") ||
        (role !== "admin" && newNotification.recipientType === "Citizen" && newNotification.recipientClerkId === clerkId)
      ) {
        // Show Toast
        toast.success(`New Notification: ${newNotification.title}`, {
          icon: '🔔',
          duration: 4000,
        });

        // Prepend to query cache
        queryClient.setQueryData(["notifications", clerkId, role], (oldData) => {
          if (!oldData) return [newNotification];
          return [newNotification, ...oldData];
        });
      }
    };

    // Generic refresh events
    const refreshData = () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-recent"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-trends"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-categories"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-districts"] });
      queryClient.invalidateQueries({ queryKey: ["priority-queue"] });
    };

    socket.on("notification", handleNotification);
    socket.on("new-report", refreshData);
    socket.on("report-updated", refreshData);
    socket.on("report-comment", refreshData);
    socket.on("report-confirmed", refreshData);

    return () => {
      socket.off("notification", handleNotification);
      socket.off("new-report", refreshData);
      socket.off("report-updated", refreshData);
      socket.off("report-comment", refreshData);
      socket.off("report-confirmed", refreshData);
    };
  }, [clerkId, role, queryClient]);

  return useQuery({
    queryKey: ["notifications", clerkId, role],
    queryFn: () => getNotifications(clerkId, role),
    enabled: !!clerkId,
    // Polling removed as per requirement since we have Socket.io
  });
}