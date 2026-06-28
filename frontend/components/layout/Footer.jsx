import Link from "next/link";

/**
 * Footer Component - Global footer section for all pages
 * Features: 4-column grid, quick links, company info, social links
 * Included in MainLayout - appears on all pages
 * Design: Dark slate background with blue link hover effects
 */
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black mb-3 text-blue-400">RealEstate</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              India's most trusted real estate platform connecting buyers, sellers, and investors with their dream properties.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-400 hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-slate-400 hover:text-blue-400 transition">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link href="/properties/create" className="text-slate-400 hover:text-blue-400 transition">
                  List Property
                </Link>
              </li>
              <li>
                <Link href="/my-properties" className="text-slate-400 hover:text-blue-400 transition">
                  My Properties
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm mb-4 md:mb-0">
              © 2026 Real Estate Platform. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition">
                <span className="text-xl">f</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition">
                <span className="text-xl">𝕏</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition">
                <span className="text-xl">in</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition">
                <span className="text-xl">📷</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}