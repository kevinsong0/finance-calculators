import IRSNoticeResponseCalculator from '@/components/IRSNoticeResponseCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IRS Notice Response Calculator | Tax Notice Timeline Tracker',
  description: 'Calculate response timeline and options for IRS notices. Get guidance on CP2000, CP501, levy notices, and other IRS correspondence.',
  openGraph: {
    title: 'IRS Notice Response Calculator',
    description: 'Calculate response timeline and options for IRS notices.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'What is a CP2000 notice?',
    answer: 'CP2000 is an Underreported Income Notice from the IRS. It indicates that the IRS found income reported to them (on W-2s, 1099s, etc.) that does not match what you reported on your tax return. You have 30 days to respond.',
  },
  {
    question: 'How long do I have to respond to an IRS notice?',
    answer: 'Response deadlines vary by notice type. CP2000 typically allows 30 days. Levy notices (Letter 11, LT11) have a critical 30-day deadline for requesting a Collection Due Process appeal. Balance due reminders (CP501, CP503) urge prompt payment.',
  },
  {
    question: 'What happens if I miss the deadline to respond to an IRS notice?',
    answer: 'Missing the deadline can result in the IRS proceeding with their proposed adjustment, assessing additional penalties and interest, or taking collection action including levies on bank accounts and wages.',
  },
  {
    question: 'Can I request an appeal for an IRS notice?',
    answer: 'Yes. For examination issues, you can request an appeal with the 30-day letter. For collection issues, you can request a Collection Due Process (CDP) hearing within 30 days of a levy notice using Form 12153.',
  },
]

export default function IRSNoticeResponseCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <IRSNoticeResponseCalculator />
    </>
  )
}