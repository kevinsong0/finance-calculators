import type { Metadata } from 'next';
import { Suspense } from 'react';
import TechStackDecision from '@/components/TechStackDecision';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I choose the right tech stack?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Choose tech stack based on: team expertise (use what team knows), project type (web app, API, mobile), scale requirements (MVP vs enterprise), time constraints, budget, hiring market, performance needs, security requirements. Don&apos;t follow trends blindly. Match stack to project needs, not hype."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best tech stack for startups?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Startup tech stack: Next.js + TypeScript (modern, SEO-friendly, full-stack), Rails (rapid MVP development), Django (Python ecosystem), Vue + Vite (lightweight). Focus on: development speed, hiring availability, flexibility. Avoid: over-engineering, unfamiliar stacks, complex infrastructure. Start simple, scale later."
      }
    },
    {
      "@type": "Question",
      "name": "What tech stack for high traffic applications?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "High traffic stack: Go + Gin (fast compiled backend), Node.js + Express (async non-blocking), Java + Spring Boot (enterprise scale), Rust (extreme performance). Architecture: microservices, caching (Redis), load balancing, CDN. Database: PostgreSQL, MongoDB. Consider: horizontal scaling, async processing."
      }
    },
    {
      "@type": "Question",
      "name": "Should I use TypeScript or JavaScript?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TypeScript vs JavaScript: TypeScript for: large projects, teams, long-term maintenance, complex logic. JavaScript for: small projects, quick prototypes, learning. TypeScript benefits: type safety, IDE support, fewer bugs, better refactoring. JavaScript benefits: simpler setup, faster writing, no build step. TypeScript recommended for production apps."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between SSR and SPA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SSR (Server-Side Rendering): HTML rendered server, better SEO, slower initial load, easier SEO indexing. SPA (Single Page Application): JavaScript renders client, faster navigation after load, poorer SEO, more interactive. SSR stacks: Next.js, Nuxt, Astro. SPA stacks: React, Vue, Angular. Choose SSR for SEO-critical, SPA for dashboard/apps."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Tech Stack Decision Guide - Choose Right Stack for Your Project',
  description: 'Guide to choosing technology stack. Compare popular stacks, decision factors, recommendations. Choose Next.js, Rails, Django, Go for your project.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TechStackDecision />
    </Suspense>
  );
}