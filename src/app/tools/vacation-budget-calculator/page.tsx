import VacationBudgetCalculator from '@/components/VacationBudgetCalculator';

export default function VacationBudgetCalculatorPage() {
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
                "name": "How much should I budget for a vacation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Budget varies by destination type. Domestic trips: $100-200/day per person. International: $200-400/day. Include flights (40% budget), accommodation (30%), food (15%), activities (10%), and contingency (5-10%)."
                }
              },
              {
                "@type": "Question",
                "name": "When should I start saving for vacation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Start saving 6-12 months before major trips. Book flights 2-8 months ahead for best prices. Accommodation 3-6 months ahead. Daily expenses can be tracked closer to travel date."
                }
              },
              {
                "@type": "Question",
                "name": "What contingency percentage should I include?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Include 10-20% contingency buffer for unexpected expenses. Higher for international trips (15-20%), adventure travel, or destinations with unpredictable costs. Lower (10%) for familiar domestic destinations."
                }
              },
              {
                "@type": "Question",
                "name": "Should I get travel insurance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, especially for international trips, expensive bookings, or adventure activities. Cost is typically 5-10% of trip cost. Covers trip cancellation, medical emergencies, lost luggage, and travel delays."
                }
              }
            ]
          })
        }}
      />
      <VacationBudgetCalculator />
    </>
  );
}