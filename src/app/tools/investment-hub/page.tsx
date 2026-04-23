import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Investment Calculators Hub (2026) | ROI, Portfolio & Returns Tools',
  description: 'Complete investment calculator collection: ROI calculator, portfolio analyzer, compound interest, dividend calculator, and investment return projections.',
  alternates: { canonical: '/tools/investment-hub' },
  openGraph: {
    title: 'Investment Calculators Hub (2026) | ROI, Portfolio & Returns Tools',
    description: 'Complete investment calculator collection: ROI calculator, portfolio analyzer, compound interest, dividend calculator, and investment return projections.',
    url: '/tools/investment-hub',
    type: 'website',
  },
}

const investmentCategories = [
  {
    title: 'Returns & ROI',
    description: 'Calculate investment returns and ROI',
    tools: [
      { href: '/tools/investment-return-calculator', name: 'Investment Return Calculator', desc: 'Calculate total return on investment' },
      { href: '/tools/roi-calculator', name: 'ROI Calculator', desc: 'Return on investment percentage' },
      { href: '/tools/compound-interest', name: 'Compound Interest Calculator', desc: 'Long-term growth projection' },
      { href: '/tools/investment-horizon-calculator', name: 'Investment Horizon', desc: 'Time to reach financial goal' },
    ],
  },
  {
    title: 'Portfolio & Allocation',
    description: 'Portfolio analysis and asset allocation',
    tools: [
      { href: '/tools/investment-portfolio-analyzer', name: 'Portfolio Analyzer', desc: 'Analyze portfolio performance' },
      { href: '/tools/asset-allocation-calculator', name: 'Asset Allocation', desc: 'Optimal portfolio mix' },
      { href: '/tools/dividend-stock-comparison-calculator', name: 'Dividend Stock Comparison', desc: 'Compare dividend yields' },
      { href: '/tools/drip-calculator', name: 'DRIP Calculator', desc: 'Dividend reinvestment growth' },
    ],
  },
  {
    title: 'Stocks & Dividends',
    description: 'Stock and dividend investment tools',
    tools: [
      { href: '/tools/dividend-calculator', name: 'Dividend Calculator', desc: 'Annual dividend income' },
      { href: '/tools/stock-return-calculator', name: 'Stock Return Calculator', desc: 'Stock price appreciation' },
      { href: '/tools/capital-gain-calculator', name: 'Capital Gain Calculator', desc: 'Stock capital gains tax' },
      { href: '/tools/stock-ownership-cost-calculator', name: 'Stock Ownership Cost', desc: 'Total cost of ownership' },
    ],
  },
  {
    title: 'Retirement & FIRE',
    description: 'Retirement and financial independence calculators',
    tools: [
      { href: '/tools/fire-calculator', name: 'FIRE Calculator', desc: 'Financial independence timeline' },
      { href: '/tools/retirement-planning-calculator', name: 'Retirement Planning', desc: 'Retirement income projection' },
      { href: '/tools/early-retirement-penalty-calculator', name: 'Early Retirement Penalty', desc: 'Withdrawal penalties' },
      { href: '/tools/financial-freedom-calculator', name: 'Financial Freedom Calculator', desc: 'Freedom number calculation' },
    ],
  },
]

const faqs = [
  {
    question: 'How do I calculate investment ROI?',
    answer: 'ROI = (Final Value - Initial Cost) / Initial Cost × 100. Use investment-return-calculator for time-weighted returns including dividends. For annualized ROI, use compound-interest calculator with your investment period.',
  },
  {
    question: 'What is compound interest and why does it matter?',
    answer: 'Compound interest is interest earned on previously earned interest. Over long periods, compounding dramatically accelerates growth. Use compound-interest calculator to see how $10,000 grows at 7% over 30 years.',
  },
  {
    question: 'How do I build a diversified portfolio?',
    answer: 'Diversification spreads risk across asset classes (stocks, bonds, real estate). Use asset-allocation-calculator to find optimal mix based on age and risk tolerance. Typical rule: stocks allocation = 100 - your age.',
  },
  {
    question: 'What is FIRE and how do I calculate my freedom number?',
    answer: 'FIRE (Financial Independence, Retire Early) requires savings of 25× annual expenses. Use fire-calculator to determine timeline based on current savings, expected returns, and target expenses.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function InvestmentHub() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <section>
          <h1 className="text-3xl font-bold">Investment Calculators Hub (2026)</h1>
          <p className="text-zinc-600 mt-2">
            Complete collection of free investment calculators: ROI, portfolio analysis, compound interest, dividends, and FIRE planning.
          </p>
        </section>

        {investmentCategories.map(category => (
          <section key={category.title} className="space-y-4">
            <h2 className="text-xl font-semibold">{category.title}</h2>
            <p className="text-sm text-zinc-500">{category.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.tools.map(tool => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition"
                >
                  <h3 className="font-medium group-hover:underline">{tool.name}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{tool.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">FAQ</h2>
          <div className="space-y-4">
            {faqs.map(faq => (
              <div key={faq.question} className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                <h3 className="font-medium">{faq.question}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
          <p className="text-sm text-zinc-500">
            <strong>Last updated:</strong> 2026-04-23. All calculators are for planning purposes. Consult a financial advisor for specific investment advice.
          </p>
        </section>

        <section className="flex gap-4">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Home
          </Link>
          <Link href="/tools/finance-hub" className="text-blue-600 dark:text-blue-400 hover:underline">
            Finance Hub →
          </Link>
          <Link href="/tools/tax-hub" className="text-blue-600 dark:text-blue-400 hover:underline">
            Tax Calculators →
          </Link>
        </section>
      </main>
    </>
  )
}
