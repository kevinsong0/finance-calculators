import TaxComplianceCalendarCalculator from '@/components/TaxComplianceCalendarCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Compliance Calendar Calculator | Tax Deadline Tracker',
  description: 'Generate key tax deadlines and compliance reminders for individuals and businesses. Track filing dates, estimated taxes, and payroll deadlines.',
  openGraph: {
    title: 'Tax Compliance Calendar Calculator',
    description: 'Generate key tax deadlines and compliance reminders.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'When is the deadline for filing individual tax returns?',
    answer: 'Form 1040 individual tax returns are due April 15 (or the next business day if April 15 falls on a weekend or holiday). Extensions extend the filing deadline to October 15 but do not extend the payment deadline.',
  },
  {
    question: 'When are estimated tax payments due?',
    answer: 'Estimated tax payments are due quarterly: April 15 (Q1), June 15 (Q2), September 15 (Q3), and January 15 of the following year (Q4). The Q4 payment can be made by January 15 or included with the tax return by January 31.',
  },
  {
    question: 'When is the FBAR filing deadline?',
    answer: 'The FBAR (FinCEN Form 114) is due April 15 for reporting foreign bank accounts exceeding $10,000. An automatic extension to October 15 is available without needing to request it.',
  },
  {
    question: 'When are partnership and S corporation returns due?',
    answer: 'Form 1065 (partnerships) and Form 1120S (S corporations) are due March 15, one month earlier than individual returns. Extensions extend the filing deadline to September 15.',
  },
]

export default function TaxComplianceCalendarCalculatorPage() {
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
      <TaxComplianceCalendarCalculator />
    </>
  )
}