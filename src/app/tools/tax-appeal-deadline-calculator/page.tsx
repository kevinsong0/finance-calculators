'use client';

import TaxAppealDeadlineCalculator from '@/components/TaxAppealDeadlineCalculator';

export default function TaxAppealDeadlineCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the deadline for responding to a CP2000 notice?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You have 30 days from the date on the CP2000 notice to respond with your explanation and documentation. If the notice includes a formal deficiency notice, you have 90 days to file a petition with Tax Court.'
                }
              },
              {
                '@type': 'Question',
                name: 'How long do I have to request a CDP hearing?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You must request a Collection Due Process (CDP) hearing within 30 days of receiving a levy or lien notice (CP504, LT11). Missing this deadline forfeits your right to a hearing before collection action proceeds.'
                }
              },
              {
                '@type': 'Question',
                name: 'What happens if I miss an IRS appeal deadline?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Missing a deadline typically results in automatic acceptance of IRS adjustments, waiver of appeal rights, and progression to collection actions. Late appeals may be accepted only in exceptional circumstances with valid reason for delay.'
                }
              },
              {
                '@type': 'Question',
                name: 'How do I calculate deadline days from the notice date?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Start counting from the date printed on the IRS notice, not when you received it. Add the specified number of days (30, 90, etc.). IRS may allow mailing time grace period of a few days beyond the calculated date.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I extend IRS appeal deadlines?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Generally, appeal deadlines cannot be extended. However, Tax Court petition deadlines may be extended if you file a motion showing reasonable cause. For other appeals, act promptly within original deadlines.'
                }
              }
            ]
          })
        }}
      />
      <TaxAppealDeadlineCalculator />
    </>
  );
}