import { motion } from "framer-motion";
import {
  CheckCircle2,
  MapPinned,
  Bell,
  Building2,
  Sparkles,
} from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PublishSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const report = location.state?.report;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/map");
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);

  const shortId = report?._id
    ? `AK-${report._id.slice(-6).toUpperCase()}`
    : "AK-2026";

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
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-28 h-28 rounded-full bg-awaaz-background flex items-center justify-center"
          >
            <CheckCircle2 size={64} className="text-awaaz-secondary" />
          </motion.div>

          <h1 className="text-4xl font-bold mt-8">
            {location.state?.isConfirmation ? "Report Confirmed Successfully" : "Report Published Successfully"}
          </h1>

          <p className="text-awaaz-muted mt-3 text-center max-w-lg">
            {location.state?.isConfirmation
              ? "You've successfully confirmed an existing civic issue. This increases its priority and helps authorities address it faster."
              : "Your AI-analyzed report is now live on the civic map. Nearby citizens can confirm it and authorities have been notified."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-10">
          <div className="rounded-2xl bg-awaaz-background p-5">
            <div className="flex items-center gap-3">
              <MapPinned className="text-awaaz-secondary" />
              <div>
                <p className="text-sm text-awaaz-muted">Report ID</p>
                <h3 className="font-bold">{shortId}</h3>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-awaaz-background p-5">
            <div className="flex items-center gap-3">
              <Sparkles className="text-awaaz-secondary" />
              <div>
                <p className="text-sm text-awaaz-muted">AI Category</p>
                <h3 className="font-bold">
                  {report?.category || report?.aiAnalysis?.category || "Detected"}
                </h3>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-awaaz-background p-5">
            <div className="flex items-center gap-3">
              <Building2 className="text-awaaz-accent" />
              <div>
                <p className="text-sm text-awaaz-muted">Routed To</p>
                <h3 className="font-bold">
                  {report?.assignedDepartment ||
                    report?.aiAnalysis?.department ||
                    "Authority"}
                </h3>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-awaaz-background p-5">
            <div className="flex items-center gap-3">
              <Bell className="text-awaaz-muted" />
              <div>
                <p className="text-sm text-awaaz-muted">Status</p>
                <h3 className="font-bold text-awaaz-secondary">Submitted</h3>
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
