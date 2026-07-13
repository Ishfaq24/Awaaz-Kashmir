import {
  Brain,
  Building2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function AIAnalysisCard({
  report,
}) {
  const ai = report.aiAnalysis || {};

  const confidence = Math.round(
    ai.confidence || 0
  );

  return (
    <div className="rounded-3xl border bg-white p-6">

      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">

          <Brain className="text-purple-700" />

        </div>

        <div>

          <h2 className="text-xl font-bold">
            AI Analysis
          </h2>

          <p className="text-gray-500">
            Generated automatically
          </p>

        </div>

      </div>

      <div className="space-y-6">

        {/* AI Title */}

        <div>

          <p className="text-sm text-gray-500 mb-2">
            AI Generated Title
          </p>

          <h3 className="text-lg font-semibold">
            {ai.title || report.title}
          </h3>

        </div>

        {/* AI Description */}

        <div>

          <p className="text-sm text-gray-500 mb-2">
            AI Summary
          </p>

          <p className="text-gray-700 leading-7">
            {ai.description ||
              "AI analysis has not been generated yet."}
          </p>

        </div>

        {/* Confidence */}

        <div>

          <div className="flex justify-between mb-2">

            <span className="font-medium">
              AI Confidence
            </span>

            <span className="font-bold text-purple-700">
              {confidence}%
            </span>

          </div>

          <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">

            <div
              className="h-full bg-purple-600 rounded-full transition-all"
              style={{
                width: `${confidence}%`,
              }}
            />

          </div>

        </div>

        {/* Recommendation */}

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-2xl bg-gray-50 p-4">

            <div className="flex items-center gap-2 mb-2">

              <Building2
                size={18}
                className="text-blue-600"
              />

              <span className="font-semibold">
                Suggested Department
              </span>

            </div>

            <p className="text-gray-700">
              {report.assignedDepartment ||
                "Public Works Department"}
            </p>

          </div>

          <div className="rounded-2xl bg-gray-50 p-4">

            <div className="flex items-center gap-2 mb-2">

              <ShieldCheck
                size={18}
                className="text-green-600"
              />

              <span className="font-semibold">
                Severity
              </span>

            </div>

            <p className="text-gray-700">
              {report.severity}
            </p>

          </div>

        </div>

        {/* AI Recommendation */}

        <div className="rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 p-5">

          <div className="flex items-center gap-2 mb-3">

            <Sparkles className="text-purple-600" />

            <h3 className="font-bold">
              AI Recommendation
            </h3>

          </div>

          <p className="leading-7 text-gray-700">
            Based on the issue severity, trust score,
            citizen confirmations and AI analysis,
            this report should be prioritized for
            immediate review by the assigned department.
          </p>

        </div>

      </div>

    </div>
  );
}

