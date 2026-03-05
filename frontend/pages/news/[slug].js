import Image from "next/image";
import { fetchFromStrapi } from "../../lib/strapi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function ArticleDetail({ globalData, article }) {
  if (!globalData?.data || !article?.data?.[0])
    return <div className="p-20 text-center">Story not found.</div>;
  const { siteName } = globalData.data;
  const { title, content, banner, author, publishedAt, category } =
    article.data[0];

  const getImageUrl = (image) => {
    if (!image?.url) return null;
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`;
  };

  const bannerUrl = getImageUrl(banner);

  return (
    <article className="min-h-screen">
      {/* Banner Section */}
      <div className="relative h-[60vh] w-full">
        {bannerUrl && (
          <Image
            src={bannerUrl}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 bg-linear-to-t from-black/80 to-transparent">
          <div className="max-w-4xl mx-auto">
            <span className="bg-[--sky-accent] text-white px-4 py-1 rounded-full text-xs font-bold uppercase mb-4 inline-block tracking-widest">
              {category}
            </span>
            <h1 className="text-4xl md:text-6xl text-white font-serif font-bold leading-tight">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto py-20 px-4">
        <div className="flex items-center gap-4 mb-12 border-b border-gray-100 pb-8 text-gray-500">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
          <div>
            <p className="font-bold text-gray-900">
              {author || "Village Contributor"}
            </p>
            <p className="text-sm">
              {new Date(publishedAt).toLocaleDateString(undefined, {
                dateStyle: "long",
              })}
            </p>
          </div>
        </div>

        <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-serif prose-headings:font-bold prose-img:rounded-4xl prose-a:text-[--sky-accent]">
          <BlocksRenderer content={content} />
        </div>
      </div>
    </article>
  );
}

export async function getStaticPaths() {
  const articlesRes = await fetchFromStrapi("/articles?fields[0]=slug");

  const paths =
    articlesRes?.data?.map((article) => ({
      params: { slug: article.slug },
    })) || [];

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const [globalRes, articleRes] = await Promise.all([
    fetchFromStrapi("/global?populate[logo]=*&populate[seo][populate]=*"),
    fetchFromStrapi(
      `/articles?filters[slug][$eq]=${params.slug}&populate[banner]=*&populate[seo][populate]=*`,
    ),
  ]);

  const articleSEO = articleRes?.data?.[0]?.seo;
  const articleTitle = articleRes?.data?.[0]?.title;

  return {
    props: {
      globalData: globalRes,
      article: articleRes,
      // Provide dynamic SEO fallback for detail pages
      seo: articleSEO || {
        metaTitle: articleTitle,
      },
    },
    revalidate: 60,
  };
}
