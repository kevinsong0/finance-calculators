import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessPlanGuide from '@/components/BusinessPlanGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What should a business plan include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Business plan components: Executive Summary (overview, mission, key highlights - write last). Company Description (what business does, structure, ownership). Market Analysis (industry overview, target market, competition analysis). Products/Services (what you offer, unique value proposition). Marketing Strategy (how to reach customers, pricing, channels). Operations (how business runs, locations, equipment). Financial Plan (projections, startup costs, break-even). Funding Request (if seeking investment). Keep 20-30 pages, executive summary first for readers."
      }
    },
    {
      "@type": "Question",
      "name": "How do I write financial projections?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Financial projections: Revenue forecast (estimate sales 1-3 years, base on market research). Startup costs (initial investment - equipment, inventory, permits, marketing). Operating expenses (monthly costs - rent, salaries, utilities, supplies). Cash flow statement (timing of money in/out, critical for survival). Break-even analysis (when revenue covers costs, unit volume needed). Profit & Loss projection (expected income statement). Balance sheet (assets, liabilities). Key: use realistic assumptions, explain basis for estimates, show multiple scenarios (optimistic, realistic, conservative). Investors scrutinize financials closely."
      }
    },
    {
      "@type": "Question",
      "name": "How long should a business plan be?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Business plan length: Standard: 20-30 pages (investors, lenders). Lean/Pitch: 1-3 pages (quick overview, pitch deck supplement). Internal: 10-20 pages (operational guidance). Key insight: quality over quantity - every page should add value. Executive summary: 1-2 pages (most read section). Financials: 3-5 pages (detailed enough to show viability). Avoid padding - investors don't read long plans. Focus on: market research, differentiation, realistic financials. Customize length for audience: detailed for lenders, concise for investors, actionable for internal use."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a business plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Business plan needed for: Seeking funding (banks, investors require it). New business (roadmap for launch, structure thinking). Significant expansion (planning growth, resources). Partnership (align stakeholders). Not needed for: Simple side business, testing idea quickly. Lean alternative: Lean Canvas (1-page plan) for quick validation. Benefits even without funding: forces research, identifies gaps, creates strategy, provides roadmap. Write business plan to understand business, not just for investors. Planning = thinking through business before spending money."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I update my business plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Update business plan: Quarterly review (check goals vs actuals, adjust strategy). Major changes (pivot, new product, market shift, funding). Annual refresh (full review, update projections). When seeking funding (current data required). Key metrics to track: revenue vs projection, customer acquisition, market changes, competition updates. Living document, not static file. Use plan as benchmark - measure performance against assumptions. Adjust when reality differs significantly. Business plan evolves with business learning."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Plan Guide - Components, Financials & Tips',
  description: 'Business plan components, financial projections, tips, and common mistakes.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BusinessPlanGuide />
    </Suspense>
  );
}