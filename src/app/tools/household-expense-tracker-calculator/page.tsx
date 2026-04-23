import HouseholdExpenseTrackerCalculator from '@/components/HouseholdExpenseTrackerCalculator';

export default function HouseholdExpenseTrackerCalculatorPage() {
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
                "name": "What is the ideal housing cost ratio?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The recommended housing cost ratio is below 30% of your gross income. This includes rent/mortgage, property taxes, and insurance. Exceeding this threshold may indicate financial strain."
                }
              },
              {
                "@type": "Question",
                "name": "How much should I save each month?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A target savings rate of 10-20% of your income is recommended for financial stability. This helps build emergency funds, retirement savings, and achieve long-term financial goals."
                }
              },
              {
                "@type": "Question",
                "name": "What are essential vs discretionary expenses?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Essential expenses include housing, utilities, groceries, transportation, and healthcare - costs necessary for basic living. Discretionary expenses are entertainment, education, personal items, and other non-essential spending."
                }
              },
              {
                "@type": "Question",
                "name": "How can I reduce household expenses?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Common strategies include meal planning to reduce grocery costs, negotiating utility rates, using public transportation, reviewing subscriptions, and implementing energy efficiency measures in your home."
                }
              }
            ]
          })
        }}
      />
      <HouseholdExpenseTrackerCalculator />
    </>
  );
}