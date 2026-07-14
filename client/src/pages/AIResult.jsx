import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Building2,
  Sparkles,
  Loader2,
  ThumbsUp,
  CopyCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";

import { createReport, uploadImage, confirmReport } from "../api/report";
import Modal from "../components/common/Modal";

export default function AIResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const reportData = location.state;
  const analysis = reportData?.analysis;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [confirmingId, setConfirmingId] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (!reportData?.image || !analysis) {
      navigate("/upload", { replace: true });
      return;
    }

    setTitle(reportData.title?.trim() || analysis.title || "Civic Issue Report");
    setDescription(
      reportData.description?.trim() || analysis.description || ""
    );
  }, [reportData, analysis, navigate]);

  if (!reportData?.image || !analysis) {
    return null;
  }

  const handlePublish = async () => {
    try {
      setPublishing(true);

      const uploaded = await uploadImage(reportData.image);

      const report = await createReport({
        title: title.trim() || analysis.title,
        description: description.trim() || analysis.description,
        category: analysis.category,
        severity: analysis.severity,
        assignedDepartment: analysis.department,
        images: [uploaded],
        location: {
          address: reportData.location?.address,
          coordinates: {
            lat: reportData.location?.latitude,
            lng: reportData.location?.longitude,
          },
        },
        createdBy: {
          clerkId: user?.id || "",
          name: user?.fullName || user?.firstName || "Citizen",
        },
        aiAnalysis: {
          title: analysis.title,
          description: analysis.description,
          category: analysis.category,
          severity: analysis.severity,
          department: analysis.department,
          confidence: analysis.confidence,
        },
      });

      await queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard-recent"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard-trends"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard-categories"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard-districts"] });

      navigate("/success", { state: { report } });
    } catch (err) {
      console.error(err);
      setAlertMessage(
        err.response?.data?.message || "Failed to publish report."
      );
    } finally {
      setPublishing(false);
    }
  };

  const handleConfirmDuplicate = async (duplicateId) => {
    try {
      setConfirmingId(duplicateId);
      
      const confirmedReport = await confirmReport(duplicateId, user?.id);

      await queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard-recent"] });
      await queryClient.invalidateQueries({ queryKey: ["reports"] });

      navigate("/success", { state: { report: confirmedReport, isConfirmation: true } });
    } catch (err) {
      console.error(err);
      setAlertMessage(
        err.response?.data?.message || "Failed to confirm existing report."
      );
    } finally {
      setConfirmingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-awaaz-secondary font-semibold flex items-center gap-2">
          <Sparkles size={18} />
          AI Analysis Completed
          {analysis.source === "fallback" && (
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
              Fallback mode
            </span>
          )}
        </p>

        <h1 className="text-4xl font-bold mt-2">Review AI Generated Report</h1>

        <p className="text-awaaz-muted mt-2">
          Verify the analysis before publishing. You can edit the title and
          description below.
        </p>
      </div>

      <div className="grid xl:grid-cols-5 gap-8">
        <div className="xl:col-span-2">
          <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border shadow-sm overflow-hidden">
            <img
              src={reportData.preview}
              alt="Report"
              className="w-full h-[420px] object-cover"
            />
          </div>
        </div>

        <div className="xl:col-span-3 space-y-6">
          <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border shadow-sm p-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-awaaz-muted">Detected Issue</p>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="text-2xl md:text-3xl font-bold mt-1 w-full bg-transparent border-b border-transparent focus:border-awaaz-secondary outline-none"
                />
              </div>

              <div className="px-5 py-2 rounded-full bg-awaaz-background text-awaaz-secondary font-semibold whitespace-nowrap">
                {analysis.confidence}% Confidence
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-8">
              <div className="rounded-2xl bg-awaaz-background p-5">
                <div className="flex gap-3">
                  <AlertTriangle className="text-awaaz-accent" />
                  <div>
                    <p className="text-sm text-awaaz-muted">Severity</p>
                    <h3 className="font-bold">{analysis.severity}</h3>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-awaaz-background p-5">
                <div className="flex gap-3">
                  <Building2 className="text-awaaz-secondary" />
                  <div>
                    <p className="text-sm text-awaaz-muted">Department</p>
                    <h3 className="font-bold">{analysis.department}</h3>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-awaaz-background p-5">
                <div className="flex gap-3">
                  <Sparkles className="text-awaaz-secondary" />
                  <div>
                    <p className="text-sm text-awaaz-muted">Category</p>
                    <h3 className="font-bold">{analysis.category}</h3>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-awaaz-background p-5">
                <div className="flex gap-3">
                  <MapPin className="text-awaaz-secondary" />
                  <div>
                    <p className="text-sm text-awaaz-muted">Location</p>
                    <h3 className="font-bold text-sm leading-6">
                      {reportData.location?.address || "Location captured"}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {analysis.hasDuplicates && analysis.duplicates?.length > 0 && (
            <div className="bg-orange-50 rounded-3xl border border-orange-200 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <CopyCheck className="text-orange-500" size={28} />
                <h3 className="font-bold text-xl text-orange-900">Potential Duplicates Found</h3>
              </div>
              <p className="text-orange-800 mb-6">
                We found similar civic issues reported nearby. If your issue is one of these, you can confirm it to increase its priority instead of creating a new one.
              </p>
              
              <div className="space-y-4">
                {analysis.duplicates.map((dup) => (
                  <div key={dup._id} className="bg-white rounded-2xl p-5 border border-orange-100 flex flex-col md:flex-row gap-5 items-center">
                    {dup.image && (
                      <img src={dup.image} alt={dup.title} className="w-full md:w-32 h-24 object-cover rounded-xl" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{dup.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        📍 {dup.distanceMeters} meters away • {dup.status}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600 font-medium">
                          {dup.category}
                        </span>
                        <span className="text-xs bg-orange-100 px-2 py-1 rounded-md text-orange-700 font-medium">
                          {dup.confirmations} Confirmations
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleConfirmDuplicate(dup._id)}
                      disabled={confirmingId === dup._id || publishing}
                      className="w-full md:w-auto px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-70 text-white font-medium flex items-center justify-center gap-2 transition"
                    >
                      {confirmingId === dup._id ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Confirming...
                        </>
                      ) : (
                        <>
                          <ThumbsUp size={18} />
                          Confirm This
                        </>
                      )}
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border shadow-sm p-8">
            <h3 className="font-bold text-xl">AI Generated Complaint</h3>

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={6}
              className="w-full text-awaaz-muted leading-8 mt-5 bg-awaaz-background rounded-2xl p-4 border border-awaaz-border outline-none focus:border-awaaz-secondary resize-none"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handlePublish}
              disabled={publishing}
              className="mt-8 w-full rounded-2xl bg-awaaz-secondary hover:opacity-90 disabled:opacity-70 text-white py-4 font-semibold text-lg flex justify-center items-center gap-2"
            >
              {publishing ? (
                <>
                  <Loader2 size={22} className="animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <CheckCircle2 size={22} />
                  Publish Report
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

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
    </div>
  );
}
