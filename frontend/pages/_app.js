import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <Layout globalData={pageProps.globalData} seo={pageProps.seo}>
        {page}
      </Layout>
    ));

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} font-sans antialiased`}
    >
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
}
