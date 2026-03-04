# Research Findings v2: SEO & Multi-Tenancy (Sprints 4 & 5)

## 📌 Context
This document outlines the findings and recommended approaches for implementing Advanced SEO (Sprint 4) and Multi-Village/Multi-Tenancy support (Sprint 5) in a Strapi v5 + Next.js 14 architecture.

---

## 🔍 Sprint 4: SEO & Performance

### 1. Strapi SEO Architecture
**Problem**: How to manage both global SEO defaults and page-specific overrides without cluttering the content manager?
**Finding**: The standard approach is to create a reusable Strapi Component named `shared.meta-data` or `shared.seo`.
- **Fields**: `metaTitle`, `metaDescription`, `shareImage` (Media), `keywords`.
- **Implementation**: Add this component to all manageable collection/single types (`Homepage`, `Attraction`, `Product`, `Article`).
- **Global Fallback**: The existing `Global` single type should serve as the fallback if a specific page lacks SEO data.

### 2. Next.js App Router vs Pages Router SEO
**Context**: The current project structure uses Next.js Pages Router (based on `pages/index.js`).
**Finding**: Since we are using the Pages Router, we must rely on the `next/head` component to inject meta tags. Using the `<Head>` component dynamically in the `Layout` wrapper, fed by the Strapi SEO component, is the most robust pattern.

### 3. Dynamic XML Sitemaps
**Problem**: Search engines need a constantly updated map of all dynamic routes (villages, attractions, articles).
**Finding**: We can use `next-sitemap` or generate a custom `sitemap.xml.js` file in `pages/` that fetches all dynamic slugs from Strapi during build time / request time to construct the XML.

---

## 🔍 Sprint 5: Multi-Village (Multi-Tenancy)

### 1. Database Isolation Pattern
**Problem**: How to host multiple villages on one Strapi instance without data cross-contamination?
**Finding**:
- **Approach A (Namespace)**: Create a `Village` Collection Type. Add a relation field (`Village`) to `Attraction`, `Product`, and `Article`.
    - *Pros*: Simple, native to Strapi.
    - *Cons*: Admin users can see all villages unless strict RBAC (Role-Based Access Control) is implemented.
- **Approach B (Tenancy Plugin)**: Use a community or enterprise multi-tenancy plugin.
    - *Pros*: Better admin isolation.
    - *Cons*: High overhead, potential compatibility issues with Strapi v5.

**Recommendation**: Proceed with **Approach A (Namespace Relation)**. It is reliable and fits the "White-label Template" MVP footprint. Next.js can filter content via query: `/api/attractions?filters[village][slug][$eq]=desa-pujon`.

### 2. Frontend Routing Structure
**Problem**: How does the frontend know which village to display?
**Finding**:
- **Option 1**: Path-based routing (e.g., `domain.com/[village-slug]`).
- **Option 2**: Subdomain routing (e.g., `[village-slug].domain.com`).
**Recommendation**: Path-based routing (`/[village]`) using Next.js Dynamic Routes is significantly easier to develop, preview, and deploy for the MVP.

## ✅ Action Items for PRD Refinement
- Update Feature 004 to explicitly specify a `shared.seo` Strapi Component.
- Update Feature 005 to explicitly define the `Village` Collection relation strategy and path-based Next.js routing.
