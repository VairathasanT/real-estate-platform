"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CityDropdown from "./search/CityDropdown";
import BhkDropdown from "./search/BhkDropdown";
import PropertyStatusDropdown from "./search/PropertyStatusDropdown";
import CommercialPropertyDropdown from "./search/CommercialPropertyDropdown";

export default function SearchBar() {
  const router = useRouter();

  const [tab] = useState("Buy");


  const [selectedCity, setSelectedCity] = useState("Chennai");
  const [propertyType, setPropertyType] = useState("House");
  const [bedrooms, setBedrooms] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");


  const handleSearch = () => {
    const params = new URLSearchParams();

    if (selectedCity) {
      params.append("city", selectedCity);
    }

    if (propertyType) {
      params.append("property_type", propertyType);
    }

    if (bedrooms) {
      params.append("bedrooms", bedrooms);
    }

    if (minPrice) {
  params.append("minPrice", minPrice);
}

if (maxPrice) {
  params.append("maxPrice", maxPrice);
}

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="max-w-6xl mx-auto -mt-14 relative z-30 px-4">
      <div className="relative bg-white rounded-3xl shadow-2xl overflow-visible border border-gray-200">

        {/* Top Tabs */}

        <div className="flex justify-center border-b bg-gray-50">
          {["Buy", "Rent", "Commercial"].map((item) => {
            const disabled = item !== "Buy";

            return (
              <button
                key={item}
                disabled={disabled}
                className={`px-10 py-4 text-lg font-semibold transition ${
                  tab === item
                    ? "text-blue-600 border-b-4 border-blue-600 bg-white"
                    : disabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {item}
                {disabled && (
                  <span className="ml-2 text-xs">(Soon)</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search Row */}

        <div className="grid grid-cols-[220px_1fr_220px] border-b">
          <CityDropdown onCityChange={setSelectedCity} />

          <input
            type="text"
            placeholder="Search locality, landmark or project..."
            className="px-6 py-5 outline-none border-r"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white text-3xl font-semibold transition"
          >
            Search
          </button>
        </div>

        {/* Bottom Filters */}

        <div className="p-5 border-t bg-gray-50">

          {/* BUY */}

          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="buyType"
                checked={propertyType === "House"}
                onChange={() => setPropertyType("House")}
              />
              Full House
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="buyType"
                checked={propertyType === "Land"}
                onChange={() => setPropertyType("Land")}
              />
              Land / Plot
            </label>

            <BhkDropdown
              onBhkChange={setBedrooms}
            />


            <input
            type="number"
            placeholder="Min Budget"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border rounded-xl px-4 py-3"
            />
            
            <input
            type="number"
            placeholder="Max Budget"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border rounded-xl px-4 py-3"
            />

            <PropertyStatusDropdown />

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              New Builder Projects
            </label>

          </div>

        </div>

      </div>
    </section>
  );
}