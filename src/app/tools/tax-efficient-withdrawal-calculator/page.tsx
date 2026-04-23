import type { Metadata } from 'next';
import { Suspense } from 'react';
import TaxEfficientWithdrawalCalculator from '@/components/TaxEfficientWithdrawalCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best order to withdraw from retirement accounts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recommended order: 1. Taxable accounts (lowest capital gains rates). 2. Traditional IRA/401(k) (fill lower tax brackets). 3. Roth (preserve for high-tax years, late retirement, estate). This minimizes total lifetime taxes. Adjust based on RMD requirements after age 73."
      }
    },
    {
      "@type": "Question",
      "name": "How can I minimize taxes on retirement withdrawals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bracket fill: Withdraw Traditional up to bracket limit, avoid pushing into higher bracket. Use taxable accounts first (capital gains vs ordinary income). Roth conversions in low-income years. Tax-loss harvesting in taxable accounts. QCD for charitable giving from Traditional (tax-free up to $105K). Consider Social Security taxation impact."
      }
    },
    {
      "@type": "Question",
      "name": "When should I use Roth vs Traditional withdrawals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use Traditional: In low-income years, to fill lower brackets, when expecting lower future rates. Use Roth: In high-income years, for large one-time expenses, expecting higher future rates, late retirement, estate planning (heirs inherit tax-free). Balance both for flexibility."
      }
    },
    {
      "@type": "Question",
      "name": "How do RMDs affect withdrawal strategy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "After age 73 (SECURE Act 2.0), RMDs required from Traditional accounts. Must withdraw RMD first before optimizing. RMDs may push into higher brackets. Strategy: Roth conversions before RMD age reduce future RMDs and taxes. QCD satisfies RMD tax-free. Plan withdrawals years ahead of RMD start."
      }
    },
    {
      "@type": "Question",
      "name": "What account types have different tax treatment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Traditional/401(k): Ordinary income rates (22%+ federal + state). Roth: Tax-free withdrawals (no federal or state tax). Taxable/Brokerage: Capital gains rates (0%/15%/20% on growth, basis tax-free). Strategy: Use lowest-taxed accounts first, preserve Roth for flexibility and estate."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Tax-Efficient Withdrawal Calculator - Optimize Retirement Account Withdrawals',
  description: 'Calculate optimal withdrawal strategy from Traditional IRA, Roth IRA, and taxable accounts. Minimize taxes with proper account ordering.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <TaxEfficientWithdrawalCalculator />
    </Suspense>
  );
}