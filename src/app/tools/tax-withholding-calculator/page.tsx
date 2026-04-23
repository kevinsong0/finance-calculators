'use client'

import TaxWithholdingCalculator from '@/components/TaxWithholdingCalculator'

export default function TaxWithholdingCalculatorPage() {
  const faqs = [
    {
      question: "How do I calculate federal tax withholding?",
      answer: "Federal withholding uses progressive tax brackets. Your employer estimates annual taxable income (salary minus deductions), applies tax brackets, divides by pay periods. Single brackets: 10% ($0-$11K), 12% ($11K-$44.7K), 22% ($44.7K-$95.5K), 24% ($95.5K-$182K), 32% ($182K-$231K), 35% ($231K-$578K), 37% (over $578K). Married brackets are doubled. W-4 form adjusts withholding: claim dependents, extra deductions, additional withholding."
    },
    {
      question: "What is FICA tax withholding?",
      answer: "FICA = Social Security + Medicare. Social Security: 6.2% on wages up to $168,600 (2024 cap). Medicare: 1.45% on all wages, no cap. Additional Medicare: 0.9% on wages over $200K (single) or $250K (married). Employer matches 6.2% SS and 1.45% Medicare. Self-employed pay both halves (15.3% total). FICA withheld from every paycheck automatically."
    },
    {
      question: "How much should I withhold from paycheck?",
      answer: "Target withholding = estimated annual tax liability. Goal: owe less than $1,000 or 90% of current year tax when filing. Under-withhold = penalties. Over-withhold = refund (lost opportunity cost). Use IRS Tax Withholding Estimator tool. W-4 adjustments: Step 3 for credits, Step 4a for other income, Step 4b for deductions, Step 4c for extra withholding per paycheck."
    },
    {
      question: "What happens if I under-withhold taxes?",
      answer: "Under-withholding penalties apply if owed >$1,000 AND withholding <90% of tax due OR <100% of prior year tax (110% if AGI >$150K). Penalty rate = federal short-term rate + 3% (currently ~8%). Penalty accrues quarterly. Safe harbor: withhold 100% of prior year tax (110% for high income). Avoid penalty by increasing withholding or making estimated payments."
    },
    {
      question: "How does W-4 affect tax withholding?",
      answer: "W-4 (Employee's Withholding Certificate) controls paycheck withholding. Step 1: filing status. Step 2: multiple jobs/spouse works. Step 3: claim dependents and other credits (reduces withholding). Step 4a: other income not from jobs (increases withholding). Step 4b: deductions beyond standard (reduces withholding). Step 4c: extra withholding per paycheck. Submit new W-4 to employer anytime."
    },
    {
      question: "How do state taxes affect withholding?",
      answer: "State withholding varies by state. 41 states have income tax. Some use flat rate, others use progressive brackets. State tax deducted separately from federal. State withholding typically 0-13% depending on state. Some states (AK, FL, NV, SD, TN, TX, WA, WY) have no income tax. State tax may be deductible on federal return (SALT deduction up to $10K). Adjust state withholding via state W-4 equivalent."
    },
    {
      question: "How do tax brackets work for withholding?",
      answer: "Progressive brackets: each portion of income taxed at different rate. Example $100K single: first $11K at 10% ($1,100), $11K-$44.7K at 12% ($4,044), $44.7K-$95.5K at 22% ($11,176), $95.5K-$100K at 24% ($1,080). Total federal tax = $17,400. Not all income taxed at highest bracket. Marginal rate = rate on last dollar earned (24%). Effective rate = total tax / total income (17.4%)."
    },
    {
      question: "What is the difference between gross and net pay?",
      answer: "Gross pay = total earnings before deductions. Net pay = take-home pay after all deductions. Deductions: federal tax, state tax, Social Security (6.2%), Medicare (1.45%), health insurance, 401k contributions, other benefits. Net pay = Gross - Federal - State - FICA - Benefits - Retirement contributions. Calculate net pay to budget expenses and plan savings."
    },
    {
      question: "How do deductions reduce tax withholding?",
      answer: "Deductions reduce taxable income, lowering tax bracket and total tax. Standard deduction 2024: $14,600 single, $29,200 married. Itemize if deductions exceed standard: mortgage interest, charitable donations, state/local taxes (up to $10K), medical expenses >7.5% AGI. W-4 Step 4b: claim deductions beyond standard to reduce withholding. Lower withholding = higher net pay, but ensure sufficient withholding to avoid penalty."
    },
    {
      question: "How often should I check tax withholding?",
      answer: "Review withholding annually and after major life changes: marriage, divorce, new child, job change, salary increase, home purchase, large bonus, retirement contribution change, investment income change. Use IRS Tax Withholding Estimator quarterly. Check after filing tax return: large refund or balance due indicates withholding adjustment needed. Adjust W-4 promptly to avoid penalties or lost opportunity cost."
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
      <TaxWithholdingCalculator />
    </>
  )
}