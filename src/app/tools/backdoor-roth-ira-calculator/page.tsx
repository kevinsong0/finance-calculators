'use client'

import BackdoorRothIRACalculator from '@/components/BackdoorRothIRACalculator'

export default function BackdoorRothIRACalculatorPage() {
  const faqs = [
    {
      question: "What is a backdoor Roth IRA?",
      answer: "Backdoor Roth IRA: contribute to Traditional IRA (non-deductible due to income limits), then convert to Roth IRA. Benefits: contributes $7,000 to Roth regardless of income limits. Roth provides tax-free growth and tax-free withdrawals after 5 years + age 59.5. Strategy works for high-income earners who exceed direct Roth contribution limits. No income limits for conversions. File Form 8606 to report non-deductible contribution and conversion."
    },
    {
      question: "What is the pro-rata rule for Roth conversions?",
      answer: "Pro-Rata rule: when converting Traditional IRA to Roth, taxable portion calculated as ratio of taxable funds to total IRA balance. Taxable % = (Taxable Traditional IRA / Total Traditional IRA) × 100%. Cannot convert only non-deductible portion separately. If you have existing deductible Traditional IRA funds, part of conversion becomes taxable. Solution: roll existing Traditional IRA to 401(k) before conversion, removing funds from pro-rata calculation."
    },
    {
      question: "What are the Roth IRA income limits for 2024?",
      answer: "Direct Roth contribution limits 2024: Single: MAGI <$161K can contribute full $7,000. $161K-$176K: partial contribution. >$176K: cannot contribute directly. Married filing jointly: <$240K full contribution, $240K-$260K partial, >$260K cannot contribute. Backdoor Roth works for incomes above these limits. No income limit for Traditional IRA contribution or Roth conversion."
    },
    {
      question: "How do I execute a backdoor Roth IRA conversion?",
      answer: "Step 1: Open Traditional IRA if needed. Step 2: Make non-deductible contribution ($7,000 for 2024, $8,000 if 50+). Step 3: Wait for contribution to settle (few days). Step 4: Convert entire Traditional IRA to Roth IRA. Step 5: File Form 8606 with tax return (reports non-deductible contribution and conversion). Best practice: convert immediately after contribution to minimize earnings (pro-rata applies to earnings too). Avoid having other Traditional IRA funds."
    },
    {
      question: "What is Form 8606 for backdoor Roth?",
      answer: "Form 8606: Nondeductible IRAs. Reports non-deductible Traditional IRA contributions and Roth conversions. Part I: reports non-deductible contribution, tracks basis. Part II: reports Roth conversion, calculates taxable amount using pro-rata rule. Required every year you make non-deductible contribution or convert. Keep Form 8606 records forever - tracks non-deductible basis for future conversions. Failure to file = $50 penalty, but critical for proving non-taxable portion of conversion."
    },
    {
      question: "What are the tax implications of backdoor Roth?",
      answer: "Tax implications: if no other Traditional IRA funds, only earnings on non-deductible contribution are taxable at conversion. Earnings taxed at ordinary income rate. If other Traditional IRA funds exist, pro-rata rule applies: portion of conversion taxable based on ratio of pre-tax funds to total IRA. Example: $50K pre-tax Traditional IRA + $7K non-deductible. Convert $7K: 86% taxable ($6,020), 14% non-taxable ($980). Roll pre-tax IRA to 401(k) first to avoid pro-rata."
    },
    {
      question: "Can I do backdoor Roth IRA every year?",
      answer: "Yes, repeat annually. Each year: contribute $7,000 non-deductible to Traditional IRA, convert to Roth. Track basis on Form 8606 each year. Strategy effective for long-term tax-free growth. Consider mega backdoor Roth 401(k) for additional contributions if employer allows after-tax 401(k) contributions and in-service withdrawals. Combined: $7,000 backdoor Roth IRA + up to $46,500 mega backdoor Roth 401(k) = $53,500 annual Roth contributions for high-income earners."
    },
    {
      question: "What is the 5-year rule for Roth conversions?",
      answer: "5-year rule: converted amount must stay in Roth 5 years before tax-free withdrawal. Clock starts January 1 of conversion year. Each conversion has separate 5-year clock. Withdraw converted amount before 5 years = 10% early withdrawal penalty (unless exception applies). Age 59.5 rule also applies: withdrawals tax-free after 5 years AND age 59.5. Exceptions: disability, death, first-time home purchase ($10K limit), substantially equal periodic payments."
    },
    {
      question: "What are backdoor Roth IRA risks?",
      answer: "Risks: Pro-rata rule if existing Traditional IRA funds - increases taxable conversion. IRS could eliminate strategy (legislation proposed). Conversion timing: earnings between contribution and conversion are taxable. Step transaction doctrine: IRS could argue contribution + conversion were single transaction, making it invalid (unlikely if proper timing and documentation). Keep records: Form 8606, contribution date, conversion date, account statements. Consult tax advisor for complex situations."
    },
    {
      question: "How does backdoor Roth compare to direct Roth?",
      answer: "Direct Roth: simpler, no conversion step, no pro-rata concerns. Available only if income below limits ($161K single, $240K married). Backdoor Roth: required for high-income earners. Both result in $7,000 in Roth IRA annually. Tax treatment identical after conversion. Direct Roth preferred if eligible. Backdoor Roth necessary for income >$176K single or >$260K married. Both provide tax-free growth and tax-free withdrawals after 5 years + age 59.5."
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
      <BackdoorRothIRACalculator />
    </>
  )
}