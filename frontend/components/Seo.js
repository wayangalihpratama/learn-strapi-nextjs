import Head from "next/head";

const Seo = ({ seo, globalSeo, siteName }) => {
  // Cascading resolution: Page SEO -> Global SEO
  const seoWithDefaults = {
    ...globalSeo,
    ...seo,
  };

  const title = seoWithDefaults.metaTitle
    ? `${seoWithDefaults.metaTitle} | ${siteName}`
    : siteName;
  const description = seoWithDefaults.metaDescription || "";
  const shareImage = seoWithDefaults.shareImage?.data?.attributes?.url || "";

  // Make sure image URLs are absolute if they are relative
  let fullShareImageUrl = shareImage;
  if (shareImage && shareImage.startsWith("/")) {
    fullShareImageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337"}${shareImage}`;
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* OpenGraph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {fullShareImageUrl && (
        <meta property="og:image" content={fullShareImageUrl} />
      )}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

export default Seo;
