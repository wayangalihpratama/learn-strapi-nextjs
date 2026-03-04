import Head from "next/head";
import Image from "next/image";
import Layout from "../../components/Layout";
import { fetchFromStrapi } from "../../lib/strapi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function ArticleDetail({ global, article }) {
  if (!global?.data || !article?.data?.[0])
    return <div className="p-20 text-center">Story not found.</div>;
  const { siteName } = global.data.attributes;
  const { title, content, banner, author, publishedAt, category } =
    article.data[0].attributes;

  const getImageUrl = (image) => {
    if (!image?.data?.attributes?.url) return null;
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}${image.data.attributes.url}`;
  };

  const bannerUrl = getImageUrl(banner);

  return (
    <Layout global={global}>
      <Head>
        <title>
          {title} | {siteName}
        </title>
      </Head>

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
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 bg-gradient-to-t from-black/80 to-transparent">
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

          <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-serif prose-headings:font-bold prose-img:rounded-[2rem] prose-a:text-[--sky-accent]">
            <BlocksRenderer content={content} />
          </div>
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const articlesRes = await fetchFromStrapi("/articles?fields[0]=slug");

  const paths = articlesRes.data.map((article) => ({
    params: { slug: article.attributes.slug },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const [globalRes, articleRes] = await Promise.all([
    fetchFromStrapi("/global?populate=*"),
    fetchFromStrapi(`/articles?filters[slug][$eq]=${params.slug}&populate=*`),
  ]);

  return {
    props: {
      global: globalRes,
      article: articleRes,
    },
    revalidate: 60,
  };
}
