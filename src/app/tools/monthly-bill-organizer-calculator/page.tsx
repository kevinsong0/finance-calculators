import MonthlyBillOrganizerCalculator from '@/components/MonthlyBillOrganizerCalculator';

export default function MonthlyBillOrganizerCalculatorPage() {
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
                "name": "Should I use autopay for all bills?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Autopay is recommended for fixed recurring bills to avoid late fees and simplify management. However, variable bills or ones you need to review before paying may benefit from manual payment."
                }
              },
              {
                "@type": "Question",
                "name": "What payment strategy is best for cash flow?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Spreading payments across the month helps reduce single-day burden and maintains steady cash flow. Paying bills as they come due ensures timely payments while avoiding large lump sum expenses."
                }
              },
              {
                "@type": "Question",
                "name": "How can I reduce my monthly bills?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Review subscriptions for unused services, negotiate rates with service providers annually, consider cheaper alternatives for phone and internet plans, and consolidate services where possible."
                }
              },
              {
                "@type": "Question",
                "name": "What percentage of income should go to bills?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ideally, essential bills should not exceed 50-60% of your income. This leaves room for savings (20%) and discretionary spending (30%). High bill ratios may indicate need for cost reduction or income increase."
                }
              }
            ]
          })
        }}
      />
      <MonthlyBillOrganizerCalculator />
    </>
  );
}