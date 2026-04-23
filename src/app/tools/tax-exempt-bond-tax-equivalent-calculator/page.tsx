import TaxExemptBondTaxEquivalentCalculator from '@/components/TaxExemptBondTaxEquivalentCalculator'

export const metadata = {
  title: 'Tax-Exempt Bond Tax Equivalent Calculator | Municipal vs Treasury',
  description: 'Calculate tax-equivalent yield for municipal and treasury bonds. Compare tax-free vs taxable bond yields after tax.',
  openGraph: {
    title: 'Tax-Exempt Bond Tax Equivalent Calculator',
    description: 'Calculate tax-equivalent yield for tax-exempt bonds.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What is tax-equivalent yield?',
    answer: 'Tax-equivalent yield shows what a taxable bond would need to yield to match a tax-free bond after taxes. Formula: Tax-Free Yield ÷ (1 - Tax Rate). For example, a 3% muni bond at 30% tax bracket equals a 4.29% taxable bond.',
  },
  {
    question: 'How are municipal bonds taxed?',
    answer: 'Municipal bonds are federal tax-free. If you buy bonds from your home state, they are also state tax-free. Bonds from other states are subject to your state income tax. Some municipal bonds (private activity bonds) may be subject to AMT.',
  },
  {
    question: 'How are Treasury bonds taxed?',
    answer: 'Treasury bonds are subject to federal income tax but are exempt from ALL state and local income taxes. This makes them attractive for investors in high-tax states. The state tax exemption applies regardless of where you live.',
  },
  {
    question: 'When should I choose tax-free bonds?',
    answer: 'Tax-free bonds are advantageous when your marginal tax rate is high. At higher brackets, the tax-equivalent yield often exceeds taxable bond yields. Also consider: credit quality differences, liquidity needs, and whether you are in a high-tax state.',
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
      <TaxExemptBondTaxEquivalentCalculator />
    </>
  )
}