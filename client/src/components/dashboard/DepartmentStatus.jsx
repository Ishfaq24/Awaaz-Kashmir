const departments = [
  {
    name: "Roads & Buildings",
    pending: 18,
    color: "bg-red-500",
  },
  {
    name: "Municipality",
    pending: 8,
    color: "bg-green-500",
  },
  {
    name: "PHE",
    pending: 11,
    color: "bg-blue-500",
  },
  {
    name: "Electricity",
    pending: 5,
    color: "bg-yellow-500",
  },
];

export default function DepartmentStatus() {
  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-6">

      <h2 className="text-xl font-bold mb-6">
        Department Status
      </h2>

      <div className="space-y-6">

        {departments.map((dept) => (
          <div key={dept.name}>

            <div className="flex justify-between mb-2">

              <span className="font-medium">
                {dept.name}
              </span>

              <span className="text-awaaz-muted">
                {dept.pending} Pending
              </span>

            </div>

            <div className="h-2 rounded-full bg-awaaz-border overflow-hidden">

              <div
                className={`h-full ${dept.color}`}
                style={{
                  width: `${100 - dept.pending * 3}%`,
                }}
              />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}