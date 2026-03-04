import Head from "next/head";

export default function Layout({ children, globalData }) {
  const {
    primaryColor = "#1A1A1A",
    secondaryColor = "#D4AF37",
    siteName = "Desa Wisata",
  } = globalData?.attributes || {};

  return (
    <>
      <Head>
        <title>{siteName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        style={{
          "--primary-color": primaryColor,
          "--secondary-color": secondaryColor,
        }}
        className="min-h-screen transition-colors duration-300"
      >
        <style jsx global>{`
          :root {
            --primary-color: ${primaryColor};
            --secondary-color: ${secondaryColor};
          }

          .bg-primary {
            background-color: var(--primary-color);
          }

          .text-primary {
            color: var(--primary-color);
          }

          .bg-secondary {
            background-color: var(--secondary-color);
          }

          .text-secondary {
            color: var(--secondary-color);
          }

          .border-primary {
            border-color: var(--primary-color);
          }

          .border-secondary {
            border-color: var(--secondary-color);
          }
        `}</style>

        <header className="bg-primary text-white p-4 shadow-lg sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold font-serif">{siteName}</h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="/"
                    className="hover:text-secondary transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/attractions"
                    className="hover:text-secondary transition-colors"
                  >
                    Attractions
                  </a>
                </li>
                <li>
                  <a
                    href="/market"
                    className="hover:text-secondary transition-colors"
                  >
                    Market
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">{children}</main>

        <footer className="bg-primary text-white p-8 mt-12">
          <div className="container mx-auto text-center">
            <p>
              &copy; {new Date().getFullYear()} {siteName}. Powered by Digital
              Tourism Hub.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
