import Link from "next/link";

export default function PropertyCard({ property }) {
  const image =
    property.image_url &&
    !property.image_url.includes("example.com")
      ? property.image_url
      : "/images/house-placeholder1.jpg";

  const isLand =
    property.property_type === "Land" ||
    property.property_type === "Plot";

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      {/* Image */}
      <div className="relative">

        <img
          src={image}
          alt={property.title}
          className="w-full h-56 object-cover"
        />

        {/* Rating */}
        <div className="absolute top-4 right-4 bg-white px-3 py-2 rounded-xl shadow-md font-semibold flex items-center gap-1">
          ⭐  {property.rating ?? (4.2 + (property.id % 8) * 0.1).toFixed(1)}
        </div>

        {/* Listing Type */}
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {
property.property_type === "Apartment" ? "For Rent" :
property.property_type === "Villa" ? "For Sale" :
property.property_type === "House" ? "For Sale" :
property.property_type === "Land" ? "DTCP Approved" :
"Featured"
}
        </div>

        {/* Verified Badge */}
        {property.verified && (
          <div className="absolute bottom-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            ✓ Verified
          </div>
        )}

      </div>

      {/* Content */}
      <div className="p-6">

        {/* Location */}
        <p className="flex items-center gap-2 text-sm text-gray-500">
          📍 {property.city}
        </p>

        {/* Title */}
        <h2 className="mt-2 text-2xl font-bold text-gray-900 leading-tight">
          {property.title}
        </h2>

        {/* Property Details */}
        <div className="flex items-center gap-6 mt-4 text-gray-600">

          {!isLand ? (
            <span>🛏 {property.bedrooms} BHK</span>
          ) : (
            <span>🌳 Plot Area</span>
          )}

          <span>📐 {property.sqft} sq.ft</span>

        </div>

        {/* Price & Status */}
        <div className="flex items-center justify-between mt-5">

          <h3 className="text-2xl font-bold text-blue-600 whitespace-nowrap">
            ₹ {Number(property.price).toLocaleString("en-IN")}
          </h3>

          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-semibold">
            {property.status || "Ready to Move"}
          </span>

        </div>

        {/* View Details Button */}
        <Link
          href={`/properties/${property.id}`}
          className="block w-full mt-6 py-2 rounded-xl bg-blue-600 text-white text-center font-semibold hover:bg-blue-700 transition"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}