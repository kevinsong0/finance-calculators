import type { Metadata } from 'next';
import { Suspense } from 'react';
import RetirementCalculator from '@/components/RetirementCalculator';

const faqs = [
  {
    q: "How much do I need to save for retirement?",
    a: "Common guidelines: save 10-15% of income throughout career, or aim for 10-12x your annual salary by retirement. For $50,000 income, target $500,000-600,000. Social Security provides about 40% of pre-retirement income, so personal savings fill the gap."
  },
  {
    q: "What age should I retire?",
    a: "Full Social Security benefits: age 67 for those born 1960+. Early retirement at 62 reduces benefits by 25-30%. Delayed retirement at 70 increases benefits by 8% per year. Financial independence may allow earlier retirement if you have sufficient savings."
  },
  {
    q: "How long will my retirement savings last?",
    a: "The 4% rule suggests withdrawing 4% annually (adjusted for inflation) for 30+ years. $500,000 savings supports $20,000/year withdrawal. Higher withdrawal rates reduce years money lasts. Your actual duration depends on returns, inflation, and spending."
  },
  {
    q: "Should I contribute to 401(k) or IRA first?",
    a: "Contribute to 401(k) up to employer match first (free money). Then max IRA ($7,000/year). Then return to 401(k) up to limit ($23,000). Traditional accounts reduce current taxes; Roth accounts provide tax-free withdrawals. Choose based on current vs expected future tax rates."
  },
  {
    q: "What return should I expect in retirement?",
    a: "Pre-retirement: 7-10% for stock-heavy portfolios. In retirement, shift to conservative allocation (bonds, cash) targeting 4-6% to reduce volatility. Bonds provide stability but lower returns. Maintain some stocks for growth to offset inflation over 20-30 year retirement."
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

// SoftwareApplication schema for AI crawlers (GEO)
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Retirement Calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Estimate retirement savings growth, withdrawal timeline, and income planning.",
  "featureList": ["Savings growth projection", "Withdrawal timeline", "Social Security integration", "401k/IRA planning"]
};

// BreadcrumbList schema for navigation
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://finance.128345827.xyz" },
    { "@type": "ListItem", "position": 2, "name": "Investment Hub", "item": "https://finance.128345827.xyz/tools/investment-hub" },
    { "@type": "ListItem", "position": 3, "name": "Retirement Calculator", "item": "https://finance.128345827.xyz/tools/retirement-calculator" }
  ]
};

export const metadata: Metadata = {
  title: 'Retirement Calculator (2026) - Savings Growth & Income Plan',
  description: 'Estimate retirement savings growth, withdrawal timeline, and whether your money lasts based on return, inflation, and annual spending.',
  alternates: { canonical: '/tools/retirement-calculator' },
  openGraph: {
    title: 'Retirement Calculator (2026) - Savings Growth & Income Plan',
    description: 'Estimate retirement savings growth, withdrawal timeline, and whether your money lasts based on return, inflation, and annual spending.',
    url: '/tools/retirement-calculator',
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading calculator...</div>}>
          <RetirementCalculator locale="en" />
        </Suspense>
      </main>
    </>
  );
}
