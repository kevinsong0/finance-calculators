import TaxBracketOptimizerCalculator from '@/components/TaxBracketOptimizerCalculator'

export const metadata = {
  title: 'Tax Bracket Optimizer Calculator 2024-2025 | Reduce Taxable Income',
  description: 'Optimize your tax bracket by calculating how pre-tax contributions can reduce taxable income. Estimate tax savings from 401(k), HSA, FSA contributions and understand bracket thresholds.',
  keywords: 'tax bracket optimizer, reduce taxable income, tax bracket calculator, 401k tax savings, HSA tax benefit, marginal tax rate, tax deduction strategies',
}

const faqData = [
  {
    question: 'How can I lower my tax bracket?',
    answer: 'Lower your tax bracket by increasing pre-tax contributions: 401(k) (up to $23,000), HSA ($4,150), Health FSA ($3,300), Traditional IRA ($7,000), and charitable donations if itemizing. Each deduction reduces taxable income by your marginal tax rate savings.',
  },
  {
    question: 'What is the difference between marginal and effective tax rate?',
    answer: 'Marginal tax rate is the rate on your last dollar of income (your current bracket rate). Effective tax rate is total tax divided by total income, representing your actual overall tax burden. Marginal rate determines savings from each additional deduction.',
  },
  {
    question: 'How much does a $10,000 401(k) contribution save in taxes?',
    answer: 'A $10,000 401(k) contribution saves your marginal rate in taxes: $1,000 (10% bracket), $1,200 (12%), $2,200 (22%), $2,400 (24%), $3,200 (32%), $3,500 (35%), or $3,700 (37%). Plus, employer match adds extra benefit.',
  },
  {
    question: 'Should I itemize or take standard deduction?',
    answer: 'Itemize if your itemized deductions exceed the standard deduction ($14,600 Single, $29,200 MFJ). Common itemized: mortgage interest, SALT (up to $10K), charitable donations, medical expenses over 7.5% AGI. Use this calculator to compare.',
  },
  {
    question: 'What is tax bracket bunching?',
    answer: 'Bunching strategies include: (1) Charitable bunching - bundle donations to exceed standard deduction every other year, (2) Income bunching - defer income to stay in lower bracket, (3) Deduction timing - accelerate deductions to maximize bracket benefit.',
  },
]

export default function TaxBracketOptimizerCalculatorPage() {
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
      <TaxBracketOptimizerCalculator />
    </>
  )
}