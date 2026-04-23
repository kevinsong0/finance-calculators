import type { Metadata } from 'next';
import { Suspense } from 'react';
import CryptoInvestingGuide from '@/components/CryptoInvestingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is cryptocurrency a good investment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Crypto as investment: Potential: high returns possible, portfolio diversification, technological innovation exposure, decentralized assets. Risks: extreme volatility (50%+ swings common), regulatory uncertainty, security risks, no intrinsic value (price purely market-based), technical complexity. Consider: High-risk, speculative. Only invest what you can afford to lose. Small allocation (1-5% of portfolio) if choosing to invest. Research thoroughly. Not for: risk-averse investors, those needing stability, retirement funds. Good for: risk-tolerant, diversification seekers, tech believers. Crypto = speculative, not traditional investment. Approach with caution, research, small allocation."
      }
    },
    {
      "@type": "Question",
      "name": "How do I buy cryptocurrency safely?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Buy crypto safely: Choose exchange: Reputable (Coinbase, Kraken, Binance.US), regulated, good security track record. Verify: Two-factor authentication (required), verify identity (KYC), use strong password. Buy process: Create account, verify identity, link payment method, buy coins. Storage: Exchange (less secure, convenient), Hardware wallet (most secure, Ledger/Trezor), Software wallet (medium security). Tips: Start small, use established coins first, test transfers, keep keys secure, never share seed phrase. Avoid: Unknown exchanges, peer-to-peer without verification, ICOs, get-rich schemes. Security = most important. Losing keys = losing crypto forever."
      }
    },
    {
      "@type": "Question",
      "name": "What is a crypto wallet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Crypto wallet: stores private keys to access cryptocurrency. Types: Hot wallets (connected to internet) - software wallets, exchange wallets, mobile apps. Pros: convenient, fast access. Cons: online = hack risk. Cold wallets (offline) - hardware wallets (Ledger, Trezor), paper wallets. Pros: most secure, offline. Cons: less convenient, cost money ($50-150). Key concept: Wallet doesn&apos;t store crypto - stores keys. Crypto on blockchain. Keys = access. Seed phrase = backup (12-24 words). Never share seed phrase. Anyone with seed = owns your crypto. Choose: Hardware wallet for significant holdings, exchange for small amounts/trading. Security vs convenience trade-off."
      }
    },
    {
      "@type": "Question",
      "name": "What are crypto taxes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Crypto taxes (US): Taxed as property, not currency. Taxable events: Selling for fiat (USD), trading crypto for crypto, spending crypto, earning crypto (mining, staking). Not taxable: Buying crypto, holding crypto, transferring between own wallets. Reporting: Capital gains (buy low, sell high = taxable profit), ordinary income (mining/staking rewards). Rates: Short-term (<1 year) = ordinary income rates, long-term (>1 year) = lower capital gains rates. Track: Every transaction (date, amount, price). Tools: CoinTracker, Koinly, CryptoTrader.Tax. Fail to report = tax evasion risk. Keep records from day 1. Crypto not anonymous for taxes - exchanges report. Consult tax professional."
      }
    },
    {
      "@type": "Question",
      "name": "How volatile is cryptocurrency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Crypto volatility: Bitcoin: 50-80% annual volatility (stocks ~15-20%), major swings common (10% daily, 30%+ monthly), drawdowns can exceed 50%. Example: Bitcoin dropped 50%+ multiple times in history. Other coins: Even more volatile than Bitcoin. Small altcoins: extreme volatility, can lose 90%+. Causes: No intrinsic value anchor, speculative trading, market manipulation, regulatory news, technology changes, sentiment-driven. Prepare for: Significant price swings, potential 50%+ drops, don&apos;t invest money you need soon, don&apos;t panic sell, set expectations. Volatility = risk + opportunity. If can&apos;t stomach 50% drop, reconsider allocation. Dollar-cost averaging helps smooth volatility impact."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Crypto Investing Guide - Basics, Risks & Safety',
  description: 'Cryptocurrency basics, investment strategies, risks, and safety tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CryptoInvestingGuide />
    </Suspense>
  );
}