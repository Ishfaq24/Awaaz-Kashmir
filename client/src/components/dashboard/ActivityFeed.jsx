const activities = [
  {
    id: 1,
    title: "Road Damage verified",
    time: "2 min ago",
  },
  {
    id: 2,
    title: "Water Leakage assigned",
    time: "8 min ago",
  },
  {
    id: 3,
    title: "Garbage Overflow resolved",
    time: "21 min ago",
  },
  {
    id: 4,
    title: "Street Light reported",
    time: "35 min ago",
  },
];

export default function ActivityFeed() {
  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-6">

      <h2 className="text-xl font-bold mb-6">
        Live Activity
      </h2>

      <div className="space-y-6">

        {activities.map((item) => (
          <div
            key={item.id}
            className="flex gap-4"
          >

            <div className="w-3 h-3 mt-2 rounded-full bg-awaaz-secondary" />

            <div>

              <h3 className="font-medium">
                {item.title}
              </h3>

              <p className="text-sm text-awaaz-muted">
                {item.time}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}