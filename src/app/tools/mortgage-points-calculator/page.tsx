import MortgagePointsCalculator from '@/components/MortgagePointsCalculator'

export default function MortgagePointsCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <MortgagePointsCalculator />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What are mortgage points?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Mortgage points (also called discount points) are fees paid to the lender at closing to lower your interest rate. Each point costs 1% of your loan amount and typically reduces your rate by 0.25%. Points are optional and can be negotiated with your lender."
                }
              },
              {
                "@type": "Question",
                "name": "When should I buy mortgage points?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Buy points if you plan to stay in the home long enough to pass the break-even point. Calculate break-even by dividing point cost by monthly savings. If you'll stay longer than break-even (typically 5-7 years), points can save money. Short-term owners usually shouldn't buy points."
                }
              },
              {
                "@type": "Question",
                "name": "Are mortgage points tax deductible?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, mortgage points are generally tax-deductible as mortgage interest on your primary residence. Points paid at purchase can be deducted in the year paid. Points paid on refinance must be deducted over the life of the loan. Consult a tax professional for your specific situation."
                }
              },
              {
                "@type": "Question",
                "name": "How many points can I buy?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Lenders typically allow buying 0-4 points. Some lenders cap points or have minimum amounts. Each point reduces your rate by approximately 0.25%, but the exact reduction varies. Negotiate with lenders - some may offer free points or lower point costs to compete."
                }
              },
              {
                "@type": "Question",
                "name": "Should I use money for points or down payment?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Consider your priorities: a larger down payment reduces loan size, may eliminate PMI, and improves loan terms. Points only reduce the rate. If PMI elimination is possible, down payment may be better. Run both scenarios to compare total costs over your expected ownership period."
                }
              }
            ]
          })
        }}
      />
    </main>
  )
}