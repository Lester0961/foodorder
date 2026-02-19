import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categorySlugs = categories.map(cat => cat.toLowerCase().replace(/\s+/g, '-'));
  
  const initialCategory = searchParams.get('category') || categorySlugs[0];
  const [activeCategory, setActiveCategory] = useState(
    categorySlugs.includes(initialCategory) ? initialCategory : categorySlugs[0]
  );

  const handleTabClick = (slug) => {
    setActiveCategory(slug);
    setSearchParams({ category: slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProducts = products.filter(
    p => p.category.toLowerCase().replace(/\s+/g, '-') === activeCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-lutong-beige/30 to-white py-12 md:py-16 px-5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 md:mb-12 text-lutong-red">
          Our Menu
        </h1>

        {/* Category Tabs */}
        <div className="mb-10 md:mb-14 overflow-x-auto scrollbar-hide">
          <div className="flex justify-center min-w-max mx-auto gap-3 md:gap-4 pb-2">
            {categories.map((category) => {
              const slug = category.toLowerCase().replace(/\s+/g, '-');
              const isActive = activeCategory === slug;

              return (
                <button
                  key={category}
                  onClick={() => handleTabClick(slug)}
                  className={`px-6 py-3 md:px-8 md:py-4 rounded-full font-medium text-base md:text-lg transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-lutong-red text-white shadow-md'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-lutong-red hover:text-lutong-red hover:shadow-sm'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 px-6">
            <div className="text-7xl mb-6">🍲</div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Coming Soon!
            </h3>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              We're still cooking up something special for this category.  
              Check back soon or explore our other delicious options!
            </p>
            <button
              onClick={() => handleTabClick(categorySlugs[0])}
              className="mt-8 inline-block bg-lutong-red text-white px-8 py-4 rounded-xl font-medium hover:bg-red-800 transition shadow-md"
            >
              View Other Categories
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}