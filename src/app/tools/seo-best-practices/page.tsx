import type { Metadata } from 'next';
import { Suspense } from 'react';
import SEOBestPractices from '@/components/SEOBestPractices';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the most important on-page SEO factors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "On-page SEO factors: Title Tag (50-60 chars, include keyword, compelling). Meta Description (150-160 chars, keyword, call-to-action). H1 Heading (one per page, include main keyword). URL Structure (short, descriptive, hyphens, keyword). Internal Links (link to related pages). Image Alt Text (describe image, keyword). Content Quality (original, comprehensive, valuable). Keyword Placement (natural, not over-optimized). Most important: title, H1, quality content, internal links."
      }
    },
    {
      "@type": "Question",
      "name": "What is technical SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Technical SEO: ensures search engines can crawl and index site. Key factors: Site Speed (Core Web Vitals - LCP < 2.5s, FID < 100ms, CLS < 0.1). Mobile-Friendly (responsive design, mobile usability). HTTPS (SSL certificate, redirects HTTP to HTTPS). XML Sitemap (list all important pages, submit to Search Console). Robots.txt (guide crawlers, allow important pages). Structured Data (Schema markup for rich results). Canonical URLs (prevent duplicate content). Clean site architecture. Tools: Search Console, Screaming Frog, PageSpeed Insights."
      }
    },
    {
      "@type": "Question",
      "name": "How do I optimize content for SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Content SEO optimization: Keyword Research (find relevant, achievable keywords - tools: Ahrefs, SEMrush). Match search intent (informational, transactional). Comprehensive content (cover topic thoroughly, 1000+ words for guides). Natural keyword placement (title, H1, first paragraph, throughout). Use headings (H2, H3 for structure). Internal links (link to related pages). External links (cite quality sources). Multimedia (images, videos with alt text). Update regularly (fresh content ranks better). Write for users first, optimize for search second."
      }
    },
    {
      "@type": "Question",
      "name": "How long does SEO take to work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SEO timeline: New sites: 6-12 months for significant results. Established sites: 3-6 months for improvements. Quick wins: technical fixes (speed, indexing) show results faster. Content: takes longer to build authority. Backlinks: slowest, need quality links. Factors affecting timeline: competition, keyword difficulty, content quality, domain authority, technical issues. SEO = long-term investment. Quick SEO usually = spam tactics that risk penalties. Consistent effort over months needed."
      }
    },
    {
      "@type": "Question",
      "name": "What is structured data for SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Structured data (Schema markup): code that tells search engines what content means. Format: JSON-LD (recommended), Microdata, RDFa. Types: Article, Product, FAQ, HowTo, Local Business, Recipe, Review, Event. Benefits: Rich results (enhanced search appearance - star ratings, FAQs, images), better click-through rates, eligibility for featured snippets. Implementation: add JSON-LD script to page head. Validate with Google&apos;s Structured Data Testing Tool. Submit via Search Console. Not ranking factor directly, but rich results boost CTR."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'SEO Best Practices Guide - On-Page, Technical & Content SEO',
  description: 'On-page factors, technical SEO, content practices, and tools.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SEOBestPractices />
    </Suspense>
  );
}