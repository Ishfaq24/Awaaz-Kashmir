import { Link } from "react-router-dom";
import { TriangleAlert, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">

      <div className="text-center">

        <div className="w-28 h-28 mx-auto rounded-full bg-awaaz-background flex items-center justify-center">

          <TriangleAlert
            size={60}
            className="text-awaaz-accent"
          />

        </div>

        <h1 className="text-7xl font-black mt-8">
          404
        </h1>

        <p className="text-awaaz-muted mt-3 text-lg">
          The page you're looking for doesn't exist.
        </p>

        <Link to="/">

          <button className="mt-8 bg-awaaz-secondary hover:opacity-90 text-white px-7 py-4 rounded-2xl flex items-center gap-2 mx-auto">

            <ArrowLeft size={20} />

            Back to Dashboard

          </button>

        </Link>

      </div>

    </div>
  );
}