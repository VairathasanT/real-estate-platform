"use client";

import { useState } from "react";
import API from "@/services/api";

export default function InquiryForm({ propertyId }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/inquiries", {
        property_id: propertyId,
        message: form.message,
      });

    //   alert("Inquiry Sent Successfully!");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
  console.log("Status:", err.response?.status);
  console.log("Response:", err.response?.data);

  alert(err.response?.data?.message || "Failed to send inquiry.");
}
  };

  return (
    <div className="mt-12 border rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Send Inquiry
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        {/* Message */}
        <textarea
          name="message"
          rows={5}
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Inquiry"}
        </button>

      </form>
    </div>
  );
}