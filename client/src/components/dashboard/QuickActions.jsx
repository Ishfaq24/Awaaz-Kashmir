import {
  Upload,
  Map,
  ClipboardList,
  ChartColumn,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const actions = [
  {
    title: "Report",
    icon: Upload,
    path: "/upload",
  },
  {
    title: "Map",
    icon: Map,
    path: "/map",
  },
  {
    title: "Reports",
    icon: ClipboardList,
    path: "/reports",
  },
  {
    title: "Analytics",
    icon: ChartColumn,
    path: "/analytics",
  },
];

export default function QuickActions() {
  return (
    <div className="flex gap-4 flex-wrap">

      {actions.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.title}
            to={item.path}
          >
            <motion.div
              whileHover={{
                y: -4,
              }}
              className="bg-awaaz-surface border border-awaaz-border rounded-2xl px-6 py-4 flex items-center gap-3 hover:shadow-lg"
            >

              <div className="w-10 h-10 rounded-xl bg-awaaz-background flex items-center justify-center">

                <Icon
                  size={18}
                  className="text-awaaz-secondary"
                />

              </div>

              <span className="font-semibold">
                {item.title}
              </span>

            </motion.div>

          </Link>
        );
      })}

    </div>
  );
}