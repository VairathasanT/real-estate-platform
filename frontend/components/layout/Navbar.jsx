"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const router = useRouter();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // alert("Logged out successfully!");
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold text-blue-600 tracking-tight"
        >
          RealEstate
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8 text-gray-700 font-medium">

          <Link
            href="/"
            className="hover:text-blue-600 transition-colors"
          >
            Home
          </Link>

          <Link
            href="/properties"
            className="hover:text-blue-600 transition-colors"
          >
            Properties
          </Link>

          <Link
            href="/my-properties"
            className="hover:text-blue-600 transition-colors"
          >
            My Properties
          </Link>

          {user ? (
            <>
              <Link
                href="/properties/create"
                className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                + Post Property
              </Link>

              <span className="text-gray-700 font-semibold">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-3 rounded-xl hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-blue-600 transition-colors"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}