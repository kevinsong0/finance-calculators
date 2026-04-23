import RefinanceBreakEvenCalculator from '@/components/RefinanceBreakEvenCalculator';

export default function RefinanceBreakEvenCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "When should I refinance my mortgage?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Refinance when: rate drop saves money before break-even, planning to stay past break-even, need lower monthly payment, want to change term length, eliminating PMI. Break-even under 3 years usually worthwhile. Consider: closing costs (2-5% of loan), how long you'll stay, current vs new rate difference. Avoid refinancing if moving soon or break-even exceeds planning horizon."
                }
              },
              {
                "@type": "Question",
                "name": "How do I calculate refinance break-even?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Break-even months = Total closing costs / Monthly savings. Example: $5,000 costs, $200 monthly savings = 25 months to break-even. Include: appraisal, title insurance, origination fees, points. Points cost extra but lower rate. Calculate savings vs costs over your expected ownership period. Break-even under 24-36 months typically worth refinancing."
                }
              },
              {
                "@type": "Question",
                "name": "Are mortgage points worth buying?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "One point = 1% of loan, reduces rate ~0.25%. Worth it if: staying past point break-even (typically 4-6 years), have cash available, lower rate long-term savings exceed point cost. Not worth if: moving soon, cash better used elsewhere, break-even exceeds ownership. Points are tax deductible in some cases. Calculate long-term savings vs upfront cost."
                }
              },
              {
                "@type": "Question",
                "name": "Should I extend my loan term when refinancing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Extending term lowers payment but increases total interest. Example: 20 years remaining, refinance to 30 years = 10 extra years of interest. Shorter term (15yr) saves interest but higher payment. Consider your goals: lower payment vs total cost. Extending term may help if budget tight. Shortening term saves significant interest long-term."
                }
              },
              {
                "@type": "Question",
                "name": "What are typical refinance closing costs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Typical costs (2-5% of loan): Appraisal $300-500, Title insurance $1,000-2,000, Origination fee 0.5-1%, Recording fees $50-250, Credit report $25-50, Attorney fees $500-1,000. Points optional. No-cost refinance available (higher rate covers costs). Compare total costs across lenders. Negotiate fees where possible. Some lenders offer fee discounts."
                }
              }
            ]
          })
        }}
      />
      <RefinanceBreakEvenCalculator />
    </>
  );
}