import { fetchFromStrapi } from "@/lib/strapi";
import AttractionCard from "@/components/AttractionCard";
import BrandedButton from "@/components/BrandedButton";

export default function Home({ globalData, homepageData, attractions }) {
  const {
    siteName = "Digital Tourism Hub",
    siteDescription = "Curated luxury travel experiences to the world's most breathtaking natural landscapes.",
  } = globalData?.attributes || {};

  const {
    heroTitle = "Discover Your Next Extraordinary Escape.",
    heroSubtitle = siteDescription,
    heroImage,
  } = homepageData?.attributes || {};

  const heroImageUrl = heroImage?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL?.replace("/api", "") || "http://localhost:1337"}${heroImage.data.attributes.url}`
    : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000";

  return (
    <div className="space-y-32 pb-20">
      {/* Modern Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-6 py-24 text-center md:px-12 md:py-32">
        {/* Background Image / Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 to-black/80 opacity-60" />
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: `url('${heroImageUrl}')` }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <span className="mb-4 rounded-full bg-white/10 px-6 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            Welcome to {siteName}
          </span>
          <h2 className="heading-hero mb-8 max-w-5xl text-white">
            {heroTitle}
          </h2>
          <p className="mb-12 max-w-2xl text-lg text-white/80 leading-relaxed md:text-xl font-medium">
            {heroSubtitle}
          </p>

          <div className="glass-card flex w-full max-w-3xl flex-col p-3 md:flex-row md:items-center shadow-2xl">
            <div className="flex-1 px-6 py-4 text-left">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1">
                Where to?
              </label>
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-full bg-transparent text-sm font-semibold placeholder:text-foreground/30 focus:outline-none"
              />
            </div>
            <div className="hidden h-10 w-px bg-foreground/5 md:block" />
            <div className="flex-1 px-6 py-4 text-left">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1">
                When?
              </label>
              <button className="text-sm font-semibold text-foreground/30">
                Add dates
              </button>
            </div>
            <BrandedButton className="mt-2 w-full md:mt-0 md:w-auto px-8 py-4">
              Find My Journey
            </BrandedButton>
          </div>
        </div>
      </section>

      {/* Featured Sections Grid */}
      <section>
        <div className="mb-16 flex items-end justify-between">
          <div>
            <span className="subheading">Highlights</span>
            <h3 className="mb-2 text-4xl font-serif font-bold tracking-tight">
              Featured Destinations
            </h3>
            <p className="text-foreground/50 text-lg">
              Explore our most popular curated locations in {siteName}.
            </p>
          </div>
          <BrandedButton
            href="/attractions"
            variant="ghost"
            className="font-bold underline-offset-4 hover:underline"
          >
            View all &rarr;
          </BrandedButton>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {attractions && attractions.length > 0 ? (
            attractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))
          ) : (
            <p className="col-span-full py-20 text-center text-foreground/30 italic">
              No featured attractions found. Add some in Strapi!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps() {
  const [globalRes, homepageRes, attractionsRes] = await Promise.all([
    fetchFromStrapi("/global?populate=*"),
    fetchFromStrapi("/homepage?populate=*"),
    fetchFromStrapi("/attractions?populate=*&pagination[limit]=3"),
  ]);

  return {
    props: {
      globalData: globalRes?.data || null,
      homepageData: homepageRes?.data || null,
      attractions: attractionsRes?.data || [],
    },
    revalidate: 60,
  };
}
