export default function Card({
  children,
  className = "",
  hover = true,
}) {
  return (
    <div
      className={`
        bg-white
        rounded-2xl
        border
        border-gray-200
        shadow-sm
        overflow-hidden
        transition-all
        duration-300
        ${
          hover
            ? "hover:shadow-xl hover:-translate-y-1"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}