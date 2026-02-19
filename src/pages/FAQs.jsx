export default function FAQs() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">

      <div className="max-w-[900px] mx-auto px-5 py-10 bg-white border-l border-r border-gray-300 min-h-[600px]">

        <section className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Support & FAQs</h1>
          <p className="text-lg text-gray-600">
            Have questions? We're here to help. Check out the frequently asked questions below or contact us for further assistance.
          </p>
        </section>

        <hr className="border-t border-gray-200 my-8" />

        {/* Feature Information */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Feature Information</h2>
          <p className="text-gray-600 leading-relaxed text-justify">
            At Lutong Pinoy, we bring the heart of the Filipino home to your table through a dining experience rooted in authenticity and warm hospitality. Our kitchen honors the "lutong bahay" tradition by using slow-simmered broths, market-fresh ingredients, and heirloom recipes that capture the soulful flavors of the islands. Designed for "salo-salo," our restaurant encourages family-style sharing with generous platters, "unli-rice" options, and even traditional banana-leaf Kamayan feasts for those seeking a truly immersive experience. From the rustic, Bahay Kubo-inspired ambiance to our signature dipping sauce bar and festive party bilaos, every detail is crafted to ensure that every guest feels the comfort of a Sunday family gathering.
          </p>
        </section>

        <hr className="border-t border-gray-200 my-8" />

        {/* Our Story */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed text-justify">
            Lutong Pinoy began not as a business, but as a longing for the familiar scents of a Filipino kitchen—the aromatic base of sautéing garlic and onions that signaled the start of every family meal. Growing up, the kitchen was the heart of our home, a place where recipes weren't written in books but measured by feel and perfected over generations. We remember the patience required for a slow-simmered Kare-Kare and the communal joy of a salo-salo, where the table was always long enough to welcome a neighbor or a friend. It was this spirit of effortless hospitality and the "linamnam" of authentic home cooking that we realized was missing from our busy lives, and so, Lutong Pinoy was born to bridge that gap.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed text-justify">
            Today, we take pride in honoring the traditions that make Filipino cuisine so soulful. We believe that there are no shortcuts to great flavor; we still source the right calamansi, the perfect shrimp paste, and the freshest produce to ensure every spoonful tastes like a memory. Whether it is the comforting sourness of Sinigang on a rainy day or the celebratory crunch of Lechon Kawali, our food is a tribute to the islands we call home. At Lutong Pinoy, you aren’t just a customer; you are a guest in our home. We invite you to pull up a chair, share a laugh, and rediscover the rich, vibrant flavors of the Philippines with us. Tuloy po kayo!
          </p>
        </section>

      </div>

    </div>
  );
}