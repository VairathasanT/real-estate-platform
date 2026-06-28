"use client";

import { useState } from "react";

export default function PropertySearchHero({ filters, setFilters }) {
  const [activeTab, setActiveTab] = useState("buy");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setFilters({
        ...filters,
        city: searchQuery,
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Find Your Perfect Property
          </h1>
          <p className="mt-2 text-slate-600">
            Browse thousands of properties in your preferred location
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 flex gap-2 border-b border-slate-200">
          {[
            { id: "buy", label: "Buy" },
            { id: "rent", label: "Rent" },
            { id: "commercial", label: "Commercial" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-lg font-semibold transition ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="rounded-[20px] bg-white p-4 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.3)] sm:p-6">
          <form onSubmit={handleSearch} className="flex flex-col gap-4 lg:flex-row lg:items-end">
            {/* City Dropdown */}
            <div className="flex-shrink-0">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Location
              </label>
              <select
                name="city"
                value={filters.city}
                onChange={(e) =>
                  setFilters({ ...filters, city: e.target.value })
                }
                className="min-w-[160px] rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select City</option>
                <option value="Chennai">Chennai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Search locality, landmark or project..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-8 py-2.5 font-semibold text-white shadow-lg transition hover:bg-blue-700 active:scale-95 lg:w-auto"
            >
              Search
            </button>
          </form>

          {/* Filter Options Row */}
          <div className="mt-6 flex flex-wrap gap-4 border-t border-slate-200 pt-4">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="full-house"
                name="property-type-radio"
                value="house"
                defaultChecked
                className="h-4 w-4 cursor-pointer accent-blue-600"
              />
              <label htmlFor="full-house" className="cursor-pointer text-sm font-medium text-slate-700">
                Full House
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="land"
                name="property-type-radio"
                value="land"
                className="h-4 w-4 cursor-pointer accent-blue-600"
              />
              <label htmlFor="land" className="cursor-pointer text-sm font-medium text-slate-700">
                Land / Plot
              </label>
            </div>

            <select className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500">
              <option>BHK Type</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
            </select>

            <select className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500">
              <option>Property Status</option>
              <option>Ready to Move</option>
              <option>Under Construction</option>
              <option>New Launch</option>
            </select>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="new-builder"
                className="h-4 w-4 cursor-pointer accent-blue-600"
              />
              <label htmlFor="new-builder" className="cursor-pointer text-sm font-medium text-slate-700">
                New Builder Projects
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
