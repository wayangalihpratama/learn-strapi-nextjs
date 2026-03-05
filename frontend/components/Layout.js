import Seo from "./Seo";
import Link from "next/link";

export default function Layout({ children, globalData, seo }) {
  const { siteName = "Digital Tourism Hub", seo: globalSeo } =
    globalData?.data || {};

  return (
    <>
      <Seo seo={seo} globalSeo={globalSeo} siteName={siteName} />
      <div
        className="min-h-screen bg-background text-foreground selection:bg-sky-accent selection:text-white"
        style={{
          "--sky-accent": globalData?.data?.primaryColor || "#007aff",
          "--secondary-accent": globalData?.data?.secondaryColor || "#D4AF37",
        }}
      >
        {/* Modern Sticky Header with Glassmorphism */}
        <header className="sticky top-0 z-50 w-full border-b border-mist-grey bg-white/70 backdrop-blur-md">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link
                  href="/"
                  className="text-xl font-serif font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
                >
                  {siteName}
                </Link>
              </div>
              <nav className="hidden md:block">
                <ul className="flex items-center space-x-8 text-sm font-medium">
                  <li>
                    <Link
                      href="/"
                      className="text-foreground/70 transition-colors hover:text-sky-accent"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/attractions"
                      className="text-foreground/70 transition-colors hover:text-sky-accent"
                    >
                      Attractions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/market"
                      className="text-foreground/70 transition-colors hover:text-sky-accent"
                    >
                      Market
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="flex items-center space-x-4">
                <Link
                  href="/book"
                  className="rounded-full bg-sky-accent px-5 py-2 text-sm font-medium text-white transition-all hover:bg-sky-accent/90 active:scale-95 shadow-sm"
                  style={{ backgroundColor: "var(--sky-accent)" }}
                >
                  Explore Now
                </Link>
                {/* Mobile Menu Icon Placeholder */}
                <button className="md:hidden text-foreground">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>

        <footer className="border-t border-mist-grey bg-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="text-lg font-serif font-bold">{siteName}</div>
              <p className="text-sm text-foreground/50">
                &copy; {new Date().getFullYear()} {siteName}. All rights
                reserved.
              </p>
              <div className="flex space-x-6 text-sm text-foreground/50">
                <a href="#" className="hover:text-sky-accent">
                  Privacy
                </a>
                <a href="#" className="hover:text-sky-accent">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
