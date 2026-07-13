import {
  Filter,
  AlertTriangle,
  Trash2,
  Droplets,
  Lightbulb,
  Zap,
  Waves,
} from "lucide-react";

const categories = [
  {
    icon: Filter,
    title: "All",
    value: "All",
  },
  {
    icon: AlertTriangle,
    title: "Road",
    value: "Road",
  },
  {
    icon: Trash2,
    title: "Garbage",
    value: "Garbage",
  },
  {
    icon: Droplets,
    title: "Water",
    value: "Water",
  },
  {
    icon: Zap,
    title: "Electricity",
    value: "Electricity",
  },
  {
    icon: Waves,
    title: "Drainage",
    value: "Drainage",
  },
  {
    icon: Lightbulb,
    title: "Street Light",
    value: "Street Light",
  },
];

export default function MapFilters({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const Icon = category.icon;

        const active =
          selectedCategory === category.value;

        return (
          <button
            key={category.value}
            onClick={() =>
              setSelectedCategory(category.value)
            }
            className={`px-5 py-3 rounded-2xl flex items-center gap-2 transition-all border
              
              ${
                active
                  ? "bg-awaaz-secondary text-white border-awaaz-secondary shadow-lg"
                  : "bg-awaaz-surface border-awaaz-border hover:border-awaaz-secondary"
              }
            `}
          >
            <Icon size={18} />
            {category.title}
          </button>
        );
      })}
    </div>
  );
}