import MedicarePartBSpecialEnrollmentCalculator from '@/components/MedicarePartBSpecialEnrollmentCalculator'

export default function MedicarePartBSpecialEnrollmentCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <MedicarePartBSpecialEnrollmentCalculator />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the Medicare Part B Special Enrollment Period?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Special Enrollment Period (SEP) is an 8-month window after employer coverage ends to enroll in Part B without penalty. It requires active employment coverage, not COBRA.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does COBRA qualify for SEP?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. COBRA does NOT qualify for the Special Enrollment Period. SEP requires coverage through active employment. COBRA enrollees must sign up during IEP or face late penalties.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the late enrollment penalty for Part B?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The penalty is 10% of the premium for each 12-month period you delayed enrollment. This penalty is permanent and adds to your monthly premium for life.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long is the SEP window?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The SEP lasts 8 months after your employer coverage or employment ends. You must enroll within this window to avoid the late enrollment penalty.',
                },
              },
            ],
          }),
        }}
      />
    </main>
  )
}