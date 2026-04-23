import QualifiedDividendsTaxCalculator from '@/components/QualifiedDividendsTaxCalculator'

export const metadata = {
  title: 'Qualified Dividends Tax Calculator | Calculate 0%/15%/20% Rates',
  description: 'Calculate tax on qualified dividends with preferential 0%, 15%, or 20% rates based on income and holding period requirements.',
  openGraph: {
    title: 'Qualified Dividends Tax Calculator',
    description: 'Calculate tax on qualified dividends with preferential rates.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What are qualified dividends?',
    answer: 'Qualified dividends are dividends paid by US corporations or qualified foreign corporations that meet specific holding period requirements. They are taxed at preferential rates of 0%, 15%, or 20% rather than ordinary income rates.',
  },
  {
    question: 'What is the holding period requirement for qualified dividends?',
    answer: 'You must hold the stock for more than 60 days for common stock (90 days for preferred stock) during the 121-day period that begins 60 days before the ex-dividend date.',
  },
  {
    question: 'What are the tax rates for qualified dividends?',
    answer: 'For 2024: 0% rate applies to taxable income up to $47,025 (single) or $94,050 (married joint). 15% rate applies up to $518,900 (single) or $583,750 (married joint). 20% rate applies above these thresholds.',
  },
  {
    question: 'Can dividends in an IRA or 401(k) be qualified?',
    answer: 'No. Dividends received in retirement accounts like IRAs and 401(k)s are never qualified. They are taxed as ordinary income when withdrawn from the account.',
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
      <QualifiedDividendsTaxCalculator />
    </>
  )
}