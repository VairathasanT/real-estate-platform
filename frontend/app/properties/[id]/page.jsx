"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import API from "@/services/api";

import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyDescription from "@/components/property/PropertyDescription";
import PropertySidebar from "@/components/property/PropertySidebar";
import PropertyOverview from "@/components/property/PropertyOverview";
import PropertyInfoRow from "@/components/property/PropertyInfoRow";
import PropertyTabs from "@/components/property/PropertyTabs";
import PropertyHighlights from "@/components/property/PropertyHighlights";

export default function PropertyDetailsPage() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      const res = await API.get(`/properties/${id}`);

      setProperty(res.data.property);

    //   fetchSimilarProperties();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSimilarProperties = async () => {
    try {
      const res = await API.get(`/properties/${id}/similar`);

      setSimilarProperties(res.data.properties || []);
    } catch (error) {
      console.error("Similar Properties Error:", error);
    }
  };

  if (!property) {
    return (
      <div className="py-10 text-center">
        <h2 className="text-2xl font-semibold">
          Loading Property...
        </h2>
      </div>
    );
  }

 return (
    <div className="max-w-7xl mx-auto py-10 px-4">

      {/* Gallery + Inquiry */}
      <div className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2">

          <PropertyGallery property={property} />
        
        </div>

        <div>

          <PropertySidebar property={property} />
          
        </div>

      </div>


{/* Navigation Tabs */}
<PropertyTabs />

{/* Property Details */}
<div className="grid lg:grid-cols-3 gap-8 mt-10">

  <div
    id="overview"
    className="lg:col-span-2"
  >

    <PropertyOverview property={property} />

    <PropertyInfoRow property={property} />

    <PropertyDescription property={property} />

    <PropertyHighlights property={property} />

  </div>

  <div></div>

</div>


      {/* Similar Properties */}
      <div className="mt-16">

        <h2 className="text-3xl font-bold mb-8">
          Similar Properties
        </h2>

        {similarProperties.length === 0 ? (

          <p className="text-gray-500">
            No similar properties found.
          </p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {similarProperties.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-xl transition"
              >

                <img
                  src={
                    item.image_url &&
                    !item.image_url.includes("example.com")
                      ? item.image_url
                      : "/images/house-placeholder1.jpg"
                  }
                  alt={item.title}
                  className="w-full h-52 object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/images/house-placeholder1.jpg";
                  }}
                />

                <div className="p-5">

                  <h3 className="text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    📍 {item.city}
                  </p>

                  <p className="text-blue-600 text-xl font-bold mt-4">
                    ₹ {Number(item.price).toLocaleString()}
                  </p>

                  <Link
                    href={`/properties/${item.id}`}
                    className="block mt-5 text-center bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>

                </div>

              </div>
 
            ))}

          </div>

        )}

      </div>

    </div>
  );
}