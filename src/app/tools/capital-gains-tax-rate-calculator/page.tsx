import CapitalGainsTaxRateCalculator from '@/components/CapitalGainsTaxRateCalculator'

export const metadata = {
  title: 'Capital Gains Tax Rate Calculator | Long-Term vs Short-Term',
  description: 'Calculate your capital gains tax rate based on holding period. Long-term gains (held over 1 year) get 0%/15%/20% preferential rates vs short-term ordinary rates.',
  openGraph: {
    title: 'Capital Gains Tax Rate Calculator',
    description: 'Compare long-term vs short-term capital gains tax rates.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What is the difference between long-term and short-term capital gains?',
    answer: 'Long-term capital gains come from assets held more than one year and are taxed at preferential rates of 0%, 15%, or 20%. Short-term gains from assets held less than one year are taxed at ordinary income rates (10-37%).',
  },
  {
    question: 'What are the 2024 long-term capital gains tax brackets?',
    answer: 'For 2024, the 0% rate applies to taxable income up to $47,025 (single) or $94,050 (married joint). The 15% rate applies up to $518,900 (single) or $583,750 (married joint). Above these thresholds, the 20% rate applies.',
  },
  {
    question: 'How do capital losses affect my taxes?',
    answer: 'Capital losses first offset gains of the same type (short-term losses offset short-term gains, long-term losses offset long-term gains). Remaining losses can offset up to $3,000 of ordinary income per year, with any excess carried forward indefinitely.',
  },
  {
    question: 'How is the long-term capital gains rate determined?',
    answer: 'Your long-term capital gains rate is based on your total taxable income including the gains themselves. As you realize more gains, you may push yourself into a higher bracket.',
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
      <CapitalGainsTaxRateCalculator />
    </>
  )
}