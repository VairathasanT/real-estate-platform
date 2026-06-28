export default function PropertyOverview({ property }) {
  const pricePerSqft =
    property.sqft && property.price
      ? Math.round(property.price / property.sqft)
      : 0;

  return (
    <section className="mt-8">

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

        <div>

          <h1 className="text-4xl font-bold text-gray-900">
            {property.title}
          </h1>

          <p className="mt-3 text-lg text-gray-500">
            📍 {property.city}, Tamil Nadu
          </p>

          <div className="flex items-center gap-4 mt-5">

            <h2 className="text-4xl font-bold text-blue-600">
              ₹ {Number(property.price).toLocaleString()}
            </h2>

            <span className="bg-blue-100 text-blue-700 px-4 py- rounded-xl font-semibold">
              ₹ {pricePerSqft.toLocaleString()} / sqft
            </span>

          </div>

        </div>

        <div className="flex gap-4">

          <button className="px-4 py-4 border rounded-2xl hover:bg-gray-100 transition">
            🤍 Save
          </button>

          <button className="px-4 py-4 border rounded-2xl hover:bg-gray-100 transition">
            🔗 Share
          </button>

        </div>

      </div>

    </section>
  );
}