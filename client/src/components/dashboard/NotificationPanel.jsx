import {
  Bell,
  CheckCircle2,
  TriangleAlert,
  Info,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notifications as data } from "../../data/mockNotifications";

const icons = {
  success: CheckCircle2,
  warning: TriangleAlert,
  info: Info,
};

const colors = {
  success: "bg-awaaz-background text-awaaz-secondary",
  warning: "bg-awaaz-background text-awaaz-accent",
  info: "bg-awaaz-background text-awaaz-muted",
};

export default function NotificationPanel() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(data);

  const unread = notifications.filter((n) => !n.read).length;

  const handleClick = (id, reportId) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );

    navigate(`/reports/${reportId}`);
  };

  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border shadow-sm p-6">

      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-3">

          <Bell className="text-awaaz-secondary" />

          <h2 className="text-xl font-bold">
            Notifications
          </h2>

        </div>

        <span className="bg-awaaz-background text-awaaz-secondary px-3 py-1 rounded-full text-sm font-semibold">
          {unread} New
        </span>

      </div>

      <div className="space-y-4">

        {notifications.map((item) => {
          const Icon = icons[item.type];

          return (
            <button
              key={item.id}
              onClick={() =>
                handleClick(item.id, item.reportId)
              }
              className={`w-full text-left p-4 rounded-2xl transition-all border border-awaaz-border hover:shadow-md hover:border-awaaz-secondary ${
                item.read
                  ? "bg-awaaz-surface"
                  : "bg-awaaz-background"
              }`}
            >

              <div className="flex gap-4">

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[item.type]}`}
                >
                  <Icon size={20} />
                </div>

                <div className="flex-1">

                  <div className="flex justify-between">

                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

                    {!item.read && (
                      <span className="w-3 h-3 rounded-full bg-green-500 mt-2"></span>
                    )}

                  </div>

                  <p className="text-sm text-awaaz-muted mt-1">
                    {item.message}
                  </p>

                  <p className="text-xs text-awaaz-muted/70 mt-3">
                    {item.time}
                  </p>

                </div>

              </div>

            </button>
          );
        })}

      </div>

    </div>
  );
}