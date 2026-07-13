import {
  Bell,
  Search,
  CalendarDays,
  Menu
} from "lucide-react";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  UserButton,
  useUser,
} from "@clerk/clerk-react";

import NotificationDropdown from "../navbar/NotificationDropdown";

export default function Navbar({ toggleSidebar }) {
  
  const [time, setTime] = useState("");

  const { user } = useUser();
  const userRole = user?.publicMetadata?.role || "citizen";

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
    <header className="sticky top-0 z-40 bg-awaaz-surface/85 backdrop-blur-xl border-b border-awaaz-border overflow-visible">

      <div className="h-20 px-4 md:px-8 flex items-center justify-between gap-4">

        {/* Left Section (Menu + Search) */}

        <div className="flex items-center gap-4 flex-1">

          <button 
            className="lg:hidden p-2 rounded-xl bg-awaaz-background border border-awaaz-border text-awaaz-muted hover:text-awaaz-text"
            onClick={toggleSidebar}
          >
            <Menu size={20} />
          </button>

          <div className="relative hidden md:block w-full max-w-[420px]">

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
          <NotificationDropdown clerkId={user?.id} role={userRole} />

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