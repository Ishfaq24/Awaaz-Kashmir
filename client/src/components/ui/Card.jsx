const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        bg-awaaz-surface
        rounded-2xl
        shadow-sm
        border
        border-awaaz-border
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;