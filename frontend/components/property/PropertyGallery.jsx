"use client";

export default function PropertyGallery({ property }) {
  const defaultImage = "/images/house-placeholder1.jpg";

  const selectedImage =
  property.image_url || defaultImage;

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border">

      {/* Large Image */}

      <div className="relative">

        <img
          src={selectedImage}
          alt={property.title}
          className="w-full h-[520px] object-cover"
        />

        {/* Property Badge */}

        <div className="absolute top-5 left-5">

          <span className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold">

            {property.property_type}

          </span>

        </div>

        {/* Verified Badge */}

        <div className="absolute top-5 right-5">

          <span className="bg-white px-4 py-2 rounded-xl shadow font-medium">

            ✅ Verified

          </span>

        </div>

      </div>

      

      </div>

    
  )
}