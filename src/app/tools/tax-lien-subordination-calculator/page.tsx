import TaxLienSubordinationCalculator from '@/components/TaxLienSubordinationCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Lien Subordination Calculator | IRS Lien Priority Approval',
  description: 'Calculate subordination requirements, equity position, and approval likelihood for IRS lien subordination. Know Form 14134 process.',
  openGraph: {
    title: 'Tax Lien Subordination Calculator',
    description: 'Calculate IRS lien subordination requirements and approval likelihood.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'What is tax lien subordination?',
    answer: 'Subordination allows the IRS lien to be moved behind a new lender, giving the new loan priority over IRS claim. Requires IRS consent and must benefit the government.',
  },
  {
    question: 'When should I request lien subordination?',
    answer: 'Request subordination when refinancing at better rates, selling property where proceeds pay IRS, obtaining business loan that improves income, or other situations where new loan benefits IRS collection.',
  },
  {
    question: 'What equity cushion does IRS require for subordination?',
    answer: 'IRS typically requires 20%+ equity cushion after new loan. More equity improves approval likelihood. Equity cushion protects IRS interest if loan defaults.',
  },
  {
    question: 'How do I apply for lien subordination?',
    answer: 'Submit Form 14134 (Application for Subordination) with $100+ fee, lender request letter, property appraisal, and documentation showing government benefit. IRS review takes 30-60 days.',
  },
]

export default function TaxLienSubordinationCalculatorPage() {
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
      <TaxLienSubordinationCalculator />
    </>
  )
}