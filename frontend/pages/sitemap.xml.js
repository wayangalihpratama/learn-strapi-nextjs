import { fetchFromStrapi } from "../lib/strapi";

const FRONTEND_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

function generateSiteMap(attractions, articles) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Route -->
  <url>
    <loc>${FRONTEND_URL}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Dynamic Attractions -->
  ${attractions
    .map(({ attributes: { slug, updatedAt } }) => {
      return `
  <url>
    <loc>${FRONTEND_URL}/attractions/${slug}</loc>
    <lastmod>${new Date(updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
    `;
    })
    .join("")}
  <!-- Dynamic Articles -->
  ${articles
    .map(({ attributes: { slug, publishedAt, updatedAt } }) => {
      return `
  <url>
    <loc>${FRONTEND_URL}/news/${slug}</loc>
    <lastmod>${new Date(updatedAt || publishedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
    `;
    })
    .join("")}
</urlset>
`;
}

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // Fetch data concurrently
  // Using generic populate to avoid payload bloat since we only need slug and dates
  const [attractionsRes, articlesRes] = await Promise.all([
    fetchFromStrapi("/attractions?fields[0]=slug&fields[1]=updatedAt"),
    fetchFromStrapi(
      "/articles?fields[0]=slug&fields[1]=updatedAt&fields[2]=publishedAt",
    ),
  ]);

  // Safely extract data arrays
  const attractions = attractionsRes?.data || [];
  const articles = articlesRes?.data || [];

  // Generate the XML sitemap with the data
  const sitemap = generateSiteMap(attractions, articles);

  res.setHeader("Content-Type", "text/xml");
  // Optional: Cache the sitemap for 1 hour at the CDN level
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400",
  );
  // Send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
