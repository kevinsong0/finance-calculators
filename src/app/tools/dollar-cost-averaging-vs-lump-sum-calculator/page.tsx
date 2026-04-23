import DollarCostAveragingVsLumpSumCalculator from '@/components/DollarCostAveragingVsLumpSumCalculator'

export default function DollarCostAveragingVsLumpSumCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <DollarCostAveragingVsLumpSumCalculator />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is dollar cost averaging (DCA)?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Dollar cost averaging means investing a fixed amount at regular intervals (monthly, weekly) regardless of market price. This reduces impact of market volatility and removes the pressure of timing the market perfectly."
                }
              },
              {
                "@type": "Question",
                "name": "What is lump sum investing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Lump sum investing means putting all available money into the market at once. Research shows this typically produces better returns because markets historically trend upward and more money is invested sooner."
                }
              },
              {
                "@type": "Question",
                "name": "Does DCA or lump sum perform better historically?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Studies show lump sum outperforms DCA about 67% of time in rising markets. DCA performs better in declining markets or high volatility. The longer the DCA period, the more lump sum's advantage grows."
                }
              },
              {
                "@type": "Question",
                "name": "When should I use DCA instead of lump sum?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Consider DCA if: nervous about market timing, received large lump sum (bonus, inheritance), uncertain job situation, or high expected volatility. DCA provides psychological comfort and flexibility to stop if circumstances change."
                }
              },
              {
                "@type": "Question",
                "name": "Is there a hybrid approach?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Invest 50% immediately (lump sum) and spread remaining 50% over 6-12 months. This balances the statistical advantage of lump sum with the psychological benefit of DCA. Adjust percentages based on risk tolerance."
                }
              }
            ]
          })
        }}
      />
    </main>
  )
}