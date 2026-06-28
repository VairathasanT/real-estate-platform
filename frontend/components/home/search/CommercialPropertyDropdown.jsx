"use client";

import { useState } from "react";

const propertyTypes = [
  "Office",
  "Shop",
  "Showroom",
  "Warehouse",
  "Industrial Building",
  "Industrial Shed",
  "Co-working Space",
  "Commercial Land",
  "Restaurant/Cafe",
];

export default function CommercialPropertyDropdown() {
  const [selected, setSelected] = useState("Property Type");
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="w-full border rounded-xl px-4 py-3 bg-white flex items-center justify-between"
      >
        <span>{selected}</span>

        <span>▼</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-xl shadow-xl z-50 max-h-72 overflow-y-auto">

          {propertyTypes.map((item) => (
            <button
              key={item}
              onClick={() => {
                setSelected(item);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 hover:bg-gray-100 ${
                selected === item ? "bg-blue-50 text-blue-600 font-semibold" : ""
              }`}
            >
              {item}
            </button>
          ))}

        </div>
      )}

    </div>
  );
}