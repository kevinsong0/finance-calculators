'use client'

import CryptocurrencyTaxReportingCalculator from '@/components/CryptocurrencyTaxReportingCalculator'

export default function CryptocurrencyTaxReportingCalculatorPage() {
  const faqs = [
    {
      question: "How is cryptocurrency taxed?",
      answer: "Crypto is property, not currency. Every sale, trade, or exchange is taxable event. Capital gains if sold for profit: short-term rates (ordinary income) if held less than 1 year, long-term rates (0%, 15%, 20%) if held over 1 year. Mining/staking taxed as ordinary income at fair market value when received. Crypto-to-crypto trades taxable (must track both sides). Report on Form 8949 and Schedule D."
    },
    {
      question: "What crypto transactions are taxable?",
      answer: "Taxable: Selling crypto for cash, trading crypto for other crypto, spending crypto on goods/services, receiving mining rewards, earning staking rewards, receiving airdrops/payments, receiving crypto as salary. Not taxable: Buying crypto with cash (no tax until sold), transferring between your own wallets, donating crypto to charity, receiving crypto as gift (below gift tax threshold). Hold until sale = taxable."
    },
    {
      question: "How do I calculate crypto cost basis?",
      answer: "Cost basis = purchase price + fees. Track purchase date, amount, price, fees for every acquisition. Multiple purchases of same crypto: use specific identification (choose which lot sold) or FIFO (first-in-first-out). Specific ID can reduce taxes by selling higher-cost lots first. Must identify lot at time of sale, not retroactively. Keep detailed records of all crypto purchases. Cost tracking apps help manage basis."
    },
    {
      question: "Is crypto-to-crypto trading taxable?",
      answer: "Yes. Trading Bitcoin for Ethereum is taxable. Must report gain/loss on Bitcoin portion. Calculate: FMV of Ethereum received minus Bitcoin cost basis. Example: Buy Bitcoin $10K, trade for Ethereum worth $15K = $5K gain on Bitcoin. Ethereum basis = $15K. Each trade creates taxable event. Tax software helps track complex trade chains. Keep all trade records with timestamps."
    },
    {
      question: "How is crypto mining taxed?",
      answer: "Mining rewards taxed as ordinary income at fair market value when received. Report on Schedule 1 Line 8z (Other Income) or Schedule C if mining is business activity. FMV at time of receipt becomes cost basis. When mined coins later sold: gain = sale price minus FMV at mining. Business mining: also subject to self-employment tax (15.3%). Hobby mining: income tax only, no self-employment tax."
    },
    {
      question: "How are crypto staking rewards taxed?",
      answer: "Staking rewards taxed as ordinary income at fair market value when received. Same treatment as mining. Report on Schedule 1 Line 8z. FMV when received = cost basis. Later sale: capital gain = sale price minus staking FMV. Proof-of-stake rewards continuously received: must track each reward's FMV at receipt time. Some exchanges provide reward records. Keep detailed staking logs."
    },
    {
      question: "Do crypto exchanges report to IRS?",
      answer: "Yes. Major exchanges file 1099-B for US customers (Coinbase, Kraken, etc.). 1099-B shows proceeds only, basis may be incomplete or not reported. IRS receives 1099-B data. Question on Form 1040: Did you receive, sell, exchange virtual currency? Must answer Yes if any taxable crypto activity. IRS increasing enforcement on crypto compliance. 1099-K threshold: $20,000 proceeds + 200 transactions (may change)."
    },
    {
      question: "Can I deduct crypto losses?",
      answer: "Yes. Crypto losses offset crypto gains first. Net loss reduces ordinary income up to $3,000 per year. Excess carries forward indefinitely. Example: $15K crypto gain, $20K crypto loss = $5K net loss. $3K against wages, $2K carries forward. Harvest losses strategically. Avoid wash sale: IRS wash sale rule applies to crypto (buying same crypto within 30 days before/after loss sale disallows loss)."
    },
    {
      question: "What crypto records should I keep?",
      answer: "Keep: Purchase date, amount, price, fees for every acquisition. Sale date, amount, proceeds, fees for every disposition. Wallet addresses and transaction IDs. Exchange statements and 1099-Bs. Mining/staking reward logs with FMV at receipt. Crypto-to-crypto trade records. Cost basis tracking for each coin type. Records needed for 3-6 years. Crypto tax software helps automate tracking. Download transaction history from all exchanges."
    },
    {
      question: "How do I report crypto on tax return?",
      answer: "Form 8949: Report each crypto sale/trade (description, dates, proceeds, basis, gain/loss). Schedule D: Summarize capital gains/losses from Form 8949. Schedule 1 Line 8z: Report mining/staking/airdrop income. Schedule C: If mining is business (self-employment tax). Form 1040: Answer Yes to crypto question. 1099-B from exchange may report some transactions. Software like CoinTracker, Koinly helps generate Form 8949 from exchange data."
    }
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
      <CryptocurrencyTaxReportingCalculator />
    </>
  )
}