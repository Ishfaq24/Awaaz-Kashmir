import { useEffect, useRef, useState } from "react";
import { BrainCircuit, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import { analyzeImage } from "../api/ai";

const steps = [
  "Uploading image...",
  "Analyzing image with Vision AI...",
  "Detecting civic issue...",
  "Estimating severity...",
  "Finding responsible department...",
  "Checking duplicate reports...",
  "Generating complaint...",
];

export default function AIProcessing() {
  const navigate = useNavigate();
  const location = useLocation();
  const hasStarted = useRef(false);

  const [current, setCurrent] = useState(0);
  const [error, setError] = useState("");

  const reportData = location.state;

  useEffect(() => {
    if (!reportData?.image) {
      navigate("/upload", { replace: true });
    }
  }, [reportData, navigate]);

  useEffect(() => {
    if (!reportData?.image || hasStarted.current) return;

    hasStarted.current = true;

    const runAnalysis = async () => {
      try {
        const analysis = await analyzeImage(reportData.image, {
          description: reportData.description || "",
          lat: reportData.location?.latitude,
          lng: reportData.location?.longitude,
        });

        navigate("/result", {
          replace: true,
          state: {
            ...reportData,
            analysis,
          },
        });
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message ||
            "AI analysis failed. Please try again."
        );
      }
    };

    runAnalysis();
  }, [reportData, navigate]);

  useEffect(() => {
    if (error || current >= steps.length) return;

    const timer = setTimeout(() => {
      setCurrent((prev) => prev + 1);
    }, 900);

    return () => clearTimeout(timer);
  }, [current, error]);

  if (!reportData?.image) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="bg-awaaz-surface rounded-3xl shadow-xl border border-awaaz-border p-10 w-full max-w-xl text-center">
          <AlertCircle className="mx-auto text-red-500" size={48} />
          <h1 className="text-2xl font-bold mt-6">Analysis Failed</h1>
          <p className="text-awaaz-muted mt-3">{error}</p>
          <button
            onClick={() => navigate("/upload")}
            className="mt-8 px-6 py-3 rounded-xl bg-awaaz-secondary text-white font-medium"
          >
            Back to Upload
          </button>
        </div>
      </div>
    );
  }

  const progress = Math.min(
    100,
    Math.round(((current + 1) / steps.length) * 100)
  );

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-awaaz-surface rounded-3xl shadow-xl border border-awaaz-border p-10 w-full max-w-4xl"
      >
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-24 h-24 rounded-full bg-awaaz-background flex items-center justify-center"
          >
            <BrainCircuit size={48} className="text-awaaz-secondary" />
          </motion.div>

          <h1 className="text-4xl font-bold mt-8">
            AI is Processing Your Report
          </h1>

          <p className="text-awaaz-muted mt-3">
            NVIDIA Vision AI is analyzing your photo...
          </p>
        </div>

        <div className="mt-10">
          <div className="h-3 bg-awaaz-border rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-awaaz-secondary"
            />
          </div>

          <p className="text-center mt-3 text-sm text-awaaz-muted">
            {progress}% Completed
          </p>
        </div>

        <div className="mt-10 space-y-5">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between items-center border-b pb-4"
            >
              <span className="font-medium">{step}</span>

              {index < current ? (
                <CheckCircle2 className="text-awaaz-secondary" size={22} />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-awaaz-border animate-pulse" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
