import Layout from "@/components/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ||
    ((page) => <Layout globalData={pageProps.globalData}>{page}</Layout>);

  return getLayout(<Component {...pageProps} />);
}
