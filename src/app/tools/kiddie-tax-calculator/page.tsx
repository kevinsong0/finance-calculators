'use client'

import KiddieTaxCalculator from '@/components/KiddieTaxCalculator'

export default function KiddieTaxCalculatorPage() {
  const faqs = [
    {
      question: "What is the kiddie tax?",
      answer: "Kiddie tax: prevents parents from shifting investment income to children to avoid taxes. Applies to children under 19, or under 24 if full-time student. Net unearned income over $2300 taxed at parent's highest marginal rate. First $1150 taxed at child's rate (10%), next $1150 at child's rate (10%), excess at parent's rate. Applies to interest, dividends, capital gains. Does NOT apply to earned income (wages, self-employment)."
    },
    {
      question: "What is the kiddie tax age limit?",
      answer: "Kiddie tax age limit: under 19 for all children. Extended to under 24 for full-time students. Student must attend school full-time for at least 5 months of the year. Age 24: kiddie tax no longer applies even if student. Once child reaches age limit, all income taxed at child's own rates. Age tested at end of tax year (December 31). Gift/inheritance income still subject to kiddie tax until age limit reached."
    },
    {
      question: "What income is subject to kiddie tax?",
      answer: "Unearned income subject to kiddie tax: interest, dividends, capital gains, rental income, royalty income, pension/annuity income, trust distributions, gifts/inheritances producing income. NOT subject: earned income from wages, self-employment, tips. Scholarships for tuition NOT taxable. Scholarships for room/board taxable. Social Security benefits may be taxable but typically not subject to kiddie tax."
    },
    {
      question: "How is kiddie tax calculated?",
      answer: "Kiddie tax calculation: Net unearned income = total unearned income - $2300 threshold. First $1150: taxed at child's 10% rate ($115 tax). Next $1150: taxed at child's 10% rate ($115 tax). Excess over $2300: taxed at parent's highest marginal rate. Example: $5000 unearned income, parent at 24% rate. Tax: $115 + $115 + $2700 × 24% = $115 + $115 + $648 = $878. Without kiddie tax: $5000 - $1150 deduction = $3850 × 10% = $385. Kiddie tax adds $493."
    },
    {
      question: "What is Form 8615 for kiddie tax?",
      answer: "Form 8615: Tax for Certain Children Who Have Unearned Income. Required if child: under 19 (or 24 if student), has unearned income >$2300, has at least one living parent, not filing joint return. Form calculates kiddie tax by: entering child's unearned income, entering parent's taxable income and filing status, calculating parent's marginal rate, applying parent's rate to child's excess income. Attach Form 8615 to child's tax return."
    },
    {
      question: "Can parents include child's income on their return?",
      answer: "Yes, via Form 8814: Parent's Election to Report Child's Interest and Dividends. Requirements: child under 19 (or 24 if student), income only from interest/dividends, income $11,500 or less, no other income requiring filing, child not subject to backup withholding. Benefits: simpler filing (one return instead of two). Drawbacks: may increase parent's tax, may reduce parent's credits/deductions. Child's income included on parent's Schedule B. Cannot use if child has capital gains."
    },
    {
      question: "How to avoid kiddie tax?",
      answer: "Strategies: invest in tax-free municipal bonds (interest exempt from federal tax). Use tax-deferred investments (growth not taxed annually): UGMA/UTMA growth stocks, hold until child over age limit. 529 plans: tax-free growth for education, no kiddie tax. Roth IRA: if child has earned income, contribute to Roth (tax-free growth). Gift appreciated stock to child, wait until age limit to sell. Avoid investments generating annual taxable income. Time capital gains realization after child reaches age limit."
    },
    {
      question: "What is the $2300 kiddie tax threshold?",
      answer: "2024 kiddie tax threshold: $2300 of net unearned income. Below threshold: taxed at child's own rates. Above threshold: excess taxed at parent's rate. Threshold adjusts annually for inflation. Standard deduction for unearned income: $1150 (only for unearned). $2300 = $1150 (child's 10% rate) + $1150 (child's 10% rate). Income below $2300: child pays minimal tax. Income above $2300: kiddie tax applies to excess."
    },
    {
      question: "Does kiddie tax apply to capital gains?",
      answer: "Yes, capital gains are unearned income subject to kiddie tax. Short-term gains: taxed at parent's ordinary rate via kiddie tax. Long-term gains: taxed at parent's capital gains rate (0%/15%/20%) via kiddie tax. Strategy: defer realizing gains until child exceeds age limit. Gift appreciated stock: child holds until over 19 (or 24), then sells at own low rate. 529 plan: tax-free growth, no kiddie tax. Losses offset gains within child's account. Kiddie tax applies to net capital gains after losses."
    },
    {
      question: "Does kiddie tax apply to 529 plans?",
      answer: "No, kiddie tax does NOT apply to 529 plans. 529 plan growth: tax-free when used for qualified education expenses. No annual taxation of growth. No kiddie tax on 529 distributions for education. Beneficiary can be any age. 529 ideal for children subject to kiddie tax. Non-qualified distributions: earnings taxed at recipient's rate + 10% penalty, but not kiddie tax. Use 529 instead of UGMA/UTMA for children under kiddie tax age limit."
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
      <KiddieTaxCalculator />
    </>
  )
}