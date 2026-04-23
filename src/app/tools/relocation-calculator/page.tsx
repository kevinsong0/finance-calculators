import type { Metadata } from 'next';
import { Suspense } from 'react';
import RelocationCalculator from '@/components/RelocationCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are typical moving costs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Moving costs vary by distance and volume. Local move: $800-2,500. Long-distance move: $2,500-8,000+. Cross-country move: $4,000-10,000+. Additional costs: packing services ($500-1,500), storage, insurance, travel expenses, temporary housing, utility setup fees."
      }
    },
    {
      "@type": "Question",
      "name": "When does relocation make financial sense?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Relocation pays off when monthly benefits (salary increase + housing savings) exceed moving costs within 12-18 months. Calculate break-even timeline. Consider career growth potential, job stability, quality of life improvements. Employer relocation packages reduce your out-of-pocket costs."
      }
    },
    {
      "@type": "Question",
      "name": "What should employer relocation packages include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Good packages include: moving company costs, temporary housing (30-60 days), travel expenses, storage fees, utility setup, home sale assistance, mortgage assistance, lump sum allowance. Negotiate package details before accepting offer. Tax implications for employer-provided benefits."
      }
    },
    {
      "@type": "Question",
      "name": "How to negotiate salary when relocating?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Research local market rates for your role. Account for cost of living difference. Highlight experience and value. Don't accept lower salary just because costs are lower - negotiate based on market value. Consider total compensation: benefits, bonuses, equity, remote work flexibility."
      }
    },
    {
      "@type": "Question",
      "name": "What non-financial factors matter in relocation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Consider: career trajectory, job market size, climate/weather, proximity to family, cultural fit, commute quality, schools (if children), healthcare access, dating/social life, outdoor activities, political environment, crime rates, community feel. Visit before committing if possible."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Relocation ROI Calculator - Moving Financial Analysis',
  description: 'Calculate the financial return and break-even timeline of relocating for a job.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <RelocationCalculator />
    </Suspense>
  );
}
