import {
  LayoutDashboard,
  Upload,
  Map,
  ClipboardList,
  BarChart3,
  User,
  LogOut,
  Shield,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  useUser,
  useClerk,
} from "@clerk/clerk-react";

const citizenLinks = [
  {
    title: "Dashboard",
    path: "/home",
    icon: LayoutDashboard,
  },
  {
    title: "Report Issue",
    path: "/upload",
    icon: Upload,
  },
  {
    title: "Live Map",
    path: "/map",
    icon: Map,
  },
  {
    title: "My Reports",
    path: "/reports",
    icon: ClipboardList,
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
];

export default function Sidebar() {
  const { user } = useUser();
  const { signOut } = useClerk();

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
          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${
            isAdmin
              ? "bg-red-600"
              : "bg-awaaz-secondary"
          }`}
        >
          {isAdmin ? (
            <Shield size={24} />
          ) : (
            <span className="font-bold text-xl">
              A
            </span>
          )}
        </div>

        <div className="ml-4">

          <h2 className="text-xl font-bold">
            {isAdmin
              ? "Authority Portal"
              : "Awaaz Kashmir"}
          </h2>

          <p className="text-sm text-white/70">
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
              whileHover={{ x: 5 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                    isActive
                      ? "bg-awaaz-secondary text-white shadow-lg"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
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

      <div className="border-t border-white/10 p-5">

        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-300 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={20} />

          <span className="font-medium">
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}