import {
  LayoutDashboard,
  Upload,
  Map,
  ClipboardList,
  BarChart3,
  User,
  LogOut,
  Shield,
  X
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

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user } = useUser();
  const { signOut } = useClerk();

  const isAdmin =
    user?.id ===
    import.meta.env.VITE_ADMIN_CLERK_ID;

  const links = isAdmin
    ? adminLinks
    : citizenLinks;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen && setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static top-0 left-0 h-screen w-72 bg-awaaz-primary text-awaaz-surface flex flex-col z-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>

      {/* Brand header */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div
              className={`relative shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg ${
                isAdmin
                  ? "bg-gradient-to-br from-red-500 to-red-700 shadow-red-900/30"
                  : "bg-gradient-to-br from-awaaz-secondary to-[#e85d1a] shadow-awaaz-secondary/25"
              }`}
            >
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
              {isAdmin ? (
                <Shield size={22} className="text-white relative z-10" strokeWidth={2.25} />
              ) : (
                <span className="relative z-10 font-extrabold text-xl text-white tracking-tight">
                  A
                </span>
              )}
            </div>

            <div className="min-w-0">
              {isAdmin ? (
                <>
                  <h2 className="text-[15px] font-bold leading-tight text-white tracking-tight">
                    Authority Portal
                  </h2>
                  <span className="inline-flex items-center mt-1.5 px-2 py-0.5 rounded-md bg-red-500/15 text-red-200 text-[10px] font-semibold uppercase tracking-wider ring-1 ring-red-400/20">
                    Super Administrator
                  </span>
                </>
              ) : (
                <>
                  <h2 className="text-[15px] font-bold leading-[1.15] text-white tracking-tight">
                    <span className="block">Awaaz</span>
                    <span className="block text-awaaz-accent">Kashmir</span>
                  </h2>
                  <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
                    AI Civic Platform
                  </p>
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            className="lg:hidden shrink-0 p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen && setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
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
    </>
  );
}