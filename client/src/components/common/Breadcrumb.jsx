import { ChevronRight } from "lucide-react";

export default function Breadcrumb({
  items = [],
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-awaaz-muted">

      {items.map((item, index) => (
        <div
          key={item.label}
          className="flex items-center gap-2"
        >
          <span
            className={
              index === items.length - 1
                ? "font-semibold text-awaaz-text"
                : ""
            }
          >
            {item.label}
          </span>

          {index !== items.length - 1 && (
            <ChevronRight size={15} />
          )}

        </div>
      ))}

    </div>
  );
}