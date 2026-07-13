import { ImageOff } from "lucide-react";

export default function BeforeAfterCard({
  report,
}) {
  const before =
    report.images?.[0]?.url;

  const after =
    report.resolutionImage?.url;

  return (
    <div className="rounded-3xl border bg-white p-6">

      <h2 className="text-xl font-bold mb-6">
        Before / After
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <h3 className="font-semibold mb-3">
            Before
          </h3>

          {before ? (
            <img
              src={before}
              alt=""
              className="rounded-2xl w-full h-64 object-cover"
            />
          ) : (
            <div className="h-64 rounded-2xl border flex items-center justify-center text-gray-400">
              <ImageOff />
            </div>
          )}

        </div>

        <div>

          <h3 className="font-semibold mb-3">
            After Resolution
          </h3>

          {after ? (
            <img
              src={after}
              alt=""
              className="rounded-2xl w-full h-64 object-cover"
            />
          ) : (
            <div className="h-64 rounded-2xl border flex items-center justify-center text-gray-400">
              <ImageOff />
            </div>
          )}

        </div>

      </div>

    </div>
  );
}