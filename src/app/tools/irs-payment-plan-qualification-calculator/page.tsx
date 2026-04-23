import IRSPaymentPlanQualificationCalculator from '@/components/IRSPaymentPlanQualificationCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IRS Payment Plan Qualification Calculator | Installment Agreement Eligibility',
  description: 'Determine eligibility for Guaranteed, Streamlined, and Regular IRS payment plans. Calculate monthly payments and setup fees.',
  openGraph: {
    title: 'IRS Payment Plan Qualification Calculator',
    description: 'Determine eligibility for IRS payment plan types.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'What is a Guaranteed Installment Agreement?',
    answer: 'A Guaranteed IA is available for tax debts under $10,000 if you have filed all required returns, have no prior payment plan defaults, and can pay the debt within 3 years. The IRS must approve it if you meet all requirements. No financial statement is required.',
  },
  {
    question: 'What is a Streamlined Installment Agreement?',
    answer: 'Streamlined IA is available for debts under $50,000 if you are filing compliant and have no prior payment plan defaults. No financial statement (Form 433) is required. You can pay over up to 72 months. Apply online at IRS.gov/payments for fastest processing.',
  },
  {
    question: 'What if my tax debt exceeds $50,000?',
    answer: 'For debts over $50,000, you must submit Form 433-A (Collection Information Statement) disclosing your complete financial picture. The IRS determines the payment amount based on your ability to pay. This is a Regular Installment Agreement.',
  },
  {
    question: 'What are the payment plan setup fees?',
    answer: 'Online application: $31. Paper/phone application: $107. Direct debit reduces fee to $31. Low-income taxpayers may qualify for fee waivers. Fees are subject to change - check IRS.gov for current rates.',
  },
]

export default function IRSPaymentPlanQualificationCalculatorPage() {
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
      <IRSPaymentPlanQualificationCalculator />
    </>
  )
}