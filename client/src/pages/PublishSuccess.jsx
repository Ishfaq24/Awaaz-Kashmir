import { motion } from "framer-motion";
import {
  CheckCircle2,
  MapPinned,
  Bell,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PublishSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/map");
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-awaaz-surface rounded-3xl shadow-xl border border-awaaz-border max-w-2xl w-full p-10"
      >

        <div className="flex flex-col items-center">

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
            className="w-28 h-28 rounded-full bg-awaaz-background flex items-center justify-center"
          >
            <CheckCircle2
              size={64}
              className="text-awaaz-secondary"
            />
          </motion.div>

          <h1 className="text-4xl font-bold mt-8">
            Report Published Successfully
          </h1>

          <p className="text-awaaz-muted mt-3 text-center max-w-lg">
            Your report has been verified and added to the
            public incident map. Nearby citizens will now be
            able to confirm or contribute updates.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-10">

          <div className="rounded-2xl bg-awaaz-background p-5">

            <div className="flex items-center gap-3">

              <MapPinned
                className="text-awaaz-secondary"
              />

              <div>

                <p className="text-sm text-awaaz-muted">
                  Report ID
                </p>

                <h3 className="font-bold">
                  AK-2026-00128
                </h3>

              </div>

            </div>

          </div>

          <div className="rounded-2xl bg-awaaz-background p-5">

            <div className="flex items-center gap-3">

              <Bell
                className="text-awaaz-accent"
              />

              <div>

                <p className="text-sm text-awaaz-muted">
                  Authority
                </p>

                <h3 className="font-bold">
                  Notified
                </h3>

              </div>

            </div>

          </div>

          <div className="rounded-2xl bg-awaaz-background p-5">

            <div className="flex items-center gap-3">

              <Users
                className="text-awaaz-muted"
              />

              <div>

                <p className="text-sm text-awaaz-muted">
                  Nearby Citizens
                </p>

                <h3 className="font-bold">
                  18 Users
                </h3>

              </div>

            </div>

          </div>

          <div className="rounded-2xl bg-awaaz-background p-5">

            <div className="flex items-center gap-3">

              <CheckCircle2
                className="text-awaaz-secondary"
              />

              <div>

                <p className="text-sm text-awaaz-muted">
                  Status
                </p>

                <h3 className="font-bold text-awaaz-secondary">
                  Published
                </h3>

              </div>

            </div>

          </div>

        </div>

        <div className="mt-10">

          <div className="h-3 rounded-full bg-awaaz-border overflow-hidden">

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3 }}
              className="h-full bg-awaaz-secondary"
            />

          </div>

          <p className="text-center mt-4 text-awaaz-muted">
            Redirecting to Live Map...
          </p>

        </div>

      </motion.div>

    </div>
  );
}