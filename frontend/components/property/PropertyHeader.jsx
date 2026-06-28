import PropertyBadge from "./PropertyBadge";

export default function PropertyHeader({ property }) {
  const image =
    property.image_url && !property.image_url.includes("example.com")
      ? property.image_url
      : "/images/house-placeholder1.jpg";

  return (
   <section className="bg-white rounded-[32px] shadow-lg overflow-hidden">

  <div className="relative">

    <img
      src={image}
      alt={property.title}
      className="w-full h-[600px] object-cover"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

    <div className="absolute top-6 left-6">
      <PropertyBadge
        text={property.property_type}
        color="blue"
      />
    </div>

  </div>

</section>
  );
}