import FBARFATCAReportingCalculator from '@/components/FBARFATCAReportingCalculator'

export default function FBARFATCAReportingCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <FBARFATCAReportingCalculator />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the FBAR reporting threshold?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'FBAR (FinCEN Form 114) must be filed if the aggregate value of all foreign financial accounts exceeds $10,000 at any time during the calendar year. This threshold applies to all US persons regardless of filing status.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the FATCA Form 8938 thresholds?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'FATCA thresholds vary: Single US resident: $50,000 end-of-year or $75,000 anytime. Married US resident: $100,000 or $150,000. Living abroad: $200,000-$400,000 thresholds. Higher than FBAR.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are FBAR non-filing penalties?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Non-willful FBAR violations: up to $15,637 per violation. Willful violations: up to $156,373 or 50% of account balance. Criminal penalties also possible for willful violations.',
                },
              },
              {
                '@type': 'Question',
                name: 'When are FBAR and FATCA deadlines?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'FBAR deadline: April 15 (automatic extension to October 15). FATCA (Form 8938): filed with tax return, April 15 or extended deadline. Both require annual filing.',
                },
              },
            ],
          }),
        }}
      />
    </main>
  )
}