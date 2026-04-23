import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mortgage Calculators Hub (2026) | Free Payment & Loan Tools',
  description: 'Complete mortgage calculator collection: monthly payment, amortization, refinance, HELOC, home affordability, and early payoff. Free tools for home buyers and owners.',
  alternates: { canonical: '/tools/mortgage-hub' },
  openGraph: {
    title: 'Mortgage Calculators Hub (2026) | Free Payment & Loan Tools',
    description: 'Complete mortgage calculator collection: monthly payment, amortization, refinance, HELOC, home affordability, and early payoff.',
    url: '/tools/mortgage-hub',
    type: 'website',
  },
}

const mortgageCategories = [
  {
    title: 'Payment & Affordability',
    description: 'Calculate monthly payments and home affordability',
    tools: [
      { href: '/tools/mortgage-calculator', name: 'Mortgage Calculator', desc: 'Monthly payment with taxes and insurance' },
      { href: '/tools/home-affordability-calculator', name: 'Home Affordability', desc: 'How much house can I afford' },
      { href: '/tools/loan-comparison-calculator', name: 'Loan Comparison', desc: 'Compare multiple loan options' },
      { href: '/tools/budget-allocator', name: 'Budget Allocator', desc: 'Allocate income to mortgage and expenses' },
    ],
  },
  {
    title: 'Amortization & Payoff',
    description: 'Understand loan amortization and early payoff strategies',
    tools: [
      { href: '/tools/amortization-calculator', name: 'Amortization Calculator', desc: 'Full amortization schedule' },
      { href: '/tools/early-payoff-calculator', name: 'Early Payoff Calculator', desc: 'Extra payment savings' },
      { href: '/tools/mortgage-interest-calculator', name: 'Mortgage Interest', desc: 'Total interest over loan life' },
      { href: '/tools/principal-paydown-calculator', name: 'Principal Paydown', desc: 'Track principal reduction' },
    ],
  },
  {
    title: 'Refinance & HELOC',
    description: 'Refinance analysis and home equity tools',
    tools: [
      { href: '/tools/refinance-calculator', name: 'Refinance Calculator', desc: 'Break-even and savings analysis' },
      { href: '/tools/heloc-calculator', name: 'HELOC Calculator', desc: 'Home equity line of credit' },
      { href: '/tools/home-equity-loan-calculator', name: 'Home Equity Loan', desc: 'Second mortgage options' },
      { href: '/tools/cash-out-refinance-calculator', name: 'Cash-Out Refinance', desc: 'Extract equity for cash' },
    ],
  },
  {
    title: 'Specialized Loans',
    description: 'FHA, VA, and specialized mortgage programs',
    tools: [
      { href: '/tools/fha-loan-calculator', name: 'FHA Loan Calculator', desc: 'FHA mortgage with MIP' },
      { href: '/tools/va-loan-calculator', name: 'VA Loan Calculator', desc: 'VA mortgage benefits' },
      { href: '/tools/jumbo-loan-calculator', name: 'Jumbo Loan Calculator', desc: 'High-value mortgage rates' },
      { href: '/tools/arm-calculator', name: 'ARM Calculator', desc: 'Adjustable rate mortgage' },
    ],
  },
]

const faqs = [
  {
    question: 'How do I calculate my monthly mortgage payment?',
    answer: 'Use mortgage-calculator for monthly payment including principal, interest, taxes, and insurance (PITI). Enter loan amount, interest rate, loan term, and estimated property tax/insurance for accurate estimate.',
  },
  {
    question: 'What is mortgage amortization?',
    answer: 'Amortization is the schedule showing how each payment splits between principal and interest. Early payments are mostly interest; later payments reduce principal faster. Use amortization-calculator to see full schedule.',
  },
  {
    question: 'When should I refinance my mortgage?',
    answer: 'Refinance when new rate saves enough to cover closing costs within your ownership timeline. Use refinance-calculator to calculate break-even point. Typical rule: refinance if rate drop saves >1% and you plan to stay >2-3 years.',
  },
  {
    question: 'How does a HELOC work?',
    answer: 'HELOC (Home Equity Line of Credit) lets you borrow against home equity up to a credit limit. Interest-only payments during draw period (typically 10 years), then amortizing payments. Use heloc-calculator for cost analysis.',
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

export default function MortgageHub() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <section>
          <h1 className="text-3xl font-bold">Mortgage Calculators Hub (2026)</h1>
          <p className="text-zinc-600 mt-2">
            Complete collection of free mortgage calculators: monthly payment, amortization, refinance, HELOC, home affordability, and early payoff strategies.
          </p>
        </section>

        {mortgageCategories.map(category => (
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
            <strong>Last updated:</strong> 2026-04-23. All calculators are for planning purposes. Consult a mortgage professional for specific loan advice.
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
