"use client";

import { useState } from "react";

const cities = [
  "Chennai",
  "Bengaluru",
  "Hyderabad",
  "Mumbai",
  "Pune",
  "Delhi",
  "Noida",
  "Gurgaon",
  "Coimbatore",
  "Ooty",
  "Madurai",
  "Pondicherry",
  "Kolkata",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Ahmedabad",
  "Surat",
  "Nagpur",
  "Indore",
  "Bhopal",
  "Visakhapatnam",
  "Thiruvananthapuram",
  "Kochi",
  "Mysore",
  "Vijayawada",
  "Goa",
];

export default function CityDropdown({ onCityChange }) {
    
  const [selectedCity, setSelectedCity] = useState("Chennai");
  const [open, setOpen] = useState(false);

  return (
    <div className="relative h-full border-r">

      {/* Selected City */}

      <button
        onClick={() => setOpen(!open)}
        className="w-full h-full px-5 py-5 flex items-center justify-between bg-white hover:bg-gray-50"
      >
        <span>{selectedCity}</span>

        <span className="text-gray-500">▼</span>
      </button>

      {/* Dropdown */}

      {open && (
  <div
  className="
absolute
left-0
top-full
w-full
bg-white
border
border-gray-200
rounded-b-2xl
shadow-2xl
max-h-80
overflow-y-auto
z-50
"
  >
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => {
                setSelectedCity(city);
                if (onCityChange) {
                    onCityChange(city);
                }
                setOpen(false);
            }}
              className={`w-full text-left px-4 py-3 hover:bg-gray-100 ${
                selectedCity === city ? "bg-gray-200" : ""
              }`}
            >
              {city}
            </button>
          ))}

        </div>
      )}

    </div>
  );
}