import EstimatedTaxPenaltyAvoidanceCalculator from '@/components/EstimatedTaxPenaltyAvoidanceCalculator'

export const metadata = {
  title: 'Estimated Tax Penalty Avoidance Calculator | Safe Harbor',
  description: 'Calculate safe harbor requirements to avoid IRS underpayment penalty. Track quarterly payments and meet thresholds.',
  openGraph: {
    title: 'Estimated Tax Penalty Avoidance Calculator',
    description: 'Calculate safe harbor requirements to avoid estimated tax penalties.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What is the safe harbor rule for estimated taxes?',
    answer: 'The safe harbor rule allows you to avoid underpayment penalties by paying at least 100% of your prior year tax liability (if AGI under $150,000) or 110% (if AGI over $150,000). Alternatively, paying 90% of your current year tax liability also meets the safe harbor.',
  },
  {
    question: 'When are quarterly estimated tax payments due?',
    answer: 'Estimated tax payments are due quarterly on April 15, June 15, September 15, and January 15 of the following year. If you don\'t pay enough by each due date, you may be charged a penalty even if you\'re due a refund when filing.',
  },
  {
    question: 'How is the underpayment penalty calculated?',
    answer: 'The penalty is essentially interest on the underpayment amount for the period it was unpaid. The IRS uses a quarterly interest rate (approximately 8% for 2024). The penalty accumulates for each quarter where payments were insufficient.',
  },
  {
    question: 'What if my income varies throughout the year?',
    answer: 'If your income varies, you can use the annualized income installment method on Form 2210 to calculate varying quarterly payments. This method adjusts required payments based on when income was actually received during the year.',
  },
]

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
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
      <EstimatedTaxPenaltyAvoidanceCalculator />
    </>
  )
}