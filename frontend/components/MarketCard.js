import Image from "next/image";
import BrandedButton from "./BrandedButton";

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
  const imageUrl = images?.data?.[0]?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL?.replace("/api", "") || "http://localhost:1337"}${images.data[0].attributes.url}`
    : "https://via.placeholder.com/600x600?text=No+Image";

  const handleInquiry = () => {
    const link = inquiryLink?.match(/^\+?[1-9]\d{1,14}$/)
      ? `https://wa.me/${inquiryLink.replace(/\+/g, "")}?text=Hi, I am interested in ${title}`
      : inquiryLink;
    window.open(link, "_blank");
  };

  return (
    <div
      className={`group flex flex-col h-full overflow-hidden rounded-[2rem] border border-mist-grey bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-sky-accent/5 ${
        !isAvailable ? "opacity-60" : ""
      }`}
    >
      <div className="relative h-72 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-6 right-6 rounded-2xl bg-white/90 px-5 py-2 text-sm font-bold text-foreground backdrop-blur-md shadow-sm">
          Rp {Number(price).toLocaleString()}
        </div>
      </div>

      <div className="flex flex-col flex-grow p-8">
        <div className="mb-4">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-sky-accent">
            {sellerName}
          </p>
          <h3 className="text-2xl font-bold text-foreground leading-tight tracking-tight">
            {title}
          </h3>
        </div>

        <p className="flex-grow text-sm leading-relaxed text-foreground/50 line-clamp-3 mb-8">
          {description}
        </p>

        <BrandedButton
          onClick={handleInquiry}
          disabled={!isAvailable}
          variant={isAvailable ? "primary" : "secondary"}
          className="w-full"
        >
          {isAvailable ? "Send Inquiry" : "Sold Out"}
        </BrandedButton>
      </div>
    </div>
  );
}
