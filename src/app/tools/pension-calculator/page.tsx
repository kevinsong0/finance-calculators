import type { Metadata } from 'next';
import { Suspense } from 'react';
import PensionCalculator from '@/components/PensionCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is a defined benefit pension calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A defined benefit pension is typically calculated using the formula: Pension = Final Salary × Multiplier × Years of Service. The multiplier ranges from 1% to 2.5% depending on your employer. For example, $80,000 × 1.5% × 20 years = $24,000 annual pension."
      }
    },
    {
      "@type": "Question",
      "name": "What is pension vesting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pension vesting determines when you have a legal right to your pension benefits. Most employer pensions require 5 years of service for full vesting. Cliff vesting gives full rights after a specific period, while graded vesting grants rights gradually over time. Always check your plan documents for specific vesting rules."
      }
    },
    {
      "@type": "Question",
      "name": "Should I choose a lump sum or monthly pension payments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Choosing between a lump sum and monthly payments depends on your circumstances. Lump sums offer flexibility and control but require investment management. Monthly annuity payments provide guaranteed income for life. Consider your health, other income sources, investment skills, and inflation impact when making this decision."
      }
    },
    {
      "@type": "Question",
      "name": "What is a joint and survivor pension option?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A joint and survivor pension option provides continued payments to your spouse after your death. This reduces your monthly payment during your lifetime, typically by 10-20%, but ensures your surviving spouse receives 50-100% of your pension for their lifetime. This is important for married couples relying on pension income."
      }
    },
    {
      "@type": "Question",
      "name": "How does early retirement affect my pension?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Early retirement typically reduces your pension benefit. Many plans apply a reduction factor of 5-7% per year before the normal retirement age (usually 65). For example, retiring at 62 might reduce your pension by 15-21%. Some plans offer unreduced early retirement with sufficient years of service."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Pension Calculator - Estimate Defined Benefit Retirement Pension',
  description: 'Calculate your pension benefits based on years of service, final salary, and retirement age. Understand vesting, early retirement reductions, and payout options.',
  keywords: ['pension calculator', 'defined benefit pension', 'retirement pension', 'pension estimate', 'years of service', 'pension formula', 'vesting', 'pension options'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PensionCalculator />
    </Suspense>
  );
}