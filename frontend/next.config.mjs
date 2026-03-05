/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337";
    const destinationBase = backendUrl.endsWith("/api")
      ? backendUrl
      : `${backendUrl}/api`;
    return [
      {
        source: "/api/:path*",
        destination: `${destinationBase}/:path*`,
      },
    ];
  },
};

export default nextConfig;
