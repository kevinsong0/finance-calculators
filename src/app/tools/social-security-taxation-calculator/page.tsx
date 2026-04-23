'use client'

import SocialSecurityTaxationCalculator from '@/components/SocialSecurityTaxationCalculator'

export default function SocialSecurityTaxationCalculatorPage() {
  const faqs = [
    {
      question: "How is Social Security taxed?",
      answer: "Social Security benefits may be taxable depending on provisional income. Provisional income = adjusted gross income + tax-exempt interest + 50% of Social Security. Single: $0-$25K provisional income = 0% taxable. $25K-$34K = up to 50% taxable. Over $34K = up to 85% taxable. Married: thresholds are $32K and $44K. Maximum 85% of benefits can be taxed."
    },
    {
      question: "What is provisional income for Social Security taxation?",
      answer: "Provisional income = AGI (wages, pensions, dividends, capital gains, taxable interest) + tax-exempt interest (municipal bonds) + 50% of Social Security benefits. This formula determines what percentage of Social Security is taxable. Lower provisional income = less Social Security taxed. Roth IRA withdrawals do NOT count toward provisional income."
    },
    {
      question: "How much Social Security can be taxed?",
      answer: "Maximum 85% of Social Security benefits can be taxable at federal level. At lowest tier (0%), none taxed. At middle tier (50%), up to half taxed. At highest tier (85%), up to 85% taxed. Never taxed at 100%. The taxable portion is taxed at ordinary income rates (10%-37%), not preferential rates."
    },
    {
      question: "Do states tax Social Security?",
      answer: "Most states do NOT tax Social Security or follow federal rules. States that tax Social Security: Colorado, Connecticut, Kansas, Minnesota, Missouri, Montana, Nebraska, New Mexico, North Dakota, Rhode Island, Vermont, West Virginia. Some states partially tax or have exemptions. Check your state's specific treatment. Moving to a no-tax state can reduce overall tax burden."
    },
    {
      question: "How can I reduce Social Security taxation?",
      answer: "Reduce provisional income: Roth conversions before Social Security (Roth withdrawals not counted). Manage investment income (reduce dividends, capital gains). Delay Social Security to allow Roth conversion time. Use qualified charitable distributions (QCDs) to reduce AGI. Tax-exempt interest still counted, so municipal bonds don't help. Focus on Roth strategy."
    },
    {
      question: "Does Roth IRA affect Social Security taxation?",
      answer: "Roth IRA withdrawals do NOT count toward provisional income. This is key advantage: take Roth withdrawals without increasing Social Security taxation. Convert Traditional to Roth BEFORE receiving Social Security. Post-SS Roth conversions still work but less benefit (already receiving SS). Roth strategy best planned before claiming Social Security."
    },
    {
      question: "What counts as other income for Social Security taxation?",
      answer: "Other income includes: wages, self-employment income, pensions, annuities, dividends, interest (taxable), capital gains, rental income, traditional IRA withdrawals, 401(k) withdrawals. Does NOT include: Roth IRA withdrawals, gift income, life insurance proceeds, inheritances (usually). All taxable income sources count except Roth distributions."
    },
    {
      question: "Why does tax-exempt interest count for Social Security taxation?",
      answer: "Tax-exempt interest (municipal bonds) is added to provisional income even though it's not federally taxed. Congress designed this to prevent wealthy taxpayers from sheltering income in tax-free bonds while avoiding Social Security taxation. Municipal bond interest still increases provisional income, potentially making more SS taxable."
    },
    {
      question: "When do I report Social Security taxation?",
      answer: "Report on Form 1040. Social Security Administration sends Form SSA-1099 showing total benefits. Worksheet in Form 1040 instructions calculates taxable amount. Use Form 1040 lines 6a (total SS) and 6b (taxable SS). Software and tax preparers calculate automatically. Report taxable SS as ordinary income on return."
    },
    {
      question: "Does Social Security taxation affect Medicare IRMAA?",
      answer: "Yes, indirectly. IRMAA uses MAGI (AGI + tax-exempt interest). Taxable Social Security increases AGI, which increases MAGI. Higher MAGI may trigger IRMAA. Reducing Social Security taxation (via Roth withdrawals) helps reduce MAGI, potentially avoiding IRMAA. Social Security taxation and IRMAA are connected through AGI calculation."
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
      <SocialSecurityTaxationCalculator />
    </>
  )
}