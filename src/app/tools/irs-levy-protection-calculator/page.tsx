import IRSLevyProtectionCalculator from '@/components/IRSLevyProtectionCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IRS Levy Protection Calculator | Exemption & Defense Options',
  description: 'Calculate exemptions and protection options from IRS bank levies, wage garnishment, and property seizure. Understand CDP appeals and hardship relief.',
  openGraph: {
    title: 'IRS Levy Protection Calculator',
    description: 'Calculate exemptions and protection from IRS levies.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'What exemptions exist for IRS levies?',
    answer: 'Wage levies have exemptions based on the standard deduction plus personal exemptions divided by 52 weeks. Bank levies have no automatic federal exemption, but hardship relief is available. Social Security is limited to 15% under the Federal Payment Levy Program.',
  },
  {
    question: 'What is the CDP appeal deadline?',
    answer: 'You must file a Collection Due Process (CDP) appeal using Form 12153 within 30 days of receiving a levy notice. Missing this deadline forfeits your right to a CDP hearing, though an equivalent hearing may be available within one year.',
  },
  {
    question: 'How long does the IRS hold bank levy funds?',
    answer: 'Bank accounts are frozen for 21 days before the funds are sent to the IRS. During this period, you can request hardship release or file a CDP appeal. After 21 days, the bank releases the funds to the IRS.',
  },
  {
    question: 'Can the IRS levy Social Security benefits?',
    answer: 'Yes, but under the automated Federal Payment Levy Program (FPLP), the IRS can only levy 15% of Social Security benefits. Manual levies can exceed this, but hardship exemptions may apply.',
  },
]

export default function IRSLevyProtectionCalculatorPage() {
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
      <IRSLevyProtectionCalculator />
    </>
  )
}