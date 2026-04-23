import type { Metadata } from 'next';
import { Suspense } from 'react';
import DRIPCalculator from '@/components/DRIPCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a DRIP (Dividend Reinvestment Plan)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A DRIP automatically reinvests dividend payments to purchase additional shares of the same stock. Instead of receiving cash dividends, you receive more shares, compounding your investment over time. Many companies and brokers offer DRIP programs with no transaction fees."
      }
    },
    {
      "@type": "Question",
      "name": "How does DRIP compound growth work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DRIP creates compound growth by reinvesting dividends to buy more shares, which then generate more dividends. For example, a 3% dividend yield reinvested over 10 years with 5% stock growth can result in significantly more shares and higher total returns compared to taking dividends as cash."
      }
    },
    {
      "@type": "Question",
      "name": "Are DRIP investments tax-free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, DRIP investments are not tax-free. Reinvested dividends are still considered taxable income in the year received. However, in tax-advantaged accounts like IRAs or 401(k)s, dividends can grow tax-deferred or tax-free. Outside these accounts, you owe taxes on dividends whether you reinvest or receive them as cash."
      }
    },
    {
      "@type": "Question",
      "name": "What stocks are best for DRIP investing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best DRIP stocks are dividend aristocrats with consistent dividend growth, stable earnings, and reasonable yields (2-5%). Companies like Coca-Cola, Johnson & Johnson, and Procter & Gamble have decades of dividend increases. Avoid very high-yield stocks as they may be unsustainable."
      }
    },
    {
      "@type": "Question",
      "name": "What is yield on cost in DRIP investing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yield on cost measures your dividend yield relative to your original investment, not current stock price. As dividends grow over time, your yield on cost increases. For example, if you invested $10,000 in a 3% yield stock that grew dividends 5% annually, after 10 years your yield on cost could exceed 5%."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Dividend Reinvestment Calculator (DRIP) - Compound Your Returns',
  description: 'Calculate the power of dividend reinvestment with compound growth. Compare DRIP vs taking dividends as cash and project long-term returns.',
  keywords: ['DRIP calculator', 'dividend reinvestment', 'compound growth', 'dividend investing', 'DRIP investment', 'dividend growth', 'yield on cost', 'reinvest dividends'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DRIPCalculator />
    </Suspense>
  );
}