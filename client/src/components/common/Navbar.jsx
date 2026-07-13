import {
  Bell,
  Search,
  CalendarDays,
} from "lucide-react";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  UserButton,
  useUser,
} from "@clerk/clerk-react";

import useNotifications from "../../hooks/useNotifications";

export default function Navbar() {
  
  const [time, setTime] = useState("");

  const { user } = useUser();

console.log("Logged in user:", user?.id);
  const {
    data: notifications = [],
  } = useNotifications(user?.id);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateClock();

    const interval = setInterval(
      updateClock,
      1000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-awaaz-surface/85 backdrop-blur-xl border-b border-awaaz-border">

      <div className="h-20 px-8 flex items-center justify-between">

        {/* Search */}

        <div className="relative w-[420px]">

          <Search
            size={18}
            className="absolute left-5 top-4 text-awaaz-muted"
          />

          <input
            type="text"
            placeholder="Search reports, locations..."
            className="
              w-full
              rounded-2xl
              bg-awaaz-background
              border
              border-awaaz-border
              py-3
              pl-12
              pr-5
              outline-none
              focus:ring-2
              focus:ring-awaaz-accent/30
            "
          />

        </div>

        {/* Right */}

        <div className="flex items-center gap-6">

          {/* Clock */}

          <div className="hidden lg:flex items-center gap-2 text-awaaz-muted">

            <CalendarDays size={18} />

            <span className="font-medium">
              {time}
            </span>

          </div>

          {/* Notifications */}

          <Link to="/notifications">

            <motion.button
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="
                relative
                w-12
                h-12
                rounded-2xl
                bg-awaaz-background
                border
                border-awaaz-border
                flex
                items-center
                justify-center
              "
            >

              <Bell />

              {unreadCount > 0 && (

                <span
                  className="
                    absolute
                    -top-1
                    -right-1
                    min-w-[20px]
                    h-5
                    px-1
                    rounded-full
                    bg-red-500
                    text-white
                    text-[10px]
                    font-bold
                    flex
                    items-center
                    justify-center
                  "
                >

                  {unreadCount > 99
                    ? "99+"
                    : unreadCount}

                </span>

              )}

            </motion.button>

          </Link>

          {/* User */}

          <div className="flex items-center gap-4">

            <div className="hidden md:block text-right">

              <h3 className="font-semibold">
                {user?.fullName ||
                  user?.firstName ||
                  "Citizen"}
              </h3>

              <p className="text-sm text-awaaz-muted">
                Community Member
              </p>

            </div>

            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-12 h-12 rounded-2xl border border-awaaz-border",
                },
              }}
              afterSignOutUrl="/"
            />

          </div>

        </div>

      </div>

    </header>
  );
}