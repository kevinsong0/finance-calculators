import HomeEquityLOCCalculator from '@/components/HomeEquityLOCCalculator'

export default function HomeEquityLOCCalculatorPage() {
  const faqs = [
    {
      question: 'What is a HELOC and how does it work?',
      answer: 'A Home Equity Line of Credit is a revolving credit line using your home as collateral. During the draw period (5-10 years), you can borrow as needed and pay only interest. During repayment (15-20 years), you pay principal + interest on the full balance.',
    },
    {
      question: 'How much HELOC can I qualify for?',
      answer: 'Most lenders allow Combined Loan-to-Value (CLTV) up to 85%. Your max HELOC = (Home Value * 85%) - Current Mortgage. Example: $400K home, $250K mortgage = ($340K) - $250K = $90K max HELOC.',
    },
    {
      question: 'Why are HELOC rates variable?',
      answer: 'HELOC rates are typically tied to the prime rate (currently ~8.5%). When the Fed raises rates, your HELOC rate rises immediately. This is why HELOCs are cheaper initially but riskier than fixed-rate home equity loans.',
    },
    {
      question: 'What happens when the draw period ends?',
      answer: 'At draw period end, you can no longer borrow. The full balance converts to amortizing loan. Your payment jumps significantly because you now pay principal + interest. Prepare for this "payment shock" by budgeting ahead.',
    },
    {
      question: 'Is HELOC interest tax deductible?',
      answer: 'Under TCJA 2017, HELOC interest is deductible only if funds are used to "buy, build, or substantially improve" your home. Interest on HELOC funds used for debt consolidation, education, or other purposes is NOT deductible.',
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
      <HomeEquityLOCCalculator />
    </>
  )
}