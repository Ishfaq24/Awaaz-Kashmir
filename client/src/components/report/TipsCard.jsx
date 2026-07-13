import {
  Camera,
  MapPinned,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

const tips = [
  {
    icon: Camera,
    title: "Use a clear image",
    description: "Capture the issue clearly in daylight whenever possible.",
  },
  {
    icon: MapPinned,
    title: "Enable location",
    description: "GPS helps us assign the issue to the correct authority.",
  },
  {
    icon: TriangleAlert,
    title: "One issue per report",
    description: "Report a single civic issue in each submission.",
  },
  {
    icon: ShieldCheck,
    title: "Avoid edited photos",
    description: "Original images improve AI accuracy and trust score.",
  },
];

export default function TipsCard() {
  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border shadow-sm p-6">
      <h2 className="text-xl font-bold text-awaaz-text">
        Reporting Tips
      </h2>

      <p className="text-awaaz-muted mt-2 mb-6">
        Follow these suggestions for better AI detection.
      </p>

      <div className="space-y-5">
        {tips.map((tip, index) => {
          const Icon = tip.icon;

          return (
            <div
              key={index}
              className="flex gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-awaaz-background flex items-center justify-center">
                <Icon
                  className="text-awaaz-secondary"
                  size={20}
                />
              </div>

              <div>
                <h3 className="font-semibold">
                  {tip.title}
                </h3>

                <p className="text-sm text-awaaz-muted">
                  {tip.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}