import ChildCareCostCalculator from '@/components/ChildCareCostCalculator';

export default function ChildCareCostCalculatorPage() {
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
                "name": "How much does daycare cost per month?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Daycare costs average $800-1,500 per child per month depending on location and age. Infant care is 50-100% more expensive than preschool care. Urban areas typically cost more. Family daycare centers are often 20-30% cheaper than large centers."
                }
              },
              {
                "@type": "Question",
                "name": "Is a nanny cheaper than daycare?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For one child, daycare is typically cheaper ($1,000-1,500 vs $2,000-3,000 for nanny). For multiple children, a nanny may be cost-effective. Nannies provide personalized care and flexibility but require employer taxes and scheduling management."
                }
              },
              {
                "@type": "Question",
                "name": "What tax benefits help with childcare costs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Dependent Care Credit offers up to $1,200 (20% of $6,000 max). Dependent Care FSA allows $5,000 pre-tax annually. Some employers offer childcare subsidies. Combined benefits can reduce effective costs by 30-40%."
                }
              },
              {
                "@type": "Question",
                "name": "How can I reduce childcare costs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Options include: nanny shares (split cost with another family), au pair programs ($400/week plus housing), flexible work hours to reduce care hours, family help, employer subsidies, and Dependent Care FSA. Consider part-time daycare if possible."
                }
              },
              {
                "@type": "Question",
                "name": "What percentage of income should go to childcare?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Childcare typically consumes 10-20% of family income. In some areas, it exceeds housing costs. If childcare exceeds 25% of income, explore alternatives or consider whether dual-income is financially optimal. Plan for school-age transition to reduce costs."
                }
              }
            ]
          })
        }}
      />
      <ChildCareCostCalculator />
    </>
  );
}