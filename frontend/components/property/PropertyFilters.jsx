"use client";

export default function PropertyFilters({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const resetFilters = () => {
    setFilters({
      city: "",
      property_type: "",
      bedrooms: "",
      minPrice: "",
      maxPrice: "",
      sort: "",
    });
  };

  return (
    <aside className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.2)]">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
        <button
          type="button"
          onClick={resetFilters}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
        >
          Reset
        </button>
      </div>

      <div className="space-y-6">
        {/* Property Type */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Property Type
          </label>
          <select
            name="property_type"
            value={filters.property_type}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Land">Land</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Bedrooms
          </label>
          <input
            type="number"
            name="bedrooms"
            placeholder="Any"
            value={filters.bedrooms}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Price Range
          </label>
          <div className="space-y-2">
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Sort By
          </label>
          <select
            name="sort"
            value={filters.sort}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Default</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
