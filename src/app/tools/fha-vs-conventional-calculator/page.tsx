import FhaVsConventionalCalculator from '@/components/FhaVsConventionalCalculator'

export default function FhaVsConventionalCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <FhaVsConventionalCalculator />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the minimum credit score for FHA vs conventional loans?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "FHA loans require a minimum credit score of 500 with 10% down, or 580 with 3.5% down. Conventional loans typically require 620+, but better rates require 680+. FHA is better for lower credit scores; conventional is better for 680+ scores."
                }
              },
              {
                "@type": "Question",
                "name": "What is the minimum down payment for FHA vs conventional?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "FHA: minimum 3.5% down with 580+ credit score. Conventional: 3% down for first-time buyers, 5% standard minimum. FHA allows lower credit scores with same down payment. Conventional with 20% down avoids PMI entirely."
                }
              },
              {
                "@type": "Question",
                "name": "How does FHA MIP compare to conventional PMI?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "FHA MIP: 1.75% upfront + 0.45-1.35% annual (permanent for loans with <10% down). Conventional PMI: 0.3-1.1% annual based on credit score, cancels at 20% equity. Conventional PMI is cheaper for good credit and eventually ends; FHA MIP can last forever."
                }
              },
              {
                "@type": "Question",
                "name": "When should I choose FHA over conventional?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Choose FHA if: credit score below 620, small down payment (3.5%), limited savings, or previous credit issues. FHA is more forgiving of past bankruptcies/foreclosures. Conventional is better if you have good credit (680+) and can put 5-10% down."
                }
              },
              {
                "@type": "Question",
                "name": "Can I refinance from FHA to conventional later?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, FHA-to-conventional refinance is common once you build equity and improve credit. When you reach 20% equity, refinance to conventional to eliminate PMI/MIP. This is often the best strategy: start with FHA, then refinance to conventional."
                }
              }
            ]
          })
        }}
      />
    </main>
  )
}