import MedicarePartBIRMAACalculator from '@/components/MedicarePartBIRMAACalculator'

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is IRMAA for Medicare Part B?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IRMAA (Income-Related Monthly Adjustment Amount) is a surcharge added to Medicare Part B and Part D premiums for high-income beneficiaries. If your MAGI exceeds certain thresholds, you pay additional amounts on top of the standard premium."
      }
    },
    {
      "@type": "Question",
      "name": "What income does IRMAA use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IRMAA is based on your Modified Adjusted Gross Income (MAGI) from two tax years prior. For 2024 IRMAA, your 2022 tax return income is used. This two-year lag allows time for income planning strategies."
      }
    },
    {
      "@type": "Question",
      "name": "What are the 2024 IRMAA income thresholds?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For single filers: IRMAA starts at $103,000 MAGI. For married filing jointly: IRMAA starts at $206,000. There are 5 tiers above these thresholds, with the highest tier for income above $500,000 (single) or $750,000 (married)."
      }
    },
    {
      "@type": "Question",
      "name": "How much are the IRMAA surcharges?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Part B IRMAA surcharges range from $69.90/month (Tier 1) to $487.10/month (Tier 5). Part D surcharges range from $12.90/month to $89.70/month. These are added to standard premiums of $174.70 for Part B and varying amounts for Part D."
      }
    },
    {
      "@type": "Question",
      "name": "Can I reduce or avoid IRMAA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, strategies include: Roth conversions before Medicare enrollment, tax-loss harvesting, maximizing HSA contributions, deferred compensation timing, charitable giving via QCDs, and managing investment income. Reducing MAGI below threshold brackets can save thousands annually."
      }
    }
  ]
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MedicarePartBIRMAACalculator />
    </>
  )
}