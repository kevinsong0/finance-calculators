import MedicarePartAEnrollmentTimingCalculator from '@/components/MedicarePartAEnrollmentTimingCalculator'

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'When should I enroll in Medicare Part A?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You should enroll in Medicare Part A during your Initial Enrollment Period, which starts 3 months before your 65th birthday, includes your birthday month, and extends 3 months after. If you have employer coverage from a large employer (20+ employees), you may qualify for a Special Enrollment Period.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Medicare Part A free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Part A is usually premium-free if you or your spouse paid Medicare taxes for at least 40 quarters (10 years of work). If not, you may pay up to $505 per month (2024) depending on how many quarters you worked.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Special Enrollment Period for Part A?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Special Enrollment Period (SEP) is available if you are covered by a group health plan through your or your spouse\'s current employment at an employer with 20+ employees. SEP lasts 8 months after employment or coverage ends, allowing you to enroll without penalty.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the late enrollment penalty for Part A?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If you don\'t qualify for premium-free Part A and enroll late, you pay a 10% penalty on your Part A premium for twice the number of years you delayed enrollment. For example, delaying 2 years means 10% extra premium for 4 years.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I enroll in Part A before age 65?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Generally, you cannot enroll in Medicare Part A before age 65. Exceptions include people with certain disabilities, end-stage renal disease (ESRD), or amyotrophic lateral sclerosis (ALS).',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MedicarePartAEnrollmentTimingCalculator />
    </>
  )
}