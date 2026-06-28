"use client";

export default function PropertyFilters({
  filters,
  setFilters,
}) {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="grid md:grid-cols-3 gap-4 mb-8">

      <input
        type="text"
        name="city"
        placeholder="City"
        value={filters.city}
        onChange={handleChange}
        className="border rounded-lg p-3"
      />

      <select
        name="property_type"
        value={filters.property_type}
        onChange={handleChange}
        className="border rounded-lg p-3"
      >
        <option value="">All Types</option>
        <option value="Apartment">Apartment</option>
        <option value="House">House</option>
        <option value="Villa">Villa</option>
        <option value="Land">Land</option>
      </select>

      <input
        type="number"
        name="bedrooms"
        placeholder="Bedrooms"
        value={filters.bedrooms}
        onChange={handleChange}
        className="border rounded-lg p-3"
      />

      <input
        type="number"
        name="minPrice"
        placeholder="Minimum Price"
        value={filters.minPrice}
        onChange={handleChange}
        className="border rounded-lg p-3"
      />

      <input
        type="number"
        name="maxPrice"
        placeholder="Maximum Price"
        value={filters.maxPrice}
        onChange={handleChange}
        className="border rounded-lg p-3"
      />

      <select
        name="sort"
        value={filters.sort}
        onChange={handleChange}
        className="border rounded-lg p-3"
      >
        <option value="">Default</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>

    </div>
  );
}