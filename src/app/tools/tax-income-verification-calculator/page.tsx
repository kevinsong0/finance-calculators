import TaxIncomeVerificationCalculator from '@/components/TaxIncomeVerificationCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Income Verification Calculator | IRS Audit Documentation',
  description: 'Calculate IRS income verification methods, documentation requirements, and audit risk. Assess discrepancy and verification score.',
  openGraph: {
    title: 'Tax Income Verification Calculator',
    description: 'Calculate IRS income verification and audit risk.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'How does IRS verify income?',
    answer: 'IRS verifies through: 1) Information matching (W-2, 1099, K-1 comparison), 2) Bank deposit analysis, 3) Cash flow/lifestyle analysis, 4) Net worth method, 5) Source and use analysis. Automated matching flags discrepancies.',
  },
  {
    question: 'What triggers income audit?',
    answer: 'Discrepancy between return and third-party reports (W-2, 1099), large cash transactions, self-employment with incomplete records, income exceeding lifestyle, significant deductions relative to income, DIF score from computer analysis.',
  },
  {
    question: 'What documents verify self-employment income?',
    answer: 'Schedule C, business bank statements, invoices and receipts, contracts, 1099-NEC/MISC from clients, accounting records, proof of business expenses, mileage logs. Complete documentation critical for Schedule C income.',
  },
  {
    question: 'What is the discrepancy threshold for audit?',
    answer: 'IRS computer matching automatically flags discrepancies. Discrepancy >10% of income significantly increases audit risk. Any mismatch between reported and third-party amounts triggers correspondence notice first, then potential audit.',
  },
]

export default function TaxIncomeVerificationCalculatorPage() {
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
      <TaxIncomeVerificationCalculator />
    </>
  )
}