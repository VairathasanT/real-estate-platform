export default function PropertyDescription({ property }) {
    return (
  <div
    id="description"
    className="grid lg:grid-cols-3 gap-8 mt-10"
  >
    {/* Left Side */}
    <div className="lg:col-span-2">

      <div className="bg-white rounded-2xl border shadow-sm p-8">

        <h2 className="text-2xl font-bold mb-6">
          About Property
        </h2>

        <p className="text-gray-600 leading-8">
          {property.description}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

          <div className="border rounded-xl p-4 text-center">
            ✅ DTCP Approved
          </div>

          <div className="border rounded-xl p-4 text-center">
            🚗 Good Road Access
          </div>

          <div className="border rounded-xl p-4 text-center">
            💧 Water Connection
          </div>

          <div className="border rounded-xl p-4 text-center">
            ⚡ Electricity
          </div>

        </div>

      </div>

    </div>


    {/* Right Side */}

    <div>

      <div className="bg-white rounded-2xl border shadow-sm p-8">

        <h2 className="text-2xl font-bold mb-6">
          Property Details
        </h2>

        <div className="space-y-5">

          <div className="flex justify-between">
            <span>Listing Type</span>
            <strong>For Sale</strong>
          </div>

          <div className="flex justify-between">
            <span>Property Type</span>
            <strong>{property.property_type}</strong>
          </div>

          <div className="flex justify-between">
            <span>Area</span>
            <strong>{property.sqft} sqft</strong>
          </div>

          <div className="flex justify-between">
            <span>Configuration</span>
            <strong>
              {property.property_type === "Land"
                ? "N/A"
                : `${property.bedrooms} BHK`}
            </strong>
          </div>

          <div className="flex justify-between">
            <span>Ownership</span>
            <strong>Freehold</strong>
          </div>

          <div className="flex justify-between">
            <span>Status</span>

            <strong className="text-green-600">
              Available
            </strong>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}
  