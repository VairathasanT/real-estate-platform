export default function PropertyHighlights({ property }) {
  const configuration =
    property.property_type === "Land" ||
    property.property_type === "Plot"
      ? "N/A"
      : `${property.bedrooms} BHK`;

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">

      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Property Type
        </p>

        <h3 className="mt-2 text-lg font-semibold">
          {property.property_type}
        </h3>
      </div>

      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Configuration
        </p>

        <h3 className="mt-2 text-lg font-semibold">
          {configuration}
        </h3>
      </div>

      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Area
        </p>

        <h3 className="mt-2 text-lg font-semibold">
          {property.sqft} sqft
        </h3>
      </div>

      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          City
        </p>

        <h3 className="mt-2 text-lg font-semibold">
          {property.city}
        </h3>
      </div>

    </section>
  );
}