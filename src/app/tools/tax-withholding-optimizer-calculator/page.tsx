import TaxWithholdingOptimizerCalculator from '@/components/TaxWithholdingOptimizerCalculator'

export const metadata = {
  title: 'Tax Withholding Optimizer Calculator | Adjust W-4 for Perfect Balance',
  description: 'Calculate optimal tax withholding on your W-4. Avoid large refunds or underpayment penalties by adjusting withholding per paycheck.',
  openGraph: {
    title: 'Tax Withholding Optimizer Calculator',
    description: 'Optimize W-4 withholding to avoid refunds or penalties.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'How do I adjust my tax withholding?',
    answer: 'Submit a new W-4 to your employer. Line 3 reduces withholding (for credits/dependents). Line 4c increases withholding (extra amount per paycheck). Changes take effect in the next pay period.',
  },
  {
    question: 'What is the IRS safe harbor for withholding?',
    answer: 'To avoid underpayment penalty, withhold at least 90% of your current year tax OR 100% of last year tax (110% if AGI > $150K). The penalty applies if you owe more than $1,000 at filing.',
  },
  {
    question: 'Should I aim for a large tax refund?',
    answer: 'A large refund means you over-withheld throughout the year - essentially giving the IRS a free loan. Aim for break-even or small refund ($500) to maximize your take-home pay and cash flow.',
  },
  {
    question: 'What triggers underpayment penalty?',
    answer: 'Underpayment penalty applies if you owe more than $1,000 at tax filing AND withheld less than 90% of current tax or 100% of prior year tax. Penalty rate is around 3-5% on the underpaid amount.',
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
      <TaxWithholdingOptimizerCalculator />
    </>
  )
}