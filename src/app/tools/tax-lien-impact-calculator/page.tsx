import TaxLienImpactCalculator from '@/components/TaxLienImpactCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Lien Impact Calculator | Credit & Property Impact',
  description: 'Calculate credit score, property equity, and financial impact of federal, state, and property tax liens. Understand resolution options.',
  openGraph: {
    title: 'Tax Lien Impact Calculator',
    description: 'Calculate credit and property impact of tax liens.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'How does a tax lien affect my credit score?',
    answer: 'Prior to 2018, tax liens appeared on credit reports and could lower scores by 100+ points. Under the National Consumer Assistance Plan (NCAP), most tax liens were removed from credit reports starting in 2018. However, liens still affect property transactions and financing.',
  },
  {
    question: 'How long does an IRS tax lien last?',
    answer: 'Federal tax liens have a 10-year statute of limitations from the date of assessment. The IRS can refile the lien before expiration to extend it. State tax lien durations vary by state.',
  },
  {
    question: 'Can I sell my property with a tax lien?',
    answer: 'Yes, but the lien must be paid from the sale proceeds. The lien attaches to the property, so it transfers with the title. The IRS or state tax authority will be paid before you receive any proceeds.',
  },
  {
    question: 'How can I get a tax lien discharged?',
    answer: 'You can request a discharge if paying the lien would double the IRS\'s collection potential, the IRS\'s interest is protected, or certain other conditions are met. File Form 668-Z for federal liens.',
  },
]

export default function TaxLienImpactCalculatorPage() {
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
      <TaxLienImpactCalculator />
    </>
  )
}