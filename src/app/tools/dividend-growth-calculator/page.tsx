import DividendGrowthCalculator from '@/components/DividendGrowthCalculator'

export default function DividendGrowthCalculatorPage() {
  const faqs = [
    {
      question: 'What is yield on cost and why is it important?',
      answer: 'Yield on cost (YOC) measures the dividend yield relative to your original investment, not current price. As dividends grow over time, your YOC increases even if the stock\'s current yield stays the same. A 4% initial yield with 5% annual dividend growth becomes 6.5% YOC after 10 years.',
    },
    {
      question: 'What are Dividend Aristocrats?',
      answer: 'Dividend Aristocrats are companies that have increased dividends for 25+ consecutive years. Examples include Coca-Cola (KO), Procter & Gamble (PG), Johnson & Johnson (JNJ). They typically grow dividends 5-8% annually and offer reliable income growth.',
    },
    {
      question: 'How does dividend reinvestment (DRIP) work?',
      answer: 'DRIP automatically reinvests dividends to purchase additional shares at current market price. This compounds returns by increasing your share count, which generates larger future dividends. Many brokers offer DRIP at no commission, including fractional shares.',
    },
    {
      question: 'What dividend growth rate is realistic?',
      answer: 'Dividend growth rates vary by company type. Dividend Aristocrats: 5-8% annually. Fast-growing companies: 10-15%. Mature, slow-growth companies: 2-4%. Companies in distress may freeze or cut dividends. Historical average for quality dividend stocks is 5-6%.',
    },
    {
      question: 'Are dividends taxed differently than other income?',
      answer: 'Qualified dividends (from stocks held over 60 days) are taxed at preferential rates: 0% for lowest income bracket, 15% for most taxpayers, 20% for highest bracket. Non-qualified dividends (REITs, some foreign stocks) are taxed as ordinary income.',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
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
      <DividendGrowthCalculator />
    </>
  )
}