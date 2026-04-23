import type { Metadata } from 'next';
import { Suspense } from 'react';
import LongTermCareInsuranceCalculator from '@/components/LongTermCareInsuranceCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "When should I buy long-term care insurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The ideal age to purchase LTC insurance is between 55-65. Premiums are lower when you're younger and healthier, and you're more likely to qualify medically. Buying too early (before 50) may mean paying premiums for decades before needing coverage, while buying too late (after 70) can result in very high premiums or denial due to health conditions."
      }
    },
    {
      "@type": "Question",
      "name": "How much long-term care insurance coverage do I need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Coverage should match local care costs. The national average nursing home cost is $8,000/month ($240/day). Consider a daily benefit of $150-300 depending on your area. Benefit periods typically range from 2-5 years, though lifetime coverage is available at higher premiums. Most people need 3 years of coverage based on average care duration."
      }
    },
    {
      "@type": "Question",
      "name": "What is the elimination period in LTC insurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The elimination period is the waiting time before benefits begin, similar to a deductible in days. Common options are 30, 60, 90, or 180 days. A longer elimination period (90-180 days) lowers premiums but requires you to pay for initial care costs yourself. Choose based on your savings ability to cover the gap."
      }
    },
    {
      "@type": "Question",
      "name": "Should I choose inflation protection for my LTC policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Inflation protection is important if you're buying young (55-60). Simple inflation (3% annual increase) costs about 25% more, while compound inflation (5% growth) costs 50% more. Without inflation protection, a $200 daily benefit in 20 years will be worth far less due to rising care costs. For buyers over 70, inflation protection may not be cost-effective."
      }
    },
    {
      "@type": "Question",
      "name": "Is long-term care insurance worth the cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "LTC insurance value depends on your assets and family situation. A benefit-to-premium ratio above 2x suggests good value. If you have significant assets ($500K+) to protect and no family members able to provide care, insurance can preserve your estate. However, if premiums would strain your budget or you qualify for Medicaid when care is needed, self-insurance or hybrid policies may be better alternatives."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Long-Term Care Insurance Calculator - Estimate LTC Premiums & Benefits',
  description: 'Calculate long-term care insurance premiums based on age, health, and coverage options. Compare insurance costs vs self-insurance savings.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LongTermCareInsuranceCalculator />
    </Suspense>
  );
}