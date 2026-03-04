import Image from "next/image";

export default function MarketCard({ piece }) {
  const {
    title,
    price,
    description,
    images,
    sellerName,
    inquiryLink,
    isAvailable,
  } = piece.attributes;
  const imageUrl =
    images?.data?.[0]?.attributes?.url ||
    "https://via.placeholder.com/600x600?text=No+Image";

  const handleInquiry = () => {
    const link = inquiryLink?.match(/^\+?[1-9]\d{1,14}$/)
      ? `https://wa.me/${inquiryLink.replace(/\+/g, "")}?text=Hi, I am interested in ${title}`
      : inquiryLink;
    window.open(link, "_blank");
  };

  return (
    <div
      className={`group flex flex-col h-full overflow-hidden rounded-3xl border border-mist-grey bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        !isAvailable ? "opacity-60" : ""
      }`}
    >
      <div className="relative h-64 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4 rounded-2xl bg-white/70 px-4 py-2 text-sm font-bold text-foreground backdrop-blur-md shadow-sm">
          Rp {Number(price).toLocaleString()}
        </div>
      </div>

      <div className="flex flex-col flex-grow p-8 space-y-4">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-sky-accent">
            {sellerName}
          </p>
          <h3 className="text-xl font-bold text-foreground leading-tight">
            {title}
          </h3>
        </div>

        <p className="flex-grow text-sm leading-relaxed text-foreground/60 line-clamp-3">
          {description}
        </p>

        <button
          onClick={handleInquiry}
          disabled={!isAvailable}
          className={`btn-primary w-full ${
            !isAvailable ? "cursor-not-allowed opacity-50 grayscale" : ""
          }`}
        >
          {isAvailable ? "Send Inquiry" : "Sold Out"}
        </button>
      </div>
    </div>
  );
}
