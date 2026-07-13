import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";

import {
  uploadImage,
  createReport,
} from "../../api/report";
import Modal from "../common/Modal";

export default function AnalyzeButton({
  image,
  title,
  description,
  location,
  setUploading,
  setProgress,
}) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async () => {
    if (!image) {
      setAlertMessage("Please select an image.");
      return;
    }

    try {
      setLoading(true);
      setUploading(true);

      const uploaded = await uploadImage(image, (event) => {
        if (!event.total) return;

        const percent = Math.round(
          (event.loaded * 100) / event.total
        );
        setProgress(percent);
      });

      let finalTitle = title ? title.trim() : "";
      if (!finalTitle) {
        finalTitle = "Citizen Report";
        if (description && description.trim().length > 0) {
          let base = description.trim().split(" ").slice(0, 6).join(" ");
          if (description.trim().split(" ").length > 6) base += "...";
          finalTitle = base.length > 50 ? base.substring(0, 47) + "..." : base;
        }
      }

      const finalDescription = (description && description.trim()) || "No description provided.";

      const descLower = finalDescription.toLowerCase();
      let detectedCategory = "Other";
      if (descLower.includes("road") || descLower.includes("pothole")) detectedCategory = "Road";
      else if (descLower.includes("water") || descLower.includes("pipe") || descLower.includes("leak")) detectedCategory = "Water";
      else if (descLower.includes("electric") || descLower.includes("wire") || descLower.includes("power")) detectedCategory = "Electricity";
      else if (descLower.includes("garbage") || descLower.includes("trash") || descLower.includes("waste")) detectedCategory = "Garbage";
      else if (descLower.includes("drain") || descLower.includes("sewage")) detectedCategory = "Drainage";
      else if (descLower.includes("light") || descLower.includes("lamp")) detectedCategory = "Street Light";
      else if (descLower.includes("traffic") || descLower.includes("jam")) detectedCategory = "Traffic";

      let detectedSeverity = "Medium";
      if (descLower.includes("urgent") || descLower.includes("danger") || descLower.includes("accident") || descLower.includes("severe") || descLower.includes("huge")) detectedSeverity = "High";
      else if (descLower.includes("minor") || descLower.includes("small") || descLower.includes("slight")) detectedSeverity = "Low";

      await createReport({
        title: finalTitle,

        description: finalDescription,

        category: detectedCategory,

        severity: detectedSeverity,

        images: [uploaded],

        location: {
          address: location.address,
          coordinates: {
            lat: location.latitude,
            lng: location.longitude,
          },
        },

        createdBy: {
          clerkId: user?.id || "",
          name: user?.fullName || user?.firstName || "Citizen",
        },
      });

      await queryClient.invalidateQueries({
        queryKey: ["dashboard-stats"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["dashboard-recent"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["dashboard-trends"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["dashboard-categories"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["dashboard-districts"],
      });

      navigate("/success");
    } catch (err) {
      console.error(err);

      setAlertMessage(
        err.response?.data?.message ||
          "Failed to submit report."
      );
    } finally {
      setLoading(false);
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <>
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleSubmit}
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
            <Loader2
              size={22}
              className="animate-spin"
            />
          ) : (
            <Sparkles size={22} />
          )}
        </div>

        <div className="text-left">
          <h3 className="text-lg font-semibold">
            {loading
              ? "Submitting..."
              : "Submit Report"}
          </h3>

          <p className="text-sm text-white/80">
            {loading
              ? "Uploading image..."
              : "Report will be published immediately"}
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