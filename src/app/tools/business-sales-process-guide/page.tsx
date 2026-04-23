import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessSalesProcessGuide from '@/components/BusinessSalesProcessGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What stages make up the sales process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sales stages include prospecting (finding leads for qualified prospects), qualification (assessing fit for valid opportunities), presentation (showing value for interested buyers), negotiation (discussing terms for agreement), closing (finalizing deal for completed sales), and follow-up (post-sale service for satisfied customers)."
      }
    },
    {
      "@type": "Question",
      "name": "What sales techniques can be used?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sales techniques include consultative selling, solution selling, value-based selling, relationship selling, SPIN selling, challenger selling, account-based selling, and social selling."
      }
    },
    {
      "@type": "Question",
      "name": "What skills drive sales success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sales skills include communication (clear messaging improved through practice), listening (understanding needs improved through active listening training), negotiation (deal making improved through courses), and product knowledge (value articulation improved through continuous learning)."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics track sales performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sales metrics include sales volume, conversion rate, average deal size, sales cycle length, pipeline value, win rate, customer acquisition cost, and revenue per salesperson."
      }
    },
    {
      "@type": "Question",
      "name": "How can the sales process be improved?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sales process improvement involves analyzing each stage for efficiency, identifying bottlenecks, training salespeople on techniques, implementing CRM tools, standardizing best practices, measuring key metrics, and continuously refining based on results."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Sales Process Guide - Stages, Techniques & Metrics',
  description: 'Sales stages, techniques, skills, and performance metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessSalesProcessGuide />
    </Suspense>
  );
}