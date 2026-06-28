"use client";

import { useState } from "react";

const statusList = [
  "Ready to Move",
  "Under Construction",
];

export default function PropertyStatusDropdown() {
  const [status, setStatus] = useState("Property Status");
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="w-full border rounded-xl px-4 py-3 bg-white flex items-center justify-between"
      >
        <span>{status}</span>
        <span>▼</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-xl shadow-xl z-50">

          {statusList.map((item) => (
            <button
              key={item}
              onClick={() => {
                setStatus(item);
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-3 hover:bg-gray-100"
            >
              {item}
            </button>
          ))}

        </div>
      )}

    </div>
  );
}