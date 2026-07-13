import {
  LayoutDashboard,
  Upload,
  Map,
  ClipboardList,
  BarChart3,
  User,
  Settings,
  LogOut,
  Shield,
  Bell,
  Users,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";

const citizenLinks = [
  {
    title: "Dashboard",
    path: "/home",
    icon: LayoutDashboard,
  },
  {
    title: "Upload Issue",
    path: "/upload",
    icon: Upload,
  },
  {
    title: "Live Map",
    path: "/map",
    icon: Map,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: ClipboardList,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },
];

const adminLinks = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Manage Reports",
    path: "/admin/manage-reports",
    icon: ClipboardList,
  },
  {
    title: "Live Map",
    path: "/map",
    icon: Map,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  {
    title: "Citizens",
    path: "/admin/users",
    icon: Users,
  },
];

export default function Sidebar() {
  const { user } = useUser();

  const isAdmin =
    user?.id ===
    import.meta.env.VITE_ADMIN_CLERK_ID;

  const links = isAdmin
    ? adminLinks
    : citizenLinks;

  return (
    <aside className="w-72 h-screen sticky top-0 bg-awaaz-primary text-awaaz-surface flex flex-col">

      {/* Logo */}

      <div className="h-24 flex items-center px-8 border-b border-white/10">

        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl text-white ${
            isAdmin
              ? "bg-red-600"
              : "bg-awaaz-secondary"
          }`}
        >
          {isAdmin ? (
            <Shield size={24} />
          ) : (
            "A"
          )}
        </div>

        <div className="ml-4">

          <h2 className="text-xl font-bold">
            {isAdmin
              ? "Authority Portal"
              : "Awaaz Kashmir"}
          </h2>

          <p className="text-awaaz-surface/70 text-sm">
            {isAdmin
              ? "Super Administrator"
              : "AI Civic Platform"}
          </p>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-5 py-8 space-y-3">

        {links.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.path}
              whileHover={{ x: 6 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                    isActive
                      ? "bg-awaaz-secondary text-white"
                      : "hover:bg-white/10"
                  }`
                }
              >
                <Icon size={22} />

                <span className="font-medium">
                  {item.title}
                </span>
              </NavLink>
            </motion.div>
          );
        })}

      </nav>

      {/* Footer */}

      <div className="border-t border-white/10 p-5 space-y-3">

        <button className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition-all">

          <Settings size={20} />

          Settings

        </button>

        <button className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-awaaz-accent hover:bg-white/10 transition-all">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}