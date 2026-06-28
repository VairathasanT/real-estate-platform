"use client";

import API from "@/services/api";

export default function TestPage() {
  const testAPI = async () => {
    try {
      const res = await API.get("/properties");

      console.log("✅ Success Response:", res.data);
      // alert("Connected Successfully");
    } catch (err) {
      console.error("❌ Axios Error:", err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Response Data:", err.response.data);

        alert(`API Error (${err.response.status})`);
      } else if (err.request) {
        console.log("No Response:", err.request);

        alert("No response from backend");
      } else {
        console.log("Error Message:", err.message);

        alert(err.message);
      }
    }
  };

  return (
    <div className="p-10">
      <button
        onClick={testAPI}
        className="bg-blue-600 text-white px-5 py-3 rounded"
      >
        Test Backend Connection
      </button>
    </div>
  );
}