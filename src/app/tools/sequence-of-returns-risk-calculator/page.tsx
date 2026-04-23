import SequenceOfReturnsRiskCalculator from '@/components/SequenceOfReturnsRiskCalculator'

export default function SequenceOfReturnsRiskCalculatorPage() {
  const faqs = [
    {
      question: 'What is sequence of returns risk?',
      answer: 'Sequence of returns risk is the danger that poor investment returns early in retirement will disproportionately harm portfolio longevity compared to the same poor returns occurring later. When withdrawing from a declining portfolio, you sell more shares, depleting the portfolio faster even if average returns are the same.',
    },
    {
      question: 'Why are early retirement years most critical?',
      answer: 'The first 10-15 years of retirement are most vulnerable to sequence risk. Bad returns combined with withdrawals in early years permanently reduce portfolio value. Later recoveries cannot compensate because the portfolio is smaller and you\'ve already sold shares at depressed prices.',
    },
    {
      question: 'What is the bucket strategy?',
      answer: 'The bucket strategy divides assets into three: Cash bucket (1-2 years of expenses), Bond bucket (3-7 years), and Stock bucket (long-term growth). Withdraw from cash first, replenishing from bonds when stocks recover. This prevents selling stocks during downturns.',
    },
    {
      question: 'How does flexible withdrawal help?',
      answer: 'Flexible withdrawal rules adjust spending based on portfolio performance. Common rules: reduce withdrawals 10% when portfolio drops 10%, or withdraw percentage of current portfolio value rather than fixed amount. This preserves capital during downturns.',
    },
    {
      question: 'What withdrawal rate survives worst-case sequences?',
      answer: 'Historically, 3-3.5% withdrawal rates have survived worst-case return sequences (like 1966 retirees). The 4% rule works in most scenarios but fails in severe early-retirement downturns. Lower rates provide more margin for sequence risk.',
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
      <SequenceOfReturnsRiskCalculator />
    </>
  )
}