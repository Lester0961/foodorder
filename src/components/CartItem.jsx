import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { dispatch } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: item.id, quantity: newQuantity },
    });
  };

  const handleRemove = () => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id: item.id },
    });
  };

  const priceDisplay = item.addonsPrice
    ? (item.price + item.addonsPrice).toLocaleString()
    : item.price.toLocaleString();

  const totalItemPrice = (item.price + (item.addonsPrice || 0)) * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-5 md:p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-lutong-red/30 transition-all duration-200">
      {/* Thumbnail */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main content */}
      <div className="flex-grow min-w-0">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 line-clamp-2">
          {item.name}
        </h3>

        {item.addons?.length > 0 && (
          <p className="text-sm text-gray-600 mb-2">
            + {item.addons.join(', ')}
          </p>
        )}

        <div className="text-lg md:text-xl font-bold text-lutong-red">
          ₱{priceDisplay} × {item.quantity}
          <span className="text-base md:text-lg text-gray-500 font-normal ml-2">
            = ₱{totalItemPrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 sm:gap-8 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
        {/* Quantity */}
        <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden bg-white">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="px-5 py-3 text-2xl font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            −
          </button>
          <span className="px-8 py-3 text-2xl font-semibold min-w-[80px] text-center border-x border-gray-300">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="px-5 py-3 text-2xl font-bold text-gray-700 hover:bg-gray-100 transition"
          >
            +
          </button>
        </div>

        {/* Remove */}
        <button
          onClick={handleRemove}
          className="text-red-600 hover:text-red-800 font-medium text-lg transition flex items-center gap-2 hover:scale-105"
          title="Remove item"
        >
          <span className="text-xl">🗑</span>
          <span className="hidden sm:inline">Remove</span>
        </button>
      </div>
    </div>
  );
}