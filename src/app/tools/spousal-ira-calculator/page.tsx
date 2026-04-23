'use client'

import SpousalIRACalculator from '@/components/SpousalIRACalculator'

export default function SpousalIRACalculatorPage() {
  const faqs = [
    {
      question: "What is a spousal IRA?",
      answer: "Spousal IRA: IRA for non-working spouse based on working spouse's earned income. Allows spouse with no income to contribute to retirement account. Must be married filing jointly. Working spouse must have earned income >= total IRA contributions. Each spouse has separate IRA (not joint account). Contribution limit: $7000 per spouse (2024), $8000 if 50+. Doubles couple's retirement savings capacity. Spouse owns IRA, not working spouse."
    },
    {
      question: "What are spousal IRA eligibility requirements?",
      answer: "Requirements: married filing jointly, working spouse has earned income, earned income >= total couple IRA contributions, non-working spouse under 70.5 (Traditional IRA). No income requirement for non-working spouse. Working spouse can have employer retirement plan. Both spouses must have compensation-based income, but only working spouse needs earned income. Non-working spouse can contribute even with $0 income. Must file MFJ to qualify."
    },
    {
      question: "How much can a non-working spouse contribute to IRA?",
      answer: "Contribution limit: $7000 (2024) if under 50, $8000 if 50+. Same limit as working spouse. Total couple limit: $14,000 (under 50) or $16,000 (both 50+). Limited by working spouse's earned income. Example: working spouse earns $10,000: couple can contribute up to $10,000 total split between both IRAs. Working spouse must have at least as much earned income as total contributions."
    },
    {
      question: "Can spousal IRA be Traditional or Roth?",
      answer: "Both Traditional and Roth available for spousal IRA. Traditional: tax deduction now, taxed at withdrawal. Roth: no deduction, tax-free growth and withdrawal. Roth income limits apply: MAGI <$230K (married) for full contribution, phaseout to $240K. Traditional: no income limit for contribution, deduction limits if covered by employer plan. Can split between both types. Choose based on current vs future tax rates."
    },
    {
      question: "What if working spouse has employer retirement plan?",
      answer: "Working spouse's employer plan affects Traditional IRA deduction limits, not contribution eligibility. If covered by employer plan: Traditional IRA deduction phaseout $123K-$143K MAGI (married). Spousal Traditional IRA (non-working spouse not covered): phaseout $230K-$240K. Roth IRA: same income limits regardless of employer plan coverage. Employer plan doesn't affect Roth eligibility. Contribution limit same whether or not covered by employer plan."
    },
    {
      question: "Can both spouses contribute to IRAs?",
      answer: "Yes. Working spouse contributes to own IRA. Non-working spouse contributes to spousal IRA. Total contributions limited by working spouse's earned income. Each spouse has separate account, separate investment decisions. Both can contribute Traditional, Roth, or split. Each spouse has $7000 limit ($8000 if 50+). Working spouse income must cover both contributions. Each spouse owns their own IRA."
    },
    {
      question: "What are catch-up contributions for spousal IRA?",
      answer: "Catch-up: $1000 additional if age 50+. Applies to each spouse individually. If non-working spouse 50+: can contribute $8000. If working spouse 50+: can contribute $8000. Total couple: up to $16,000 if both 50+. Each spouse's age determines catch-up eligibility independently. Both spouses can make catch-up if both 50+. Only one spouse 50+: that spouse gets $8000 limit, other $7000."
    },
    {
      question: "Does spousal IRA affect working spouse's IRA?",
      answer: "Spousal IRA is separate from working spouse's IRA. No effect on working spouse's contribution limit. Working spouse can still contribute full amount to own IRA. Total contributions limited by working spouse's earned income. Each spouse makes independent investment decisions. Each spouse has separate beneficiary designations. Spousal IRA belongs to non-working spouse, not joint account. Neither spouse's IRA affects the other's eligibility."
    },
    {
      question: "What happens to spousal IRA if divorce?",
      answer: "Spousal IRA belongs to spouse named on account, not affected by divorce. Account owner keeps IRA regardless of divorce. Division in divorce: may split assets via QDRO or transfer incident to divorce. Transfer incident to divorce: tax-free IRA transfer to spouse. After divorce: can't make spousal IRA contributions (no longer married). Divorced spouse with no income can't contribute to IRA. Consider IRA division in divorce settlement."
    },
    {
      question: "Can spousal IRA do backdoor Roth?",
      answer: "Yes. Non-working spouse can do backdoor Roth same as anyone. Step 1: contribute to Traditional IRA (non-deductible if income above limits). Step 2: convert to Roth IRA. Same pro-rata rule applies: existing Traditional IRA balances affect taxation. Same income limits for direct Roth apply to spousal IRA. Backdoor works for any IRA owner regardless of employment. File Form 8606 for non-deductible contribution and conversion."
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
      <SpousalIRACalculator />
    </>
  )
}