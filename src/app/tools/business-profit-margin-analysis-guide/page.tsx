import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessProfitMarginAnalysisGuide from '@/components/BusinessProfitMarginAnalysisGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of profit margins exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Margin types include: Gross margin (revenue - COGS, production efficiency focus), Operating margin (operating profit, operational efficiency focus), Net margin (net profit, overall profitability focus), and EBITDA margin (EBITDA, cash profitability focus)."
      }
    },
    {
      "@type": "Question",
      "name": "What analyses examine profit margins?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Analysis methods include: margin trend analysis, industry benchmark comparison, product margin analysis, customer margin analysis, channel margin analysis, geographic margin analysis, cost structure analysis, price sensitivity analysis, volume impact analysis, and mix impact analysis."
      }
    },
    {
      "@type": "Question",
      "name": "What factors affect profit margins?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Margin factors include: Pricing power (price realization for margin expansion), Cost efficiency (expense control for margin improvement), Product mix (revenue composition for margin quality), and Volume scale (economies of scale for margin leverage)."
      }
    },
    {
      "@type": "Question",
      "name": "How can profit margins be improved?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Improvement strategies include: increase prices strategically, reduce production costs, optimize product portfolio, improve sales efficiency, negotiate supplier terms, automate processes, reduce overhead expenses, and focus on high-margin products."
      }
    },
    {
      "@type": "Question",
      "name": "Why is profit margin analysis important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Profit margin analysis reveals business health, identifies improvement opportunities, guides pricing decisions, supports strategic planning, and enables competitive benchmarking. Margin insight transforms revenue into profit understanding."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Profit Margin Analysis Guide - Types, Analyses & Factors',
  description: 'Margin types, analysis methods, influencing factors, and improvement strategies.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessProfitMarginAnalysisGuide />
    </Suspense>
  );
}
