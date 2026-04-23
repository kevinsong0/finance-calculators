import CapitalGainsHarvestingTimingCalculator from '@/components/CapitalGainsHarvestingTimingCalculator'

export default function CapitalGainsHarvestingTimingCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <CapitalGainsHarvestingTimingCalculator />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is capital gains harvesting?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Capital gains harvesting involves strategically timing the sale of investments to minimize taxes. By holding assets for over 1 year, you qualify for long-term capital gains rates (0%, 15%, or 20%) instead of short-term rates (up to 37%)."
                }
              },
              {
                "@type": "Question",
                "name": "How long must I hold an investment for long-term capital gains?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You must hold the asset for more than 1 year (365+ days) to qualify for long-term capital gains treatment. The holding period starts from the purchase date, not the grant date for options."
                }
              },
              {
                "@type": "Question",
                "name": "What are the long-term capital gains tax rates for 2024?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "2024 LTCG rates: 0% (income under $47,025 single/$94,050 married), 15% ($47,025-$518,900 single/$94,050-$583,750 married), 20% (above those thresholds). Plus 3.8% NIIT for high earners."
                }
              },
              {
                "@type": "Question",
                "name": "When should I wait before selling for tax benefits?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "If close to 1-year mark, waiting a few days/weeks can save significant taxes. Calculate the tax savings versus opportunity cost of delaying reinvestment. Consider expected gains during waiting period."
                }
              },
              {
                "@type": "Question",
                "name": "What is the wash sale rule?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The wash sale rule prevents buying the same or substantially identical security within 30 days before or after selling at a loss. If violated, the loss deduction is deferred. Applies across all accounts."
                }
              }
            ]
          })
        }}
      />
    </main>
  )
}