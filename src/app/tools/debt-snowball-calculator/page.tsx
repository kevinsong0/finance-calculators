import DebtSnowballCalculator from '@/components/DebtSnowballCalculator';

export default function DebtSnowballCalculatorPage() {
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
                "name": "What is the debt snowball method?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The debt snowball method pays off debts from smallest balance to largest, regardless of interest rate. This provides psychological wins as debts are eliminated quickly, building momentum and motivation."
                }
              },
              {
                "@type": "Question",
                "name": "What is the debt avalanche method?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The debt avalanche method pays off debts from highest interest rate to lowest. This is mathematically optimal and saves the most interest over time, but may take longer to see first debt eliminated."
                }
              },
              {
                "@type": "Question",
                "name": "Which method is better?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Research shows snowball method leads to higher success rates due to psychological motivation. Avalanche saves more money mathematically. Choose based on your personality - motivation-focused vs math-focused."
                }
              },
              {
                "@type": "Question",
                "name": "How much extra should I pay toward debt?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Start with whatever you can afford beyond minimums. Even $50-100 extra monthly significantly accelerates payoff. Aim for 10-20% of income toward debt repayment for fastest results."
                }
              }
            ]
          })
        }}
      />
      <DebtSnowballCalculator />
    </>
  );
}