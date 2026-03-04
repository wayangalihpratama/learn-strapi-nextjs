import { fetchFromStrapi } from "@/lib/strapi";

export default function Home({ globalData }) {
  const {
    siteName = "Digital Tourism Hub",
    siteDescription = "Curated luxury travel experiences to the world's most breathtaking natural landscapes.",
  } = globalData?.attributes || {};

  return (
    <div className="space-y-24 pb-20">
      {/* Modern Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-6 py-24 text-center md:px-12 md:py-32">
        {/* Background Image Placeholder / Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 to-black/80 opacity-60" />
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />

        <div className="relative z-10 flex flex-col items-center">
          <span className="mb-4 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md">
            New For 2026
          </span>
          <h2 className="heading-hero mb-6 max-w-4xl text-white">
            Discover Your Next <br />
            Extraordinary Escape.
          </h2>
          <p className="mb-10 max-w-2xl text-lg text-white/80 leading-relaxed md:text-xl">
            {siteDescription}
          </p>

          <div className="glass-card flex w-full max-w-3xl flex-col p-2 md:flex-row md:items-center">
            <div className="flex-1 px-4 py-3 text-left">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/50">
                Where to?
              </label>
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-full bg-transparent text-sm font-medium focus:outline-none"
              />
            </div>
            <div className="hidden h-8 w-px bg-mist-grey md:block" />
            <div className="flex-1 px-4 py-3 text-left">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/50">
                When?
              </label>
              <button className="text-sm font-medium text-foreground/40">
                Add dates
              </button>
            </div>
            <button className="btn-primary mt-2 w-full md:mt-0 md:w-auto">
              Find My Journey
            </button>
          </div>
        </div>
      </section>

      {/* Featured Sections Grid */}
      <section>
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h3 className="mb-2 text-3xl font-serif font-bold">
              Featured Destinations
            </h3>
            <p className="text-foreground/50">
              Explore our most popular curated locations.
            </p>
          </div>
          <a
            href="/attractions"
            className="text-sm font-semibold text-sky-accent hover:underline"
          >
            View all
          </a>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Cultural Heritage",
              desc: "Discover age-old traditions and stories passed down through generations.",
              icon: "🏺",
            },
            {
              title: "Nature Peaks",
              desc: "Explore pristine landscapes and hidden gems of our village territory.",
              icon: "🌿",
            },
            {
              title: "Local Art",
              desc: "Meet artisans and bring home a piece of authentic craftsmanship.",
              icon: "🎨",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group cursor-pointer space-y-4 rounded-3xl border border-mist-grey bg-white p-8 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist-grey text-2xl transition-transform group-hover:scale-110">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold">{item.title}</h4>
              <p className="text-sm leading-relaxed text-foreground/60">
                {item.desc}
              </p>
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-accent">
                  Learn more &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
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
