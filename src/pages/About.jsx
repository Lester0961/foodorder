import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="text-gray-800">

      <div className="w-full h-[300px] overflow-hidden mb-5">
        <img
          src="/ulam.jpg"
          alt="Delicious Filipino Food Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-[1000px] mx-auto px-5 text-center">

        <section className="mb-10">
          <h1 className="text-4xl font-bold mb-5 text-gray-800">About Lutong Pinoy</h1>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto text-gray-600">
            Globally recognized and locally loved, Lutong Pinoy defines comfort. By blending indigenous ingredients with centuries of Spanish, Chinese, and Malay influences, Filipino dishes offer a unique culinary landscape where every bite tells a story of "Malinamnam" (savory excellence).
          </p>
        </section>

        <hr className="border-t border-gray-300 my-10" />

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🍔</div>
              <h3 className="text-xl font-bold mb-3">Authentic Filipino Cuisine</h3>
              <p className="text-gray-600 leading-relaxed">
                Authentic Lutong Pinoy is a soul-stirring harmony of bold sour, salty, and sweet flavors, built on a foundation of sautéed aromatics and communal traditions that transform simple, local ingredients into a deeply personal culinary experience.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-4">👍</div>
              <h3 className="text-xl font-bold mb-3">Quality Ingredients</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                Market Fresh: Using meat and vegetables bought straight from the palengke ensures the best flavor.
              </p>
              <p className="text-gray-600 leading-relaxed mb-2">
                Natural Flavors: When the ingredients are high quality, you don't need a lot of artificial seasonings—the food speaks for itself.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Real Staples: Using real calamansi, fresh coconut milk, and native vinegar makes a huge difference in taste.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-3">Fast & Reliable Service</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                Instant Serving: Since the dishes are already prepared, there is no waiting for a chef to cook your order from scratch.
              </p>
              <p className="text-gray-600 leading-relaxed mb-2">
                Consistent Timing: You can always depend on a quick turnaround, making it the perfect choice for a short lunch break.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Ready-to-Go: Whether you are dining in or taking out, the service is designed to get you fed and back to your day without delay.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
          <p className="text-gray-600 leading-relaxed text-justify max-w-4xl mx-auto">
            Lutong Pinoy began not as a business, but as a longing for the familiar scents of a Filipino kitchen—the aromatic base of sautéing garlic and onions that signaled the start of every family meal. Growing up, the kitchen was the heart of our home, a place where recipes weren't written in books but measured by feel and perfected over generations. We remember the patience required for a slow-simmered Kare-Kare and the communal joy of a salo-salo, where the table was always long enough to welcome a neighbor or a friend. It was this spirit of effortless hospitality and the "linamnam" of authentic home cooking that we realized was missing from our busy lives, and so, Lutong Pinoy was born to bridge that gap.
          </p>
          <p className="mt-6 text-gray-600 leading-relaxed text-justify max-w-4xl mx-auto">
            Today, we take pride in honoring the traditions that make Filipino cuisine so soulful. We believe that there are no shortcuts to great flavor; we still source the right calamansi, the perfect shrimp paste, and the freshest produce to ensure every spoonful tastes like a memory. Whether it is the comforting sourness of Sinigang on a rainy day or the celebratory crunch of Lechon Kawali, our food is a tribute to the islands we call home. At Lutong Pinoy, you aren’t just a customer; you are a guest in our home. We invite you to pull up a chair, share a laugh, and rediscover the rich, vibrant flavors of the Philippines with us. Tuloy po kayo!
          </p>
        </section>

      </div>
    </div>
  );
}