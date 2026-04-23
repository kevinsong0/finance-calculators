import ReverseMortgageCalculator from '@/components/ReverseMortgageCalculator'

export default function ReverseMortgageCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <ReverseMortgageCalculator />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is a reverse mortgage?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A reverse mortgage (HECM) allows homeowners age 62+ to convert home equity into cash without monthly payments. The loan is repaid when you sell the home, move out, or pass away. You retain title and can live in the home for life as long as you maintain it and pay property taxes."
                }
              },
              {
                "@type": "Question",
                "name": "What is the Principal Limit Factor (PLF)?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The PLF determines how much you can borrow. It increases with age: a 62-year-old may borrow ~50% of home value, while an 80-year-old may borrow ~86%. PLF also depends on interest rates. Higher rates mean lower PLF (less available to borrow)."
                }
              },
              {
                "@type": "Question",
                "name": "What are the reverse mortgage disbursement options?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Options include: Lump sum (one-time payment, typically capped at 60%), Line of credit (draw as needed, grows over time), Tenure (monthly payments for life), Term (monthly payments for fixed period), or a combination. Line of credit is popular for emergency fund planning."
                }
              },
              {
                "@type": "Question",
                "name": "What happens to my home with a reverse mortgage?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You retain ownership and title. The loan balance grows over time as interest accrues. When you leave the home, it's sold and the loan is repaid. Any remaining equity goes to you or heirs. HECM is non-recourse: heirs aren't liable if loan exceeds home value."
                }
              },
              {
                "@type": "Question",
                "name": "What are the costs of a reverse mortgage?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Costs include: 2% FHA mortgage insurance premium (MIP), origination fee (capped at $6,000), appraisal ($300-500), closing costs (title, escrow), and ongoing servicing fees. Total costs are typically 3-5% of home value. These can be financed from loan proceeds."
                }
              }
            ]
          })
        }}
      />
    </main>
  )
}