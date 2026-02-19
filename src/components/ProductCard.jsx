import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { dispatch } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...product, quantity: 1 },
    });
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col h-full">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-lutong-red text-white text-sm md:text-base font-bold px-4 py-2 rounded-full shadow-md">
          ₱{product.price}
        </div>
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Content */}
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-lutong-red transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3 flex-grow">
          {product.shortDesc}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-auto">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-lutong-red hover:bg-red-800 text-white font-medium py-3 rounded-xl transition-colors shadow-sm hover:shadow-md"
          >
            Add to Cart
          </button>
          <Link
            to={`/product/${product.id}`}
            className="flex-1 border-2 border-gray-300 hover:border-lutong-red text-center py-3 rounded-xl font-medium text-gray-700 hover:text-lutong-red transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}