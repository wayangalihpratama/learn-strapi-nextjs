import Link from "next/link";
import Image from "next/image";

export default function AttractionCard({ attraction }) {
  const { name, slug, description, images, category, price_entry } =
    attraction.attributes;
  const imageUrl =
    images?.data?.[0]?.attributes?.url ||
    "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <Link href={`/attractions/${slug}`} className="group h-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full hover:-translate-y-2">
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
            {category}
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-2xl font-bold mb-2 text-primary font-serif group-hover:text-secondary transition-colors">
            {name}
          </h3>
          <p className="text-gray-600 line-clamp-2 mb-4 text-sm leading-relaxed">
            {description}
          </p>
          <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-50">
            <span className="text-secondary font-bold">
              {price_entry
                ? `Rp ${Number(price_entry).toLocaleString()}`
                : "Free Entry"}
            </span>
            <span className="text-primary font-medium text-sm flex items-center">
              View Details
              <svg
                className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
