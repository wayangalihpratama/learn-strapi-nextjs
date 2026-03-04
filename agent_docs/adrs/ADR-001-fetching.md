# ADR-001: Data Fetching and Revalidation Strategy

## Status
Proposed

## Context
We need a strategy for fetching content from Strapi (Batuan paintings, temple info, performances) while maintaining the highest possible Performance (Lighthouse) scores and keeping the data fresh for the village admin.

## Decision
We will use **Incremental Static Regeneration (ISR)** with Next.js Server Components.

### Implementation Details:
1.  **Server Components**: All initial data fetching for pages (e.g., Attraction detail, Gallery list) will happen in Next.js Server Components.
2.  **Extended `fetch`**: We will utilize the native `fetch` with `next: { revalidate: 3600 }` (default 1 hour) for most content.
3.  **On-Demand Revalidation**: We will implement a Strapi **Webhook** that triggers a Next.js API route to `revalidatePath` or `revalidateTag` whenever an artist uploads a new painting or the admin updates a performance date.

## Consequences
- **Positive**: Extremely fast load times for users (static CDN delivery). SEO is perfected. Reduced load on Strapi.
- **Negative**: Slight complexity in setting up the revalidation webhook. Preview mode will require a separate draft-mode implementation.
