import type { Metadata } from 'next';
import { Suspense } from 'react';
import SocialSecurityCalculator from '@/components/SocialSecurityCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "When should I start collecting Social Security benefits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can start collecting Social Security at age 62, but benefits are reduced by up to 30%. Full Retirement Age (FRA) is 67 for most people, giving you 100% of your benefit. Waiting until age 70 increases benefits by 8% per year after FRA, potentially boosting your monthly payment by 24%."
      }
    },
    {
      "@type": "Question",
      "name": "How is Social Security calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Social Security benefits are based on your Average Indexed Monthly Earnings (AIME) over your 35 highest-earning years. The Primary Insurance Amount (PIA) is calculated using a progressive formula: 90% of the first $1,224, 32% of earnings between $1,224 and $7,356, and 15% of earnings above $7,356 (2024 bend points)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the maximum Social Security benefit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The maximum Social Security benefit in 2024 is $3,822 per month for someone who retires at Full Retirement Age (67). Retiring at age 70 can increase this to approximately $4,873 per month. To qualify for the maximum, you need 35 years of maximum taxable earnings ($168,600 in 2024)."
      }
    },
    {
      "@type": "Question",
      "name": "How many years do I need to work to qualify for Social Security?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You need 40 credits (approximately 10 years of work) to qualify for Social Security retirement benefits. You can earn up to 4 credits per year based on your earnings. The benefit amount is calculated using your highest 35 years of earnings, so working fewer than 35 years may reduce your benefit."
      }
    },
    {
      "@type": "Question",
      "name": "Can I work while collecting Social Security?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can work while collecting Social Security. If you're under Full Retirement Age, benefits may be reduced if your earnings exceed annual limits ($22,320 in 2024). In the year you reach FRA, the limit increases ($59,520 in 2024). After FRA, there's no earnings limit and benefits are recalculated to credit the withheld amounts."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Social Security Benefits Calculator - Estimate Your Retirement Income',
  description: 'Calculate your Social Security retirement benefits based on your income, retirement age, and years worked. Understand early retirement reductions and delayed retirement credits.',
  keywords: ['social security calculator', 'retirement benefits', 'social security estimate', 'SSA benefits', 'retirement income', 'early retirement', 'FRA calculator'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SocialSecurityCalculator />
    </Suspense>
  );
}