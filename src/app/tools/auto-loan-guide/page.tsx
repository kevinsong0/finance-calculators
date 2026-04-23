import type { Metadata } from 'next';
import { Suspense } from 'react';
import AutoLoanGuide from '@/components/AutoLoanGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I get the best auto loan rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Best auto loan rate strategies: Before shopping: Check credit score (740+ for best rates), improve score if needed, save for down payment (10-20% ideal), set budget for total cost. Pre-approval: Get quotes from bank/credit union first, online lenders for comparison, know your rate before dealer visit, pre-approval shows your budget. Rate comparison: Compare at least 3 lenders, check APR not just rate, same day quotes, same loan term. Dealer financing: Compare dealer offer to pre-approval, dealers can markup rates, manufacturer offers may be competitive for new cars, negotiate car price before financing discussion. Rate factors: Credit score major impact (740+ = best rates), loan term shorter = lower rate, new vs used (new = lower rates), down payment reduces rate. Best approach: Pre-approval first, compare multiple sources, negotiate car price separately, choose shorter term if affordable. Pre-approval + comparison = best rate. Dealer convenience vs outside savings. 1% lower = hundreds/thousands saved."
      }
    },
    {
      "@type": "Question",
      "name": "What credit score do I need for an auto loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Auto loan credit score requirements: Score ranges: 740+ - Excellent rates (4-6% typical for new), 700-739 - Good rates (5-8% typical), 650-699 - Fair rates (8-12% typical), 600-649 - Poor rates (12-18% typical), Below 600 - Very poor rates (18-25%+ or may not qualify). Approval possible: Most scores can qualify with some lenders, lower scores = higher rates, subprime lenders available but expensive. Score impact: 100 point difference can mean 5-10% rate difference, thousands in extra interest over loan. Improving score: Pay bills on time, reduce credit card balances, don&apos;t open new credit, check for errors. Pre-shopping check: Know score 1-2 months before buying, time to improve if needed, affects rate significantly. Minimum varies by lender, some approve 550+ with high rates. Better score = better rate. Check early, improve if possible. 700+ = competitive rates. Below 650 = expensive."
      }
    },
    {
      "@type": "Question",
      "name": "How long should my auto loan term be?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Auto loan term considerations: Typical terms: 36 months - shortest, lowest rate, highest payment, least interest. 48 months - moderate, good balance. 60 months - most common, moderate interest. 72 months - long, more interest, higher rate. 84+ months - very long, highest interest, risk of negative equity. Term impact: Longer term = lower payment but more interest total, longer term = typically higher rate, longer term = more risk of owing more than car value. Example: $25,000 loan at 6%: 48 months = $587/month, $2,300 interest total. 72 months = $414/month, $5,700 interest total. Same rate, 2x interest for longer term. Recommendation: 48-60 months ideal balance, under 72 months strongly recommended, payment affordable within budget, car loan ends before major repairs expected. Avoid 72+ months: More total interest, higher rates, negative equity risk, car value drops while loan continues. Shorter = less interest. Longer = more interest even if rate same. Choose affordable payment in reasonable term (48-60 months)."
      }
    },
    {
      "@type": "Question",
      "name": "Should I use dealer financing or get a bank loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dealer vs bank financing: Bank/credit union advantages: Often lower rates (1-3% less typical), pre-approval sets budget, rate not marked up, established relationship, no dealer pressure. Bank disadvantages: Requires separate application, less convenient, may take longer, no manufacturer incentives. Dealer financing advantages: Convenient one-stop, manufacturer incentives possible (0% offers), quick process, special programs for new cars. Dealer disadvantages: Rates may be marked up, pressure tactics, may push longer terms, less comparison ability, profit from financing. Strategy: Get pre-approval from bank first, know your rate, let dealer try to beat it, manufacturer 0% offers can be excellent, compare both options, choose best total deal. When to use dealer: Manufacturer offers (0% APR specials), dealer rate beats pre-approval, convenience matters more. When to use bank: Pre-approval rate is lower, no special manufacturer offers, want established lender relationship. Best approach: Pre-approval first, then compare. Bank rate as backup, dealer may beat it. Choose lowest total cost."
      }
    },
    {
      "@type": "Question",
      "name": "What is negative equity in auto loans?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Negative equity explained: Definition: Loan balance exceeds car value, owe more than car worth, also called being upside down. Causes: Long loan terms (72+ months), no/low down payment, car value drops fast (new cars), rolling old loan balance into new loan. Example: Bought car for $30,000 with 0 down, 72 month loan, after 2 years: owe $22,000, car worth $18,000, negative equity = $4,000. Risks: Can&apos;t sell without paying difference, total loss if car stolen/destroyed (gap insurance needed), harder to trade in, loan payoff requires extra cash. Avoiding negative equity: Larger down payment (10-20%), shorter loan term (48-60 months), buy reliable car (holds value), avoid rolling old loan into new. If in negative equity: Keep car until equity positive, pay extra to reduce balance, gap insurance protects against total loss, don&apos;t roll into next loan (makes problem worse). Negative equity = financial trap. Prevent with down payment, shorter term. Don&apos;t roll old negative equity into new loan."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Auto Loan Guide - Types, Rates & Best Practices',
  description: 'Loan types, rate factors, term advice, and financing comparison.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AutoLoanGuide />
    </Suspense>
  );
}