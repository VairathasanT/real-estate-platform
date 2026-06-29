"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import PropertyGrid from "@/components/property/PropertyGrid";
import API from "@/services/api";
import { mockProperties } from "@/lib/mockData";

/**
 * FeaturedProperties Component - Showcase premium properties on home page
 * Features: Top 3 properties, ratings, verification badges, CTA button
 * Data: Fetches from API and enriches with ratings and verification status
 * Fallback: Uses mock data if API is unavailable
 */
export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      try {
        const res = await API.get("/properties/search/filter", {
          params: { page: 1, limit: 3 },
        });

        if (res.data && res.data.properties && res.data.properties.length > 0) {
          const featured = res.data.properties.slice(0, 3);

          featured[0].rating = 4.9;
          featured[1].rating = 4.8;
          featured[2].rating = 4.7;

          featured.forEach((property) => {
            property.verified = true;
            property.listingType = "For Sale";
            property.status = "Ready to Move";
          });

          setProperties(featured);
          setIsUsingMockData(false);
        } else {
          throw new Error("No properties returned from API");
        }
      } catch (apiError) {
        console.warn("API Error, using mock data:", apiError.message);
        
        // Use mock data as fallback
        const featured = mockProperties.slice(0, 3);
        featured[0].rating = 4.9;
        featured[1].rating = 4.8;
        featured[2].rating = 4.7;

        featured.forEach((property) => {
          property.verified = true;
          property.listingType = "For Sale";
          property.status = "Ready to Move";
        });

        setProperties(featured);
        setIsUsingMockData(true);
      }
    } catch (error) {
      console.error("Featured Properties Error:", error);
      setError("Unable to load properties. Please try again later.");
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              ⭐ Premium Selection
            </span>
            {isUsingMockData && (
              <span className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-semibold">
                Sample Data
              </span>
            )}
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Featured Properties
          </h2>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Handpicked premium properties from our verified sellers. Discover your next investment opportunity with confidence.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-12 p-6 bg-red-50 border border-red-200 rounded-[16px] text-center">
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        )}

        {/* Properties Grid or Empty State */}
        {!error && properties.length > 0 ? (
          <PropertyGrid properties={properties} />
        ) : !error && loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading properties...</p>
          </div>
        ) : !error ? (
          <div className="text-center py-12">
            <p className="text-slate-600">No properties available at the moment.</p>
          </div>
        ) : null}

        {/* CTA Footer */}
        <div className="mt-16 text-center">
          <a
            href="/properties"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-[16px] hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
            View All Properties →
          </a>
        </div>
      </Container>
    </section>
  );
}
