'use client'

import EarlyWithdrawalPenaltyCalculator from '@/components/EarlyWithdrawalPenaltyCalculator'

export default function EarlyWithdrawalPenaltyCalculatorPage() {
  const faqs = [
    {
      question: "What is the early withdrawal penalty for retirement accounts?",
      answer: "10% penalty on withdrawals from retirement accounts before age 59.5. Applies to 401(k), Traditional IRA, Roth earnings. Plus ordinary income tax on distribution amount. Combined cost can exceed 30-40% for high earners. Example: $50K withdrawal at 32% marginal rate = $16K income tax + $5K penalty = $21K total tax, net $29K. Avoid early withdrawal unless absolutely necessary."
    },
    {
      question: "What exceptions avoid the 10% early withdrawal penalty?",
      answer: "Penalty exemptions: age 59.5+, total disability, death (beneficiary), medical expenses exceeding 7.5% AGI, first-time homebuyer (Roth IRA $10K limit), education expenses (IRA only), birth/adoption ($5K IRA limit), military reservist call-up, age 55+ separated from service (401k only), substantially equal periodic payments (72t). Income tax still applies even if penalty exempt."
    },
    {
      question: "Does age 55 rule apply to 401(k) withdrawal?",
      answer: "Yes, but only if separated from employer at age 55 or older. Penalty-free 401(k) withdrawal allowed. Does NOT apply if still working for same employer. Does NOT apply to IRAs. Age 55 rule specific to 401(k), 403(b), governmental 457(b). Must be separated from service (quit, retire, fired). If rolled to IRA, age 55 rule lost - IRA requires age 59.5."
    },
    {
      question: "Can I withdraw Roth IRA contributions penalty-free?",
      answer: "Yes. Roth IRA contributions can be withdrawn anytime, tax-free, penalty-free. Contributions withdrawn first (ordering rules). Earnings taxable if not qualified distribution. Qualified Roth: 5-year account age + age 59.5 (or exemption). Non-qualified earnings: income tax + 10% penalty. Example: $30K contributions, $10K earnings. Withdraw $20K = all contributions, zero tax/penalty."
    },
    {
      question: "What is the first-time homebuyer exception?",
      answer: "Penalty exemption for first-time homebuyer (Roth IRA only). Must be principal residence. Maximum $10,000 lifetime exemption per person. First-time = no home ownership in past 2 years. Can use for yourself, spouse, child, grandchild. Income tax still applies to Traditional IRA. Roth IRA earnings penalty-free but taxable if not qualified. 120-day use requirement for funds."
    },
    {
      question: "What is substantially equal periodic payments (72t)?",
      answer: "72t allows penalty-free early withdrawal through equal periodic payments. Must continue for 5 years OR until age 59.5 (whichever longer). Three IRS-approved calculation methods. Once started, cannot modify without penalty. Complex, requires precise calculations. Best for those needing steady income before 59.5. Consult advisor before starting 72t - mistakes costly."
    },
    {
      question: "How is medical expense exemption calculated?",
      answer: "Penalty-free withdrawal for medical expenses exceeding 7.5% AGI. Example: AGI $100K, threshold $7,500. Medical expenses $20K - $7,500 = $12,500 above threshold. Can withdraw $12,500 penalty-free. Amount above threshold exempt, not total medical. Health insurance premiums count as medical expense. Must itemize medical deductions. Document expenses thoroughly."
    },
    {
      question: "Is 401(k) loan better than withdrawal?",
      answer: "Yes. 401(k) loan avoids penalty and tax. Borrow up to $50K or 50% of balance. Repay over 5 years (longer for home purchase). Interest paid to your own account. No credit check. Risk: if leave job, loan due in 60 days or becomes withdrawal with penalty. Consider loan before withdrawal. Not available from IRA. Loan preserves retirement savings."
    },
    {
      question: "How do I report early withdrawal on taxes?",
      answer: "Form 1099-R from custodian shows distribution. Code 1 = early distribution with penalty. Code 2 = early distribution with known exemption. Form 1040 lines 5a (amount) and 5b (taxable). Form 5329 Part II reports penalty. Exception codes on Form 5329 line 2. Claim exemption by entering appropriate code. File Form 5329 even if exemption applies to document reason."
    },
    {
      question: "What are alternatives to early withdrawal?",
      answer: "Alternatives: 401(k) loan (no penalty/tax), home equity loan/HELOC, personal loan, emergency fund, Roth IRA contribution withdrawal (penalty-free), borrow from family, credit card payoff plan, reduce expenses. Early withdrawal last resort - destroys retirement savings, high tax cost. Explore all options before touching retirement accounts. Long-term cost far exceeds short-term benefit."
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
      <EarlyWithdrawalPenaltyCalculator />
    </>
  )
}