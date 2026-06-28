export default function PropertyInfoRow({ property }) {
  const configuration =
    property.property_type === "Land"
      ? "N/A"
      : `${property.bedrooms} BHK`;

  return (
    <section className="mt-8 bg-white rounded-2xl border shadow-sm">

      <div className="grid grid-cols-2 md:grid-cols-4">

        {/* Property Type */}
        <div className="p-6 border-b md:border-b-0 md:border-r">
          <p className="text-sm text-gray-500">
            Property Type
          </p>

          <h3 className="mt-2 text-xl font-semibold">
            {property.property_type}
          </h3>
        </div>

        {/* Area */}
        <div className="p-6 border-b md:border-b-0 md:border-r">
          <p className="text-sm text-gray-500">
            Area
          </p>

          <h3 className="mt-2 text-xl font-semibold">
            {property.sqft} sqft
          </h3>
        </div>

        {/* Configuration */}
        <div className="p-6 border-r">
          <p className="text-sm text-gray-500">
            Configuration
          </p>

          <h3 className="mt-2 text-xl font-semibold">
            {configuration}
          </h3>
        </div>

        {/* Ownership */}
        <div className="p-6">
          <p className="text-sm text-gray-500">
            Ownership
          </p>

          <h3 className="mt-2 text-xl font-semibold">
            Freehold
          </h3>
        </div>

      </div>

    </section>
  );
}