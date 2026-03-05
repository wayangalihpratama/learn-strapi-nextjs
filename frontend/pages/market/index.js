import { fetchFromStrapi } from "@/lib/strapi";
import MarketCard from "@/components/MarketCard";

export default function Market({ marketPieces, globalData }) {
  return (
    <div className="space-y-12">
      <header className="text-center space-y-4">
        <h2 className="text-5xl font-bold font-serif text-primary">
          Local Marketplace
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Support our village economy. Browse authentic handicrafts, locally
          grown produce, and unique art pieces.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {marketPieces && marketPieces.length > 0 ? (
          marketPieces.map((piece) => (
            <MarketCard key={piece.id} piece={piece} />
          ))
        ) : (
          <div className="col-span-full text-center py-24 bg-secondary bg-opacity-5 rounded-3xl border-2 border-dashed border-secondary">
            <p className="text-primary font-serif italic text-xl">
              The market is currently quiet. Check back soon for new arrivals!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const [marketRes, globalRes] = await Promise.all([
    fetchFromStrapi("/market-pieces?populate=*"),
    fetchFromStrapi("/global?populate=*"),
  ]);

  return {
    props: {
      marketPieces: marketRes?.data || [],
      globalData: globalRes?.data || null,
    },
    revalidate: 60,
  };
}
