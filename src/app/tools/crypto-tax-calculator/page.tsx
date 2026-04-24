import type { Metadata } from 'next';
import { Suspense } from 'react';
import CryptoTaxCalculator from '@/components/CryptoTaxCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is cryptocurrency taxed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Crypto is taxed as property, not currency. Every sale triggers capital gains tax. Short-term gains (held under 1 year) taxed at ordinary income rates up to 37%. Long-term gains (held over 1 year) taxed at preferential rates: 0%, 15%, or 20% based on income bracket."
      }
    },
    {
      "@type": "Question",
      "name": "What crypto transactions are taxable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Taxable events include: selling crypto for fiat, trading one crypto for another, using crypto to buy goods/services, earning mining/staking rewards, receiving crypto as income. Buying and holding is not taxable. Transferring between your own wallets is not taxable."
      }
    },
    {
      "@type": "Question",
      "name": "How do I report cryptocurrency on taxes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Report crypto gains on Form 8949 (Sales and Dispositions) and Schedule D. Each transaction needs: acquisition date, sale date, proceeds, cost basis, and gain/loss. Software like CoinTracker can automate this. Starting 2025, exchanges must report transactions over $10,000."
      }
    },
    {
      "@type": "Question",
      "name": "Can I deduct crypto losses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, crypto losses offset gains and up to $3,000 of ordinary income annually. Excess losses carry forward. Losses must be realized (actually sold). Wash sale rules for crypto are unclear - avoid repurchasing same coin within 30 days of loss sale."
      }
    },
    {
      "@type": "Question",
      "name": "How does cost basis work for crypto?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Track purchase price for each coin. Common methods: FIFO (first coins bought are first sold), LIFO (last bought first sold), or specific identification (choose which coins). Specific ID can minimize taxes by selling coins with highest basis first. Document your method consistently."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Crypto Tax Calculator (2026) - Cryptocurrency Capital Gains & Reporting',
  description: 'Calculate cryptocurrency capital gains tax for 2026 based on holding period, tax bracket, and cost basis method. Short-term vs long-term crypto tax rates. Form 8949 reporting.',
  keywords: ['crypto tax calculator 2026', 'cryptocurrency tax', 'bitcoin tax', 'crypto capital gains', 'crypto reporting', 'digital asset tax', 'crypto cost basis', 'crypto gains', 'form 8949'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CryptoTaxCalculator />
    </Suspense>
  );
}