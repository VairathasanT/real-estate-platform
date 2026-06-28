import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

/**
 * Hero Component - Main landing section with call-to-action
 * Features: Gradient background, statistics, trust badge, responsive layout
 * Design: Blue gradient with white text and yellow accents
 */
export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 pt-12 pb-32 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div className="text-white">
            <span className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30 mb-6">
              🏆 India's Most Trusted Real Estate Platform
            </span>

            <h1 className="mt-6 text-5xl lg:text-7xl font-black leading-tight">
              Find Your Perfect
              <br />
              <span className="bg-gradient-to-r from-yellow-200 to-amber-100 bg-clip-text text-transparent">
                Dream Home Today
              </span>
            </h1>

            <p className="mt-6 text-lg text-blue-100 leading-8 max-w-lg">
              Discover verified apartments, villas, independent houses, plots and commercial properties across India with trusted listings and transparent pricing.
            </p>

            {/* Statistics */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <h3 className="text-4xl font-black text-yellow-300">5K+</h3>
                <p className="text-blue-100 mt-2">Properties</p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-yellow-300">2K+</h3>
                <p className="text-blue-100 mt-2">Happy Buyers</p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-yellow-300">150+</h3>
                <p className="text-blue-100 mt-2">Cities</p>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative hidden lg:block">
            <div className="relative">
              <img
                src="/images/Modern-villa.jpg"
                alt="Dream Home"
                className="w-full h-[540px] rounded-[32px] object-cover shadow-2xl ring-4 ring-white/20"
              />

              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg text-emerald-600 font-semibold ring-1 ring-white/20">
                ✔ Verified Listings
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white px-6 py-4 rounded-2xl shadow-xl max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">⭐</div>
                  <div>
                    <p className="font-bold text-gray-900">4.9/5 Rating</p>
                    <p className="text-sm text-gray-600">From 2K+ Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}