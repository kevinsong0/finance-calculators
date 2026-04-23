import type { Metadata } from 'next';
import { Suspense } from 'react';
import TaxEfficientInvestingGuide from '@/components/TaxEfficientInvestingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I invest tax-efficiently?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tax-efficient investing approach: Account priority: 1. 401(k) to employer match (free return). 2. IRA (Roth or Traditional based on tax situation). 3. 401(k) beyond match (higher limit). 4. HSA (triple tax benefit). 5. Taxable brokerage (flexibility, no limits). Roth vs Traditional: Roth - pay tax now, tax-free later. Good for young, expect higher future taxes, income below deduction threshold. Traditional - tax deduction now, taxed later. Good for high current income, expect lower retirement taxes. Asset location: Put tax-inefficient assets (bonds, REITs, high-dividend stocks) in tax-advantaged accounts. Put tax-efficient assets (index funds, growth stocks) in taxable accounts. Municipal bonds already tax-free, put in taxable. Holding periods: Hold over 1 year for long-term capital gains rates (0-20% vs ordinary income rates up to 37%). Avoid frequent trading in taxable accounts. Tax-loss harvesting: Offset gains with losses, $3,000 annual deduction limit, carry forward excess losses. Tax efficiency = higher net returns. Wrong account = unnecessary taxes. Account choice + asset location + holding period."
      }
    },
    {
      "@type": "Question",
      "name": "What is asset location in investing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Asset location explained: Definition: Which account type holds which assets. Different accounts have different tax treatments. Match assets to account tax treatment. Tax-inefficient assets (for tax-advantaged): Bonds - interest taxed as ordinary income, REITs - dividends taxed higher, high-yield dividend stocks - taxable distributions, actively traded funds - frequent taxable events. Tax-efficient assets (OK in taxable): Index funds - low turnover, few taxable events, growth stocks - no dividends, taxed only when sold, ETFs often - lower turnover than mutual funds, municipal bonds - already tax-free interest. Placement logic: High-tax assets in tax-advantaged accounts where they grow untaxed. Low-tax assets in taxable accounts where tax impact minimal. Don&apos;t waste tax-advantaged space on already tax-free investments. Asset location = tax optimization. Wrong placement = unnecessary taxes. Tax-inefficient → tax-advantaged, efficient → taxable."
      }
    },
    {
      "@type": "Question",
      "name": "Should I choose Roth or Traditional IRA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Roth vs Traditional decision: Roth IRA: Contribution taxed now, growth tax-free, withdrawal tax-free (after 59.5, 5 years). Best when: Young (long growth period), expect higher future taxes, income below deduction threshold, want tax-free retirement income, flexibility (no required withdrawals). Traditional IRA: Contribution tax-deductible (if eligible), growth tax-deferred, withdrawal taxed as income. Best when: High current income (deduction valuable), expect lower retirement taxes, need tax break now, near peak earning years. Consider both: Income-based - Traditional if high income now, Roth if lower income. Age-based - Roth for young (growth period), Traditional for older. Tax bracket - compare current vs expected retirement bracket. Employer plan affects Traditional IRA deduction eligibility. Hedging strategy: Some in each account type for flexibility, tax diversification in retirement. Match to situation. Roth = tax-free later, Traditional = tax break now. Compare current vs future tax rates."
      }
    },
    {
      "@type": "Question",
      "name": "What is tax-loss harvesting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tax-loss harvesting explained: Definition: Sell investments at loss to offset gains, reduce tax liability. Mechanism: Losses offset gains dollar-for-dollar, reduces net taxable gains, additional $3,000 loss deduction against ordinary income per year, excess losses carry forward to future years. Process: Identify investments with losses, sell to realize loss, offset current year&apos;s gains, reinvest proceeds (avoid wash sale rule - wait 30 days or buy different investment). Rules: Wash sale rule - can&apos;t buy same investment within 30 days, repurchasing disallows loss deduction. Alternative: Buy similar but different fund, wait 31 days then repurchase. Timing: Typically end of year for tax planning, can do throughout year. Considerations: Transaction costs, investment strategy impact, don&apos;t sell just for tax benefit if long-term hold, market timing risk during 30-day gap. Limits: $3,000 annual ordinary income offset, unlimited gain offset, carry forward unused losses. Tax-loss harvesting = tax reduction. Realized losses = tax benefit. Offset gains, deduct $3,000, carry forward, avoid wash sales."
      }
    },
    {
      "@type": "Question",
      "name": "How are investment gains taxed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Investment taxation: Dividends: Qualified dividends - long-term capital gains rates (0-20%). Non-qualified dividends - ordinary income rates. Most stock dividends are qualified if holding period met. Interest: Bond interest - ordinary income rates (up to 37%). Savings interest - ordinary income rates. Municipal bond interest - tax-free (federal). Capital gains: Short-term (under 1 year) - ordinary income rates (up to 37%). Long-term (1+ year) - preferential rates: 0% - income under $44,625 (single). 15% - most taxpayers. 20% - high income ($492,300+ single). Long-term advantage: Significant tax savings vs short-term, incentive to hold longer, tax-efficient strategy. Fund distributions: Mutual funds pass through gains/dividends, taxable even if not sold, ETFs often more tax-efficient, check fund&apos;s tax efficiency rating. Investment taxation matters. Hold 1+ year for lower rates. Qualified dividends taxed favorably. Tax-advantaged accounts defer/eliminate taxation."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Tax-Efficient Investing Guide - Accounts, Asset Location & Strategies',
  description: 'Tax-advantaged accounts, asset location, capital gains rates, and tax strategies.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TaxEfficientInvestingGuide />
    </Suspense>
  );
}