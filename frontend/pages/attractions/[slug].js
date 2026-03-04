import { fetchFromStrapi } from "@/lib/strapi";
import Head from "next/head";

export default function AttractionDetail({ attraction, globalData }) {
  if (!attraction) return <div>Attraction not found</div>;

  const {
    name,
    description,
    images,
    category,
    location,
    opening_hours,
    price_entry,
  } = attraction.attributes;
  const mainImage =
    images?.data?.[0]?.attributes?.url ||
    "https://via.placeholder.com/1200x600?text=No+Image";

  return (
    <article className="max-w-4xl mx-auto space-y-12">
      <Head>
        <title>
          {name} | {globalData?.attributes?.siteName || "Digital Tourism Hub"}
        </title>
      </Head>

      <div className="relative h-[50vh] w-full rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={mainImage}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-bottom p-12">
          <div className="mt-auto">
            <span className="bg-secondary text-primary font-bold px-4 py-1 rounded-full text-sm uppercase mb-4 inline-block">
              {category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white font-serif">
              {name}
            </h1>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8">
          <section className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold mb-6 text-primary font-serif">
              About this Attraction
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {description}
            </div>
          </section>

          {images?.data?.length > 1 && (
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-primary font-serif">
                Gallery
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {images.data.slice(1).map((img, idx) => (
                  <div
                    key={idx}
                    className="h-64 rounded-2xl overflow-hidden shadow-md"
                  >
                    <img
                      src={img.attributes.url}
                      alt={`${name} ${idx}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-8">
          <div className="bg-primary text-white p-8 rounded-3xl shadow-xl space-y-6">
            <h3 className="text-2xl font-bold font-serif border-b border-white/20 pb-4">
              Details
            </h3>

            <div className="space-y-4">
              {location && (
                <div>
                  <p className="text-white/60 text-xs uppercase font-bold tracking-widest mb-1">
                    Location
                  </p>
                  <p className="font-medium">{location}</p>
                </div>
              )}
              {opening_hours && (
                <div>
                  <p className="text-white/60 text-xs uppercase font-bold tracking-widest mb-1">
                    Hours
                  </p>
                  <p className="font-medium">{opening_hours}</p>
                </div>
              )}
              <div>
                <p className="text-white/60 text-xs uppercase font-bold tracking-widest mb-1">
                  Entry Fee
                </p>
                <p className="font-bold text-secondary text-xl">
                  {price_entry
                    ? `Rp ${Number(price_entry).toLocaleString()}`
                    : "Free Entry"}
                </p>
              </div>
            </div>

            <button className="w-full bg-secondary text-primary font-bold py-4 rounded-full hover:scale-105 transition-transform shadow-lg">
              Get Directions
            </button>
          </div>
        </aside>
      </div>
    </article>
  );
}

export async function getStaticPaths() {
  const res = await fetchFromStrapi("/attractions");
  const paths =
    res?.data?.map((attraction) => ({
      params: { slug: attraction.attributes.slug },
    })) || [];

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const [attractionRes, globalRes] = await Promise.all([
    fetchFromStrapi(
      `/attractions?filters[slug][$eq]=${params.slug}&populate=*`,
    ),
    fetchFromStrapi("/global?populate=*"),
  ]);

  return {
    props: {
      attraction: attractionRes?.data?.[0] || null,
      globalData: globalRes?.data || null,
    },
    revalidate: 60,
  };
}
