import { motion } from "framer-motion";

export default function UploadProgress({
  progress = 78,
}) {
  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-6">

      <div className="flex justify-between">

        <h3 className="font-semibold">
          Upload Progress
        </h3>

        <span className="text-awaaz-secondary font-bold">
          {progress}%
        </span>

      </div>

      <div className="mt-5 h-3 rounded-full bg-awaaz-border overflow-hidden">

        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            duration: 1,
          }}
          className="h-full bg-awaaz-secondary"
        />

      </div>

      <p className="text-awaaz-muted mt-4 text-sm">
        Preparing image for AI Vision analysis...
      </p>

    </div>
  );
}