import type { Metadata } from 'next'

const faqs = [
  {
    q: "How do exchange rates work?",
    a: "Exchange rates represent the value of one currency relative to another. They're determined by supply and demand in foreign exchange markets, influenced by factors like interest rates, inflation, political stability, and economic performance. Rates fluctuate constantly during trading hours."
  },
  {
    q: "What is the difference between spot rate and forward rate?",
    a: "Spot rate is the current exchange rate for immediate transactions. Forward rate is a predetermined rate for a future transaction, used to hedge against currency risk. Forward rates typically differ from spot rates based on interest rate differentials between the two currencies."
  },
  {
    q: "When is the best time to exchange currency?",
    a: "Monitor rates when you have flexibility. Avoid airport exchange booths which typically have 10-15% markups. Use banks, online services, or ATM withdrawals for better rates. For large transactions, consider rate trends and economic calendars for major announcements that may affect rates."
  },
  {
    q: "What fees are hidden in currency conversion?",
    a: "Hidden fees include: exchange rate markup (1-3% typically), transaction fees ($2-10 per conversion), dynamic currency conversion fees when paying abroad (3-6%), and ATM foreign transaction fees (1-3%). Credit cards often have the lowest total fees at 0-3% foreign transaction fee."
  },
  {
    q: "How do currency conversion fees affect travel budgets?",
    a: "For a $5,000 trip, typical conversion fees add $50-300 to costs. Using a no-foreign-transaction-fee credit card saves about 3%. ATM withdrawals usually cost 1-2% plus bank fees. Airport exchanges cost up to 15%, adding $750 to a $5,000 budget. Plan ahead to minimize these costs."
  }
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export const metadata: Metadata = {
  title: 'Currency Converter - Free Exchange Rate Calculator',
  description: 'Convert between USD, EUR, GBP, JPY, CNY and 10+ currencies. Free online currency converter with live exchange rates.',
  keywords: ['currency converter', 'exchange rate calculator', 'USD converter', 'EUR converter', 'foreign exchange', '汇率换算', '货币转换'],
  openGraph: {
    title: 'Currency Converter - Free Exchange Rate Calculator',
    description: 'Free currency converter supporting USD, EUR, GBP, JPY, CNY and more. Convert currencies instantly.',
    type: 'website',
  },
}

export default function CurrencyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  )
}