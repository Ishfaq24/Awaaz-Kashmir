import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  Bell,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import useNotifications from "../hooks/useNotifications";

import {
  markAsRead,
  markAllAsRead,
} from "../api/notifications";

export default function Notifications() {
  const { user } = useUser();

  const queryClient =
    useQueryClient();

  const {
    data: notifications = [],
    isLoading,
  } = useNotifications(user?.id);

  const refresh = () =>
    queryClient.invalidateQueries({
      queryKey: [
        "notifications",
        user?.id,
      ],
    });

  const readMutation =
    useMutation({
      mutationFn: markAsRead,
      onSuccess: refresh,
    });

  const readAllMutation =
    useMutation({
      mutationFn: () =>
        markAllAsRead(user.id),
      onSuccess: refresh,
    });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">
            Notifications
          </h1>

          <p className="text-awaaz-muted mt-2">
            Stay updated about your
            reports.
          </p>

        </div>

        <button
          onClick={() =>
            readAllMutation.mutate()
          }
          className="bg-awaaz-secondary text-white px-5 py-3 rounded-xl"
        >
          Mark all as read
        </button>

      </div>

      <div className="space-y-5">

        {notifications.length ===
        0 ? (
          <div className="bg-awaaz-surface rounded-3xl border p-10 text-center">

            <Bell
              size={40}
              className="mx-auto mb-4 text-awaaz-muted"
            />

            <h2 className="text-xl font-semibold">
              No Notifications
            </h2>

          </div>
        ) : (
          notifications.map(
            (notification) => (
              <Link
                key={
                  notification._id
                }
                to={
                  notification.actionUrl
                }
                onClick={() =>
                  readMutation.mutate(
                    notification._id
                  )
                }
                className={`block rounded-3xl border p-6 transition hover:shadow-lg ${
                  notification.isRead
                    ? "bg-white"
                    : "bg-green-50 border-green-300"
                }`}
              >
                <div className="flex justify-between">

                  <div>

                    <h2 className="font-bold text-lg">
                      {
                        notification.title
                      }
                    </h2>

                    <p className="text-awaaz-muted mt-2">
                      {
                        notification.message
                      }
                    </p>

                  </div>

                  {notification.isRead ? (
                    <CheckCircle2 className="text-green-600" />
                  ) : (
                    <Clock3 className="text-orange-500" />
                  )}

                </div>

                <p className="text-xs text-gray-500 mt-4">
                  {new Date(
                    notification.createdAt
                  ).toLocaleString()}
                </p>

              </Link>
            )
          )
        )}

      </div>

    </div>
  );
}