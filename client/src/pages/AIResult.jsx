import {
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Building2,
  ShieldCheck,
  Clock3,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AIResult() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">

      <div>

        <p className="text-awaaz-secondary font-semibold flex items-center gap-2">
          <Sparkles size={18} />
          AI Analysis Completed
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Review AI Generated Report
        </h1>

        <p className="text-awaaz-muted mt-2">
          Verify the analysis before publishing.
        </p>

      </div>

      <div className="grid xl:grid-cols-5 gap-8">

        {/* Image */}

        <div className="xl:col-span-2">

          <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border shadow-sm overflow-hidden">

            <img
              src="https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=1200"
              alt=""
              className="w-full h-[420px] object-cover"
            />

          </div>

        </div>

        {/* Details */}

        <div className="xl:col-span-3 space-y-6">

          <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border shadow-sm p-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-awaaz-muted">
                  Detected Issue
                </p>

                <h2 className="text-3xl font-bold mt-1">
                  Road Damage
                </h2>

              </div>

              <div className="px-5 py-2 rounded-full bg-awaaz-background text-awaaz-secondary font-semibold">
                97% Confidence
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-8">

              <div className="rounded-2xl bg-awaaz-background p-5">

                <div className="flex gap-3">

                  <AlertTriangle className="text-awaaz-accent" />

                  <div>

                    <p className="text-sm text-awaaz-muted">
                      Severity
                    </p>

                    <h3 className="font-bold">
                      High
                    </h3>

                  </div>

                </div>

              </div>

              <div className="rounded-2xl bg-awaaz-background p-5">

                <div className="flex gap-3">

                  <Building2 className="text-awaaz-secondary" />

                  <div>

                    <p className="text-sm text-awaaz-muted">
                      Department
                    </p>

                    <h3 className="font-bold">
                      Roads & Buildings
                    </h3>

                  </div>

                </div>

              </div>

              <div className="rounded-2xl bg-awaaz-background p-5">

                <div className="flex gap-3">

                  <ShieldCheck className="text-awaaz-secondary" />

                  <div>

                    <p className="text-sm text-awaaz-muted">
                      Trust Score
                    </p>

                    <h3 className="font-bold">
                      92%
                    </h3>

                  </div>

                </div>

              </div>

              <div className="rounded-2xl bg-awaaz-background p-5">

                <div className="flex gap-3">

                  <Clock3 className="text-awaaz-accent" />

                  <div>

                    <p className="text-sm text-awaaz-muted">
                      Estimated Resolution
                    </p>

                    <h3 className="font-bold">
                      24 Hours
                    </h3>

                  </div>

                </div>

              </div>

            </div>

            <div className="mt-8">

              <div className="flex items-center gap-2 mb-3">

                <MapPin
                  size={18}
                  className="text-awaaz-secondary"
                />

                <span className="font-semibold">
                  Location
                </span>

              </div>

              <p className="text-awaaz-muted">
                Rajbagh, Srinagar, Jammu & Kashmir
              </p>

            </div>

          </div>

          <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border shadow-sm p-8">

            <h3 className="font-bold text-xl">
              AI Generated Complaint
            </h3>

            <p className="text-awaaz-muted leading-8 mt-5">
              A large pothole has been detected on the roadway,
              creating a significant safety hazard for motorists and
              causing traffic congestion. Based on image analysis,
              the issue has been classified as high priority.
              Immediate inspection and repair by the Roads &
              Buildings Department is recommended.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/success")}
              className="mt-8 w-full rounded-2xl bg-awaaz-secondary hover:opacity-90 text-white py-4 font-semibold text-lg flex justify-center items-center gap-2"
            >
              <CheckCircle2 size={22} />

              Publish Report
            </motion.button>

          </div>

        </div>

      </div>

    </div>
  );
}
