import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';  

export default function MyOrders() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    const savedOrders = localStorage.getItem('lutongPinoyOrders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch {
        localStorage.removeItem('lutongPinoyOrders');
      }
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null; 

  return (
    <div className="min-h-screen bg-gradient-to-b from-lutong-beige/20 to-white py-12 md:py-16 px-5">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 md:mb-12 text-lutong-red">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 px-6">
            <div className="text-7xl mb-6">📦</div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              No Orders Yet
            </h3>
            <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
              You haven't placed any orders yet. When you do, they'll appear here!
            </p>
            <Link
              to="/menu"
              className="inline-block bg-lutong-red text-white px-10 py-5 rounded-xl font-bold hover:bg-red-800 transition shadow-lg"
            >
              Start Ordering
            </Link>
          </div>
        ) : (
          <div className="space-y-6 md:space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 hover:shadow-lg transition"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                      Order #{order.id}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mt-1">
                      Placed on {order.date} • {order.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl md:text-2xl font-bold text-lutong-red">
                      ₱{order.total.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-gray-700">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm md:text-base">
                      <span>
                        {item.name} × {item.quantity}
                        {item.addons?.length > 0 && (
                          <span className="text-gray-500 ml-2">
                            (+ {item.addons.join(', ')})
                          </span>
                        )}
                      </span>
                      <span className="font-medium">
                        ₱{((item.price + (item.addonsPrice || 0)) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {order.notes && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Notes:</span> {order.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}