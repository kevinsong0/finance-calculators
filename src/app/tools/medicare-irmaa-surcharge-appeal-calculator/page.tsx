import MedicareIRMAASurchargeAppealCalculator from '@/components/MedicareIRMAASurchargeAppealCalculator'

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is IRMAA and why do I have to pay it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'IRMAA (Income-Related Monthly Adjustment Amount) is a surcharge added to Medicare Part B and Part D premiums for high-income beneficiaries. It is based on your Modified Adjusted Gross Income (MAGI) from 2 years prior, as reported on your tax return.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I appeal my IRMAA surcharge?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can appeal IRMAA if you experienced a life-changing event that significantly reduced your income. Qualifying events include retirement, job loss, divorce, death of spouse, or loss of income-producing property. File form SSA-44 with documentation.',
        },
      },
      {
        '@type': 'Question',
        name: 'What form do I use for IRMAA appeal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use SSA-44 (Request for New Initial Determination). Submit it to Social Security with proof of the life-changing event and documentation of your current, lower income. SSA may recalculate IRMAA based on your current income.',
        },
      },
      {
        '@type': 'Question',
        name: 'What income is used for IRMAA determination?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SSA uses your Modified Adjusted Gross Income (MAGI) from 2 years prior. For 2024 IRMAA, SSA uses your 2022 tax return data. MAGI = AGI + tax-exempt interest + foreign earned income exclusion.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the IRMAA tiers and thresholds?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For 2024 (single filers): Tier 1: $103,000-$129,000 ($244.60 Part B); Tier 2: $129,000-$161,000 ($349.40); Tier 3: $161,000-$193,000 ($459.00); Tier 4: $193,000+ ($569.00). Married thresholds are doubled.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MedicareIRMAASurchargeAppealCalculator />
    </>
  )
}