import MedicarePartBEnrollmentTimingCalculator from '@/components/MedicarePartBEnrollmentTimingCalculator'

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'When should I enroll in Medicare Part B?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You should enroll in Medicare Part B during your Initial Enrollment Period (IEP) - the 7-month window around your 65th birthday (3 months before, your birthday month, 3 months after). If you have employer coverage from a large employer (20+ employees), you may qualify for a Special Enrollment Period.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the late enrollment penalty for Part B?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The late enrollment penalty is 10% of the Part B premium for each 12-month period you could have had Part B but didn\'t enroll. This penalty lasts for the rest of your life. For example, delaying 2 years adds a 20% penalty to your monthly premium.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is IRMAA for Part B?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'IRMAA (Income-Related Monthly Adjustment Amount) is an extra charge for high-income beneficiaries. If your income from 2 years ago exceeds $103,000 (single) or $206,000 (married), you pay a higher Part B premium ranging from $244.60 to $459.00 per month (2024).',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I delay Part B without penalty?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, if you have group health coverage from a current employer with 20+ employees, you can delay Part B without penalty. You then have an 8-month Special Enrollment Period after your employment or coverage ends.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much is the Part B premium and deductible?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The standard Part B premium is $174.70 per month (2024). The Part B deductible is $240 per year. After the deductible, you pay 20% coinsurance for most covered services.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MedicarePartBEnrollmentTimingCalculator />
    </>
  )
}