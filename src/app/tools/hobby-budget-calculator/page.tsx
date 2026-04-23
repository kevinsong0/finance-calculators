import HobbyBudgetCalculator from '@/components/HobbyBudgetCalculator';

export default function HobbyBudgetCalculatorPage() {
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
                "name": "How much should I budget for hobbies?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Typical hobby spending is 2-4% of income. For a $5,000 monthly income, that suggests $100-200 for hobbies. Low-cost hobbies like reading or hiking cost under $50/month, while photography or gaming can exceed $200/month."
                }
              },
              {
                "@type": "Question",
                "name": "What are the most expensive hobbies?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Expensive hobbies include travel ($500+/trip), photography ($300-500/mo equipment), golf ($200-400/mo), skiing ($300+/season), boating ($500+/mo), and gaming with new releases ($100-200/mo). Consider costs before committing."
                }
              },
              {
                "@type": "Question",
                "name": "How can I reduce hobby costs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cost-saving strategies: buy used equipment, take advantage of sales, use online tutorials instead of paid lessons, share equipment with friends, try free alternatives first, and limit hobby count to focus investment."
                }
              },
              {
                "@type": "Question",
                "name": "Is hobby spending worth the cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Hobbies provide mental health benefits, skill development, and social connections. Calculate cost per hour of enjoyment - if under your hourly wage, the value often exceeds the cost. Balance spending with life quality."
                }
              },
              {
                "@type": "Question",
                "name": "How many hobbies should I have?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Quality over quantity - 2-3 focused hobbies allow meaningful engagement and skill development. More than 5 often leads to diluted investment and incomplete projects. Depth in few hobbies exceeds breadth in many."
                }
              }
            ]
          })
        }}
      />
      <HobbyBudgetCalculator />
    </>
  );
}