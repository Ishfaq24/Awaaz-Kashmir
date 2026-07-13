import { useQuery } from "@tanstack/react-query";
import { getDepartmentPerformance } from "../../api/dashboard";

export default function DepartmentPerformance() {
  const {
    data: departments = [],
    isLoading,
  } = useQuery({
    queryKey: ["department-performance"],
    queryFn: getDepartmentPerformance,
  });

  if (isLoading) {
    return (
      <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">
        Department Performance
      </h2>

      <div className="space-y-5">
        {departments.map((dept) => (
          <div
            key={dept.department}
            className="border rounded-2xl p-5"
          >
            <div className="flex justify-between">
              <h3 className="font-bold">
                {dept.department}
              </h3>

              <span className="font-bold text-awaaz-secondary">
                {dept.performance}%
              </span>
            </div>

            <div className="mt-4 h-3 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-awaaz-secondary"
                style={{
                  width: `${dept.performance}%`,
                }}
              />
            </div>

            <div className="flex justify-between mt-4 text-sm text-awaaz-muted">
              <span>
                Total: {dept.total}
              </span>

              <span>
                Pending: {dept.pending}
              </span>

              <span>
                Resolved: {dept.resolved}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}