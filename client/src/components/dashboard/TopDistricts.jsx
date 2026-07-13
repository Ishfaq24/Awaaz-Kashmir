export default function TopDistricts({
  data = [],
}) {
  const districts = data.map((item) => ({
    district: item._id || "Unknown",
    reports: item.reports,
  }));

  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-6">
      <h2 className="text-xl font-bold mb-6">
        Top Districts
      </h2>

      <div className="space-y-5">
        {districts.length === 0 ? (
          <div className="text-center py-10 text-awaaz-muted">
            No district data available.
          </div>
        ) : (
          districts.map((district, index) => (
            <div
              key={`${district.district}-${index}`}
              className="flex justify-between items-center border-b last:border-none pb-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-awaaz-background text-awaaz-secondary flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <div>
                  <h3 className="font-semibold">
                    {district.district}
                  </h3>

                  <p className="text-sm text-awaaz-muted">
                    {district.reports} Reports
                  </p>
                </div>
              </div>

              <span className="text-awaaz-secondary font-semibold">
                #{index + 1}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}