import {
  ShieldCheck,
  Users,
  MessageSquare,
  Brain,
} from "lucide-react";

function StatCard({
  icon: Icon,
  title,
  value,
  color,
}) {
  return (
    <div className="rounded-2xl border p-5 bg-white">

      <div className="flex items-center gap-4">

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
        >
          <Icon size={22} />
        </div>

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h3 className="text-2xl font-bold mt-1">
            {value}
          </h3>

        </div>

      </div>

    </div>
  );
}

export default function ReportStats({
  report,
}) {
  return (
    <div className="grid grid-cols-2 gap-5">

      <StatCard
        icon={ShieldCheck}
        title="Trust Score"
        value={`${report.trustScore || 0}%`}
        color="bg-green-100 text-green-700"
      />

      <StatCard
        icon={Users}
        title="Confirmations"
        value={report.confirmations || 0}
        color="bg-blue-100 text-blue-700"
      />

      <StatCard
        icon={MessageSquare}
        title="Comments"
        value={report.comments || 0}
        color="bg-yellow-100 text-yellow-700"
      />

      <StatCard
        icon={Brain}
        title="AI Confidence"
        value={`${Math.round(
          report.aiAnalysis?.confidence || 0
        )}%`}
        color="bg-purple-100 text-purple-700"
      />

    </div>
  );
}