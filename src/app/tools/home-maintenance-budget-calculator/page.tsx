import HomeMaintenanceBudgetCalculator from '@/components/HomeMaintenanceBudgetCalculator';

export default function HomeMaintenanceBudgetCalculatorPage() {
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
                "name": "What is the 1% rule for home maintenance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The 1% rule suggests budgeting 1% of your home's value annually for maintenance. For a $400,000 home, that's $4,000/year or $333/month. This baseline covers regular repairs, seasonal tasks, and eventual system replacements."
                }
              },
              {
                "@type": "Question",
                "name": "How much should I budget for home repairs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Budget varies by factors: home age (older homes need 25-50% more), size (larger homes cost more), climate (harsh weather increases costs), and maintenance level. Typical range is $200-500/month, with older homes needing higher budgets."
                }
              },
              {
                "@type": "Question",
                "name": "What are the most expensive home repairs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Major expenses include: HVAC replacement ($5,000-15,000), roof replacement ($5,000-20,000), foundation repairs ($5,000-30,000), plumbing issues ($1,000-5,000), electrical updates ($2,000-10,000), and water heater replacement ($1,000-3,000)."
                }
              },
              {
                "@type": "Question",
                "name": "How much should I save for home emergency repairs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Maintain a reserve equal to 6 months of your maintenance budget. For example, if you budget $400/month, save $2,400. This covers unexpected repairs like HVAC failure or water damage without financing or dipping into other savings."
                }
              },
              {
                "@type": "Question",
                "name": "Does preventive maintenance save money?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, preventive maintenance saves 50-75% on repair costs. Regular HVAC tune-ups ($100) prevent $5,000+ failures. Gutter cleaning prevents water damage. Annual inspections catch small problems before they become expensive emergencies."
                }
              }
            ]
          })
        }}
      />
      <HomeMaintenanceBudgetCalculator />
    </>
  );
}