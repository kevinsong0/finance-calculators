import BabyBudgetCalculator from '@/components/BabyBudgetCalculator';

export default function BabyBudgetCalculatorPage() {
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
                "name": "How much does a baby cost per month?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Monthly baby costs range $300-1,500 depending on childcare choice. Newborns cost more due to diapers ($50-80), formula ($75-150 if not breastfeeding), and clothing. Childcare is largest expense: daycare $600-1,200/month, nanny $1,200-2,500/month. First year total averages $12,000-15,000 including one-time purchases."
                }
              },
              {
                "@type": "Question",
                "name": "How much should I budget for childcare?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Childcare costs vary significantly. Daycare centers average $600-1,200/month ($800-1,000 typical). In-home daycare costs $400-800/month. Nannies cost $1,200-2,500/month plus taxes. Family care or stay-at-home option costs $0-500/month. Consider employer subsidies, Dependent Care FSA ($5,000 pre-tax), and Child Tax Credit ($2,000/year) to offset costs."
                }
              },
              {
                "@type": "Question",
                "name": "How do baby costs change as they grow?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Newborns (0-6 months) have highest monthly costs: $600-800+ including diapers, formula, medical visits. Infants (6-12 months) costs drop slightly as feeding stabilizes. Toddlers (1-3 years) need less diapers, more toys/activities. Preschool (3-5 years) may reduce childcare if public preschool available. Clothing costs persist across all ages."
                }
              },
              {
                "@type": "Question",
                "name": "What one-time baby costs should I plan for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "First-year one-time costs average $2,000-3,000: nursery furniture (crib $200-500), stroller ($100-400), car seat ($100-300), baby gear (bouncer, carrier), and initial supply of bottles, clothes, blankets. Add medical/delivery costs not covered by insurance. Plan for parental leave income gap if unpaid."
                }
              },
              {
                "@type": "Question",
                "name": "How can I reduce baby costs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Buy diapers in bulk or use cloth diapers (save 30%). Accept hand-me-downs for clothes and gear. Buy secondhand for non-safety items. Use library for toys and books. Breastfeed to eliminate formula costs. Consider nanny share to split costs. Compare daycare rates across providers. Use Dependent Care FSA and tax credits."
                }
              }
            ]
          })
        }}
      />
      <BabyBudgetCalculator />
    </>
  );
}