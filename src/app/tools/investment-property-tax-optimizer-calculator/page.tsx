import InvestmentPropertyTaxOptimizerCalculator from '@/components/InvestmentPropertyTaxOptimizerCalculator'

export default function InvestmentPropertyTaxOptimizerCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <InvestmentPropertyTaxOptimizerCalculator />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How is rental property depreciation calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Residential rental property is depreciated over 27.5 years, commercial property over 39 years. Only the building value is depreciable (typically 80% of purchase price, with 20% allocated to non-depreciable land). Annual depreciation = building value ÷ depreciation period."
                }
              },
              {
                "@type": "Question",
                "name": "What is depreciation recapture on sale?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "When selling rental property, accumulated depreciation is 'recaptured' and taxed at a maximum rate of 25% (not your ordinary income rate or capital gains rate). This recapture tax applies to the portion of gain attributable to depreciation taken during ownership."
                }
              },
              {
                "@type": "Question",
                "name": "How does a 1031 exchange work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A 1031 exchange allows you to defer all capital gains and depreciation recapture taxes by exchanging investment property for another 'like-kind' property. Strict timelines: identify replacement property within 45 days, complete exchange within 180 days. Gains carry forward to new property basis."
                }
              },
              {
                "@type": "Question",
                "name": "What deductions can reduce rental property taxable income?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Deductible expenses include: mortgage interest, property taxes, operating expenses (repairs, maintenance, insurance, management fees), depreciation. Net Operating Income (NOI) = rent minus expenses and depreciation. Negative NOI can offset other passive income."
                }
              },
              {
                "@type": "Question",
                "name": "Should I use cost segregation for my rental property?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cost segregation identifies components (appliances, flooring, landscaping) that can be depreciated faster (5, 7, or 15 years vs 27.5). This accelerates depreciation deductions, reducing current taxable income. However, it increases future depreciation recapture. Best for high-income taxpayers in early ownership years."
                }
              }
            ]
          })
        }}
      />
    </main>
  )
}