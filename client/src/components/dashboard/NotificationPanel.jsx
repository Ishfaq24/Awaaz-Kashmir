import {
  Bell,
  CheckCircle2,
  TriangleAlert,
  Info,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import useNotifications from "../../hooks/useNotifications";
import { markAsRead } from "../../api/notifications";
import { timeAgo } from "../../utils/timeAgo";

const icons = {
  report: CheckCircle2,
  success: CheckCircle2,
  warning: TriangleAlert,
  info: Info,
};

const colors = {
  report: "bg-awaaz-background text-awaaz-secondary",
  success: "bg-awaaz-background text-awaaz-secondary",
  warning: "bg-awaaz-background text-awaaz-accent",
  info: "bg-awaaz-background text-awaaz-muted",
};

export default function NotificationPanel() {
  const navigate = useNavigate();
  const { user } = useUser();

  const { data: notifications = [], isLoading, refetch } = useNotifications(
    user?.id,
    "citizen"
  );

  const unread = notifications.filter((item) => !item.isRead).length;

  const handleClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification._id);
      refetch();
    }

    if (notification.report) {
      navigate(`/reports/${notification.report}`);
    }
  };

  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bell className="text-awaaz-secondary" />
          <h2 className="text-xl font-bold">Notifications</h2>
        </div>

        <span className="bg-awaaz-background text-awaaz-secondary px-3 py-1 rounded-full text-sm font-semibold">
          {unread} New
        </span>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-awaaz-secondary" size={28} />
        </div>
      ) : notifications.length === 0 ? (
        <p className="text-awaaz-muted text-center py-10">
          No notifications yet.
        </p>
      ) : (
        <div className="space-y-4">
          {notifications.slice(0, 5).map((item) => {
            const Icon = icons[item.type] || Info;

            return (
              <button
                key={item._id}
                onClick={() => handleClick(item)}
                className={`w-full text-left p-4 rounded-2xl transition-all border border-awaaz-border hover:shadow-md hover:border-awaaz-secondary ${
                  item.isRead
                    ? "bg-awaaz-surface"
                    : "bg-awaaz-background"
                }`}
              >
                <div className="flex gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[item.type] || colors.info}`}
                  >
                    <Icon size={20} />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{item.title}</h3>

                      {!item.isRead && (
                        <span className="w-3 h-3 rounded-full bg-green-500 mt-2" />
                      )}
                    </div>

                    <p className="text-sm text-awaaz-muted mt-1">
                      {item.message}
                    </p>

                    <p className="text-xs text-awaaz-muted/70 mt-3">
                      {timeAgo(item.createdAt)}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
