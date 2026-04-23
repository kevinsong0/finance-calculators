import TaxAppealStrategyCalculator from '@/components/TaxAppealStrategyCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Appeal Strategy Calculator | IRS Appeal Timeline & Costs',
  description: 'Calculate appeal strategy options, timeline, costs, and success factors for IRS disputes. Compare Appeals Office vs Tax Court.',
  openGraph: {
    title: 'Tax Appeal Strategy Calculator',
    description: 'Calculate appeal strategy, timeline, and costs for IRS disputes.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'What appeal options are available after an IRS audit?',
    answer: 'Appeal options include IRS Appeals Office (informal conference), US Tax Court (pre-payment litigation), US District Court (post-payment suit), US Court of Federal Claims, and Fast Track Settlement for small businesses.',
  },
  {
    question: 'How long does the IRS Appeals process take?',
    answer: 'IRS Appeals typically takes 6-12 months. A protest letter must be filed within 30 days of a 30-day letter. Appeals conferences are scheduled within 30-60 days. Settlement negotiations may extend the timeline.',
  },
  {
    question: 'What is the cost difference between Appeals and Tax Court?',
    answer: 'IRS Appeals costs typically $2,000-$5,000 for professional representation. Tax Court litigation costs $5,000-$25,000+ depending on case complexity. Small Tax Case procedures (under $50K) have lower costs.',
  },
  {
    question: 'What factors determine the best appeal forum?',
    answer: 'Consider dispute amount, legal complexity, need to pay before litigating, timeline, cost, evidence rules, and burden of proof. Tax Court allows contesting before payment. District Court requires paying first.',
  },
]

export default function TaxAppealStrategyCalculatorPage() {
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
      <TaxAppealStrategyCalculator />
    </>
  )
}