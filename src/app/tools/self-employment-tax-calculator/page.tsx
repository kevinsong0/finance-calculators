import type { Metadata } from 'next';
import { Suspense } from 'react';
import SelfEmploymentTaxCalculator from '@/components/SelfEmploymentTaxCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the self-employment tax rate for 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Self-employment tax is 15.3% of 92.35% of net income. Breakdown: Social Security 12.4% up to $176,100 wage base, Medicare 2.9% no limit, Additional Medicare 0.9% over $200K. Effective rate on full income is ~14.13%. Deduct 50% of SE tax on Schedule SE."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate self-employment tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SE tax = (net income x 0.9235) x 15.3%. Example: $80,000 net income x 0.9235 = $73,880 SE base. $73,880 x 0.153 = $11,287 SE tax. Social Security portion capped at wage base ($176,100 for 2026). Medicare has no cap. Pay quarterly via Form 1040-ES."
      }
    },
    {
      "@type": "Question",
      "name": "Should I form an S-Corp to save on self-employment tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "S-Corp can save SE tax if net income exceeds ~$60-80K. S-Corp owners pay FICA only on salary, not distributions. Example: $100K income with 60% salary pays FICA on $60K only, saving ~$3,000. Tradeoffs: payroll costs, reasonable salary requirement, S-Corp filing. Consult tax advisor."
      }
    },
    {
      "@type": "Question",
      "name": "When do I pay self-employment tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pay quarterly via estimated taxes (Form 1040-ES): April 15, June 15, September 15, January 15. Each payment covers income tax + SE tax. Underpayment penalty if owe $1,000+ at year-end. Safe harbor: pay 100% of last year's tax (110% if AGI over $150K)."
      }
    },
    {
      "@type": "Question",
      "name": "Can I deduct self-employment tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, deduct 50% of SE tax on Schedule SE. This reduces income tax but not SE tax itself. The deduction represents the 'employer' portion of FICA that employees don't pay. Claim on Form 1040 as adjustment to income (above-the-line deduction)."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Self-Employment Tax Calculator - Calculate 2026 SE Tax & S-Corp Savings',
  description: 'Calculate self-employment tax including Social Security, Medicare, and potential S-Corporation tax savings. Estimate quarterly payments.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SelfEmploymentTaxCalculator />
    </Suspense>
  );
}