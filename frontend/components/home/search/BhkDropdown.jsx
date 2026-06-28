"use client";

import { useState } from "react";

const bhkOptions = [
  "1 RK",
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "4+ BHK",
];

export default function BhkDropdown({ onBhkChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("BHK Type");

  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full border rounded-xl px-4 py-3 bg-white flex items-center justify-between hover:border-blue-500 transition"
      >
        <span>{selected}</span>
        <span className={`transition ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-full bg-white border rounded-xl shadow-xl z-50 overflow-hidden">
          {bhkOptions.map((item) => (
            <button
              key={item}
              onClick={() => {
                setSelected(item);
                const bhk = parseInt(item);
                if (onBhkChange) {
                    onBhkChange(bhk);
                }
                setOpen(false);
            }}
             
              className={`w-full text-left px-4 py-3 hover:bg-blue-50 ${
                selected === item ? "bg-blue-100 text-blue-600 font-semibold" : ""
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