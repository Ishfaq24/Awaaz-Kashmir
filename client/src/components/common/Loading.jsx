import { Loader } from "lucide-react";

export default function Loading({ fullScreen = true }) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "h-[70vh]" : "py-20"
      }`}
    >
      <Loader className="w-10 h-10 animate-spin text-awaaz-primary" />
    </div>
  );
}
