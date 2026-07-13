const Input = ({
  label,
  type = "text",
  placeholder,
  ...props
}) => {
  return (
    <div className="space-y-2">

      {label && (
        <label className="font-medium text-awaaz-text">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        {...props}
        className="
          w-full
          rounded-xl
          border
          border-awaaz-border
          px-4
          py-3
          outline-none
          focus:border-awaaz-secondary
          focus:ring-2
          focus:ring-awaaz-accent/20
        "
      />
    </div>
  );
};

export default Input;