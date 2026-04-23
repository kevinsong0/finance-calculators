'use client'

import HomeSaleExclusionCalculator from '@/components/HomeSaleExclusionCalculator'

export default function HomeSaleExclusionCalculatorPage() {
  const faqs = [
    {
      question: "What is the Section 121 home sale exclusion?",
      answer: "Section 121 allows homeowners to exclude up to $250,000 (single) or $500,000 (married filing jointly) of capital gains from selling their principal residence. The excluded gain is completely tax-free - no capital gains tax owed. This is one of the biggest tax breaks available to homeowners."
    },
    {
      question: "Who qualifies for the $500,000 married exclusion?",
      answer: "Both spouses must meet the 2-year use test (live in home as principal residence for 2 of last 5 years). Either spouse can meet the 2-year ownership test. Both must file jointly. If only one spouse meets use test, maximum exclusion is $250,000 (split: $250K for qualifying spouse, $0 for non-qualifying)."
    },
    {
      question: "What are the eligibility tests for home sale exclusion?",
      answer: "Three tests: 1) Ownership Test - owned home for at least 2 of last 5 years before sale, 2) Use Test - lived in home as principal residence for at least 2 of last 5 years, 3) Lookback Test - no home sale exclusion used in the 2-year period before this sale."
    },
    {
      question: "Can I claim the exclusion more than once?",
      answer: "Yes, but only once every 2 years. After using the exclusion, you must wait at least 24 months (2 full years) before using it again. Each exclusion resets the 2-year clock. Military and foreign service members may get extended lookback periods."
    },
    {
      question: "What is the 5-year lookback period?",
      answer: "The ownership and use tests look at the 5-year period ENDING on the sale date. You must have owned AND lived in the home for at least 24 months (730 days) within that 5-year window. Days don't need to be consecutive - just total at least 730 days within 5 years before sale."
    },
    {
      question: "Does a partial exclusion exist if I don't meet 2-year tests?",
      answer: "Yes, reduced exclusion available for: employment change (job relocation 50+ miles away), health reasons (doctor recommended move), unforeseen circumstances (death, divorce, natural disaster, multiple births). Partial exclusion = (months of ownership / 24) × full exclusion limit."
    },
    {
      question: "What counts toward the 2-year use test?",
      answer: "Principal residence counts: sleeping, cooking, bathing there, listed as address on tax returns, voter registration, driver's license, bills, bank statements. Short absences (vacation, illness, up to 1 year total) still count toward use. Rental periods do NOT count toward use test."
    },
    {
      question: "Does vacation home qualify for exclusion?",
      answer: "No. Section 121 only applies to PRINCIPAL residence. Vacation homes, second homes, investment properties do NOT qualify. You can only have one principal residence at a time. If you rent out a home, it's not principal residence (unless you later live there 2 years before selling)."
    },
    {
      question: "What if gain exceeds the exclusion limit?",
      answer: "If gain > $250K (single) or $500K (MFJ), excess gain is taxable as long-term capital gain (15% or 20% rate). Example: $600K gain, married - $500K excluded, $100K taxed at 15% = $15,000 tax. Track improvements to basis to reduce gain and potentially stay under limit."
    },
    {
      question: "What if I rented the home before selling?",
      answer: "If you lived in home as principal residence for 2 of 5 years before sale, exclusion applies to gain attributable to personal use period. However, depreciation claimed during rental period is recaptured (Section 1250) at 25% rate - NOT excluded. Gain from appreciation during rental is also NOT excluded."
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            }))
          })
        }}
      />
      <HomeSaleExclusionCalculator />
    </>
  )
}