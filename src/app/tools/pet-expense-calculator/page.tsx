import PetExpenseCalculator from '@/components/PetExpenseCalculator';

export default function PetExpenseCalculatorPage() {
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
                "name": "How much does owning a dog cost per year?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Annual dog ownership costs range from $500-2,000 depending on size and needs. First-year costs are higher ($1,000-2,000) due to initial supplies, vaccinations, and training. Ongoing costs include food, vet care, grooming, and supplies."
                }
              },
              {
                "@type": "Question",
                "name": "How much does owning a cat cost per year?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Annual cat ownership costs range from $400-1,000. First-year costs are higher ($500-1,000) for initial setup. Cats typically cost less than dogs due to smaller size and no outdoor grooming needs, but vet emergencies can be expensive."
                }
              },
              {
                "@type": "Question",
                "name": "Is pet insurance worth the cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pet insurance costs $30-50/month and can save thousands on unexpected vet bills. Emergency surgeries can cost $5,000-10,000. Insurance is recommended for dogs and outdoor cats. Consider coverage limits and pre-existing condition exclusions."
                }
              },
              {
                "@type": "Question",
                "name": "What are hidden costs of pet ownership?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Hidden costs include: emergency vet visits ($500-5,000), boarding during travel ($25-75/day), pet deposits for rentals, replacement of damaged items, specialized diets, dental care, and end-of-life care. Budget for unexpected expenses."
                }
              },
              {
                "@type": "Question",
                "name": "How can I reduce pet expenses?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Save money by: buying food in bulk, learning basic grooming at home, comparing vet prices, using free community resources, pet sitting instead of boarding, and considering pet insurance to protect against major expenses."
                }
              }
            ]
          })
        }}
      />
      <PetExpenseCalculator />
    </>
  );
}