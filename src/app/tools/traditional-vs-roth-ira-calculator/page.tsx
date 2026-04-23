'use client'

import TraditionalVsRothIRACalculator from '@/components/TraditionalVsRothIRACalculator'

export default function TraditionalVsRothIRACalculatorPage() {
  const faqs = [
    {
      question: "Should I choose Traditional or Roth IRA?",
      answer: "The key factor is comparing current vs expected retirement tax rates. If your retirement tax rate will be lower than current, Traditional IRA wins (deduct now at high rate, withdraw later at low rate). If retirement rate will be higher, Roth wins (pay tax now at low rate, withdraw tax-free at higher rate)."
    },
    {
      question: "What are the tax benefits of Traditional IRA?",
      answer: "Traditional IRA contributions may be tax-deductible, reducing your current taxable income. Investment growth is tax-deferred until withdrawal. At retirement, you pay tax on withdrawals at your then-current rate. Best if you expect lower taxes in retirement."
    },
    {
      question: "What are the tax benefits of Roth IRA?",
      answer: "Roth IRA offers no upfront deduction, but all growth and withdrawals are tax-free in retirement. There are no Required Minimum Distributions during your lifetime. Best if you expect higher taxes in retirement or want tax diversification."
    },
    {
      question: "What are the Traditional IRA income limits for deductions?",
      answer: "If you have a workplace retirement plan (401k, etc.), Traditional IRA deduction phases out: 2024 single $77,000-$87,000, married $123,000-$143,000. If no workplace plan, full deduction regardless of income (but subject to spouse's plan rules)."
    },
    {
      question: "Can I have both Traditional and Roth IRA?",
      answer: "Yes, you can have both account types. However, the annual contribution limit is shared - $7,000 total across both (or $8,000 if 50+). Many financial advisors recommend having both for tax diversification in retirement."
    },
    {
      question: "What are Required Minimum Distributions (RMDs)?",
      answer: "Traditional IRAs require you to withdraw minimum amounts starting at age 73, whether you need the money or not. These withdrawals are taxed. Roth IRAs have no RMDs during the owner's lifetime, allowing tax-free growth to continue indefinitely."
    },
    {
      question: "What is the 5-year rule for Roth IRA?",
      answer: "Roth IRA tax-free withdrawals require the account to be open for 5+ years, even after age 59½. Each conversion has its own 5-year clock for penalty-free access to converted amounts. Contributions can be withdrawn anytime tax-free."
    },
    {
      question: "How does state tax affect Traditional vs Roth?",
      answer: "State income tax applies to Traditional IRA deductions now and withdrawals later. Roth IRA contributions have no state deduction, but withdrawals are tax-free federally and in most states. Consider whether you'll move to a different-tax state in retirement."
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
      <TraditionalVsRothIRACalculator />
    </>
  )
}