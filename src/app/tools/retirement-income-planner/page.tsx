import type { Metadata } from 'next';
import { Suspense } from 'react';
import RetirementIncomePlanner from '@/components/RetirementIncomePlanner';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the 4% rule for retirement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "4% rule: withdraw 4% of retirement savings first year, adjust annually for inflation. Example: $1M savings = $40,000 first year withdrawal. Based on Trinity Study: diversified portfolio lasts 30+ years historically. Works for: 60% stocks, 40% bonds allocation. Adjust for: early retirement, lower returns, market conditions. Conservative: use 3% for safety."
      }
    },
    {
      "@type": "Question",
      "name": "How much do I need to save for retirement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Retirement savings goal: 10-12x annual income by retirement age. Example: $50k income needs $500k-$600k savings. Fidelity guidelines: Age 30: 1x salary, Age 40: 3x, Age 50: 6x, Age 60: 8x, Age 67: 10x. Consider: Social Security, pensions, healthcare costs, lifestyle. Use retirement calculator for personalized estimate. Save 15-20% of income."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate future retirement savings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Calculate future savings: Current savings × (1 + rate)^years + Monthly contribution × ((1 + monthly rate)^months - 1) / monthly rate. Example: $100k at 7% for 30 years + $500/mo = ~$800k total. Use online calculator for accurate estimate. Compound interest grows exponentially over time. Start early for maximum growth."
      }
    },
    {
      "@type": "Question",
      "name": "What is a safe withdrawal rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Safe withdrawal rate: 4% traditional rule, 3-3.5% more conservative for early retirement. Lower rate: portfolio lasts longer, safer for market volatility. Higher rate: more income, higher risk of depletion. Factors: retirement length, market returns, inflation, portfolio allocation. Stress-test plan for worst-case scenarios. Review annually."
      }
    },
    {
      "@type": "Question",
      "name": "When should I start saving for retirement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Start saving: immediately, compound interest powerful. Age 25: 40 years to grow, small amounts become large. Age 35: need to save more to catch up. Age 45: aggressive saving required. Start with: employer 401(k) match (free money), then IRA. Even small contributions matter. Rule: save 15% of income minimum. Earlier = exponentially better results."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Retirement Income Planner - Calculate Future Savings & Withdrawal',
  description: 'Plan retirement income with savings growth projection. Calculate future savings, safe withdrawal rate (4% rule), income gap analysis.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RetirementIncomePlanner />
    </Suspense>
  );
}