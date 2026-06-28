import Link from "next/link";
import { memo } from "react";

function PropertyCard({ property }) {
  const image =
    property.image_url &&
    !property.image_url.includes("example.com")
      ? property.image_url
      : "/images/house-placeholder1.jpg";

  const isLand =
    property.property_type === "Land" ||
    property.property_type === "Plot";

  const tag =
    property.property_type === "Apartment"
      ? "For Rent"
      : property.property_type === "Villa"
      ? "For Sale"
      : property.property_type === "House"
      ? "For Sale"
      : property.property_type === "Land"
      ? "DTCP Approved"
      : "Featured";

  const rating = property.rating ?? (4.2 + (property.id % 8) * 0.1).toFixed(1);

  return (
    <Link href={`/properties/${property.id}`}>
      <article className="group overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_8px_24px_-12px_rgba(15,23,42,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(15,23,42,0.4)] cursor-pointer">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-slate-100">
          <img
            src={image}
            alt={property.title}
            loading="lazy"
            decoding="async"
            className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

          {/* Tags */}
          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm">
            {tag}
          </div>

          <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-amber-600 shadow-sm">
            ★ {rating}
          </div>

          {property.verified && (
            <div className="absolute bottom-3 left-3 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
              ✓ Verified
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Location */}
          <p className="text-xs font-medium text-slate-500 truncate">
            📍 {property.city}
          </p>

          {/* Title */}
          <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold text-slate-900 leading-snug">
            {property.title}
          </h3>

          {/* Details */}
          <div className="mt-3 flex items-center gap-3 text-xs text-slate-600">
            {!isLand ? (
              <span className="rounded bg-slate-100 px-2 py-0.5">{property.bedrooms} BHK</span>
            ) : (
              <span className="rounded bg-slate-100 px-2 py-0.5">Plot</span>
            )}
            <span className="rounded bg-slate-100 px-2 py-0.5">{property.sqft} sq.ft</span>
          </div>

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
            <div>
              <p className="text-xs text-slate-500">Starting</p>
              <p className="font-bold text-slate-900">
                ₹{(Number(property.price) / 10000000).toFixed(1)}Cr
              </p>
            </div>

            <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
              {property.status || "Ready to Move"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default memo(PropertyCard);