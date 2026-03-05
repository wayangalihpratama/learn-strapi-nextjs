import Link from "next/link";
import Image from "next/image";
import BrandedButton from "./BrandedButton";

export default function AttractionCard({ attraction }) {
  const { name, slug, description, images, category, price_entry } = attraction;
  const imageUrl = images?.[0]?.url
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL?.replace("/api", "") || "http://localhost:1337"}${images[0].url}`
    : "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-4xl border border-mist-grey bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-sky-accent/5">
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-foreground backdrop-blur-md shadow-sm">
          {category}
        </div>
      </div>
      <div className="flex grow flex-col p-8">
        <h3 className="mb-3 text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-sky-accent">
          {name}
        </h3>
        <p className="mb-8 line-clamp-3 text-sm leading-relaxed text-foreground/50">
          {description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-mist-grey pt-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/30">
              Entry Fee
            </span>
            <span className="text-lg font-bold">
              {price_entry
                ? `Rp ${Number(price_entry).toLocaleString()}`
                : "Free Entry"}
            </span>
          </div>
          <BrandedButton
            href={`/attractions/${slug}`}
            variant="outline"
            className="px-4"
          >
            Details
          </BrandedButton>
        </div>
      </div>
    </div>
  );
}
