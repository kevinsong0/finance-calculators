import TaxFreshStartCalculator from '@/components/TaxFreshStartCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Fresh Start Calculator | IRS Fresh Start Initiative Eligibility',
  description: 'Calculate eligibility for IRS Fresh Start Initiative programs: Streamlined IA, lien withdrawal, and simplified OIC for tax debt under $50,000.',
  openGraph: {
    title: 'Tax Fresh Start Calculator',
    description: 'Calculate IRS Fresh Start Initiative eligibility and options.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'What is the IRS Fresh Start Initiative?',
    answer: 'Fresh Start Initiative helps taxpayers with tax debt under $50,000 resolve through streamlined programs: Streamlined Installment Agreement (72 months), lien withdrawal for debts under $25,000, and simplified Offer in Compromise for low-income taxpayers.',
  },
  {
    question: 'What is the lien threshold under Fresh Start?',
    answer: 'IRS generally does NOT file liens for tax debts under $25,000 under Fresh Start guidelines. Previously threshold was $5,000. For debts under $25,000 with accepted IA, lien may be withdrawn (not just released) after IA acceptance.',
  },
  {
    question: 'What is Streamlined Installment Agreement?',
    answer: 'Streamlined IA available for debts under $50,000 with compliant taxpayer. No detailed financial statement required. Direct debit payments for up to 72 months. Faster approval, minimal documentation.',
  },
  {
    question: 'Do I need Form 433-A for Fresh Start?',
    answer: 'No Form 433-A/B required for Streamlined IA if debt under $50,000 and filing compliant. Regular IA above $50,000 requires financial statement. Fresh Start OIC may have simplified requirements for low-income taxpayers.',
  },
]

export default function TaxFreshStartCalculatorPage() {
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
      <TaxFreshStartCalculator />
    </>
  )
}