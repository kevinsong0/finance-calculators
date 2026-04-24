import TaxLossHarvestingCalculator from '@/components/TaxLossHarvestingCalculator'
import Link from 'next/link'

export const metadata = {
  title: 'Tax Loss Harvesting Calculator (2026) - Capital Loss Offset & Wash Sale',
  description: 'Calculate 2026 tax savings from tax loss harvesting. Estimate how selling losing investments can offset capital gains and reduce your tax liability. Wash sale rule compliance.',
  keywords: 'tax loss harvesting calculator 2026', 'capital loss offset', 'investment tax savings', 'capital gains tax', 'wash sale rule', 'tax optimization', 'investment loss deduction',
}

const faqData = [
  {
    question: 'What is tax loss harvesting?',
    answer: 'Tax loss harvesting is selling investments at a loss to offset capital gains and reduce taxes. Losses first offset gains of the same type (long-term losses offset long-term gains first), then offset other gains, and finally can offset up to $3,000 of ordinary income per year. Unused losses carry forward indefinitely.',
  },
  {
    question: 'What is the wash sale rule?',
    answer: 'The wash sale rule disallows a loss deduction if you purchase the same or substantially identical security within 30 days before or after the sale. To harvest losses properly, wait 31 days before repurchasing, buy a different but similar security, or use an ETF or mutual fund as an alternative.',
  },
  {
    question: 'How much ordinary income can capital losses offset?',
    answer: 'Capital losses can offset up to $3,000 of ordinary income per year ($1,500 if married filing separately). After offsetting all capital gains, remaining losses first offset this $3,000 limit, then carry forward to future years to offset gains and ordinary income again.',
  },
  {
    question: 'How do long-term vs short-term losses offset gains?',
    answer: 'Long-term losses first offset long-term gains (taxed at 0%, 15%, or 20%). Short-term losses first offset short-term gains (taxed at ordinary rates up to 37%). After offsetting same-type gains, remaining losses offset the other type. This ordering maximizes tax savings since short-term gains are taxed higher.',
  },
  {
    question: 'Can I carry forward unused capital losses?',
    answer: 'Yes, unused capital losses carry forward indefinitely to future tax years. There is no expiration or limit on carryforward. Each year, losses first offset capital gains, then up to $3,000 of ordinary income, with remaining amounts continuing to carry forward.',
  },
]

const relatedTools = [
  { href: '/tools/capital-gain-calculator', name: 'Capital Gain Calculator', desc: 'Calculate stock/crypto gains' },
  { href: '/tools/wash-sale-calculator', name: 'Wash Sale Calculator', desc: 'Avoid disallowed losses' },
  { href: '/tools/crypto-tax-calculator', name: 'Crypto Tax Calculator', desc: 'Cryptocurrency capital gains' },
  { href: '/tools/tax-bracket-calculator', name: 'Tax Bracket Calculator', desc: '2026 federal tax rates' },
]

export default function TaxLossHarvestingCalculatorPage() {
  // SoftwareApplication schema for AI crawlers (GEO)
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Tax Loss Harvesting Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Calculate tax savings from selling losing investments to offset capital gains and reduce tax liability.",
    "featureList": ["Capital loss offset", "Wash sale rule compliance", "Ordinary income offset", "Carryforward tracking"]
  };

  // BreadcrumbList schema for navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://finance.128345827.xyz" },
      { "@type": "ListItem", "position": 2, "name": "Tax Hub", "item": "https://finance.128345827.xyz/tools/tax-hub" },
      { "@type": "ListItem", "position": 3, "name": "Tax Loss Harvesting Calculator", "item": "https://finance.128345827.xyz/tools/tax-loss-harvesting-calculator" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <TaxLossHarvestingCalculator />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Related Tax Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {relatedTools.map(tool => (
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

        <section className="flex gap-4">
          <Link href="/tools/tax-hub" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Tax Calculators Hub
          </Link>
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            Home →
          </Link>
        </section>
      </main>
    </>
  )
}