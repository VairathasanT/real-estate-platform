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
    <article className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_45px_-24px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-18px_rgba(15,23,42,0.45)]">
      <div className="relative">
        <img
          src={image}
          alt={property.title}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow-sm">
          {tag}
        </div>

        <div className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-amber-600 shadow-sm">
          ★ {rating}
        </div>

        {property.verified && (
          <div className="absolute bottom-4 left-4 rounded-full bg-emerald-600 px-3 py-1 text-sm font-semibold text-white shadow-sm">
            ✓ Verified
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span>📍</span> {property.city}
            </p>
            <h3 className="mt-2 text-xl font-semibold leading-snug text-slate-900">
              {property.title}
            </h3>
          </div>

          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
            {property.status || "Ready to Move"}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
          {!isLand ? (
            <span className="rounded-full bg-slate-100 px-3 py-1.5">
              {property.bedrooms} BHK
            </span>
          ) : (
            <span className="rounded-full bg-slate-100 px-3 py-1.5">Plot</span>
          )}
          <span className="rounded-full bg-slate-100 px-3 py-1.5">
            {property.sqft} sq.ft
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1.5">Premium</span>
        </div>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            <p className="text-sm text-slate-500">Starting from</p>
            <p className="text-2xl font-bold text-slate-900">
              ₹ {Number(property.price).toLocaleString("en-IN")}
            </p>
          </div>

          <Link
            href={`/properties/${property.id}`}
            className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}