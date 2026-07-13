import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, LocateFixed } from "lucide-react";

import api from "../lib/api";

import MapView from "../components/map/MapView";
import MapLegend from "../components/map/MapLegend";
import MapStats from "../components/map/MapStats";
import MapFilters from "../components/map/MapFilters";
import AISummaryCard from "../components/map/AISummaryCard";
import FloatingStats from "../components/map/FloatingStats";
import FloatingReportButton from "../components/map/FloatingReportButton";

const fetchReports = async () => {
  const { data } = await api.get("/reports");
  return data.data.reports;
};

export default function Map() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const {
    data: reports = [],
    isLoading,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: fetchReports,
  });

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesCategory =
        selectedCategory === "All" ||
        report.category === selectedCategory;

      const matchesSearch =
        report.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        report.description
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        report.location?.address
          ?.toLowerCase()
          .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [reports, selectedCategory, search]);

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">
            Live Issues Map
          </h1>

          <p className="text-awaaz-muted mt-2">
            Real-time monitoring of civic issues
            across Kashmir.
          </p>
        </div>

        <button className="bg-awaaz-secondary text-white rounded-2xl px-6 py-3 flex items-center gap-2">
          <LocateFixed size={18} />
          My Location
        </button>
      </div>

      {/* Stats */}

      <MapStats />

      {/* Filters */}

      <MapFilters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="grid grid-cols-12 gap-8">
        {/* MAP */}

        <div className="col-span-12 xl:col-span-9">
          <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-5 mb-6">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-4 text-awaaz-muted"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search reports..."
                className="w-full rounded-2xl border border-awaaz-border py-3 pl-12 pr-5"
              />
            </div>
          </div>

          <div className="relative h-[750px] rounded-3xl overflow-hidden border border-awaaz-border">
            <AISummaryCard />

            <FloatingStats />

            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                Loading map...
              </div>
            ) : (
              <MapView reports={filteredReports} />
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}

        <div className="col-span-12 xl:col-span-3 space-y-6">
          <MapLegend />

          <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border">
            <div className="p-6 border-b">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold">
                  Latest Reports
                </h2>

                <span className="text-awaaz-secondary font-semibold">
                  {filteredReports.length}
                </span>
              </div>
            </div>

            <div className="max-h-[650px] overflow-y-auto">
              {filteredReports.length === 0 ? (
                <div className="p-6 text-center text-awaaz-muted">
                  No reports found.
                </div>
              ) : (
                filteredReports.map((report) => (
                  <div
                    key={report._id}
                    className="p-5 border-b"
                  >
                    <img
                      src={
                        report.images?.[0]?.url ||
                        "https://placehold.co/400x250?text=No+Image"
                      }
                      alt={report.title}
                      className="w-full h-36 object-cover rounded-xl"
                    />

                    <h3 className="font-bold mt-4">
                      {report.title}
                    </h3>

                    <p className="text-sm text-awaaz-muted mt-2">
                      📍{" "}
                      {report.location?.address ||
                        "Unknown"}
                    </p>

                    <div className="flex justify-between mt-4">
                      <span className="text-sm font-medium">
                        {report.status}
                      </span>

                      <span className="text-sm">
                        {report.severity}
                      </span>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-xs mb-2">
                        <span>Trust Score</span>

                        <span>
                          {report.trustScore}%
                        </span>
                      </div>

                      <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className="h-full bg-awaaz-secondary"
                          style={{
                            width: `${report.trustScore}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <FloatingReportButton />
    </div>
  );
}