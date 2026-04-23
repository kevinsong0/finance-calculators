import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Finance Tools Hub (2026) | Tax, Mortgage, Investment & Budgeting',
  description:
    'Unified finance tools hub for high-intent calculators and guides: tax planning, mortgage decisions, investment returns, debt payoff, and budgeting.',
  alternates: { canonical: '/tools/finance-hub' },
  openGraph: {
    title: 'Finance Tools Hub (2026) | Tax, Mortgage, Investment & Budgeting',
    description:
      'Unified finance tools hub for high-intent calculators and guides: tax planning, mortgage decisions, investment returns, debt payoff, and budgeting.',
    url: '/tools/finance-hub',
    type: 'website',
  },
}

const hubSections = [
  {
    title: 'Tax & Compliance',
    description: 'High-intent tax planning, IRS, and compliance tools',
    links: [
      { href: '/tools/tax-hub', name: 'Tax Calculators Hub', desc: 'Crypto, IRS, capital gains, and deductions' },
      { href: '/tools/crypto-tax-reporting-calculator', name: 'Crypto Tax Reporting', desc: 'Form 8949, mining, staking, and gains' },
      { href: '/tools/estimated-tax-calculator', name: 'Estimated Tax Calculator', desc: 'Quarterly payments and safe harbor' },
      { href: '/tools/business-tax-deduction-calculator', name: 'Business Tax Deductions', desc: 'Home office, travel, equipment, and meals' },
    ],
  },
  {
    title: 'Mortgage & Home',
    description: 'Home buying, refinancing, and equity decisions',
    links: [
      { href: '/tools/mortgage-hub', name: 'Mortgage Calculators Hub', desc: 'Payment, refinance, HELOC, and payoff' },
      { href: '/tools/mortgage-calculator', name: 'Mortgage Calculator', desc: 'Monthly payment and amortization' },
      { href: '/tools/refinance-calculator', name: 'Refinance Calculator', desc: 'Break-even and savings analysis' },
      { href: '/tools/home-affordability-calculator', name: 'Home Affordability', desc: 'How much house can you afford' },
    ],
  },
  {
    title: 'Investing & Retirement',
    description: 'Returns, asset growth, and retirement planning tools',
    links: [
      { href: '/tools/investment-hub', name: 'Investment Calculators Hub', desc: 'ROI, portfolio, and returns planning' },
      { href: '/tools/compound-interest', name: 'Compound Interest', desc: 'Growth projection over time' },
      { href: '/tools/retirement-calculator', name: 'Retirement Calculator', desc: 'Retirement timeline and income targets' },
      { href: '/tools/capital-gains-tax-calculator', name: 'Capital Gains Tax', desc: 'Rate-aware gains planning' },
    ],
  },
  {
    title: 'Cash Flow & Planning',
    description: 'Budgeting, debt payoff, and emergency planning tools',
    links: [
      { href: '/tools/budget-planner-calculator', name: 'Budget Planner', desc: 'Monthly spending and savings allocation' },
      { href: '/tools/debt-payoff-calculator', name: 'Debt Payoff Calculator', desc: 'Snowball and avalanche payoff planning' },
      { href: '/tools/net-worth-calculator', name: 'Net Worth Calculator', desc: 'Track assets, liabilities, and progress' },
      { href: '/tools/emergency-fund-calculator', name: 'Emergency Fund Calculator', desc: 'Coverage target based on expenses' },
    ],
  },
] as const

const faqs = [
  {
    question: 'What is the best finance tool to start with?',
    answer:
      'Start with the hub that matches your current decision: tax-hub for tax planning, mortgage-hub for home decisions, investment-hub for returns, or budget-planner-calculator for cash flow control.',
  },
  {
    question: 'Why use a finance hub instead of searching individual tools?',
    answer:
      'A hub improves discovery, groups related tools together, and helps you move from question to action without hunting through the site.',
  },
  {
    question: 'How do I compare mortgage and refinance options?',
    answer:
      'Use mortgage-calculator for payment sizing, refinance-calculator for break-even analysis, and home-affordability-calculator to check budget limits before committing.',
  },
  {
    question: 'Which tools help with tax planning first?',
    answer:
      'Use tax-hub to reach crypto-tax-reporting-calculator, estimated-tax-calculator, and business-tax-deduction-calculator depending on the scenario.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function FinanceHub() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <section className="space-y-4">
          <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Finance discovery hub</p>
          <h1 className="text-3xl md:text-4xl font-bold">Finance Tools Hub (2026)</h1>
          <p className="text-zinc-600 max-w-3xl">
            One entry point for the highest-intent finance tools on the site. Use this hub to move from broad planning to the right calculator or guide faster.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/tax-hub"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition"
            >
              Tax Hub
            </Link>
            <Link
              href="/tools/mortgage-hub"
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-400 hover:text-zinc-900 transition"
            >
              Mortgage Hub
            </Link>
            <Link
              href="/tools/investment-hub"
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-400 hover:text-zinc-900 transition"
            >
              Investment Hub
            </Link>
          </div>
        </section>

        {hubSections.map((section) => (
          <section key={section.title} className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="text-sm text-zinc-500">{section.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition"
                >
                  <h3 className="font-medium group-hover:underline">{link.name}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{link.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                <h3 className="font-medium">{faq.question}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
          <p className="text-sm text-zinc-500">
            <strong>Last updated:</strong> 2026-04-23. This hub is designed to improve discovery across the finance site and reduce orphaned navigation paths.
          </p>
        </section>

        <section className="flex flex-wrap gap-4">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Home
          </Link>
          <Link href="/tools/tax-hub" className="text-blue-600 dark:text-blue-400 hover:underline">
            Tax Calculators →
          </Link>
          <Link href="/tools/mortgage-hub" className="text-blue-600 dark:text-blue-400 hover:underline">
            Mortgage Calculators →
          </Link>
        </section>
      </main>
    </>
  )
}
