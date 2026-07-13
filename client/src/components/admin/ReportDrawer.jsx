import { X } from "lucide-react";

import ReportHero from "./drawer/ReportHero";
import ReportStats from "./drawer/ReportStats";
import AIAnalysisCard from "./drawer/AIAnalysisCard";
import TimelineCard from "./drawer/TimelineCard";
import CommentsCard from "./drawer/CommentsCard";
import AdminActions from "./drawer/AdminActions";
import LocationMap from "./drawer/LocationMap";
import BeforeAfterCard from "./drawer/BeforeAfterCard";
import AIActionPlan from "./drawer/AIActionPlan";
import ResolutionUploader from "./drawer/ResolutionUploader";


import { useState } from "react";

export default function ReportDrawer({
  open,
  report,
  onClose,
}) {
  if (!open || !report) return null;
  const [resolutionImage, setResolutionImage] =
  useState(null);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">

      <div className="w-[700px] bg-white h-full overflow-y-auto shadow-2xl">

        <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-center z-20">

          <h2 className="text-2xl font-bold">
            Command Center
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100"
          >
            <X />
          </button>

        </div>

        <div className="space-y-6 p-6">

          <ReportHero report={report} />

          <ReportStats report={report} />
          <AIAnalysisCard report={report} />

            <AIActionPlan report={report} />

            <LocationMap report={report} />
            <BeforeAfterCard report={report} />

          <TimelineCard report={report} />

          <CommentsCard reportId={report._id} />
            <ResolutionUploader
  onUpload={setResolutionImage}
/>
          <AdminActions
  report={report}
  resolutionImage={resolutionImage}
/>

        </div>

      </div>

    </div>
  );
}