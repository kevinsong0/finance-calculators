import JumboLoanCalculator from '@/components/JumboLoanCalculator'

export default function JumboLoanCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <JumboLoanCalculator />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is a jumbo loan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A jumbo loan exceeds the conforming loan limit set by FHFA. In 2024, the limit is $766,550 (up to $1,149,825 in high-cost areas). Any mortgage above this limit is a jumbo loan. Jumbo loans have stricter requirements and slightly higher rates."
                }
              },
              {
                "@type": "Question",
                "name": "What are jumbo loan requirements?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Typical requirements: 700+ credit score (sometimes 720+), 10-20% down payment, 43% max DTI ratio, 6-12 months of reserves (payments saved), lower debt-to-income ratio than conforming. Requirements vary by lender; some portfolio lenders are more flexible."
                }
              },
              {
                "@type": "Question",
                "name": "Are jumbo loan rates higher?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Jumbo rates are typically 0.25-0.75% higher than conforming rates. Higher risk (larger amount, no government backing) means higher rates. However, some portfolio lenders offer competitive jumbo rates, especially for excellent credit borrowers."
                }
              },
              {
                "@type": "Question",
                "name": "What is a piggyback loan alternative to jumbo?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Piggyback (80-10-10): conforming first mortgage up to limit + 10% second mortgage + 10% down. Avoids jumbo rates, no PMI. Example: $800K home = $766K conforming first + $80K second + $80K down. Works when total needed is close to conforming limit."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use FHA or VA for a jumbo loan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. FHA loans have limits ($498K-$1.15M depending on county). VA loans have no official limit with full entitlement, but lenders may cap at conforming + 25%. For true jumbo amounts, conventional jumbo or portfolio loans are the primary options."
                }
              }
            ]
          })
        }}
      />
    </main>
  )
}