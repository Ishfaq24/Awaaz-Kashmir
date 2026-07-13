import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  uploadImage,
  createReport,
} from "../../api/report";

export default function AnalyzeButton({
  image,
  description,
  location,
  setUploading,
  setProgress,
}) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    if (!description.trim()) {
      alert("Please enter a description.");
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

      await createReport({
        title: "Citizen Report",

        description,

        category: "Other",

        severity: "Medium",

        images: [uploaded],

        location: {
          address: location.address,
          coordinates: {
            lat: location.latitude,
            lng: location.longitude,
          },
        },

        createdBy: {
          clerkId: "",
          name: "Citizen",
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

      alert(
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
  );
}