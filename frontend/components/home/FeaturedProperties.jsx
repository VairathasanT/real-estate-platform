"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import PropertyGrid from "@/components/property/PropertyGrid";
import API from "@/services/api";

/**
 * FeaturedProperties Component - Showcase premium properties on home page
 * Features: Top 3 properties, ratings, verification badges, CTA button
 * Data: Fetches from API and enriches with ratings and verification status
 */
export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true);
      const res = await API.get("/properties");

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
    } catch (error) {
      console.error("Featured Properties Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ⭐ Premium Selection
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Featured Properties
          </h2>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Handpicked premium properties from our verified sellers. Discover your next investment opportunity with confidence.
          </p>
        </div>

        {/* Properties Grid */}
        <PropertyGrid properties={properties} />

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