import MortgageRefinanceBreakEvenCalculator from '@/components/MortgageRefinanceBreakEvenCalculator'

export default function MortgageRefinanceBreakEvenCalculatorPage() {
  const faqs = [
    {
      question: 'What is the break-even point in refinancing?',
      answer: 'The break-even point is when your cumulative monthly savings from refinancing equal the total refinancing costs (closing costs, points, fees). If you stay in the home past break-even, refinancing saves money. If you move before break-even, refinancing costs more than it saves.',
    },
    {
      question: 'How much should rates drop to justify refinancing?',
      answer: 'Traditionally, refinancing is worthwhile when rates drop 1% or more. With today\'s lower closing cost options, even 0.5% reduction may be worthwhile if you plan to stay 5+ years. Calculate your specific break-even to determine if the savings justify the costs.',
    },
    {
      question: 'Should I pay points to lower my refinance rate?',
      answer: 'Points cost 1% of loan each and lower rates ~0.25%. Paying points makes sense if: (1) you\'ll stay past the points break-even (~5-7 years), (2) you have cash available, (3) the rate reduction is meaningful. Avoid points if you might move or refinance again soon.',
    },
    {
      question: 'What about extending my loan term when refinancing?',
      answer: 'Extending term (e.g., 25 remaining to new 30-year) lowers monthly payment but increases total interest over full term. Consider: (1) monthly cash flow priority vs total cost, (2) if extending, compare interest over your remaining term only, not full new term.',
    },
    {
      question: 'What refinancing costs should I expect?',
      answer: 'Typical costs: Appraisal ($300-500), title insurance ($1-2K), attorney fees, recording fees, origination fee (0.5-1%), points (optional). Total: 2-5% of loan. Ask about no-closing-cost refinance options where costs are rolled into higher rate.',
    },
  ]

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
      <MortgageRefinanceBreakEvenCalculator />
    </>
  )
}