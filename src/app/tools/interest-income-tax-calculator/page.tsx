import InterestIncomeTaxCalculator from '@/components/InterestIncomeTaxCalculator'

export const metadata = {
  title: 'Interest Income Tax Calculator | Ordinary, Municipal, Treasury',
  description: 'Calculate tax on different types of interest income: ordinary interest, municipal bonds (tax-free), and Treasury bonds (state tax-free).',
  openGraph: {
    title: 'Interest Income Tax Calculator',
    description: 'Calculate tax on ordinary, municipal, and Treasury interest income.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What types of interest income are fully taxable?',
    answer: 'Ordinary interest from bank accounts, CDs, corporate bonds, and savings accounts is fully taxable at federal and state levels. It is taxed as ordinary income at your marginal rate (10-37% federal).',
  },
  {
    question: 'Are municipal bond interest payments tax-free?',
    answer: 'Municipal bond interest is generally federal tax-free. If you buy bonds from your home state, they are also state tax-free. However, private activity bonds may be subject to Alternative Minimum Tax (AMT).',
  },
  {
    question: 'How are Treasury bonds taxed?',
    answer: 'US Treasury bills, notes, and bonds are subject to federal income tax but are exempt from state and local income taxes. This makes them attractive for residents of high-tax states.',
  },
  {
    question: 'Does municipal bond interest affect Social Security taxation?',
    answer: 'Yes. Municipal bond interest is included in your "combined income" used to determine how much of your Social Security benefits are taxable. This can push more of your benefits into taxable territory.',
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
      <InterestIncomeTaxCalculator />
    </>
  )
}