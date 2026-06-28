export default function PropertyHero({ property }) {
  return (
    <section className="mb-10">
      <img
        src={
          property.image_url &&
          !property.image_url.includes("example.com")
            ? property.image_url
            : "/images/house-placeholder1.jpg"
        }
        alt={property.title}
        className="w-full h-[520px] object-cover rounded-3xl shadow-xl"
      />
    </section>
  );
}