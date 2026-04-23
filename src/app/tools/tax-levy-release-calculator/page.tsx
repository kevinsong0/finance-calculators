import TaxLevyReleaseCalculator from '@/components/TaxLevyReleaseCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Levy Release Calculator | IRS Levy Release Options',
  description: 'Calculate options and timeline for getting IRS bank and wage levies released. Understand hardship release, payment plans, and CDP appeals.',
  openGraph: {
    title: 'Tax Levy Release Calculator',
    description: 'Calculate options for getting IRS levies released.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'How long does a bank levy hold last?',
    answer: 'The bank holds levied funds for 21 days before sending them to the IRS. During this 21-day period, you can request levy release through hardship documentation, payment plan setup, or CDP appeal. After 21 days, the funds are transferred to the IRS.',
  },
  {
    question: 'How do I request hardship levy release?',
    answer: 'Submit Form 433-A (Collection Information Statement) documenting your financial hardship. If the IRS determines the levy creates economic hardship (unable to pay basic living expenses), they may release the levy immediately. Contact IRS at 1-800-829-1040.',
  },
  {
    question: 'Does a payment plan release an active levy?',
    answer: 'Yes. If you establish an approved installment agreement, the IRS will generally release the levy. The levy release is not automatic - you must specifically request it when setting up the payment plan. Streamlined payment plans for debts under $50K are fastest.',
  },
  {
    question: 'What is the deadline to appeal a levy?',
    answer: 'You have 30 days from receiving a levy notice to file a Collection Due Process (CDP) appeal using Form 12153. If you miss this deadline, you can request an equivalent hearing within one year, though there is no automatic collection stay.',
  },
]

export default function TaxLevyReleaseCalculatorPage() {
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
      <TaxLevyReleaseCalculator />
    </>
  )
}