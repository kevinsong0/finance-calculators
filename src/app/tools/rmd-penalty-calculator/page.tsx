'use client'

import RMDPenaltyCalculator from '@/components/RMDPenaltyCalculator'

export default function RMDPenaltyCalculatorPage() {
  const faqs = [
    {
      question: "What is the RMD penalty?",
      answer: "RMD penalty is 25% excise tax on any shortfall from required minimum distribution. Example: $20K RMD, withdraw $15K = $5K shortfall. Penalty = $5K × 25% = $1,250. One of steepest IRS penalties. RMD required starting age 73. Penalty can be waived with reasonable cause. File Form 5329 to report and request waiver."
    },
    {
      question: "How do I avoid RMD penalty?",
      answer: "Take full RMD by December 31 each year. Set up automatic distribution with custodian. Calculate RMD early (January). First RMD year: deadline April 1 following year you turn 73. Verify withdrawal completed before year-end. Calendar reminders help. If missed, file Form 5329 immediately and request waiver for reasonable cause."
    },
    {
      question: "What is Form 5329 for RMD penalty?",
      answer: "Form 5329 reports RMD shortfall and penalty. Part IX of Form 5329. Enter required amount, actual distribution, shortfall. Calculate 25% penalty on shortfall. Can request waiver by attaching reasonable cause statement. File Form 5329 separately from Form 1040. Pay penalty amount or request waiver. IRS may grant waiver for documented circumstances."
    },
    {
      question: "What is reasonable cause for RMD penalty waiver?",
      answer: "Reasonable cause examples: serious illness preventing withdrawal, death of family member, natural disaster, financial institution error, incorrect custodian advice, dementia/Alzheimer's affecting ability to manage finances. Must document circumstances. Attach explanation to Form 5329. IRS reviews each case. Request waiver promptly - better chance if filed quickly after discovering shortfall."
    },
    {
      question: "When does RMD start?",
      answer: "RMD starts at age 73 (SECURE 2.0 Act 2023, increased from 72). First RMD deadline: April 1 following year you turn 73. Second RMD deadline: December 31 of that same year (2 RMDs in first year if delay). After first year: December 31 annually. Example: turn 73 in 2024, first RMD by April 1, 2025, second RMD by December 31, 2025."
    },
    {
      question: "How much is my RMD?",
      answer: "RMD = account balance December 31 prior year ÷ life expectancy factor from IRS Uniform Lifetime Table. Factor based on age. Example: $500K balance, age 73 factor 26.5. RMD = $500K ÷ 26.5 = $18,868. Factor decreases each year, RMD increases. Use IRS tables or online calculators. Consult financial advisor for precise calculation."
    },
    {
      question: "Does RMD penalty apply to Roth IRA?",
      answer: "No. Roth IRAs have NO RMD during owner's lifetime (SECURE 2.0 maintains this). Traditional IRA, 401(k), 403(b), inherited accounts all have RMD. Roth 401(k) has RMD unless rolled to Roth IRA. No penalty for not taking Roth IRA distribution at any age. Roth IRA owner never required to withdraw. Inherited Roth IRAs have RMD for beneficiaries."
    },
    {
      question: "Can I aggregate RMDs across accounts?",
      answer: "Yes for multiple IRAs. Calculate RMD for each IRA, can take total from one or any combination of IRAs. Example: IRA A $10K RMD, IRA B $5K RMD. Can withdraw $15K from IRA A, or split. Cannot aggregate 401(k)s with IRAs. Each 401(k) requires separate RMD from that account. Must satisfy each 401(k) RMD individually."
    },
    {
      question: "What if I miss RMD deadline?",
      answer: "Take missed RMD immediately. File Form 5329 for penalty year. Request waiver with reasonable cause explanation. Document circumstances thoroughly. Pay penalty if waiver not granted. Correct error promptly for better waiver chance. IRS more lenient if proactive correction. Don't wait for IRS to discover - self-report."
    },
    {
      question: "How do I report RMD on taxes?",
      answer: "RMD reported as ordinary income on Form 1040. Custodian sends Form 1099-R showing distribution. Enter on Form 1040 lines 5a (amount) and 5b (taxable amount). Traditional IRA/401(k) RMD usually fully taxable. RMD from nondeductible IRA contributions: portion non-taxable. Form 8606 tracks basis. Include RMD in AGI for tax planning."
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
      <RMDPenaltyCalculator />
    </>
  )
}