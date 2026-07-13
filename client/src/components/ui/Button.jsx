import { motion } from "framer-motion";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  onClick,
}) => {
  const variants = {
    primary:
      "bg-awaaz-secondary hover:opacity-90 text-white",

    secondary:
      "bg-awaaz-primary hover:opacity-90 text-white",

    outline:
      "border border-awaaz-secondary text-awaaz-secondary hover:bg-awaaz-background",

    danger:
      "bg-awaaz-accent hover:opacity-90 text-white",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`
        px-6
        py-3
        rounded-2xl
        font-semibold
        transition-all
        shadow-sm
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default Button;