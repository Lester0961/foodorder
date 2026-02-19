import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-lutong-red/5 via-lutong-beige/20 to-transparent border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 text-center md:text-left">
          {/* Brand & Tagline */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 bg-lutong-red rounded-full flex items-center justify-center text-white text-2xl font-bold">
                LP
              </div>
              <span className="text-2xl font-bold text-lutong-red">Lutong Pinoy</span>
            </Link>
            <p className="text-gray-600 leading-relaxed">
              Sarap na lutong bahay, delivered fresh to your door in Parañaque City and nearby areas.
            </p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Lutong Pinoy. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Quick Links</h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link to="/" className="hover:text-lutong-red transition">Home</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-lutong-red transition">Menu</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-lutong-red transition">Cart</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-lutong-red transition">About Us</Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-lutong-red transition">FAQs</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-lutong-red transition">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h3>
              <div className="space-y-3 text-gray-600">
                <p className="flex items-center gap-3">
                  <span className="text-xl">📍</span> Parañaque City, Metro Manila
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-xl">📞</span> (02) 8-123-4567
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-xl">✉️</span> hello@lutongpinoy.ph
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}