export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-md",

    secondary:
      "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50",

    danger:
      "bg-red-500 text-white hover:bg-red-600",

    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-7 py-4 text-lg",
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}