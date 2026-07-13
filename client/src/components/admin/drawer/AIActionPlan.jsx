import {
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function AIActionPlan({
  report,
}) {
  const department =
    report.assignedDepartment ||
    "Public Works Department";

  return (
    <div className="rounded-3xl border bg-gradient-to-r from-indigo-50 to-purple-50 p-6">

      <div className="flex items-center gap-3 mb-6">

        <Sparkles className="text-purple-600" />

        <h2 className="text-xl font-bold">
          AI Action Plan
        </h2>

      </div>

      <div className="space-y-4">

        <Step>
          Verify report authenticity.
        </Step>

        <Step>
          Assign to {department}.
        </Step>

        <Step>
          Dispatch nearest field team.
        </Step>

        <Step>
          Upload completion photo after work.
        </Step>

        <Step>
          Notify citizens automatically.
        </Step>

      </div>

    </div>
  );
}

function Step({
  children,
}) {
  return (
    <div className="flex gap-3">

      <CheckCircle2 className="text-green-600 mt-1" />

      <p>{children}</p>

    </div>
  );
}