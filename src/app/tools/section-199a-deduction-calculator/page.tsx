import Section199ADeductionCalculator from '@/components/Section199ADeductionCalculator'

export const metadata = {
  title: 'Section 199A QBI Deduction Calculator 2024-2025 | Pass-Through Tax Savings',
  description: 'Calculate the Qualified Business Income (QBI) deduction for pass-through entities. Understand wage/property limitations, SSTB restrictions, and income thresholds for maximum deduction.',
  keywords: 'Section 199A calculator, QBI deduction calculator, qualified business income, pass-through deduction, SSTB limitation, QBI wage limit, 20% business income deduction',
}

const faqData = [
  {
    question: 'What is the Section 199A QBI deduction?',
    answer: 'Section 199A provides a 20% deduction on qualified business income from pass-through entities (sole proprietorships, LLCs, partnerships, S-corps). The deduction reduces taxable income, not adjusted gross income. Available through 2025 under current tax law.',
  },
  {
    question: 'What are the income thresholds for QBI deduction limits?',
    answer: 'For 2024: Single filers face wage/property limits above $191,950, fully limited above $243,725. Married filing jointly faces limits above $383,900, fully limited above $487,450. Below thresholds, full 20% deduction with no wage/property limitation.',
  },
  {
    question: 'What is an SSTB and how does it affect QBI deduction?',
    answer: 'Specified Service Trade or Business (SSTB) includes health, law, accounting, actuarial, performing arts, consulting, financial services, brokerage, athletics, and businesses where principal asset is reputation/skill. SSTB QBI deduction phases out above threshold, completely disqualified for high-income taxpayers.',
  },
  {
    question: 'How do wage and property limits work for QBI?',
    answer: 'Above income thresholds, QBI deduction limited by: 50% of W-2 wages paid by business OR 25% of W-2 wages + 2.5% of unadjusted basis of qualified property. Use whichever is higher. Businesses without employees or property face severely limited deductions.',
  },
  {
    question: 'What strategies maximize QBI deduction for high-income earners?',
    answer: 'Strategies include: hiring employees to generate W-2 wages, acquiring qualified business property (original cost basis), aggregating multiple businesses, converting SSTB to C-corp (no QBI but lower corporate rate), timing income/deductions to stay below threshold, or restructuring business operations.',
  },
]

export default function Section199ADeductionCalculatorPage() {
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
      <Section199ADeductionCalculator />
    </>
  )
}