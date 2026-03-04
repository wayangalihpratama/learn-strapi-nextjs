## ADR-003: Dynamic Sitemap Generation Strategy
- **Status**: Accepted
- **Context**: For effective Search Engine Optimization, Google and other crawlers require an up-to-date `sitemap.xml`. Since our content (Attractions, Articles, Products) is entirely dynamic and managed in Strapi, the sitemap must be generated programmatically rather than statically defined, ensuring that newly published content is immediately discoverable.
- **Decision**: We will implement a custom `pages/sitemap.xml.js` file in the Next.js Pages Router application. This file will use Next.js's `getServerSideProps` to:
    1.  Call the Next.js response object, setting the Content-Type to `text/xml`.
    2.  Query the Strapi API for all dynamic slugs (`/attractions`, `/market-pieces`, `/articles`).
    3.  Generate the raw XML string and inject the dynamic URLs.
    4.  Send the response immediately.
- **Alternatives Considered**:
    - **`next-sitemap` package**: Using the popular `next-sitemap` build-time plugin. *Rejected* because it primarily runs at build time (`next build`). While it has runtime capabilities, configuring it for deeply nested dynamic routes pulled from an external CMS adds unnecessary dependency overhead for what is essentially a string concatenation problem.
    - **Strapi Sitemap Plugin**: Generating the sitemap directly on the Strapi backend. *Rejected* because the backend shouldn't be responsible for knowing the exact frontend routing structure (e.g., that an article lives at `/news/[slug]`). The frontend Next.js app is the source of truth for routing.
- **Consequences**:
    - **Pros**: Complete control over the XML structure and priority tags. No external dependencies. Guaranteed to always reflect the current state of published content in Strapi.
    - **Cons**: Fetches data from Strapi on every request to `/sitemap.xml` (unless cached at the CDN/Edge layer), marginally increasing server load compared to a static file.
