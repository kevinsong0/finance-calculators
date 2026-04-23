import MedicareEnrollmentPeriodComparisonCalculator from '@/components/MedicareEnrollmentPeriodComparisonCalculator'

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the Medicare Initial Enrollment Period?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Initial Enrollment Period (IEP) is a 7-month window around your 65th birthday: 3 months before, your birthday month, and 3 months after. This is the best time to enroll in Medicare Part A and Part B to avoid penalties.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Special Enrollment Period for Medicare?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Special Enrollment Period (SEP) is available if you have group health coverage from a large employer (20+ employees) based on current employment. SEP lasts 8 months after employment or coverage ends, allowing penalty-free enrollment.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Medicare General Enrollment Period?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The General Enrollment Period (GEP) runs January 1 - March 31 each year. Use this if you missed IEP and SEP. Late enrollment penalties apply, and coverage starts July 1. Best avoided by enrolling during IEP or SEP.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Medicare Annual Enrollment Period?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Annual Enrollment Period (AEP) runs October 15 - December 7. This is for changing Medicare Advantage plans or Part D plans, NOT for initial Medicare enrollment. Changes take effect January 1.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which enrollment period should I use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use IEP if you don\'t have employer coverage. Use SEP if you have large employer (20+) coverage and want to delay enrollment. Avoid GEP due to penalties. Use AEP only for plan changes after you\'re already enrolled in Medicare.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MedicareEnrollmentPeriodComparisonCalculator />
    </>
  )
}