import BlockRenderer from "../components/BlockRenderer";
import { fetchFromStrapi } from "../lib/strapi";

export default function Home({ globalData, homepage }) {
  if (!globalData?.data) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8 text-center">
        <div>
          <h1 className="text-3xl font-serif mb-4">
            Welcome to Your Village Portal
          </h1>
          <p className="text-gray-500 mb-8">
            It looks like the initial setup is not complete.
          </p>
          <div className="p-4 bg-amber-50 rounded-lg text-amber-800 text-sm">
            Check if your Strapi backend is running and you have published the
            &quot;Global&quot; and &quot;Homepage&quot; settings.
          </div>
        </div>
      </div>
    );
  }

  const { siteName } = globalData.data;
  const blocks = homepage?.data?.blocks;

  return (
    <main className="min-h-screen">
      {/* Modular Page Content */}
      {blocks ? (
        <BlockRenderer blocks={blocks} />
      ) : (
        <div className="py-20 text-center">
          <h2 className="text-2xl text-gray-500">Welcome to {siteName}</h2>
          <p className="mt-4">
            Please add content blocks in the Strapi admin to get started.
          </p>
        </div>
      )}
    </main>
  );
}

export async function getStaticProps() {
  const [globalRes, homepageRes] = await Promise.all([
    fetchFromStrapi("/global?populate[logo]=true&populate[seo][populate]=true"),
    fetchFromStrapi(
      "/homepage?populate[blocks][on][sections.hero][populate]=true&populate[blocks][on][sections.info-block][populate]=true&populate[blocks][on][sections.featured-grid][populate]=true&populate[seo][populate]=true",
    ),
  ]);

  return {
    props: {
      globalData: globalRes,
      homepage: homepageRes,
      seo: homepageRes?.data?.seo || null,
    },
    revalidate: 60,
  };
}
