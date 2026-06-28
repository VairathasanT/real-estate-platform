export default function PropertyCategories() {
  const categories = [
    {
      icon: "🏠",
      title: "House",
      description: "Independent Houses",
    },
    {
      icon: "🏢",
      title: "Apartment",
      description: "Modern Apartments",
    },
    {
      icon: "🏡",
      title: "Villa",
      description: "Luxury Villas",
    },
    {
      icon: "🌳",
      title: "Plot",
      description: "Residential Lands",
    },
    {
      icon: "🏬",
      title: "Commercial",
      description: "Office & Shops",
    },
    {
      icon: "🏗️",
      title: "New Projects",
      description: "Upcoming Projects",
    },
  ];

  return (
    <section className="py-20">

      <h2 className="text-4xl font-bold text-center">
        Browse by Category
      </h2>

      <p className="text-center text-gray-500 mt-3">
        Find the perfect property category
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">

        {categories.map((item) => (

          <div
            key={item.title}
            className="bg-white rounded-2xl border shadow-sm p-8 text-center hover:shadow-xl hover:-translate-y-2 transition"
          >

            <div className="text-5xl">
              {item.icon}
            </div>

            <h3 className="mt-5 text-xl font-bold">
              {item.title}
            </h3>

            <p className="text-gray-500 mt-2 text-sm">
              {item.description}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}