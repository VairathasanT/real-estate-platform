export default function Textarea({
  label,
  error,
  rows = 5,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <textarea
        rows={rows}
        className={`
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          py-3
          text-gray-900
          placeholder:text-gray-400
          outline-none
          resize-none
          transition-all
          duration-300
          focus:border-blue-600
          focus:ring-4
          focus:ring-blue-100
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}