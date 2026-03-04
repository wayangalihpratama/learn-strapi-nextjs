import Link from "next/link";
import Image from "next/image";
import { fetchFromStrapi } from "../../lib/strapi";
import BrandedButton from "../../components/BrandedButton";

export default function NewsIndex({ globalData, articles }) {
  if (!globalData?.data || !articles?.data) {
    return <div className="p-20 text-center">Loading portal data...</div>;
  }

  const { siteName } = globalData.data.attributes;

  const getImageUrl = (image) => {
    if (!image?.data?.attributes?.url) return null;
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}${image.data.attributes.url}`;
  };

  return (
    <main className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-serif mb-4">Village News & Stories</h1>
          <p className="text-gray-500 text-lg">
            Stay updated with the latest happenings in {siteName}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.data.map((article) => {
            const { title, slug, banner, category, author, publishedAt } =
              article.attributes;
            const bannerUrl = getImageUrl(banner);

            return (
              <article
                key={article.id}
                className="bg-white rounded-4xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col"
              >
                <div className="relative h-64">
                  {bannerUrl && (
                    <Image
                      src={bannerUrl}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold text-[--sky-accent] uppercase">
                    {category}
                  </div>
                </div>

                <div className="p-8 grow">
                  <div className="text-gray-400 text-xs mb-3 flex items-center gap-2 font-medium">
                    <span>{author || "Admin"}</span>
                    <span>•</span>
                    <span>{new Date(publishedAt).toLocaleDateString()}</span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4 line-clamp-2">
                    {title}
                  </h2>
                  <BrandedButton
                    href={`/news/${slug}`}
                    variant="ghost"
                    className="px-0 py-2 font-bold text-[--sky-accent]! hover:gap-2 group transition-all"
                  >
                    Read Story{" "}
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </BrandedButton>
                </div>
              </article>
            );
          })}
        </div>

        {articles.data.length === 0 && (
          <div className="py-20 text-center text-gray-400 italic">
            No news articles yet. Check back later!
          </div>
        )}
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const [globalRes, articlesRes] = await Promise.all([
    fetchFromStrapi("/global?populate[logo]=*&populate[seo][populate]=*"),
    fetchFromStrapi("/articles?populate=*&sort=publishedAt:desc"),
  ]);

  return {
    props: {
      globalData: globalRes,
      articles: articlesRes,
      seo: {
        metaTitle: "News & Stories",
        metaDescription: "Latest news and stories from our village.",
      },
    },
    revalidate: 60,
  };
}
