export default function PropertyInfo({ property }) {
  return (
    <section className="mt-10">

      {/* Property Type Badge */}
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
          {property.property_type}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
        {property.title}
      </h1>

      {/* Location */}
      <p className="mt-4 text-lg text-gray-600">
        📍 {property.city}
      </p>

      {/* Price */}
      <h2 className="mt-6 text-4xl font-bold text-blue-600">
        ₹ {Number(property.price).toLocaleString()}
      </h2>

    </section>
  );
}