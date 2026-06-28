"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import API from "@/services/api";
import Link from "next/link";
import PropertyFilters from "@/components/property/PropertyFilters";
import PropertyCard from "@/components/property/PropertyCard"


export default function PropertiesPage() {
    const searchParams = useSearchParams();
  
const [properties, setProperties] = useState([]);

const [page, setPage] = useState(1);

const [pagination, setPagination] = useState({
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
});

const [filters, setFilters] = useState({
  city: searchParams.get("city") || "",
  property_type: searchParams.get("property_type") || "",
  bedrooms: searchParams.get("bedrooms") || "",
  minPrice: searchParams.get("minPrice") || "",
  maxPrice: searchParams.get("maxPrice") || "",
  sort: searchParams.get("sort") || "",
});

  useEffect(() => {
  const city = searchParams.get("city");
  const bedrooms = searchParams.get("bedrooms");

  setFilters((prev) => ({
    ...prev,
    city: city || "",
    bedrooms: bedrooms || "",
  }));
}, [searchParams]);

  useEffect(() => {
    fetchProperties();
  }, [filters, page]);


  const fetchProperties = async () => {
    try {
      const params = {};
      params.page = page;
      params.limit = 6;

      if (filters.city) params.city = filters.city;
      if (filters.property_type)
        params.property_type = filters.property_type;
      if (filters.bedrooms)
        params.bedrooms = filters.bedrooms;
      if (filters.minPrice)
        params.minPrice = filters.minPrice;
      if (filters.maxPrice)
        params.maxPrice = filters.maxPrice;
      if (filters.sort)
        params.sort = filters.sort;

      const res = await API.get(
        "/properties/search/filter",
        {
          params,
        }
      );

      setProperties(res.data.properties);

      setPagination({
  totalPages: res.data.pagination.totalPages,
  hasNextPage: res.data.pagination.hasNextPage,
  hasPreviousPage: res.data.pagination.hasPreviousPage,
});

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-10">

      <h1 className="text-4xl font-bold mb-8">
        All Properties
      </h1>

      <PropertyFilters
        filters={filters}
        setFilters={setFilters}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {properties.map((property) => (
            <PropertyCard
            key={property.id}
            property={property}
            />
            ))}

    <div className="flex justify-center items-center gap-4 mt-10">

  <button
    onClick={() => setPage((prev) => prev - 1)}
    disabled={!pagination.hasPreviousPage}
    className={`px-5 py-2 rounded-lg ${
      pagination.hasPreviousPage
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
  >
    Previous
  </button>

  <span className="font-semibold">
    Page {page} of {pagination.totalPages}
  </span>

  <button
    onClick={() => setPage((prev) => prev + 1)}
    disabled={!pagination.hasNextPage}
    className={`px-5 py-2 rounded-lg ${
      pagination.hasNextPage
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
  >
    Next
  </button>

</div>
    
    </div>
    
    </div>
  );
}