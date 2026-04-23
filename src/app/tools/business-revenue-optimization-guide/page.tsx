import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessRevenueOptimizationGuide from '@/components/BusinessRevenueOptimizationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What strategies optimize business revenue?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Revenue strategies include: Price optimization (value-based pricing for margin improvement), Volume growth (market expansion for revenue scale), Mix optimization (product portfolio for revenue quality), and Channel optimization (distribution efficiency for revenue reach)."
      }
    },
    {
      "@type": "Question",
      "name": "What methods drive revenue optimization?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Optimization methods include: analyze revenue drivers, segment customer base, evaluate pricing strategies, assess market opportunities, optimize product mix, improve sales efficiency, enhance customer value, reduce revenue leakage, expand distribution channels, and monitor revenue metrics."
      }
    },
    {
      "@type": "Question",
      "name": "What drivers influence revenue?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Revenue drivers include: Customer acquisition (volume growth through marketing), Customer retention (revenue stability through service), Price realization (margin improvement through value), and Product innovation (market expansion through R&D)."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure revenue optimization?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success metrics include: revenue growth rate, average revenue per customer, revenue per employee, gross margin percentage, price realization rate, customer acquisition cost, customer lifetime value, and revenue concentration."
      }
    },
    {
      "@type": "Question",
      "name": "Why is revenue optimization important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Revenue optimization drives business growth, maximizes market potential, improves margins, expands reach, and sustains competitiveness. Strategic revenue management transforms sales into scalable success."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Revenue Optimization Guide - Strategies, Methods & Metrics',
  description: 'Revenue strategies, optimization methods, key drivers, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessRevenueOptimizationGuide />
    </Suspense>
  );
}
