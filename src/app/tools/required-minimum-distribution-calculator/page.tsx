import type { Metadata } from 'next';
import { Suspense } from 'react';
import RequiredMinimumDistributionCalculator from '@/components/RequiredMinimumDistributionCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the RMD age under SECURE Act 2.0?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SECURE Act 2.0 raised RMD ages: Born before 1950 - RMD at 72. Born 1950-1959 - RMD at 73. Born 1960 or later - RMD at 75. First RMD deadline is April 1 of the year after reaching RMD age. Subsequent RMDs due December 31 each year."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate my required minimum distribution?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "RMD = Account balance (Dec 31 prior year) / Distribution period factor from IRS Uniform Lifetime Table. Factor depends on age: Age 73 factor = 26.5, Age 75 factor = 24.6, decreasing each year. Spouse more than 10 years younger uses Joint Life table with larger factor."
      }
    },
    {
      "@type": "Question",
      "name": "What is the penalty for missing an RMD?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Missed RMD penalty is 25% of the shortfall (reduced to 10% if corrected timely under SECURE Act 2.0). Example: $10,000 RMD missed = $2,500 penalty. File Form 5329, request penalty waiver for reasonable cause. Take missed distribution ASAP to reduce penalty."
      }
    },
    {
      "@type": "Question",
      "name": "Do Roth IRAs have required minimum distributions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, Roth IRAs have no RMD during the owner's lifetime. Roth 401(k) plans DID have RMDs before 2024, but SECURE Act 2.0 eliminated Roth 401(k) RMDs starting 2024. Inherited Roth IRAs follow 10-year rule (except eligible designated beneficiaries)."
      }
    },
    {
      "@type": "Question",
      "name": "Can I avoid or reduce my RMD?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Strategies to reduce RMD impact: Roth conversions before RMD age (reduces Traditional balance), Qualified Charitable Distribution (QCD up to $105K tax-free), still-working exception for 401(k) if employed, delay first RMD to April 1, aggregate IRAs take from highest-balance account."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Required Minimum Distribution Calculator - RMD Calculator 2026',
  description: 'Calculate IRS required minimum distribution for Traditional IRA, 401(k), and retirement accounts based on SECURE Act 2.0 age rules.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <RequiredMinimumDistributionCalculator />
    </Suspense>
  );
}