"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import API from "@/services/api";
import Link from "next/link";
import PropertySearchHero from "@/components/property/PropertySearchHero";
import PropertyFilters from "@/components/property/PropertyFilters";
import PropertyCard from "@/components/property/PropertyCard";
import PropertyCardSkeleton from "@/components/property/PropertyCardSkeleton";


export default function PropertiesPage() {
    const searchParams = useSearchParams();
  
const [properties, setProperties] = useState([]);
const [loading, setLoading] = useState(false);

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

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      params.page = page;
      params.limit = 12;

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
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  const handlePrevious = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleNext = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  return (
    <>
      <PropertySearchHero
        filters={filters}
        setFilters={setFilters}
      />

      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main content + Sidebar */}
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar Filters - Left */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <PropertyFilters
                  filters={filters}
                  setFilters={setFilters}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="mb-6">
                <p className="text-sm font-medium text-slate-600">
                  Showing {properties.length} properties
                </p>
              </div>

              {/* Property Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                  <>
                    {Array.from({ length: 12 }).map((_, i) => (
                      <PropertyCardSkeleton key={`skeleton-${i}`} />
                    ))}
                  </>
                ) : properties.length > 0 ? (
                  properties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-slate-600">No properties found. Try adjusting your filters.</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {!loading && properties.length > 0 && (
                <div className="mt-8 flex items-center justify-center gap-3">
                  <button
                    onClick={handlePrevious}
                    disabled={!pagination.hasPreviousPage}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                      pagination.hasPreviousPage
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "cursor-not-allowed bg-slate-200 text-slate-500"
                    }`}
                  >
                    Previous
                  </button>

                  <span className="px-4 py-2 text-sm font-medium text-slate-700">
                    Page {page} of {pagination.totalPages}
                  </span>

                  <button
                    onClick={handleNext}
                    disabled={!pagination.hasNextPage}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                      pagination.hasNextPage
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "cursor-not-allowed bg-slate-200 text-slate-500"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}