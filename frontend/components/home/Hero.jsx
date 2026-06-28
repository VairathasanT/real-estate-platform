import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="pt-10 pb-20">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center bg-gradient-to-r from-slate-50 via-blue-50 to-white rounded-[40px] p-12 shadow-2xl overflow-hidden">

          {/* Left Side */}
          <div>

            <span className="inline-flex items-center bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold">
              🏆 India's Trusted Real Estate Platform
            </span>

            <h1 className="mt-8 text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
              Find Your Perfect
              <br />
              <span className="text-blue-600">
                Dream Home Today
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              Discover verified apartments, villas, independent houses,
              plots and commercial properties across India with trusted
              listings and transparent pricing.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">

              <Link href="/properties">
                <Button size="lg">
                  Browse Properties
                </Button>
              </Link>

              <Link href="/register">
                <Button variant="secondary" size="lg">
                  Register
                </Button>
              </Link>

            </div>

            {/* Statistics */}
            <div className="mt-12 flex gap-10">

              <div>
                <h3 className="text-3xl font-bold text-blue-600">
                  5K+
                </h3>
                <p className="text-gray-500">
                  Properties
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-blue-600">
                  2K+
                </h3>
                <p className="text-gray-500">
                  Happy Buyers
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-blue-600">
                  150+
                </h3>
                <p className="text-gray-500">
                  Cities
                </p>
              </div>

            </div>

          </div>

          {/* Right Side */}
          <div className="relative">

            <img
              src="/images/Modern-villa.jpg"
              alt="Dream Home"
              className="w-full h-[540px] rounded-[32px] object-cover shadow-2xl"
            />

            <div className="absolute top-6 right-6 bg-white px-4 py-2 rounded-full shadow-lg text-green-600 font-semibold">
              ✔ Verified Listings
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}