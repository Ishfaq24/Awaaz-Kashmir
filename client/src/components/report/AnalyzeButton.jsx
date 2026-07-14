import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Modal from "../common/Modal";

export default function AnalyzeButton({
  image,
  preview,
  title,
  description,
  location,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleAnalyze = () => {
    if (!image) {
      setAlertMessage("Please select an image first.");
      return;
    }

    if (!location?.latitude || !location?.longitude) {
      setAlertMessage("Please allow location access or pick a photo with GPS data.");
      return;
    }

    setLoading(true);

    navigate("/processing", {
      state: {
        image,
        preview,
        title,
        description,
        location,
      },
    });
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAnalyze}
        disabled={loading}
        className="
        w-full
        rounded-2xl
        bg-awaaz-secondary
        text-white
        p-5
        flex
        justify-between
        items-center
        shadow-lg
        disabled:opacity-70
      "
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
            {loading ? (
              <Loader2 size={22} className="animate-spin" />
            ) : (
              <Sparkles size={22} />
            )}
          </div>

          <div className="text-left">
            <h3 className="text-lg font-semibold">
              {loading ? "Starting AI..." : "Analyze with AI"}
            </h3>

            <p className="text-sm text-white/80">
              {loading
                ? "Preparing your report..."
                : "Vision AI will detect the issue and suggest details"}
            </p>
          </div>
        </div>

        <ArrowRight />
      </motion.button>

      <Modal
        isOpen={!!alertMessage}
        onClose={() => setAlertMessage("")}
        title="Notice"
        hideCancel={true}
        actionButton={
          <button
            onClick={() => setAlertMessage("")}
            className="px-4 py-2 rounded-xl bg-awaaz-secondary hover:bg-awaaz-secondary/90 text-white font-medium"
          >
            OK
          </button>
        }
      >
        <p className="text-gray-600">{alertMessage}</p>
      </Modal>
    </>
  );
}
