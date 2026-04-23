import WindfallEliminationProvisionCalculator from '@/components/WindfallEliminationProvisionCalculator'

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Windfall Elimination Provision (WEP)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WEP is a Social Security rule that reduces benefits for workers who also receive pensions from employment not covered by Social Security (such as government jobs or teaching positions in some states). It prevents 'double-dipping' from both systems."
      }
    },
    {
      "@type": "Question",
      "name": "How much does WEP reduce my Social Security benefit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The maximum WEP reduction in 2024 is $586 per month. The actual reduction depends on your years of 'substantial covered earnings' - 30+ years eliminates WEP entirely, 21-29 years gives partial reduction (5% per year below 30), and 20 or fewer years can result in up to 45% reduction of your benefit."
      }
    },
    {
      "@type": "Question",
      "name": "How can I eliminate or reduce the WEP penalty?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Work additional years in Social Security-covered employment to accumulate 'substantial earnings.' Each year above the substantial threshold (about $31,060 in 2024) counts toward the 30-year goal. Once you reach 30 years of substantial earnings, WEP no longer applies."
      }
    },
    {
      "@type": "Question",
      "name": "Does WEP affect survivor benefits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, WEP does not reduce Social Security survivor benefits. When you die, your surviving spouse receives the full benefit amount without WEP reduction. However, if the survivor also has a non-covered pension, they may be subject to the Government Pension Offset (GPO)."
      }
    },
    {
      "@type": "Question",
      "name": "Who is affected by WEP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WEP affects workers who: 1) worked in jobs not covered by Social Security (federal employees hired before 1984, some state/local government workers, some teachers), 2) are eligible for a pension from that non-covered work, and 3) also qualify for Social Security benefits from other covered employment."
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
      <WindfallEliminationProvisionCalculator />
    </>
  )
}