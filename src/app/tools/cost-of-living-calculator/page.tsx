import type { Metadata } from 'next';
import { Suspense } from 'react';
import CostOfLivingCalculator from '@/components/CostOfLivingCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a cost of living index?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A cost of living index compares expenses across locations. National average equals 100. Cities above 100 cost more than average (New York: 187), cities below 100 cost less (Houston: 96). The index factors housing, groceries, healthcare, transportation, and utilities."
      }
    },
    {
      "@type": "Question",
      "name": "How much salary difference should I expect when relocating?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Salary adjustments should match cost of living differences. Moving from Houston (96) to San Francisco (180) requires 87% higher salary to maintain lifestyle. However, negotiate based on local market rates, not just cost of living. Remote workers can leverage geographic arbitrage."
      }
    },
    {
      "@type": "Question",
      "name": "What are the highest cost of living cities?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Highest US cities: New York (187), San Francisco (180), San Diego (160), Los Angeles (166), Boston (142), Seattle (148). Housing drives most of the difference. Lower-cost alternatives include Houston (96), Phoenix (98), Atlanta (102), Austin (102)."
      }
    },
    {
      "@type": "Question",
      "name": "How does housing affect cost of living?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Housing accounts for 30-40% of cost of living index. Rent/mortgage differences dominate city comparisons. A $2,000 apartment in low-cost city may cost $4,500+ in high-cost city. Rent-to-income ratio should ideally stay under 30% regardless of location."
      }
    },
    {
      "@type": "Question",
      "name": "Should I move to a lower cost city?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Consider: salary reduction vs cost savings ratio, job market, career growth opportunities, lifestyle preferences, family considerations. Geographic arbitrage works best for remote workers earning high-city salaries while living in low-cost areas. Weigh non-financial factors carefully."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Cost of Living Calculator - Compare City Expenses',
  description: 'Calculate salary needed to maintain your lifestyle when moving to a different city.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CostOfLivingCalculator />
    </Suspense>
  );
}
