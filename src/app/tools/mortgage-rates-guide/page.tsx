import type { Metadata } from 'next';
import { Suspense } from 'react';
import MortgageRatesGuide from '@/components/MortgageRatesGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What affects mortgage rates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mortgage rate factors: Credit score: 740+ = best rates, 700-739 = good rates, 680-699 = acceptable rates, 620-679 = higher rates. 100 point difference can affect 0.5-1% rate. Down payment: 20% = best rates, avoids PMI, 10-15% = good rates, PMI required, 5% or less = higher rates, PMI required. Larger down payment = lower risk to lender = lower rate. Loan term: 15-year = lower rate (0.25-0.5% less), higher payment, paid faster. 30-year = higher rate, lower payment, longer term. Loan type: Conventional = typically lowest rates, FHA = slightly higher, VA = competitive for eligible, USDA = competitive for eligible. Property use: Primary residence = lowest rates, second home = slightly higher, investment = highest rates. Market rates: Federal Reserve policy, inflation, economy, bond markets affect all rates. Rate = your profile + market conditions. Improve your factors, watch market, compare lenders."
      }
    },
    {
      "@type": "Question",
      "name": "Should I pay points to lower my mortgage rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mortgage points decision: What are points: 1 point = 1% of loan amount ($2,000 on $200,000 loan), typically reduces rate by 0.25%, paid at closing. Example: $200,000 loan, pay 2 points ($4,000) to reduce 6.5% rate to 6.0%. Breakeven calculation: Monthly savings from lower rate divided by points cost = months to breakeven. Example: Lower rate saves $100/month, paid $4,000 in points, breakeven = 40 months. When to pay points: Planning to stay 5+ years (past breakeven), have cash for closing, long-term savings matter, rate reduction significant. When not to pay points: Short-term ownership (under 5 years), limited cash for closing, small rate improvement, better use for funds elsewhere. Alternatives: Use cash for larger down payment, save for reserves, invest elsewhere if return higher. Points = long-term savings vs upfront cost. Calculate breakeven. Stay past breakeven = points win. Leave early = points lose."
      }
    },
    {
      "@type": "Question",
      "name": "How do I compare mortgage lenders?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mortgage lender comparison: Get multiple quotes: At least 3 lenders, same loan type/term for comparison, same day quotes (rates change), provide same information to each. Compare correctly: APR - includes rate + costs, better comparison than rate alone, loan estimate form - standardized format, closing costs, not just rate. What to compare: Interest rate, APR, closing costs breakdown, points option, lender fees, rate lock terms, pre-approval timeline, customer service reputation. Compare apples to apples: Same loan amount, same loan term, same loan type, same down payment. Hidden costs: Application fees, underwriting fees, processing fees, document prep fees, ask for complete breakdown. Timing: Quotes valid typically 1-3 days, apply when rate good, rate lock when approved. Online vs local: Online lenders - often lower rates, less personal service, local lenders - relationships, faster issues resolution. Compare = find best deal. 0.25% lower = thousands saved. Same day quotes, compare APR, check all costs."
      }
    },
    {
      "@type": "Question",
      "name": "What is a rate lock?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rate lock explained: Definition: Lender guarantees specific rate for lock period, protects from market rate increases, lock expires if not closed by deadline. Lock terms: 30 days - shortest, lowest cost (or free), 45-60 days - common for purchases, small fee possible, 90+ days - longest, higher fee, rate slightly higher. When to lock: After approval, when rate is good, before market increases, close to closing timeline. Market timing: If rates rising - lock quickly, if rates falling - consider floating (risk), if stable - lock when comfortable. Lock cost: Shorter locks often free, longer locks have fees, may include slightly higher rate. After lock: Rate won&apos;t change during lock period, must close by deadline, if delayed may need extension (fee), if expires rate may change to current market. What happens if rate drops: Locked rate stays (no benefit), some lenders offer float-down option (rare, extra cost), market could also go up after lock. Rate lock = rate guarantee. Lock when good rate, before closing. Cost varies by length. Don&apos;t let lock expire."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between rate and APR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rate vs APR: Interest rate: Pure borrowing cost, percentage of loan amount, determines monthly payment, doesn&apos;t include fees. APR (Annual Percentage Rate): Rate + most costs included, true cost comparison, required disclosure, helps compare lenders. APR includes: Interest rate, loan origination fees, points, broker fees, closing costs, some other charges. APR excludes: Appraisal, inspection, credit report, title fees (some), notary fees, other third-party fees. Example: Rate 6.5% with $5,000 fees, APR might be 6.75% (spread cost over loan life). APR = rate + lender costs spread over term. APR typically higher than rate, better for comparison, shows true cost. Using for comparison: Compare APR between lenders, same loan type/term, lower APR = lower total cost. Caveats: APR spread over full term (30 years), if selling earlier actual cost different, APR calculation can vary slightly by lender. APR = comparison tool. Rate = monthly payment. Use APR to compare total cost between lenders."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Mortgage Rates Guide - Factors, Types & Comparison',
  description: 'Rate factors, loan types comparison, points decision, and lender comparison.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MortgageRatesGuide />
    </Suspense>
  );
}