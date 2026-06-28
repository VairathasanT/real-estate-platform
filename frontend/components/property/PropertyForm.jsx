"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";
import { useRouter } from "next/navigation";

export default function PropertyForm({ propertyId }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    bedrooms: "",
    sqft: "",
    property_type: "Apartment",
    image_url: "",
  });

  useEffect(() => {
  if (propertyId) {
    fetchProperty();
  }
}, [propertyId]);

const fetchProperty = async () => {
  try {
    const res = await API.get(`/properties/${propertyId}`);

    setForm({
      title: res.data.property.title || "",
      description: res.data.property.description || "",
      price: res.data.property.price || "",
      city: res.data.property.city || "",
      bedrooms: res.data.property.bedrooms || "",
      sqft: res.data.property.sqft || "",
      property_type: res.data.property.property_type || "Apartment",
      image_url: res.data.property.image_url || "",
    });
  } catch (err) {
    console.error(err);
    // alert("Failed to load property.");
  }
};

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
  return alert("Title is required.");
}

if (!form.description.trim()) {
  return alert("Description is required.");
}

if (!form.city.trim()) {
  return alert("City is required.");
}

if (Number(form.price) <= 0) {
  return alert("Price must be greater than 0.");
}

if (Number(form.bedrooms) < 0) {
  return alert("Bedrooms cannot be negative.");
}

if (Number(form.sqft) <= 0) {
  return alert("Area must be greater than 0.");
}

    try {
      setLoading(true);

      if (propertyId) {
  await API.put(`/properties/${propertyId}`, form);

//   alert("Property Updated Successfully!");
  router.push("/my-properties");

} else {
  await API.post("/properties", form);

//   alert("Property Created Successfully!");
  router.push("/properties");
}


    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
        (propertyId
            ? "Failed to update property."
            : "Failed to create property.")
        );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 border rounded-xl p-8"
    >
      <div>
        <label className="block mb-2">Title</label>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-2">Description</label>

        <textarea
          name="description"
          rows={5}
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-2">Price</label>

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-2">City</label>

        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-2">Bedrooms</label>

        <input
          type="number"
          name="bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-2">Area (sqft)</label>

        <input
          type="number"
          name="sqft"
          value={form.sqft}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-2">Property Type</label>

        <select
          name="property_type"
          value={form.property_type}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option>Apartment</option>
          <option>Villa</option>
          <option>House</option>
          <option>Land</option>
        </select>
      </div>

      <div>
        <label className="block mb-2">Image URL</label>

        <input
          type="text"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
      >
        {
  loading
    ? propertyId
      ? "Updating..."
      : "Creating..."
    : propertyId
      ? "Update Property"
      : "Create Property"
}
      </button>
    </form>
  );
}