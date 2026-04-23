import WeddingBudgetCalculator from '@/components/WeddingBudgetCalculator';

export default function WeddingBudgetCalculatorPage() {
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
                "name": "How much does a typical wedding cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Average US wedding costs $20,000-35,000 for 100-150 guests. Costs vary by location: urban areas $30,000-50,000, rural areas $15,000-25,000. Venue and catering typically account for 50-60% of total budget."
                }
              },
              {
                "@type": "Question",
                "name": "How should I allocate wedding budget?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Recommended allocation: Venue 25%, Catering 30%, Photography 10%, Videography 5%, Flowers 5%, Music 5%, Attire 7%, Invitations 2%, Decorations 4%, Officiant 1%, Miscellaneous 6%. Adjust based on priorities."
                }
              },
              {
                "@type": "Question",
                "name": "How many guests should I invite?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Guest count depends on budget and venue capacity. Each guest adds $75-150 in catering costs. Consider: intimate wedding (50-75 guests), standard (100-150), large (200+). Guest count is the biggest controllable expense."
                }
              },
              {
                "@type": "Question",
                "name": "How can I reduce wedding costs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Reduce costs by: choosing off-season dates, weekday weddings, combining venue/catering packages, limiting guest count, DIY decorations, digital invitations, shorter reception, prioritizing must-haves over nice-to-haves."
                }
              }
            ]
          })
        }}
      />
      <WeddingBudgetCalculator />
    </>
  );
}