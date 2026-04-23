'use client'

import CapitalLossCarryoverCalculator from '@/components/CapitalLossCarryoverCalculator'

export default function CapitalLossCarryoverCalculatorPage() {
  const faqs = [
    {
      question: "How long can capital losses be carried forward?",
      answer: "Capital losses carry forward indefinitely with no expiration. There's no limit on how many years you can carry forward unused losses. Each year, losses can offset capital gains plus up to $3,000 of ordinary income until fully utilized."
    },
    {
      question: "What is the $3,000 capital loss deduction limit?",
      answer: "If total net capital losses exceed total capital gains in a year, you can deduct up to $3,000 against ordinary income (wages, interest, etc.). The limit is $1,500 if married filing separately. Remaining losses carry forward to future years."
    },
    {
      question: "How do short-term vs long-term loss carryovers work?",
      answer: "Short-term and long-term losses carry forward separately. Short-term losses first offset short-term gains, then long-term gains. Long-term losses first offset long-term gains, then short-term gains. Check Schedule D lines 6 and 14 for prior year amounts."
    },
    {
      question: "Are capital loss carryovers transferable at death?",
      answer: "No. Unused capital losses expire upon the taxpayer's death and cannot pass to heirs or estate. Consider realizing gains to use up large carryovers before death, or use losses to offset other income while alive. Strategic planning important for large carryovers."
    },
    {
      question: "Where do I find my prior year capital loss carryover?",
      answer: "Look at last year's tax return Schedule D. Line 6 shows short-term carryover from prior year. Line 14 shows long-term carryover. Form 1040 line 7 also shows prior year capital loss carryover. Import these exact amounts into current year calculation."
    },
    {
      question: "Should I realize gains to use up large loss carryovers?",
      answer: "Yes, often. If you have $50,000 carryover, realizing $50,000 of gains creates $0 tax (fully offset by losses). This is better than deducting $3,000/year over 17 years. Sell appreciated stocks, then repurchase (careful of wash sale rule) to reset holding period."
    },
    {
      question: "Do states allow capital loss carryovers?",
      answer: "Most states follow federal rules but some differ. California allows indefinite carryforward with same $3,000 annual deduction. Some states have different treatment for short-term vs long-term. Check your state's specific rules when planning."
    },
    {
      question: "Can capital losses offset dividend income?",
      answer: "Indirectly. Capital losses can offset capital gains first, then $3,000 of ordinary income including dividend income. However, losses cannot directly offset qualified dividends. Net losses reduce ordinary income which may include non-qualified dividends."
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
      <CapitalLossCarryoverCalculator />
    </>
  )
}