const colors = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
};

const Badge = ({ level = "low" }) => {
  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-semibold
        ${colors[level]}
      `}
    >
      {level}
    </span>
  );
};

export default Badge;