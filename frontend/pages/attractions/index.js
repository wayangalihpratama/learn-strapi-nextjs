import { fetchFromStrapi } from "@/lib/strapi";
import AttractionCard from "@/components/AttractionCard";

export default function Attractions({ attractions, globalData }) {
  return (
    <div className="space-y-12">
      <header className="text-center space-y-4">
        <h2 className="text-5xl font-bold font-serif text-primary">
          Village Attractions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Explore the hidden gems of our community, from ancient landmarks to
          breathtaking nature.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {attractions && attractions.length > 0 ? (
          attractions.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 italic">
              No attractions found yet. Please check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const [attractionsRes, globalRes] = await Promise.all([
    fetchFromStrapi("/attractions?populate=*"),
    fetchFromStrapi("/global?populate=*"),
  ]);

  return {
    props: {
      attractions: attractionsRes?.data || [],
      globalData: globalRes?.data || null,
    },
    revalidate: 60,
  };
}
