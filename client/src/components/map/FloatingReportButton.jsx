import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function FloatingReportButton() {
  return (
    <Link to="/upload">

      <motion.button
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.95,
        }}
        className="
        fixed
        bottom-8
        right-8
        z-[1200]
        w-16
        h-16
        rounded-full
        bg-awaaz-secondary
        text-white
        shadow-2xl
        flex
        items-center
        justify-center
      "
      >
        <Plus size={30} />
      </motion.button>

    </Link>
  );
}