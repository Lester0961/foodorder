import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Home() {
  const bestSellers = products.filter((p) =>
    ['Chicken Adobo', 'Kare-Kare', 'Lumpiang Shanghai', 'Sisig Rice'].includes(p.name)
  );

const categories = [
  {
    name: 'Appetizers',
    slug: 'appetizers',
    image: products.find(p => p.name === 'Lumpiang Shanghai')?.image,
  },
  {
    name: 'Main Dishes',
    slug: 'main-dishes',
    image: products.find(p => p.name === 'Kare-Kare')?.image,
  },
  {
    name: 'Rice Meals',
    slug: 'rice-meals',
    image: products.find(p => p.name === 'Sisig Rice')?.image,
  },
  {
    name: 'Desserts',
    slug: 'desserts',
    image: 'https://assets.bonappetit.com/photos/60e46c6701084801b06de2a3/16:9/w_2190,h_1232,c_limit/Halo-Halo-Recipe-2021.jpg',
  },
  {
    name: 'Drinks',
    slug: 'drinks',
    image: 'https://i0.wp.com/ricelifefoodie.com/wp-content/uploads/2024/08/buko-juice-fresh-coconut-water.jpg?fit=700%2C500&ssl=1',
  },
];
  return (
    <div className="min-h-screen bg-gradient-to-b from-lutong-beige/40 to-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 max-w-4xl px-5">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-2xl leading-tight">
            Sarap na Lutong Bahay
          </h1>
          <p className="text-xl md:text-3xl mb-10 drop-shadow-lg font-light">
            Authentic Filipino comfort food, delivered hot to your door
          </p>
          <Link
            to="/menu"
            className="inline-block bg-lutong-red hover:bg-red-800 text-white font-bold text-xl md:text-2xl px-12 py-6 rounded-xl shadow-2xl transition transform hover:scale-105"
          >
            Order Now
          </Link>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 md:py-24 px-5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-lutong-red">
            Best Sellers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16 md:py-24 px-5 bg-gradient-to-b from-white to-lutong-beige/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-gray-900">
            Browse by Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/menu?category=${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 aspect-[4/3] bg-gray-200"
              >
                {cat.image && (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg px-6 py-3 bg-black/30 rounded-xl backdrop-blur-sm">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}