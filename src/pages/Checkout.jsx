import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import AuthModal from '../components/AuthModal';

export default function Checkout() {
  const { cart, dispatch } = useCart();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    notes: '',
    paymentMethod: 'cod',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    phone: '',
    address: '',
  });

  const [touched, setTouched] = useState({
    fullName: false,
    phone: false,
    address: false,
  });

  const validateField = (name, value) => {
    let error = '';
    if (name === 'fullName') {
      if (!value.trim()) error = 'Full name is required';
      else if (value.trim().length < 3) error = 'Name too short';
    }
    if (name === 'phone') {
      if (!value.trim()) error = 'Phone is required';
      else if (!/^\+?\d{9,15}$/.test(value.replace(/\D/g, ''))) {
        error = 'Invalid phone number';
      }
    }
    if (name === 'address') {
      if (!value.trim()) error = 'Address is required';
      else if (value.trim().length < 10) error = 'Address too short';
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const isFormValid =
    !errors.fullName && !errors.phone && !errors.address &&
    formData.fullName.trim() && formData.phone.trim() && formData.address.trim();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-5">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Empty Cart</h2>
          <p className="text-lg text-gray-600 mb-8">Add items before checking out.</p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-lutong-red text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-red-800 transition shadow-md"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-5">
        <div className="text-center max-w-lg">
          <h2 className="text-4xl font-bold text-lutong-red mb-6">Sign In Required</h2>
          <p className="text-lg text-gray-700 mb-10">
            Please log in to complete your order and provide delivery details.
          </p>
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-lutong-red text-white font-bold text-xl px-12 py-5 rounded-xl hover:bg-red-800 transition shadow-lg"
          >
            Login / Signup
          </button>

          <AuthModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            initialMode="login"
          />
        </div>
      </div>
    );
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price + (item.addonsPrice || 0)) * item.quantity,
    0
  );
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      fullName: validateField('fullName', formData.fullName),
      phone: validateField('phone', formData.phone),
      address: validateField('address', formData.address),
    };
    setErrors(newErrors);
    setTouched({ fullName: true, phone: true, address: true });

    if (Object.values(newErrors).some(Boolean)) {
    showToast('Please correct the highlighted fields', 'error');
    return;
  }

  const newOrder = {
    id: `LP-${Math.floor(100000 + Math.random() * 900000)}`,
    date: new Date().toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    status: 'Delivered',
    items: cart,
    total,
    notes: formData.notes || '',
  };

  const existingOrders = JSON.parse(localStorage.getItem('lutongPinoyOrders') || '[]');
  const updatedOrders = [newOrder, ...existingOrders].slice(0, 10); // keep last 10
  localStorage.setItem('lutongPinoyOrders', JSON.stringify(updatedOrders));

  showToast('Order placed successfully!', 'success');
  dispatch({ type: 'CLEAR_CART' });
  navigate('/order-success');
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-lutong-beige/20 to-white py-12 md:py-16 px-5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 md:mb-12 text-lutong-red">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 pb-4 border-b border-gray-200">
                Delivery Information
              </h2>

              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                {/* Full Name */}
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none transition-all text-lg ${
                      touched.fullName && errors.fullName
                        ? 'border-red-500 focus:ring-red-500 animate-shake'
                        : 'border-gray-300 focus:border-lutong-red focus:ring-lutong-red/30'
                    }`}
                    placeholder="Juan Dela Cruz"
                  />
                  {touched.fullName && errors.fullName && (
                    <p className="mt-2 text-red-600 text-sm font-medium">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none transition-all text-lg ${
                      touched.phone && errors.phone
                        ? 'border-red-500 focus:ring-red-500 animate-shake'
                        : 'border-gray-300 focus:border-lutong-red focus:ring-lutong-red/30'
                    }`}
                    placeholder="09XXXXXXXXX or +63XXXXXXXXX"
                  />
                  {touched.phone && errors.phone && (
                    <p className="mt-2 text-red-600 text-sm font-medium">{errors.phone}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    Complete Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none transition-all text-lg ${
                      touched.address && errors.address
                        ? 'border-red-500 focus:ring-red-500 animate-shake'
                        : 'border-gray-300 focus:border-lutong-red focus:ring-lutong-red/30'
                    }`}
                    placeholder="House #, Street, Barangay, City, Province..."
                  />
                  {touched.address && errors.address && (
                    <p className="mt-2 text-red-600 text-sm font-medium">{errors.address}</p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    Order Notes (optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-lutong-red focus:ring-lutong-red/30 transition-all text-lg"
                    placeholder="Allergies, delivery instructions, etc..."
                  />
                </div>

                {/* Payment Method */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-5">Payment Method</h3>
                  <div className="space-y-4">
                    {['cod', 'gcash', 'credit'].map((method) => (
                      <label key={method} className="flex items-center gap-4 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={formData.paymentMethod === method}
                          onChange={handleChange}
                          className="h-6 w-6 text-lutong-red focus:ring-lutong-red border-gray-300"
                        />
                        <span className="text-lg font-medium text-gray-800 capitalize">
                          {method === 'cod' ? 'Cash on Delivery' : method.toUpperCase()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full py-5 text-xl font-bold rounded-xl transition-all shadow-lg ${
                      isFormValid
                        ? 'bg-lutong-red hover:bg-red-800 text-white'
                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    }`}
                  >
                    Place Order – ₱{total.toLocaleString()}
                  </button>

                  {!isFormValid && touched.fullName && (
                    <p className="mt-4 text-center text-red-600 text-sm">
                      Please complete all required fields
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary – sticky */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 sticky top-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 pb-4 border-b border-gray-200">
                Order Summary
              </h2>

              <div className="space-y-5 mb-8 text-lg">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-gray-700">
                    <div>
                      <p className="font-medium">{item.name} × {item.quantity}</p>
                      {item.addons?.length > 0 && (
                        <p className="text-sm text-gray-500 mt-1">
                          + {item.addons.join(', ')}
                        </p>
                      )}
                    </div>
                    <span className="font-medium">
                      ₱{((item.price + (item.addonsPrice || 0)) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}

                <div className="border-t pt-5 mt-5 flex justify-between text-xl font-bold">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-xl">
                  <span>Delivery Fee</span>
                  <span>₱{deliveryFee.toLocaleString()}</span>
                </div>

                <div className="border-t pt-5 mt-5 flex justify-between text-2xl md:text-3xl font-extrabold">
                  <span>Total</span>
                  <span className="text-lutong-red">₱{total.toLocaleString()}</span>
                </div>
              </div>

              <p className="text-center text-sm text-gray-500 mt-6">
                Free delivery in Parañaque for orders over ₱500
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}