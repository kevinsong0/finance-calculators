import VaLoanVsConventionalCalculator from '@/components/VaLoanVsConventionalCalculator'

export default function VaLoanVsConventionalCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <VaLoanVsConventionalCalculator />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is a VA loan and who is eligible?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "VA loans are mortgages guaranteed by the Department of Veterans Affairs. Eligible: active duty service members, veterans with 90+ days service, National Guard/Reserves with 6 years service, surviving spouses. Must have certificate of eligibility (COE) from VA."
                }
              },
              {
                "@type": "Question",
                "name": "What are the main benefits of VA loans?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Key benefits: 0% down payment (no PMI), lower interest rates (typically 0.25-0.5% below conventional), no loan limit with full entitlement, funding fee exempt for disabled veterans (10%+ rating), assumable loans, no prepayment penalty."
                }
              },
              {
                "@type": "Question",
                "name": "What is the VA funding fee?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "VA funding fee: 2.25% (first use, 0% down), 1.5-1.75% (with 5-10% down), 3.75% (subsequent use, 0% down). Disabled veterans (10%+ VA disability rating) are exempt. Fee can be financed into the loan. Much lower total cost than PMI."
                }
              },
              {
                "@type": "Question",
                "name": "Can I get a VA loan with bad credit?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "VA loans have no official minimum credit score, but lenders typically require 620+. VA loans are more forgiving: consider overall financial picture, not just credit score. Residual income requirement (must have money left after debts). Many lenders accept lower scores for VA than conventional."
                }
              },
              {
                "@type": "Question",
                "name": "Is a VA loan always better than conventional?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "VA loans are usually best for eligible borrowers: 0% down, no PMI, lower rates. Conventional may be better if: excellent credit + 20% down (no PMI anyway), or if VA funding fee makes loan too expensive and you have large down payment. Always compare total costs."
                }
              }
            ]
          })
        }}
      />
    </main>
  )
}