"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";
import Link from "next/link";

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const res = await API.get("/properties/my");
      setProperties(res.data.properties || []);
    } catch (err) {
      console.error(err);
    //   alert(
    //     err.response?.data?.message ||
    //       "Failed to load properties."
    //   );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
    //   "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/properties/${id}`);

    //    console.log("Property deleted successfully!");

      fetchMyProperties();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to delete property."
      );
    }
  };

  if (loading) {
    return (
      <h2 className="text-center text-2xl font-semibold py-20">
        Loading Properties...
      </h2>
    );
  }

  if (properties.length === 0) {
    return (
      <h2 className="text-center text-2xl font-semibold py-20">
        No properties found.
      </h2>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

      {properties.map((property, index) => {

        const isLand =
          property.property_type === "Land" ||
          property.property_type === "Plot";

        const rating = [4.9, 4.8, 4.7, 4.6, 4.5][index % 5];

        return (

          <div
            key={property.id}
            className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >

            {/* Image */}
            <div className="relative">

              <img
                src={
                  property.image_url &&
                  !property.image_url.includes("example.com")
                    ? property.image_url
                    : "/images/house-placeholder1.jpg"
                }
                alt={property.title}
                className="w-full h-60 object-cover"
              />

              {/* Rating */}
              <div className="absolute top-4 right-4 bg-white px-3 py-2 rounded-xl shadow font-semibold">
                ⭐ {rating}
              </div>

              {/* For Sale */}
              <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                For Sale
              </div>

              {/* Verified */}
              <div className="absolute bottom-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                ✓ Verified
              </div>

            </div>

            {/* Content */}
            <div className="p-6">

              <p className="text-gray-500 text-sm flex items-center gap-2">
                📍 {property.city}
              </p>

              <h2 className="text-2xl font-bold mt-2">
                {property.title}
              </h2>

              <div className="flex items-center gap-5 mt-4 text-gray-600">

                {!isLand ? (
                  <span>🛏 {property.bedrooms} BHK</span>
                ) : (
                  <span>🌳 Plot Area</span>
                )}

                <span>📐 {property.sqft} sq.ft</span>

              </div>

              <div className="flex items-center justify-between mt-6">

                <h3 className="text-3xl font-bold text-blue-600">
                  ₹ {Number(property.price).toLocaleString("en-IN")}
                </h3>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Ready to Move
                </span>

              </div>

              <p className="text-gray-400 text-sm mt-4">
                Posted on{" "}
                {new Date(property.created_at).toLocaleDateString()}
              </p>

              <div className="grid grid-cols-3 gap-3 mt-6">

                <Link
                  href={`/properties/${property.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-semibold transition"
                >
                  View
                </Link>

                <Link
                  href={`/properties/edit/${property.id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white text-center py-3 rounded-xl font-semibold transition"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(property.id)}
                  className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        );
      })}
    </div>
  );
}