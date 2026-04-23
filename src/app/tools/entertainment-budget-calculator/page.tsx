import EntertainmentBudgetCalculator from '@/components/EntertainmentBudgetCalculator';

export default function EntertainmentBudgetCalculatorPage() {
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
                "name": "How much should I budget for entertainment?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Entertainment should be 2-4% of income. For a $5,000 monthly income, that's $100-200. This includes movies, concerts, dining out, streaming, gaming, and hobbies. Balance paid entertainment with free activities to maximize value."
                }
              },
              {
                "@type": "Question",
                "name": "What are good free entertainment alternatives?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Free options include: community events, public parks and hiking, library programs, free museum days, community sports leagues, home game nights, free concerts in parks, podcasts, and free streaming content. Mix free with paid for balanced budget."
                }
              },
              {
                "@type": "Question",
                "name": "How can I save on streaming services?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Rotate subscriptions instead of keeping multiple active. Share family plans. Use free trials strategically. Take advantage of bundled deals. Consider annual plans for discounts. Cancel during low-usage months. Average household overspends $40+ on unused subscriptions."
                }
              },
              {
                "@type": "Question",
                "name": "Is spending on entertainment worth it?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Entertainment provides stress relief, social connection, and mental health benefits. Calculate cost per hour - if it's under your hourly wage, value often exceeds cost. Balance immediate entertainment with long-term financial goals. Quality experiences often worth the investment."
                }
              },
              {
                "@type": "Question",
                "name": "How do concerts and events affect my budget?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Concerts and events cost $50-200+ per ticket. Budget quarterly or annually for major events. Mix expensive events with free community entertainment. Consider seating choices - upper level tickets provide similar experience at 50% savings. Plan events as special occasions rather than regular spending."
                }
              }
            ]
          })
        }}
      />
      <EntertainmentBudgetCalculator />
    </>
  );
}