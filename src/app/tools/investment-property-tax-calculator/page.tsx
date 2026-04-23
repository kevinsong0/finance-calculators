import type { Metadata } from 'next';
import { Suspense } from 'react';
import InvestmentPropertyTaxCalculator from '@/components/InvestmentPropertyTaxCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is rental income taxed for investment properties?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rental income is taxed as ordinary income at your marginal tax rate. However, you can deduct expenses including mortgage interest, property taxes, insurance, repairs, depreciation, and management fees. Net rental income = gross rent minus all deductible expenses."
      }
    },
    {
      "@type": "Question",
      "name": "What is the depreciation deduction for investment property?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Residential rental property depreciates over 27.5 years using straight-line method. The annual depreciation deduction is property cost minus land value divided by 27.5. Land cannot be depreciated. Commercial property uses 39-year depreciation."
      }
    },
    {
      "@type": "Question",
      "name": "What is the capital gains tax rate on investment property?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Long-term capital gains (property held over 1 year) are taxed at 0%, 15%, or 20% based on income. Short-term gains (under 1 year) are taxed as ordinary income. Plus, depreciation recapture (25% rate) applies to accumulated depreciation claimed."
      }
    },
    {
      "@type": "Question",
      "name": "Can I deduct property taxes on investment property?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, property taxes on investment real estate are fully deductible against rental income. Unlike personal residence property taxes (limited by SALT cap $10K), investment property taxes have no deduction limit."
      }
    },
    {
      "@type": "Question",
      "name": "How does 1031 exchange help avoid capital gains tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 1031 exchange allows deferral of capital gains tax by reinvesting sale proceeds into a similar investment property within 180 days. Both properties must be held for investment or business use. The gain is deferred until the replacement property is sold without another exchange."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Investment Property Tax Calculator - Rental Income & Depreciation Analysis',
  description: 'Calculate investment property taxes including rental income tax, depreciation deductions, capital gains, and property tax analysis for real estate investors.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <InvestmentPropertyTaxCalculator />
    </Suspense>
  );
}