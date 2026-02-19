import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function OrderSuccess() {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length > 0) {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [cart.length, dispatch]);

  const orderNumber = `LP-${Math.floor(100000 + Math.random() * 900000)}`;
  const estimatedTime = '30–60 minutes'; 

  if (cart.length === 0 && !localStorage.getItem('lastOrderSummary')) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-lutong-beige/40 via-white to-white py-16 md:py-24 px-5">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero / Celebration */}
        <div className="mb-12 md:mb-16">
          <div className="text-8xl md:text-10xl mb-6 animate-bounce-slow">🎉</div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-lutong-red mb-4">
            Thank You!
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 font-medium mb-3">
            Your order has been placed successfully
          </p>
          <p className="text-lg text-gray-600">
            Order <span className="font-bold text-lutong-red">#{orderNumber}</span>
          </p>
        </div>

        {/* Estimated Delivery */}
        <div className="mb-10 md:mb-14">
          <p className="text-xl md:text-2xl text-gray-700 font-semibold">
            Estimated delivery time: <span className="text-lutong-red">{estimatedTime}</span>
          </p>
          <p className="text-base md:text-lg text-gray-600 mt-2">
            (Parañaque City and nearby areas)
          </p>
        </div>

        {/* Order Summary Card */}
        {cart.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10 mb-12 md:mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
              Order Summary
            </h2>

            <div className="space-y-5 text-left text-lg">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {item.name} × {item.quantity}
                    </p>
                    {item.addons?.length > 0 && (
                      <p className="text-sm text-gray-600 mt-1">
                        + {item.addons.join(', ')}
                      </p>
                    )}
                  </div>
                  <p className="font-semibold text-lutong-red min-w-[120px] text-right">
                    ₱{((item.price + (item.addonsPrice || 0)) * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 space-y-4 text-xl">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>₱{cart.reduce((sum, i) => sum + (i.price + (i.addonsPrice || 0)) * i.quantity, 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Delivery Fee</span>
                <span>₱50</span>
              </div>
              <div className="flex justify-between text-2xl md:text-3xl font-bold pt-4 border-t border-gray-200">
                <span>Total</span>
                <span className="text-lutong-red">
                  ₱{cart.reduce((sum, i) => sum + (i.price + (i.addonsPrice || 0)) * i.quantity + 50, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Reassurance & CTAs */}
        <div className="space-y-8 max-w-xl mx-auto">
          <p className="text-lg md:text-xl text-gray-700">
            We'll start preparing your meal right away. You'll receive a notification once it's on the way.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/menu"
              className="bg-lutong-red hover:bg-red-800 text-white font-bold text-xl px-12 py-5 rounded-xl shadow-lg transition transform hover:scale-105"
            >
              Order More Food
            </Link>
            <Link
              to="/"
              className="border-2 border-lutong-red text-lutong-red hover:bg-lutong-red hover:text-white font-bold text-xl px-12 py-5 rounded-xl transition transform hover:scale-105"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}