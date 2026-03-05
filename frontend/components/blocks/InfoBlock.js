import Image from "next/image";

const InfoBlock = ({ data }) => {
  const { title, content, image, layout } = data;

  const getImageUrl = (img) => {
    if (!img?.url) return null;
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}${img.url}`;
  };

  const showImageLeft = layout === "image-left";
  const imgUrl = getImageUrl(image);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className={`${showImageLeft ? "md:order-2" : ""}`}>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
            {title}
          </h2>
          <div className="prose prose-lg text-gray-600 max-w-none">
            {/* Simple content rendering for now, can be expanded for rich text blocks */}
            {typeof content === "string" ? (
              <p>{content}</p>
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: JSON.stringify(content) }}
              />
            )}
          </div>
        </div>

        <div
          className={`relative h-100 md:h-150 rounded-4xl overflow-hidden shadow-2xl ${showImageLeft ? "md:order-1" : ""}`}
        >
          {imgUrl && (
            <Image
              src={imgUrl}
              alt={title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default InfoBlock;
