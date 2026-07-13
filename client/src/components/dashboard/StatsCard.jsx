import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  increase = "+12.5%",
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        transition: { duration: 0.25 },
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        bg-awaaz-surface
        border
        border-awaaz-border
        shadow-sm
        hover:shadow-xl
        p-6
      "
    >
      <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-green-50 opacity-70" />

      <div className="flex justify-between items-start relative z-10">

        <div>

          <p className="text-awaaz-muted text-sm font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3 text-awaaz-text">
            {value}
          </h2>

        </div>

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}
        >
          {Icon && <Icon size={28} />}
        </div>

      </div>

      <div className="mt-8 flex items-center justify-between relative z-10">

        <div className="flex items-center gap-2 text-awaaz-secondary">

          <TrendingUp size={18} />

          <span className="font-semibold">
            {increase}
          </span>

        </div>

        <span className="text-awaaz-muted/70 text-sm">
          This Week
        </span>

      </div>
    </motion.div>
  );
}