import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import AuthModal from '../components/AuthModal';
import { useState } from 'react';

export default function Cart() {
  const { cart, specialInstructions, setSpecialInstructions, dispatch } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price + (item.addonsPrice || 0)) * item.quantity,
    0
  );
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch({ type: 'CLEAR_CART' });
    }
  };

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-lutong-beige/20 to-white py-20 px-5">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Your cart is empty
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-10">
            Add some sarap na lutong bahay before checking out!
          </p>
          <Link
            to="/menu"
            className="inline-block bg-lutong-red hover:bg-red-800 text-white font-bold text-xl px-10 py-5 rounded-xl shadow-lg transition"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-lutong-beige/20 to-white py-12 md:py-16 px-5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 md:mb-12 text-lutong-red">
          Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-5 md:p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <CartItem item={item} />
                </div>
              ))}
            </div>

            {/* Special Instructions */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-100">
              <label className="block text-xl font-semibold text-gray-800 mb-4">
                Special Instructions for the kitchen
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. No MSG please, leave at gate, call 10 mins before arrival..."
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lutong-red focus:border-transparent min-h-[120px] resize-y text-gray-700"
                rows={4}
                maxLength={300}
              />
              <div className="mt-2 flex justify-between text-sm text-gray-500">
                <span>{specialInstructions.length}/300 characters</span>
                <span className="italic">Optional – for kitchen notes only</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-800 font-medium text-lg transition flex items-center gap-2"
              >
                <span className="text-xl">🗑</span> Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary – sticky on desktop */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 sticky top-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-b pb-4">
                Order Summary
              </h2>

              <div className="space-y-5 mb-8 text-lg">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cart.length} item{cart.length !== 1 ? 's' : ''})</span>
                  <span className="font-medium">₱{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Fee</span>
                  <span className="font-medium">₱{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="border-t pt-5 mt-5 flex justify-between text-2xl md:text-3xl font-bold">
                  <span>Total</span>
                  <span className="text-lutong-red">₱{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-lutong-red hover:bg-red-800 text-white font-bold text-xl py-5 rounded-xl transition shadow-lg"
              >
                Proceed to Checkout
              </button>

              <p className="text-center text-sm text-gray-500 mt-6">
                Delivering to Parañaque City and nearby areas • Free delivery over ₱500
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <AuthModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        initialMode="login"
      />
    </div>
  );
}