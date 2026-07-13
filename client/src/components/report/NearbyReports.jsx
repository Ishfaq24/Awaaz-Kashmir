import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import api from "../../lib/api";

export default function NearbyReports({
  reportId,
}) {
  const { data = [] } = useQuery({
    queryKey: ["nearby", reportId],
    queryFn: async () => {
      const { data } = await api.get(
        `/reports/nearby/${reportId}`
      );

      return data.data;
    },
  });

  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-8">
      <h2 className="text-2xl font-bold mb-6">
        Nearby Issues
      </h2>

      {data.length === 0 ? (
        <p className="text-awaaz-muted">
          No nearby reports.
        </p>
      ) : (
        <div className="space-y-4">
          {data.map((item) => (
            <Link
              key={item._id}
              to={`/reports/${item._id}`}
              className="block border rounded-2xl p-4 hover:border-awaaz-secondary transition"
            >
              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="text-sm text-awaaz-muted">
                {item.category}
              </p>

              <p className="text-sm text-awaaz-secondary mt-1">
                {item.distance} km away
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}