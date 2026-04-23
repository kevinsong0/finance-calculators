'use client'

import InheritedIRACalculator from '@/components/InheritedIRACalculator'

export default function InheritedIRACalculatorPage() {
  const faqs = [
    {
      question: "What is the 10-year rule for inherited IRAs?",
      answer: "The SECURE Act (2019) requires most non-spouse beneficiaries to withdraw all funds from inherited IRA within 10 years of the owner's death. No annual RMDs required during the 10 years, but entire balance must be distributed by December 31 of the 10th year after death. Failure results in 25% penalty on undistributed amount."
    },
    {
      question: "Who qualifies as Eligible Designated Beneficiary (EDB)?",
      answer: "EDBs get stretch IRA (life expectancy distributions): spouse, minor child (under 18), disabled individual, chronically ill individual, or person not more than 10 years younger than deceased. EDBs can use life expectancy method for annual RMDs instead of 10-year rule."
    },
    {
      question: "What options does a spouse have for inherited IRA?",
      answer: "Spouse options: 1) Treat as own IRA (merge into spouse's IRA), 2) Roll over to own existing IRA, 3) Keep as inherited IRA. Best option depends on spouse's age and needs. Rolling into own IRA delays RMDs until spouse's age 73. Keeping as inherited may allow earlier access if spouse is younger than deceased."
    },
    {
      question: "Are inherited IRA distributions taxable?",
      answer: "Traditional IRA distributions are taxed as ordinary income to beneficiary. Roth IRA distributions are tax-free if: 1) original Roth was open at least 5 years, or 2) beneficiary waits until 5-year holding period met. Roth inherited before 5-year period has taxable earnings until period completed."
    },
    {
      question: "When must I take first inherited IRA distribution?",
      answer: "For most beneficiaries: December 31 of the year AFTER the owner's death. For 10-year rule beneficiaries: No annual RMDs required, but all must be out by December 31 of 10th year. For EDBs with stretch: Annual RMDs start December 31 of year after death, based on beneficiary's life expectancy."
    },
    {
      question: "Can I delay inherited IRA distributions?",
      answer: "10-year rule: Can delay all distributions until year 10 (flexible timing). Stretch IRA (EDB): Annual RMDs required each year. Spouse: If deceased died before RBD (age 73), spouse can delay until deceased would have reached RBD. Roth inherited: Same timing rules, but distributions tax-free (if 5-year rule met)."
    },
    {
      question: "What is stretch IRA and who can use it?",
      answer: "Stretch IRA allows annual RMDs based on beneficiary's life expectancy, spreading distributions over decades. Only Eligible Designated Beneficiaries (EDBs) can use: spouse, minor child (<18), disabled, chronically ill, or person not more than 10 years younger. Most other beneficiaries must use 10-year rule since SECURE Act."
    },
    {
      question: "What happens to minor child's inherited IRA?",
      answer: "Minor child gets stretch IRA until age 21. RMDs based on child's life expectancy until age 21. At age 21, 10-year rule kicks in - all remaining funds must be distributed by age 31 (December 31 of 10th year after turning 21). This is the 'minor exception' to the 10-year rule."
    },
    {
      question: "How should I title an inherited IRA?",
      answer: "Correct title format: 'Jane Smith (deceased) IRA FBO John Smith (beneficiary)' or similar. Must include deceased owner's name and indicate 'for benefit of' (FBO) beneficiary. Incorrect title may cause failed transfer or IRS issues. Do NOT use just beneficiary's name - must show it's inherited."
    },
    {
      question: "What penalty for not distributing inherited IRA?",
      answer: "25% penalty on amounts not distributed by deadline (reduced to 10% if corrected promptly). For 10-year rule: penalty on entire balance remaining after December 31 of 10th year. For stretch IRA: penalty on missed annual RMD. This is one of the largest IRS penalties - take distributions timely."
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
      <InheritedIRACalculator />
    </>
  )
}