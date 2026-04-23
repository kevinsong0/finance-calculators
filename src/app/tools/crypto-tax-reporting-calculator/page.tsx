'use client'

import CryptoTaxReportingCalculator from '@/components/CryptoTaxReportingCalculator'
import Link from 'next/link'

export default function CryptoTaxReportingCalculatorPage() {
  const faqs = [
    {
      question: "How is cryptocurrency taxed in the US?",
      answer: "Cryptocurrency is taxed as property, not currency. Selling crypto for profit creates capital gains tax. Short-term gains (held < 1 year) taxed at ordinary rates (10-37%). Long-term gains (held > 1 year) taxed at preferential rates (0%, 15%, 20%). Mining, staking, and airdrops are taxed as ordinary income at fair market value when received."
    },
    {
      question: "What IRS forms do I need for crypto taxes?",
      answer: "File Form 8949 for each crypto sale transaction (date acquired, date sold, proceeds, cost basis, gain/loss). Totals transfer to Schedule D. For income from mining/staking, report on Schedule C (self-employment) or Form 1040 line 'Other Income'. Large traders may need Form 8949 continuation sheets."
    },
    {
      question: "How do I calculate crypto cost basis?",
      answer: "Cost basis = purchase price + fees. For multiple purchases at different prices, use FIFO (first-in, first-out), LIFO, or specific identification. Track each purchase separately. Exchange fees reduce proceeds. Gas fees for transfers add to cost basis. Document method used consistently."
    },
    {
      question: "Is crypto mining taxed as income or capital gains?",
      answer: "Mining rewards are taxed as ordinary income at fair market value when mined (NOT when sold). This is 'earned income' subject to self-employment tax (15.3%) plus income tax. When you later sell mined crypto, gain/loss is capital gains based on FMV at mining as cost basis."
    },
    {
      question: "How are crypto staking rewards taxed?",
      answer: "Staking rewards are taxed similarly to mining - ordinary income at fair market value when received. Must report as income even if tokens locked or not yet withdrawable. When sold later, calculate capital gain/loss using FMV at staking time as cost basis."
    },
    {
      question: "Are crypto airdrops taxable?",
      answer: "Yes, airdrops are taxable as ordinary income at fair market value when tokens are received and accessible. If tokens locked or worthless when airdropped, may be zero value. When sold later, capital gains based on FMV at airdrop time as cost basis."
    },
    {
      question: "Are NFTs taxed differently than regular crypto?",
      answer: "NFTs may be taxed as 'collectibles' (28% max rate) if considered art or digital collectibles. However, most NFTs are taxed as regular capital gains (15%/20%). Creators selling own NFTs report ordinary income. Buyers report capital gains. Treatment depends on nature of NFT."
    },
    {
      question: "What crypto transactions are NOT taxable?",
      answer: "Not taxable: buying crypto (no sale yet), transferring between own wallets, gifting crypto (recipient inherits basis), donating crypto to charity (deduction at FMV, no gain). Taxable events: selling for fiat, trading one crypto for another, spending crypto on goods/services."
    },
    {
      question: "How do crypto-to-crypto trades work for taxes?",
      answer: "Swapping one crypto for another IS a taxable event. Calculate gain/loss on crypto sold: (FMV of crypto received - cost basis of crypto sold). Each trade must be reported on Form 8949. This applies to token swaps, DeFi trades, and crypto exchanges."
    },
    {
      question: "What crypto tax records should I keep?",
      answer: "Keep records of: all purchase dates and prices, all sale dates and proceeds, wallet addresses, exchange statements, mining/staking rewards received, airdrops received, gas fees paid, transaction hashes, cost basis method used. Good records essential for accurate filing."
    }
  ]

  const relatedTools = [
    { href: '/tools/crypto-tax-calculator', name: 'Crypto Tax Calculator', desc: 'Calculate capital gains' },
    { href: '/tools/crypto-loss-harvesting-calculator', name: 'Crypto Loss Harvesting', desc: 'Reduce taxes with losses' },
    { href: '/tools/wash-sale-calculator', name: 'Wash Sale Calculator', desc: 'Avoid disallowed losses' },
    { href: '/tools/tax-loss-harvesting-calculator', name: 'Tax Loss Harvesting', desc: 'Investment loss strategy' },
    { href: '/tools/irs-interest-penalty-calculator', name: 'IRS Penalty Calculator', desc: 'Late payment costs' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            }))
          })
        }}
      />
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <CryptoTaxReportingCalculator />
        
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