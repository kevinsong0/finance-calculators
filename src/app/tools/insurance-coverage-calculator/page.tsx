import type { Metadata } from 'next';
import { Suspense } from 'react';
import InsuranceCoverageCalculator from '@/components/InsuranceCoverageCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much life insurance do I need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 10x income rule suggests coverage equal to 10 times your annual income. Add mortgage balance and major debts. For dependents, consider education costs. Example: $100K income + $250K mortgage = $1.25M coverage. Term life is most affordable for most families."
      }
    },
    {
      "@type": "Question",
      "name": "What insurance do I need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Essential insurance: health (mandatory), auto (required by law), homeowners/renters (protects assets), life (if dependents), disability (income protection). Optional but valuable: umbrella (extra liability), long-term care. Prioritize based on risk, assets, and family situation."
      }
    },
    {
      "@type": "Question",
      "name": "When do I need umbrella insurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Umbrella insurance recommended when net worth exceeds $500K, significant assets to protect, high liability risk (pool, rental property), or high income. Provides coverage above auto/home limits. Typical policy: $1-2M for $150-300/year. Covers lawsuits, libel, and some exclusions."
      }
    },
    {
      "@type": "Question",
      "name": "How much home insurance coverage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dwelling coverage: 80-100% of replacement cost (not market value). Contents: 50% of dwelling. Liability: $300K-500K minimum. Additional living expenses: 20% of dwelling. Don't insure land value. Check local construction costs for accurate replacement estimate."
      }
    },
    {
      "@type": "Question",
      "name": "What percentage of income should go to insurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Budget 10-15% of gross income for all insurance premiums. Health insurance: largest portion (employer subsidized reduces cost). Auto/home: 3-5% each. Life: 1% for term life. Disability: 1-2%. Umbrella: minimal. Adjust based on age, health, and family needs."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Insurance Coverage Calculator - Recommended Coverage Amounts',
  description: 'Calculate recommended insurance coverage for life, home, auto, disability, and umbrella based on your income, assets, and risk profile.',
  keywords: ['insurance calculator', 'insurance coverage', 'life insurance calculator', 'home insurance', 'auto insurance', 'umbrella insurance', 'disability insurance', 'insurance needs'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <InsuranceCoverageCalculator />
    </Suspense>
  );
}