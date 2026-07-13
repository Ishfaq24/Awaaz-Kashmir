import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "No Data",
  subtitle = "Nothing to display.",
}) {
  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-16 text-center">

      <div className="w-24 h-24 mx-auto rounded-full bg-awaaz-background flex items-center justify-center">

        <Inbox
          size={42}
          className="text-awaaz-muted"
        />

      </div>

      <h2 className="text-2xl font-bold mt-6">
        {title}
      </h2>

      <p className="text-awaaz-muted mt-2">
        {subtitle}
      </p>

    </div>
  );
}