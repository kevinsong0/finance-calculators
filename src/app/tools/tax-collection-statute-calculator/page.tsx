import TaxCollectionStatuteCalculator from '@/components/TaxCollectionStatuteCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Collection Statute Calculator | ASED & CSED Expiration',
  description: 'Calculate IRS assessment and collection statute expiration dates (ASED/CSED). Know when IRS can assess and collect tax debt.',
  openGraph: {
    title: 'Tax Collection Statute Calculator',
    description: 'Calculate ASED and CSED expiration dates for IRS limitations.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'What is the ASED (Assessment Statute Expiration Date)?',
    answer: 'ASED is the deadline for IRS to assess additional tax. Normally 3 years from filing date. Extended to 6 years for substantial understatement (>25%). No expiration for fraud or no return filed.',
  },
  {
    question: 'What is the CSED (Collection Statute Expiration Date)?',
    answer: 'CSED is the deadline for IRS to collect assessed tax. Normally 10 years from assessment date. Can be extended by OIC, bankruptcy, CDP appeal, taxpayer absence abroad, or inability to locate taxpayer.',
  },
  {
    question: 'What extends the collection statute?',
    answer: 'OIC pending period + 6 months, bankruptcy period + 6 months, CDP appeal period + 90 days, taxpayer abroad 6+ months + 6 months, and periods when IRS cannot locate taxpayer all extend CSED.',
  },
  {
    question: 'Does the statute ever not expire?',
    answer: 'Yes. For fraudulent returns and when no return was filed, the assessment and collection statutes never expire. IRS can assess and collect indefinitely in these cases.',
  },
]

export default function TaxCollectionStatuteCalculatorPage() {
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
      <TaxCollectionStatuteCalculator />
    </>
  )
}