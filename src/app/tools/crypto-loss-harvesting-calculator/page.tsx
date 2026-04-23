'use client'

import CryptoLossHarvestingCalculator from '@/components/CryptoLossHarvestingCalculator'

export default function CryptoLossHarvestingCalculatorPage() {
  const faqs = [
    {
      question: "Can I harvest crypto losses for tax benefits?",
      answer: "Yes, crypto losses can be harvested for tax benefits. Sell crypto at a loss to realize capital losses. Losses offset capital gains first, then up to $3,000 offsets ordinary income annually. Remaining losses carry forward indefinitely. This is the same tax-loss harvesting benefit available for stocks."
    },
    {
      question: "Does wash sale rule apply to cryptocurrency?",
      answer: "Yes, IRS has confirmed wash sale rules apply to cryptocurrency. If you sell crypto at a loss and buy the same crypto within 30 days before or after, the loss is disallowed. Unlike stocks, crypto exchanges don't track wash sales across accounts - you must self-report across all exchanges, wallets, and DeFi platforms."
    },
    {
      question: "How do I avoid crypto wash sale?",
      answer: "Strategies: 1) Wait 31+ days before repurchasing same crypto. 2) Buy different crypto (sell BTC, buy ETH). 3) Maintain exposure with different asset class. 4) Track holdings across ALL platforms - wash sale applies across exchanges, cold storage, DeFi wallets. IRS increasingly enforcing crypto wash sale rules."
    },
    {
      question: "What crypto can I buy as replacement?",
      answer: "Safe replacements: Sell BTC, buy ETH (different L1). Sell specific token, buy different index. Sell one smart contract platform, buy another. NOT safe: Same ticker (BTC for BTC), very similar DeFi tokens, tokens on same protocol. Replacement must be 'substantially different' - different asset class or protocol."
    },
    {
      question: "How much crypto loss can I deduct?",
      answer: "Crypto capital losses offset capital gains first (unlimited). Then up to $3,000 per year offsets ordinary income ($1,500 if married filing separately). Remaining losses carry forward to future years. Short-term losses offset short-term gains first (higher tax rate benefit). Long-term losses offset long-term gains."
    },
    {
      question: "When is best time to harvest crypto losses?",
      answer: "End of year (December) is prime time. Harvest losses before December 31 to offset gains in same tax year. Also consider: market dips, after large gains (need loss offsets), before significant price recovery (maximize loss). Short-term losses (<1 year holding) especially valuable - offset higher-rate short-term gains."
    },
    {
      question: "Do crypto gas fees affect loss calculation?",
      answer: "Yes, gas fees and transaction costs affect cost basis. Purchase fees add to cost basis (reduce gain or increase loss). Sale fees reduce proceeds (reduce gain or increase loss). Include all gas fees, exchange fees, and transfer costs in calculations for accurate tax reporting."
    },
    {
      question: "Are crypto staking rewards affected by wash sale?",
      answer: "Possibly. If staking rewards are received within 30 days of a loss sale on same crypto, IRS may treat this as a wash sale purchase. The staking reward would be considered 'acquiring' the same crypto. Best practice: wait 31+ days after loss sale before claiming staking rewards on same token, or avoid staking that token during wash sale window."
    },
    {
      question: "What records do I need for crypto loss harvesting?",
      answer: "Keep: all purchase dates, prices, amounts, exchange/wallet used, transaction IDs, gas fees. Track each lot separately for specific identification method. Document harvest transactions (date, coin, amount, loss). Track replacement purchases. Maintain records across ALL platforms. Crypto tax software (Koinly, CoinTracker) helps aggregate."
    },
    {
      question: "Can I harvest NFT losses too?",
      answer: "Yes, NFT losses can be harvested similarly to crypto. Sell NFT at loss, deduct as capital loss. Wash sale may apply if buy same NFT or very similar NFT within 30 days. However, NFTs may be taxed as collectibles (28% max rate) depending on nature. Loss harvesting works but tax rate treatment differs for some NFTs."
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
      <CryptoLossHarvestingCalculator />
    </>
  )
}