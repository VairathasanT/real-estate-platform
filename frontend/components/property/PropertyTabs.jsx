export default function PropertyTabs() {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "description", label: "Description" },
    { id: "amenities", label: "Amenities" },
    { id: "location", label: "Location" },
    { id: "similar", label: "Similar Properties" },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="sticky top-20 z-20 bg-white rounded-2xl border shadow-sm mt-8">

      <div className="flex flex-wrap">

        {tabs.map((tab) => (

          <button
            key={tab.id}
            onClick={() => scrollToSection(tab.id)}
            className="px-6 py-4 font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition"
          >
            {tab.label}
          </button>

        ))}

      </div>

    </div>
  );
}