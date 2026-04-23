import StockOptionCalculator from '@/components/StockOptionCalculator'

export const metadata = {
  title: 'Stock Option & RSU Tax Calculator 2024-2025 | ISO, NSO, RSU Tax Implications',
  description: 'Calculate tax implications of employee stock options including ISO, NSO, and RSU grants. Estimate AMT impact, exercise cost, and optimal timing strategies.',
  keywords: 'stock option tax calculator, ISO calculator, NSO tax, RSU taxation, AMT stock options, employee equity tax, stock option exercise',
}

const faqData = [
  {
    question: 'What is the difference between ISO and NSO tax treatment?',
    answer: 'ISOs (Incentive Stock Options) have no regular tax at exercise but create an AMT adjustment. NSOs (Non-Qualified Stock Options) trigger ordinary income tax at exercise on the bargain element (FMV minus strike price). ISOs require meeting holding periods for preferential treatment.',
  },
  {
    question: 'How does AMT affect ISO exercise?',
    answer: 'When you exercise ISOs, the bargain element (spread between FMV and strike price) is added to your income for AMT calculation. If this pushes you over the AMT exemption threshold, you may owe AMT tax. You can claim an AMT credit in future years when regular tax exceeds AMT.',
  },
  {
    question: 'What is the ISO holding period requirement?',
    answer: 'To qualify for long-term capital gains treatment on ISOs, you must hold shares for at least 2 years from the grant date AND 1 year from the exercise date. Selling before meeting both requirements triggers a disqualifying disposition, treated as NSO.',
  },
  {
    question: 'When are RSUs taxed?',
    answer: 'RSUs are taxed as ordinary income at vesting based on the FMV of shares received. There is no exercise cost. You can sell immediately at vesting ("sell to cover") to pay taxes. Future appreciation after vesting is taxed as capital gains when sold.',
  },
  {
    question: 'What is a Section 83(b) election?',
    answer: 'Section 83(b) election allows you to pay tax on restricted stock at grant (rather than vesting) based on current value. For early-exercise options with $0 FMV at grant, this can lock in $0 taxable income. Must file within 30 days of grant. Risk: lose election benefit if shares forfeit.',
  },
]

export default function StockOptionCalculatorPage() {
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
      <StockOptionCalculator />
    </>
  )
}