"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import CityDropdown from "./search/CityDropdown";
import BhkDropdown from "./search/BhkDropdown";
import PropertyStatusDropdown from "./search/PropertyStatusDropdown";

/**
 * SearchBar Component - Advanced property search interface
 * Features: Tab navigation, filters, budget range, property type, responsive layout
 * Uses useCallback for performance optimization
 */
export default function SearchBar() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Buy");
  const [selectedCity, setSelectedCity] = useState("Chennai");
  const [propertyType, setPropertyType] = useState("House");
  const [bedrooms, setBedrooms] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();

    if (selectedCity) params.append("city", selectedCity);
    if (propertyType) params.append("property_type", propertyType);
    if (bedrooms) params.append("bedrooms", bedrooms);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    router.push(`/properties?${params.toString()}`);
  }, [selectedCity, propertyType, bedrooms, minPrice, maxPrice, router]);

  return (
    <section className="max-w-7xl mx-auto -mt-16 relative z-30 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-[28px] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.4)] overflow-hidden border border-slate-100">
        
        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 bg-slate-50">
          {["Buy", "Rent", "Commercial"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              disabled={tab !== "Buy"}
              className={`flex-1 px-6 py-4 text-center font-semibold text-lg transition ${
                activeTab === tab && tab === "Buy"
                  ? "bg-white text-blue-600 border-b-2 border-blue-600"
                  : tab !== "Buy"
                  ? "text-slate-400 cursor-not-allowed"
                  : "text-slate-600 hover:text-blue-600"
              }`}
            >
              {tab}
              {tab !== "Buy" && <span className="text-xs ml-2 opacity-50">(Coming Soon)</span>}
            </button>
          ))}
        </div>

        {/* Main Search Section */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-slate-50">
          {/* Primary Search Row */}
          <div className="flex flex-col lg:flex-row gap-3 mb-6">
            {/* City Dropdown */}
            <div className="flex-shrink-0">
              <CityDropdown onCityChange={setSelectedCity} />
            </div>

            {/* Search Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search locality, landmark or project..."
                className="w-full rounded-[16px] border border-slate-300 bg-white px-5 py-3.5 text-base outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-white"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-[16px] hover:from-blue-700 hover:to-blue-800 transition shadow-lg hover:shadow-xl active:scale-95"
            >
              <span className="flex items-center gap-2">
                Search Now
              </span>
            </button>
          </div>

          {/* Filter Options Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {/* Property Type Radio */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900">
                <input
                  type="radio"
                  name="propertyType"
                  checked={propertyType === "House"}
                  onChange={() => setPropertyType("House")}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                Full House
              </label>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900">
                <input
                  type="radio"
                  name="propertyType"
                  checked={propertyType === "Land"}
                  onChange={() => setPropertyType("Land")}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                Land / Plot
              </label>
            </div>

            {/* BHK Dropdown */}
            <div>
              <BhkDropdown onBhkChange={setBedrooms} />
            </div>

            {/* Min Budget */}
            <div>
              <input
                type="number"
                placeholder="Min Budget"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full rounded-[12px] border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Max Budget */}
            <div>
              <input
                type="number"
                placeholder="Max Budget"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full rounded-[12px] border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Status Dropdown */}
            <div>
              <PropertyStatusDropdown />
            </div>

            {/* New Projects Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="newProjects"
                className="w-4 h-4 cursor-pointer accent-blue-600"
              />
              <label htmlFor="newProjects" className="cursor-pointer text-sm font-medium text-slate-700">
                New Projects
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Search Tips */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
        <div className="text-center">
          <div className="text-2xl mb-1">🏠</div>
          <p className="text-xs font-medium text-slate-600">Browse Homes</p>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-1">💰</div>
          <p className="text-xs font-medium text-slate-600">Best Deals</p>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-1">📍</div>
          <p className="text-xs font-medium text-slate-600">All Locations</p>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-1">✅</div>
          <p className="text-xs font-medium text-slate-600">Verified Only</p>
        </div>
      </div>
    </section>
  );
}