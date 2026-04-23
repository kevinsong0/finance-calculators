import type { Metadata } from 'next';
import { Suspense } from 'react';
import EarlyRetirementPenaltyCalculator from '@/components/EarlyRetirementPenaltyCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the early withdrawal penalty for retirement accounts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "10% penalty on withdrawals before age 59.5 from Traditional IRA, 401(k), 403(b), and similar accounts. Plus regular income tax on withdrawal. Example: $10,000 early withdrawal = $1,000 penalty + income tax. Penalty waived for certain exceptions. Roth contributions withdrawable anytime tax-free."
      }
    },
    {
      "@type": "Question",
      "name": "What exceptions avoid the 10% early withdrawal penalty?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common exceptions: Rule of 55 (401k, left job after 55), first-time home buyer (IRA, $10K limit), medical expenses > 7.5% AGI, disability, education (IRA), birth/adoption ($5K), 72(t) substantially equal payments, military reservist, IRS levy, death (beneficiary). Document eligibility carefully."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Rule of 55 for 401(k) withdrawals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leave employer during or after calendar year you turn 55, can withdraw penalty-free from that employer's 401(k). Public safety employees: Age 50. Must keep money in that 401(k) - rolling to IRA loses Rule of 55. Only applies to that employer's plan. Not available for IRA."
      }
    },
    {
      "@type": "Question",
      "name": "Can I withdraw Roth IRA contributions early?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Roth contributions withdrawable anytime tax-free and penalty-free. Earnings subject to 10% penalty before 59.5 and 5-year rule. Exceptions apply to earnings too (first home, disability, education). Order of withdrawals: Contributions first, then conversions, then earnings."
      }
    },
    {
      "@type": "Question",
      "name": "What are alternatives to early retirement withdrawal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "401(k) loan: Up to $50K or 50% balance, no penalty, interest to yourself. Roth contributions: Tax-free anytime. Home equity loan: Lower rate, no retirement impact. 72(t) payments: Penalty-free if structured correctly. Side income: Avoid touching retirement. Emergency fund: Build before tapping retirement."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Early Retirement Withdrawal Penalty Calculator - 10% Penalty & Exceptions',
  description: 'Calculate early withdrawal penalty for 401(k) and IRA before age 59.5. Check exceptions like Rule of 55, first home buyer, medical expenses.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <EarlyRetirementPenaltyCalculator />
    </Suspense>
  );
}