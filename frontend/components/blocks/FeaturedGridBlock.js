import { useState, useEffect } from "react";
import AttractionCard from "../AttractionCard";
import MarketCard from "../MarketCard";
import { fetchFromStrapi } from "../../lib/strapi";

const FeaturedGridBlock = ({ data }) => {
  const { title, type, limit } = data;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      const endpoint =
        type === "attractions" ? "/attractions" : "/market-pieces";
      const result = await fetchFromStrapi(
        `${endpoint}?populate=*&pagination[limit]=${limit}`,
      );
      setItems(result?.data || []);
    };
    loadItems();
  }, [type, limit]);

  return (
    <section className="py-20 px-4 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) =>
            type === "attractions" ? (
              <AttractionCard key={item.id} attraction={item} />
            ) : (
              <MarketCard key={item.id} product={item} />
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGridBlock;
