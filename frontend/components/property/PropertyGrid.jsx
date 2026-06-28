import PropertyCard from "./PropertyCard";

export default function PropertyGrid({ properties }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
        />
      ))}
    </div>
  );
}