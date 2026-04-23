import type { Metadata } from 'next';
import { Suspense } from 'react';
import InvestmentReturnCalculator from '@/components/InvestmentReturnCalculator';

const faqs = [
  {
    q: "How do I calculate investment returns?",
    a: "Investment returns are calculated using compound interest: FV = P(1+r)^n + PMT[((1+r)^n-1)/r], where P is initial investment, r is periodic rate, n is periods, PMT is monthly contribution. This calculator shows your projected growth over time with visual charts."
  },
  {
    q: "What is a realistic annual return for investments?",
    a: "Historical averages: S&P 500 stock market returns about 10% annually over long periods. Bonds return 4-6%. Balanced portfolio (60% stocks, 40% bonds) returns 7-8%. Conservative portfolios return 5%. Your actual return depends on asset allocation and market conditions."
  },
  {
    q: "How much should I invest monthly?",
    a: "General guidelines: invest 10-15% of income for retirement. If starting late, increase to 20-25%. Common targets: $500-1000 monthly for most workers, maxing 401(k) at $23,000/year, plus IRA at $7,000/year. Calculate based on your retirement goal."
  },
  {
    q: "Does compound interest really make that much difference?",
    a: "Yes. Starting early matters dramatically. $500 monthly for 30 years at 8% grows to $680,000 - only $180,000 was your contributions, $500,000 is earnings. Starting 10 years late (20 years instead of 30) gives only $295,000 - missing $385,000 in growth."
  },
  {
    q: "How do taxes affect investment returns?",
    a: "Taxes reduce effective returns. In taxable accounts, 8% return might become 6% after taxes on dividends and capital gains. Tax-advantaged accounts (401k, IRA) defer or eliminate taxes. Roth accounts grow tax-free. Consider tax impact when comparing investments."
  }
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export const metadata: Metadata = {
  title: 'Investment Return Calculator - Project Your Portfolio Growth',
  description: 'Calculate investment growth with monthly contributions. See how compound interest grows your portfolio over time.',
  alternates: { canonical: '/tools/investment-return-calculator' },
  openGraph: {
    title: 'Investment Return Calculator',
    description: 'Project your investment growth and see how compound interest works over time.',
    url: '/tools/investment-return-calculator',
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading calculator...</div>}>
          <InvestmentReturnCalculator locale="en" />
        </Suspense>
      </main>
    </>
  );
}