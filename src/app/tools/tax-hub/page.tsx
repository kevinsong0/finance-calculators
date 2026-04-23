import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tax Calculators Hub (2026) | Crypto, IRS, Capital Gains & More',
  description: 'Complete tax calculator collection: crypto tax reporting, IRS penalty calculator, 401k contributions, capital gains, tax loss harvesting. Free tools for smart tax planning.',
  alternates: { canonical: '/tools/tax-hub' },
  openGraph: {
    title: 'Tax Calculators Hub (2026) | Free Crypto & IRS Tax Tools',
    description: 'Complete tax calculator collection: crypto tax reporting, IRS penalty calculator, 401k contributions, capital gains, tax loss harvesting.',
    url: '/tools/tax-hub',
    type: 'website',
  },
}

const taxCategories = [
  {
    title: 'Crypto & Digital Assets',
    description: 'Cryptocurrency tax reporting and optimization tools',
    tools: [
      { href: '/tools/crypto-tax-calculator', name: 'Crypto Tax Calculator', desc: 'Calculate crypto capital gains and tax rates' },
      { href: '/tools/crypto-tax-reporting-calculator', name: 'Crypto Tax Reporting', desc: 'Form 8949 guidance, mining/staking income' },
      { href: '/tools/crypto-loss-harvesting-calculator', name: 'Crypto Loss Harvesting', desc: 'Tax-loss harvesting and wash sale avoidance' },
      { href: '/tools/wash-sale-calculator', name: 'Wash Sale Calculator', desc: 'Disallowed losses and adjusted basis' },
    ],
  },
  {
    title: 'IRS Penalties & Compliance',
    description: 'IRS penalty and compliance calculation tools',
    tools: [
      { href: '/tools/irs-interest-penalty-calculator', name: 'IRS Interest & Penalty Calculator', desc: 'Late payment penalties and interest' },
      { href: '/tools/tax-underpayment-penalty-calculator', name: 'Tax Underpayment Penalty', desc: 'Form 2210 penalty calculation' },
      { href: '/tools/irs-installment-agreement-calculator', name: 'IRS Installment Agreement', desc: 'Payment plan costs and timeline' },
      { href: '/tools/penalty-abatement-calculator', name: 'Penalty Abatement', desc: 'FTA and reasonable cause abatement' },
      { href: '/tools/offer-in-compromise-calculator', name: 'Offer in Compromise', desc: 'IRS OIC settlement amount' },
    ],
  },
  {
    title: 'Retirement & Contributions',
    description: '401k, IRA, HSA, and retirement tax tools',
    tools: [
      { href: '/tools/401k-calculator', name: '401k Calculator', desc: 'Contribution limits and growth projection' },
      { href: '/tools/hsa-contribution-calculator', name: 'HSA Contribution Calculator', desc: '2026 HSA limits and tax savings' },
      { href: '/tools/ira-calculator', name: 'IRA Calculator', desc: 'Traditional vs Roth IRA comparison' },
      { href: '/tools/roth-conversion-calculator', name: 'Roth Conversion Calculator', desc: 'Conversion tax implications' },
      { href: '/tools/required-minimum-distribution-calculator', name: 'RMD Calculator', desc: 'IRS RMD for retirement accounts' },
    ],
  },
  {
    title: 'Investment & Capital Gains',
    description: 'Capital gains, dividends, and investment tax tools',
    tools: [
      { href: '/tools/capital-gain-calculator', name: 'Capital Gain Tax Calculator', desc: 'Stocks, real estate, crypto gains' },
      { href: '/tools/capital-gains-tax-calculator', name: 'Capital Gains Tax Calculator', desc: 'Investment capital gains tax' },
      { href: '/tools/tax-loss-harvesting-calculator', name: 'Tax Loss Harvesting', desc: 'Investment loss tax savings' },
      { href: '/tools/tax-loss-harvesting-optimizer-calculator', name: 'Tax Loss Harvesting Optimizer', desc: 'Optimize harvesting strategy' },
      { href: '/tools/dividend-tax-calculator', name: 'Dividend Tax Calculator', desc: 'Qualified and ordinary dividends' },
    ],
  },
]

const faqs = [
  {
    question: 'What tax calculators do I need for crypto?',
    answer: 'Use crypto-tax-calculator for capital gains, crypto-tax-reporting-calculator for Form 8949 and mining/staking income, and crypto-loss-harvesting-calculator to reduce taxes through strategic loss harvesting.',
  },
  {
    question: 'How do I calculate IRS penalties?',
    answer: 'Use irs-interest-penalty-calculator for late payment penalties, tax-underpayment-penalty-calculator for Form 2210, and penalty-abatement-calculator to check if you qualify for first-time abatement or reasonable cause relief.',
  },
  {
    question: 'What are the 2026 401k contribution limits?',
    answer: '2026 401k employee contribution limit is $23,000 (plus $7,500 catch-up for age 50+). Use 401k-calculator to project growth and HSA-contribution-calculator for health savings limits.',
  },
  {
    question: 'How do I minimize capital gains tax?',
    answer: 'Use tax-loss-harvesting-optimizer-calculator to offset gains with losses, capital-gains-tax-calculator for rate comparison, and dividend-tax-calculator for qualified dividend tax treatment.',
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

export default function TaxHub() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <section>
          <h1 className="text-3xl font-bold">Tax Calculators Hub (2026)</h1>
          <p className="text-zinc-600 mt-2">
            Complete collection of free tax calculators: crypto tax reporting, IRS penalties, 401k contributions, capital gains, and tax loss harvesting.
          </p>
        </section>

        {taxCategories.map(category => (
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
            <strong>Last updated:</strong> 2026-04-23. All calculators are for planning purposes. Consult a tax professional for specific advice.
          </p>
        </section>

        <section className="flex gap-4">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Home
          </Link>
          <Link href="/tools/finance-hub" className="text-blue-600 dark:text-blue-400 hover:underline">
            Finance Hub →
          </Link>
          <Link href="/tools/mortgage-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
            Mortgage Calculators →
          </Link>
        </section>
      </main>
    </>
  )
}
