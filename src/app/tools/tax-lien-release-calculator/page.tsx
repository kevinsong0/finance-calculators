import TaxLienReleaseCalculator from '@/components/TaxLienReleaseCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Lien Release Calculator | IRS Lien Removal Options',
  description: 'Calculate IRS tax lien release options, eligibility, and timeline. Explore discharge, withdrawal, and automatic release pathways.',
  openGraph: {
    title: 'Tax Lien Release Calculator',
    description: 'Calculate lien release options and timeline for IRS tax liens.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'When does IRS automatically release a tax lien?',
    answer: 'IRS automatically releases lien within 30 days after full payment of tax debt including penalties and interest. Also automatic upon CSED (collection statute) expiration after 10 years.',
  },
  {
    question: 'What is lien discharge vs release?',
    answer: 'Discharge removes lien from specific property while keeping lien on taxpayer. Release removes lien entirely. Discharge is used for property sales where proceeds pay the lien.',
  },
  {
    question: 'What is lien withdrawal?',
    answer: 'Withdrawal removes lien from public record entirely. Available if lien was filed incorrectly, taxpayer is in compliance, or under Fresh Start when installment agreement accepted for debt under $25,000.',
  },
  {
    question: 'What forms are needed for lien release?',
    answer: 'Form 12277 for withdrawal request. Form 14135 for discharge from specific property. No form needed for automatic release after payment. Certificate of Release issued by IRS.',
  },
]

export default function TaxLienReleaseCalculatorPage() {
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
      <TaxLienReleaseCalculator />
    </>
  )
}