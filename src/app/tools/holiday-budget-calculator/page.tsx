import HolidayBudgetCalculator from '@/components/HolidayBudgetCalculator';

export default function HolidayBudgetCalculatorPage() {
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
                "name": "How much should I budget for holiday spending?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Average holiday spending is $800-1,500 per household. Minimal budget: ~$400, Standard: ~$800, Generous: ~$1,500, Extravagant: ~$2,500. Gifts typically consume 40-60% of the budget. Start saving 10 months before holiday season - save monthly amount = total budget / 10."
                }
              },
              {
                "@type": "Question",
                "name": "How much should I spend on holiday gifts?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Gift budgets vary by style. Average gift cost ranges $30-50 per person. Consider group gifts for families, experience gifts instead of items, or setting family gift limits. If gifts exceed 50% of your holiday budget, reconsider limits or alternative gift approaches."
                }
              },
              {
                "@type": "Question",
                "name": "What holiday expenses beyond gifts should I plan for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Beyond gifts, budget for: hosting meals and parties ($150-250), travel to visit family ($300-500), decorations ($50-150), special food and drinks ($100-200), entertainment and events ($50-150), new clothes for occasions ($50-100), and charitable giving. These can add 40-60% to gift costs."
                }
              },
              {
                "@type": "Question",
                "name": "How can I reduce holiday spending?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Reduce gift costs by shopping early for deals, buying used, or experience gifts. Share hosting costs with potluck-style gatherings. Reuse decorations from previous years. Shop sales for clothes. Attend free community events instead of expensive ones. Set gift limits with family members. Consider charitable giving for tax benefits."
                }
              },
              {
                "@type": "Question",
                "name": "When should I start saving for holidays?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Start saving 10 months before the holiday season. For December holidays, begin saving in February-March. Monthly saving goal = total estimated budget / 10. This spreads cost evenly and avoids credit card debt. Post-holiday sales in January offer savings for next year's decorations and gifts."
                }
              }
            ]
          })
        }}
      />
      <HolidayBudgetCalculator />
    </>
  );
}