import type { Metadata } from 'next';
import { Suspense } from 'react';
import AMTCalculator from '@/components/AMTCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Alternative Minimum Tax (AMT)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AMT is a parallel tax system that ensures high-income taxpayers pay a minimum amount of tax. It adds back certain deductions and preferences to calculate AMT income, then applies 26% or 28% rates."
      }
    },
    {
      "@type": "Question",
      "name": "What are the AMT tax rates for 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AMT uses two rates: 26% on AMT income up to $220,700, and 28% on amounts above that threshold. The AMT exemption for 2026 is approximately $81,700 for single filers and $127,900 for married filing jointly."
      }
    },
    {
      "@type": "Question",
      "name": "What triggers the AMT?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common AMT triggers include: exercising incentive stock options (ISOs), large itemized deductions, accelerated depreciation, private activity bond interest, and miscellaneous deductions disallowed for AMT."
      }
    },
    {
      "@type": "Question",
      "name": "How is AMT exemption phased out?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The AMT exemption phases out at higher incomes. For single filers, exemption reduces by 25% of AMT income over $593,900. For married joint, phase-out starts at $954,300. Exemption can be fully eliminated at very high incomes."
      }
    },
    {
      "@type": "Question",
      "name": "Can I get AMT credit for future years?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. If you pay AMT, you generate an AMT credit that can be carried forward indefinitely. This credit can offset regular tax in future years when your regular tax exceeds AMT. File Form 8801 to track and claim AMT credit."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'AMT Calculator - Alternative Minimum Tax Calculation 2026',
  description: 'Calculate Alternative Minimum Tax (AMT) liability, exemption, and adjustments. Identify ISO, depreciation, and tax preference triggers. Form 6251 analysis.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AMTCalculator />
    </Suspense>
  );
}