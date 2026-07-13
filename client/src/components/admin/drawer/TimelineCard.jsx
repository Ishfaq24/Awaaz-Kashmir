import {
  Clock3,
  CheckCircle2,
  ShieldCheck,
  Building2,
  MessageSquare,
} from "lucide-react";

const icons = {
  Submitted: Clock3,
  Confirmed: CheckCircle2,
  Verified: ShieldCheck,
  Assigned: Building2,
  Comment: MessageSquare,
  "In Progress": Clock3,
  Resolved: CheckCircle2,
};

const colors = {
  Submitted: "bg-blue-500",
  Confirmed: "bg-green-500",
  Verified: "bg-purple-500",
  Assigned: "bg-orange-500",
  Comment: "bg-cyan-500",
  "In Progress": "bg-yellow-500",
  Resolved: "bg-green-600",
};

export default function TimelineCard({
  report,
}) {
  const timeline = report.timeline || [];

  return (
    <div className="rounded-3xl border bg-white p-6">

      <h2 className="text-xl font-bold mb-8">
        Activity Timeline
      </h2>

      {timeline.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No activity yet.
        </div>
      ) : (
        <div className="relative">

          <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-gray-200" />

          <div className="space-y-8">

            {timeline.map((item, index) => {
              const Icon =
                icons[item.status] || Clock3;

              return (
                <div
                  key={index}
                  className="relative flex gap-5"
                >

                  <div
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-white ${
                      colors[item.status] ||
                      "bg-gray-500"
                    }`}
                  >
                    <Icon size={18} />
                  </div>

                  <div className="flex-1 pb-2">

                    <div className="flex justify-between items-center">

                      <h3 className="font-semibold">

                        {item.status}

                      </h3>

                      <span className="text-sm text-gray-500">

                        {item.createdAt
                          ? new Date(
                              item.createdAt
                            ).toLocaleString()
                          : "-"}

                      </span>

                    </div>

                    <p className="text-gray-600 mt-2">

                      {item.message}

                    </p>

                    {item.user && (
                      <p className="text-sm text-gray-400 mt-1">

                        by {item.user}

                      </p>
                    )}

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      )}

    </div>
  );
}