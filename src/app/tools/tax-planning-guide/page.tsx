import type { Metadata } from 'next';
import { Suspense } from 'react';
import TaxPlanningGuide from '@/components/TaxPlanningGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is tax planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tax planning: Strategic approach to minimize legal tax liability. Goals: Reduce taxes owed, maximize deductions/credits, defer income where beneficial, take advantage of tax-advantaged accounts. Strategies: Maximize deductions (track all eligible expenses), contribute to 401k/IRA (reduce taxable income), manage capital gains (hold long-term, offset with losses), use HSA (triple tax advantage), timing (defer income, accelerate deductions), charitable giving (deductions). Not tax evasion: Legal strategies vs illegal hiding income. Planning = year-round activity. Review mid-year and before December 31. Professional help valuable for complex situations. Tax planning = paying what&apos;s legally owed, not more. Use available legal strategies."
      }
    },
    {
      "@type": "Question",
      "name": "Should I itemize or take standard deduction?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard vs itemized deduction: Standard deduction (2023): Single $13,850, Married $27,700. No documentation needed. Itemized: Sum of eligible deductions - mortgage interest, SALT (capped $10k), charitable donations, medical expenses (exceed 7.5% AGI). Requires documentation. Choose: Higher amount wins. If itemized > standard = itemize. If standard > itemized = take standard. Simplified: Most taxpayers now take standard (higher since 2018). Itemize when: Large mortgage interest, significant charitable giving, high state taxes (within cap), major medical expenses. Check both options each year. Documentation required for itemizing. Use tax software to compare automatically."
      }
    },
    {
      "@type": "Question",
      "name": "What is tax-loss harvesting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tax-loss harvesting: Sell investments at loss to offset capital gains. How it works: Realized losses offset realized gains, reduces taxable capital gains, $3k excess losses offset ordinary income annually, carry forward unused losses. Example: $5k gains, $7k losses = $0 taxable gains, $2k loss offset income next $2k carry-forward. Rules: Wash sale rule - can&apos;t buy same/similar within 30 days, wait 30 days or buy different fund, long-term losses offset long-term gains first, short-term offset short-term. Timing: Review before year-end, consider throughout year, rebalance while harvesting. Benefits: Reduce taxes, maintain portfolio balance. Consider: Transaction costs, future gains when selling replacement, don&apos;t let tax drive investment decisions entirely. Tax-loss harvesting = useful strategy. Automated in many platforms. Review annually."
      }
    },
    {
      "@type": "Question",
      "name": "How does a 401(k) reduce taxes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "401(k) tax benefits: Traditional 401k: Contributions reduce taxable income now, contribution limit $22,500 (2023), +$7,500 catch-up if 50+, employer match = additional free money, grow tax-deferred, taxed when withdrawn (retirement). Roth 401k: Contributions don&apos;t reduce income now, grow tax-free, tax-free withdrawals in retirement. Example: $50k income, contribute $10k = taxable income $40k, save taxes at your bracket rate. Employer match: Often 3-6% of salary, free money, contributes to limit. Benefit: Lower taxes now + retirement savings + employer match. Maximize: At least enough for full employer match, ideally max contribution if possible. 401k = primary retirement + tax tool. Contribute enough for match minimum. Max if budget allows."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between deduction and credit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tax deduction vs credit: Deduction: Reduces taxable income. Value depends on tax bracket. Example: $1,000 deduction, 24% bracket = $240 tax savings. Higher bracket = higher savings. Credits: Reduces tax directly, dollar-for-dollar reduction. Example: $1,000 credit = $1,000 tax reduction. Full value regardless of bracket. Types: Nonrefundable credits (reduce to $0, not below), refundable credits (can get refund if exceed tax). Credits more valuable: $1,000 credit > $1,000 deduction. Examples: Deductions - mortgage interest, charitable donations, student loan interest. Credits - Child tax credit ($2,000), Earned Income Credit, education credits, energy credits. Both reduce taxes. Credits = better. Claim all eligible deductions and credits. Don&apos;t miss credits especially."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Tax Planning Guide - Strategies, Deductions & Tips',
  description: 'Tax planning strategies, deductions, tax-advantaged accounts, and tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TaxPlanningGuide />
    </Suspense>
  );
}