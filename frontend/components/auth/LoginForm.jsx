"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/services/api";
import { useAuth } from "@/context/AuthContext";


export default function LoginForm() {
  const router = useRouter();

  const { login } = useAuth();

  
  const [form, setForm] = useState({
    email: "",
    password: "",
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

      const res = await API.post("/auth/login", form);

      console.log("Login Response:", res.data);

      localStorage.setItem(
        "accessToken",
        res.data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        res.data.refreshToken
      );

      localStorage.setItem(
        "userName",
        res.data.user.name
      );

      localStorage.setItem(
        "userEmail",
        res.data.user.email
      );

      login({
        name: res.data.user.name,
        email: res.data.user.email,
    });

    //  alert("Login Successful!");

      router.push("/");

      //router.push("/");
    } catch (err) {
      console.log(err.response);

      alert(
        err.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 border rounded-xl p-8">

      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div>
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  );
}