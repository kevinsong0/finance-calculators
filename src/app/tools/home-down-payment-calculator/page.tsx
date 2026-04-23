import HomeDownPaymentCalculator from '@/components/HomeDownPaymentCalculator';

export default function HomeDownPaymentCalculatorPage() {
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
                "name": "What is the minimum down payment for a home?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The minimum down payment varies by loan type. Conventional loans typically require 3-5% down, FHA loans require 3.5% down, VA loans may allow 0% down for eligible veterans, and USDA loans also offer 0% down in qualifying areas."
                }
              },
              {
                "@type": "Question",
                "name": "What is PMI and when is it required?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Private Mortgage Insurance (PMI) is required when your down payment is less than 20% of the home price. PMI typically costs 0.5-1% of the loan amount annually and protects the lender if you default. PMI can be removed once you reach 20% equity."
                }
              },
              {
                "@type": "Question",
                "name": "How much should I save for closing costs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Closing costs typically range from 2-5% of the home price. For a $400,000 home, expect $8,000-$20,000 in closing costs. These include loan origination fees, appraisal, title insurance, attorney fees, and prepaid items like property taxes and insurance."
                }
              },
              {
                "@type": "Question",
                "name": "Is a 20% down payment always better?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A 20% down payment eliminates PMI and reduces monthly payments, but it may not always be optimal. Consider your emergency fund, other debt, and investment opportunities. Sometimes a lower down payment with PMI can be worthwhile if it allows you to buy sooner or keep savings for other goals."
                }
              },
              {
                "@type": "Question",
                "name": "How do I calculate my total cash needed to buy a home?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Total cash needed equals your down payment plus closing costs. For a $400,000 home with 10% down ($40,000) and 3% closing costs ($12,000), you need $52,000 total. Also budget for moving costs, immediate repairs, and reserve funds."
                }
              }
            ]
          })
        }}
      />
      <HomeDownPaymentCalculator />
    </>
  );
}