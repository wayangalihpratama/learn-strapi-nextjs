import Link from "next/link";
import Image from "next/image";

export default function AttractionCard({ attraction }) {
  const { name, slug, description, images, category, price_entry } =
    attraction.attributes;
  const imageUrl =
    images?.data?.[0]?.attributes?.url ||
    "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <Link href={`/attractions/${slug}`} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-mist-grey bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute left-4 top-4 rounded-full bg-white/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground backdrop-blur-md">
            {category}
          </div>
        </div>
        <div className="flex flex-grow flex-col p-6">
          <h3 className="mb-2 text-xl font-bold group-hover:text-sky-accent transition-colors">
            {name}
          </h3>
          <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-foreground/60">
            {description}
          </p>
          <div className="mt-auto flex items-center justify-between border-t border-mist-grey pt-4">
            <span className="text-sm font-semibold">
              {price_entry
                ? `Rp ${Number(price_entry).toLocaleString()}`
                : "Free Entry"}
            </span>
            <span className="flex items-center text-xs font-bold uppercase tracking-widest text-sky-accent opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1">
              Explore &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
