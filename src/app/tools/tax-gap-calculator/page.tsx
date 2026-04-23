'use client'

import TaxGapCalculator from '@/components/TaxGapCalculator'

export default function TaxGapCalculatorPage() {
  const faqs = [
    {
      question: "What is marginal tax rate?",
      answer: "Marginal tax rate is the tax rate applied to your LAST dollar of taxable income. This is your top tax bracket - the rate shown on tax bracket tables. If you're in the 32% bracket, your marginal rate is 32%. This rate applies only to income within that bracket, not all your income. Marginal rate determines tax on additional income."
    },
    {
      question: "What is effective tax rate?",
      answer: "Effective tax rate is your actual average tax rate - total tax divided by taxable income (or sometimes gross income). Because tax brackets are progressive (lower brackets taxed at lower rates), effective rate is always lower than marginal rate. Example: $200K income might have 32% marginal rate but only 18% effective rate."
    },
    {
      question: "What is the tax gap?",
      answer: "Tax gap is the difference between marginal tax rate and effective tax rate. Shows how much lower your actual tax burden is compared to your top bracket rate. Large tax gap means significant income taxed at lower brackets. Understanding tax gap helps evaluate true tax burden and make better financial decisions about additional income."
    },
    {
      question: "Why is my effective rate lower than marginal?",
      answer: "Progressive tax system: lower brackets fill first. First $11K taxed at 10%, next $34K at 12%, next $51K at 22%, etc. Only income in top bracket taxed at marginal rate. All income below top bracket taxed at lower rates. This creates tax gap - your average rate is blend of all bracket rates, always below top bracket rate."
    },
    {
      question: "When should I use marginal rate?",
      answer: "Use marginal rate for decisions about ADDITIONAL income: should I take that extra job, earn that bonus, realize that capital gain? Marginal rate tells tax impact of incremental income. Also use for deduction decisions: extra $1K deduction saves marginal rate × $1K in tax. Marginal rate matters for one-time additional income/deduction decisions."
    },
    {
      question: "When should I use effective rate?",
      answer: "Use effective rate for overall tax burden assessment: comparing tax situations across years, evaluating overall financial health, comparing to flat-tax alternatives, planning for retirement income needs. Effective rate shows true average tax cost. Use when evaluating tax burden on ALL income, not just additional income."
    },
    {
      question: "How do tax deductions affect marginal vs effective rate?",
      answer: "Deductions reduce taxable income, which reduces both total tax (lowering effective rate) and may drop you into lower bracket (reducing marginal rate). Large deductions can significantly reduce tax gap. Standard deduction ($14,600 single, $29,200 married) automatically reduces taxable income. Itemized deductions may reduce taxable income further."
    },
    {
      question: "Does tax gap vary by income level?",
      answer: "Yes. Tax gap varies significantly by income. Middle-income taxpayers often have largest tax gap (significant income in lower brackets). High-income taxpayers have smaller tax gap relative to income but larger absolute dollar gap. Very low-income taxpayers have small tax gap (most income in lowest bracket). Tax gap peaks where income spans many brackets."
    },
    {
      question: "How do I calculate my tax gap?",
      answer: "Calculate: 1) Find total tax on your return (line 24 on Form 1040). 2) Divide by taxable income for effective rate. 3) Identify marginal rate from tax bracket tables based on taxable income. 4) Subtract effective rate from marginal rate. Example: 32% marginal, 18% effective = 14% tax gap. Your actual tax burden is 14% lower than your top bracket suggests."
    },
    {
      question: "Why does understanding tax gap matter?",
      answer: "Understanding tax gap prevents overestimating tax burden. People often think they pay 32% (their bracket) when actually paying much less. Helps make better financial decisions: accepting additional work (taxed at marginal), evaluating job offers (consider effective rate for salary comparison), planning retirement withdrawals. Accurate tax rate understanding improves financial planning."
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
      <TaxGapCalculator />
    </>
  )
}