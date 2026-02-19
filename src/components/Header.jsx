import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

export default function Header() {
  const { cart } = useCart();
  const { isAuthenticated, logout } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [modalMode, setModalMode] = useState('login');

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const openLogin = () => {
    setModalMode('login');
    setShowAuthModal(true);
    closeMenu();
  };

  const openRegister = () => {
    setModalMode('register');
    setShowAuthModal(true);
    closeMenu();
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-lutong-red rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-md">
                LP
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold text-lutong-red tracking-tight">
                  Lutong Pinoy
                </span>
                <span className="text-xs md:text-sm text-gray-600 -mt-1">
                  Sarap na Lutong Bahay
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10 lg:gap-12 text-lg font-medium">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'text-lutong-red font-semibold'
                    : 'text-gray-700 hover:text-lutong-red transition'
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  isActive
                    ? 'text-lutong-red font-semibold'
                    : 'text-gray-700 hover:text-lutong-red transition'
                }
              >
                Menu
              </NavLink>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? 'text-lutong-red font-semibold relative'
                    : 'text-gray-700 hover:text-lutong-red transition relative'
                }
              >
                Cart
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-lutong-red text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                    {itemCount}
                  </span>
                )}
              </NavLink>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/my-orders"
                    className="text-gray-700 hover:text-lutong-red transition"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-red-100 text-lutong-red px-6 py-2.5 rounded-xl font-semibold hover:bg-red-200 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={openLogin}
                  className="bg-lutong-red text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-red-800 transition shadow-sm"
                >
                  Login / Signup
                </button>
              )}
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-3xl text-gray-800 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-white to-lutong-beige/30 border-t border-gray-200 py-8 px-5 animate-fade-in">
            <div className="max-w-7xl mx-auto space-y-6 text-lg font-medium">
              <Link
                to="/"
                className="block py-3 hover:text-lutong-red transition"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/menu"
                className="block py-3 hover:text-lutong-red transition"
                onClick={closeMenu}
              >
                Menu
              </Link>
              <Link
                to="/cart"
                className="block py-3 hover:text-lutong-red transition flex items-center gap-3"
                onClick={closeMenu}
              >
                Cart
                {itemCount > 0 && (
                  <span className="bg-lutong-red text-white text-xs font-bold rounded-full px-2.5 py-1">
                    {itemCount}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/my-orders"
                    className="block py-3 hover:text-lutong-red transition"
                    onClick={closeMenu}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="w-full bg-red-100 text-lutong-red py-4 rounded-xl font-semibold hover:bg-red-200 transition mt-4"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={openLogin}
                  className="w-full bg-lutong-red text-white py-4 rounded-xl font-semibold hover:bg-red-800 transition mt-4"
                >
                  Login / Signup
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={modalMode}
      />
    </>
  );
}