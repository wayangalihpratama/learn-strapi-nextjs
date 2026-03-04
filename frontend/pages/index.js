import { fetchFromStrapi } from "@/lib/strapi";

export default function Home({ globalData }) {
  const {
    siteName = "Digital Tourism Hub",
    siteDescription = "Explore the heritage.",
  } = globalData?.attributes || {};

  return (
    <div className="space-y-12">
      <section className="text-center py-16 px-4 rounded-3xl bg-secondary bg-opacity-10 border-2 border-dashed border-secondary">
        <h2 className="text-5xl md:text-7xl font-bold font-serif mb-6 text-primary">
          Welcome to <br />
          <span className="text-secondary">{siteName}</span>
        </h2>
        <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
          {siteDescription}
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="/attractions"
            className="bg-primary text-white px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-transform"
          >
            Explore Attractions
          </a>
          <a
            href="/market"
            className="border-2 border-primary text-primary px-10 py-4 rounded-full font-bold hover:bg-primary hover:text-white transition-all"
          >
            Visit Market
          </a>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-secondary">
          <h3 className="text-2xl font-bold mb-4 text-primary">
            🏺 Cultural Heritage
          </h3>
          <p className="text-gray-600">
            Discover the age-old traditions and stories passed down through
            generations.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-secondary">
          <h3 className="text-2xl font-bold mb-4 text-primary">
            🌿 Nature Peaks
          </h3>
          <p className="text-gray-600">
            Explore the pristine landscapes and hidden gems of our village
            territory.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-secondary">
          <h3 className="text-2xl font-bold mb-4 text-primary">🎨 Local Art</h3>
          <p className="text-gray-600">
            Meet the artisans and bring home a piece of our authentic
            craftsmanship.
          </p>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const globalRes = await fetchFromStrapi("/global?populate=*");

  return {
    props: {
      globalData: globalRes?.data || null,
    },
    revalidate: 60, // Revalidate every minute
  };
}
