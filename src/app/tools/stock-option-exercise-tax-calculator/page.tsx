import StockOptionExerciseTaxCalculator from '@/components/StockOptionExerciseTaxCalculator'

export default function StockOptionExerciseTaxCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <StockOptionExerciseTaxCalculator />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the difference between NSO and ISO stock options?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "NSOs (Non-Qualified Stock Options) are taxed as ordinary income at exercise on the spread between FMV and strike price. ISOs (Incentive Stock Options) have no regular tax at exercise but trigger AMT adjustment. ISOs can qualify for long-term capital gains treatment if held for 2+ years from grant and 1+ year from exercise."
                }
              },
              {
                "@type": "Question",
                "name": "When do I pay taxes on stock options?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "NSOs: Tax on spread at exercise (ordinary income rates). ISOs: No regular tax at exercise, but potential AMT. Upon qualifying sale, ISOs get LTCG rates. Disqualifying disposition (sell before holding requirement) taxes the spread as ordinary income."
                }
              },
              {
                "@type": "Question",
                "name": "What is the AMT impact of exercising ISOs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Exercising ISOs adds the spread to your AMT income calculation. If AMT exceeds your regular tax, you pay AMT. However, you receive an AMT credit that can offset future regular tax liability. The AMT exemption for 2024 is $81,700 (single) or $126,500 (married filing jointly)."
                }
              },
              {
                "@type": "Question",
                "name": "What is a qualifying vs disqualifying disposition?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Qualifying disposition for ISOs: hold shares at least 2 years from grant date AND 1 year from exercise date. Total gain is taxed as long-term capital gains (typically 15-20%). Disqualifying: sell before meeting holding requirements - spread taxed as ordinary income, remaining gain as capital gains."
                }
              },
              {
                "@type": "Question",
                "name": "Should I exercise my stock options early?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Early exercise (when spread is small) can minimize AMT impact for ISOs and lock in lower tax basis. However, you risk losing money if stock declines and must have cash to pay exercise cost and potential taxes. Consider your risk tolerance, liquidity needs, and company outlook."
                }
              }
            ]
          })
        }}
      />
    </main>
  )
}