import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

import { products } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const product = products.find((p) => p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [addons, setAddons] = useState({
    extraRice: false,
    sideBagoong: false,
    extraSauce: false,
    extraEgg: false,
  });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-5">
        <div className="text-center max-w-md">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Product Not Found</h2>
          <button
            onClick={() => navigate('/menu')}
            className="bg-lutong-red text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-red-800 transition shadow-md"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const addonOptions = [
    { key: 'extraRice', label: 'Extra Rice', price: 50 },
    { key: 'sideBagoong', label: 'Side Bagoong Alamang', price: 30 },
    { key: 'extraSauce', label: 'Extra Sauce', price: 25 },
    { key: 'extraEgg', label: 'Extra Fried Egg', price: 20 },
  ];

  const addonsTotal = addonOptions.reduce(
    (sum, opt) => sum + (addons[opt.key] ? opt.price : 0),
    0
  );

  const totalPrice = product.price * quantity + addonsTotal;

  const handleAddonChange = (key) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddToCart = () => {
    const selectedAddons = addonOptions
      .filter((opt) => addons[opt.key])
      .map((opt) => opt.label);

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...product,
        quantity,
        addons: selectedAddons,
        addonsPrice: addonsTotal,
      },
    });

    alert(`${quantity} × ${product.name} added to cart!`); 
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.7;
      setIsScrolledPast(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-lutong-beige/30 to-white pb-24 md:pb-16">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-5 pt-6">
        <button
          onClick={() => navigate('/menu')}
          className="flex items-center gap-2 text-lutong-red hover:text-red-800 font-medium transition"
        >
          ← Back to Menu
        </button>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-5 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image – full width on mobile, left side on desktop */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover aspect-[4/3] md:aspect-square"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              {product.name}
            </h1>

            <div className="text-4xl md:text-5xl font-extrabold text-lutong-red mb-6">
              ₱{product.price.toLocaleString()}
              <span className="text-xl md:text-2xl text-gray-500 font-normal ml-2">
                each
              </span>
            </div>

            <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-10">
              {product.fullDesc || product.shortDesc}
            </p>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-xl font-semibold text-gray-800 mb-4">
                Quantity
              </label>
              <div className="inline-flex items-center border-2 border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm">
                <button
                  onClick={decrement}
                  disabled={quantity <= 1}
                  className="px-6 py-4 text-3xl font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  −
                </button>
                <div className="px-10 py-4 text-3xl font-bold min-w-[100px] text-center border-x border-gray-300">
                  {quantity}
                </div>
                <button
                  onClick={increment}
                  className="px-6 py-4 text-3xl font-bold text-gray-700 hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add-ons */}
            <div className="mb-10">
              <label className="block text-xl font-semibold text-gray-800 mb-4">
                Customize your order
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addonOptions.map((opt) => (
                  <label
                    key={opt.key}
                    className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                      addons[opt.key]
                        ? 'border-lutong-red bg-lutong-red/5'
                        : 'border-gray-200 hover:border-lutong-red/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={addons[opt.key]}
                      onChange={() => handleAddonChange(opt.key)}
                      className="h-6 w-6 text-lutong-red focus:ring-lutong-red border-gray-300 rounded"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{opt.label}</div>
                      <div className="text-sm text-gray-600">+₱{opt.price}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Desktop Add to Cart button (hidden on mobile) */}
            <button
              onClick={handleAddToCart}
              className="hidden md:block w-full bg-lutong-red hover:bg-red-800 text-white font-bold text-xl py-5 rounded-xl transition shadow-lg"
            >
              Add to Cart — ₱{totalPrice.toLocaleString()}
            </button>
          </div>
        </div>
      </div>

      {/* Sticky mobile bottom bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl transition-transform duration-300 md:hidden ${
          isScrolledPast ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-lutong-red">
            ₱{totalPrice.toLocaleString()}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-lutong-red hover:bg-red-800 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg transition flex-1 max-w-xs"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}