"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import PropertyGrid from "@/components/property/PropertyGrid";
import API from "@/services/api";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
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
    }
  };

  return (
    <section className="py-20">
      <Container>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Featured Properties
          </h2>

          <p className="text-gray-500 mt-4">
            Discover the latest verified properties.
          </p>
        </div>

        <PropertyGrid properties={properties} />

      </Container>
    </section>
  );
}