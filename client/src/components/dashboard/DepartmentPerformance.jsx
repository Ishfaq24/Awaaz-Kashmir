const departments = [
  {
    name: "Roads & Buildings",
    score: 91,
  },
  {
    name: "Municipality",
    score: 88,
  },
  {
    name: "PHE",
    score: 76,
  },
  {
    name: "Electricity",
    score: 94,
  },
];

export default function DepartmentPerformance() {
  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-6">

      <h2 className="text-xl font-bold mb-6">
        Department Performance
      </h2>

      <div className="space-y-6">

        {departments.map((dept) => (
          <div key={dept.name}>

            <div className="flex justify-between mb-2">

              <span className="font-medium">
                {dept.name}
              </span>

              <span className="font-bold text-awaaz-secondary">
                {dept.score}%
              </span>

            </div>

            <div className="h-3 rounded-full bg-awaaz-border overflow-hidden">

              <div
                className="h-full bg-awaaz-secondary rounded-full"
                style={{
                  width: `${dept.score}%`,
                }}
              />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}