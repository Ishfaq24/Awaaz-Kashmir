import { useEffect, useState } from "react";
import { BrainCircuit, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const steps = [
  "Uploading image...",
  "Analyzing image with Vision AI...",
  "Detecting civic issue...",
  "Estimating severity...",
  "Finding responsible department...",
  "Checking duplicate reports...",
  "Calculating trust score...",
  "Generating complaint...",
];

export default function AIProcessing() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current < steps.length) {
      const timer = setTimeout(() => {
        setCurrent((prev) => prev + 1);
      }, 700);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      navigate("/result");
    }, 1200);

    return () => clearTimeout(timer);
  }, [current, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-awaaz-surface rounded-3xl shadow-xl border border-awaaz-border p-10 w-full max-w-4xl"
      >

        <div className="flex flex-col items-center">

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-24 h-24 rounded-full bg-awaaz-background flex items-center justify-center"
          >
            <BrainCircuit
              size={48}
              className="text-awaaz-secondary"
            />
          </motion.div>

          <h1 className="text-4xl font-bold mt-8">
            AI is Processing Your Report
          </h1>

          <p className="text-awaaz-muted mt-3">
            This usually takes only a few seconds.
          </p>

        </div>

        <div className="mt-10">

          <div className="h-3 bg-awaaz-border rounded-full overflow-hidden">

            <motion.div
              animate={{
                width: `${(current / steps.length) * 100}%`,
              }}
              transition={{
                duration: 0.5,
              }}
              className="h-full bg-awaaz-secondary"
            />

          </div>

          <p className="text-center mt-3 text-sm text-awaaz-muted">
            {Math.round((current / steps.length) * 100)}% Completed
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

              <span className="font-medium">
                {step}
              </span>

              {index < current ? (
                <CheckCircle2
                  className="text-awaaz-secondary"
                  size={22}
                />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-awaaz-border"></div>
              )}

            </motion.div>
          ))}

        </div>

      </motion.div>

    </div>
  );
}