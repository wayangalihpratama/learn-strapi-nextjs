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
    // Generate WhatsApp link if it's a number, else use as is
    const link = inquiryLink?.match(/^\+?[1-9]\d{1,14}$/)
      ? `https://wa.me/${inquiryLink.replace(/\+/g, "")}?text=Hi, I am interested in ${title}`
      : inquiryLink;
    window.open(link, "_blank");
  };

  return (
    <div
      className={`bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full hover:shadow-2xl transition-all duration-300 ${!isAvailable ? "opacity-60" : ""}`}
    >
      <div className="relative h-64 w-full">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary font-bold px-4 py-2 rounded-2xl shadow-sm text-lg">
          Rp {Number(price).toLocaleString()}
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow space-y-4">
        <div>
          <p className="text-secondary font-bold text-xs uppercase tracking-widest mb-1">
            {sellerName}
          </p>
          <h3 className="text-2xl font-bold text-primary font-serif">
            {title}
          </h3>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed flex-grow">
          {description}
        </p>

        <button
          onClick={handleInquiry}
          disabled={!isAvailable}
          className={`w-full py-4 rounded-full font-bold shadow-md transition-all active:scale-95 ${
            isAvailable
              ? "bg-primary text-white hover:bg-secondary hover:text-primary"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isAvailable ? "Send Inquiry" : "Sold Out"}
        </button>
      </div>
    </div>
  );
}
