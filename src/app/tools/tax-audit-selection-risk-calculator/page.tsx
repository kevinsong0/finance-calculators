import TaxAuditSelectionRiskCalculator from '@/components/TaxAuditSelectionRiskCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Audit Selection Risk Calculator | DIF Score Risk Estimator',
  description: 'Estimate your relative IRS audit risk based on income level, self-employment, deductions, and other factors. Understand DIF score components.',
  openGraph: {
    title: 'Tax Audit Selection Risk Calculator',
    description: 'Estimate your relative IRS audit risk based on return characteristics.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'What is a DIF score?',
    answer: 'The Discriminant Inventory Function (DIF) score is an IRS computer-generated score that ranks returns for audit potential based on their characteristics and likelihood of tax change if audited.',
  },
  {
    question: 'What income level has the highest audit rate?',
    answer: 'Higher income returns generally have higher audit rates. Returns with income over $5 million have audit rates around 8%, while returns under $25,000 have rates around 0.4%.',
  },
  {
    question: 'Why are self-employed returns more likely to be audited?',
    answer: 'Schedule C filers have higher audit rates because the IRS finds more potential adjustments on self-employment returns, especially for cash-intensive businesses with incomplete documentation.',
  },
  {
    question: 'What deduction patterns trigger audits?',
    answer: 'Large deductions relative to income, unusual deduction categories, home office deductions, and high charitable contributions relative to income can increase audit risk.',
  },
]

export default function TaxAuditSelectionRiskCalculatorPage() {
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
      <TaxAuditSelectionRiskCalculator />
    </>
  )
}