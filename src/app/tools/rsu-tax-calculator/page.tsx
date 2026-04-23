'use client'

import RSUTaxCalculator from '@/components/RSUTaxCalculator'

export default function RSUTaxCalculatorPage() {
  const faqs = [
    {
      question: "How are RSUs taxed at vesting?",
      answer: "RSU vesting: taxed as ordinary income on FMV of shares at vest date. Income = number of shares × FMV at vesting. Tax rate: your marginal rate (10-37%). Reported on W-2 as compensation. Withholding: supplemental rate 22% (37% above $1M cumulative). Employer may withhold shares to cover taxes (sell-to-cover). Cost basis = FMV at vesting. Example: 1000 RSUs vest at $50/share = $50,000 income. Tax $11,000 (22%). Net 780 shares after withholding. Already taxed on $50K, so basis $50/share."
    },
    {
      question: "When do RSUs vest?",
      answer: "RSU vesting schedule varies by company. Common schedules: 4-year cliff (all vest after 4 years), 4-year graded (25% per year), 3-year graded (33% per year). Vest triggers: time-based (anniversary dates), performance-based (company targets), hybrid (time + performance). Vest date typically: employment start anniversary, specific calendar dates. Check grant agreement for exact vest schedule. Unvested RSUs forfeited if leave company. Some plans: partial vest upon departure, accelerated vest for change of control."
    },
    {
      question: "What is double taxation risk for RSUs?",
      answer: "Double taxation risk: broker reports incorrect cost basis on Form 1099-B. If basis = $0 or grant price (not vest FMV), you pay tax twice: once on vest income, again on sale (basis wrong). IRS assumes basis from 1099-B. Solution: verify 1099-B shows correct basis (vest FMV). If wrong: file Form 8949 to adjust basis. Check box C on Form 8949. Enter correct basis from W-2 vest income. Keep records: vest date, FMV, units, withholding. Many brokers correct RSU basis automatically, but verify."
    },
    {
      question: "Should I sell RSUs immediately or hold?",
      answer: "Sell immediately (same-day sale): zero capital gain/loss, immediate diversification, cash available, no future price risk. Hold: potential growth, qualify for LTCG after 1 year, but concentration risk, price decline risk. LTCG benefit: 15% vs 24%+ marginal rate (9% savings). Hold 1 year if confident in company growth. Diversification important: don't hold too much employer stock. Sell-to-cover: sell portion to cover tax, hold remainder. Consider total portfolio: if employer stock dominates, diversify by selling RSUs."
    },
    {
      question: "How is RSU withholding calculated?",
      answer: "RSU withholding methods: Sell-to-cover (sell shares to cover tax, net remaining shares), Cash withholding (you pay tax, keep all shares), Net shares (employer calculates net after withholding). Rate: supplemental withholding 22% federal (37% if cumulative supplemental income exceeds $1M). State withholding varies. Withholding may under-withhold if your marginal rate exceeds 22%. Adjust W-4 or make estimated payments if under-withheld. Withholding at vest, not at grant. No tax at grant (RSUs not yet owned)."
    },
    {
      question: "What is sell-to-cover for RSUs?",
      answer: "Sell-to-cover: sell enough shares at vest to cover tax withholding. Remaining shares kept (net shares). Example: 1000 RSUs vest at $50. Income $50,000. Tax $11,000 (22%). Sell 220 shares ($11,000) to cover tax. Keep 780 net shares. Benefit: don't need cash to pay tax, diversify immediately (sold shares), hold remaining. Alternative: cash withholding (pay $11K, keep all 1000 shares). Most companies default to sell-to-cover. Tax still owed if withholding insufficient (marginal rate over 22%)."
    },
    {
      question: "How are RSUs taxed at sale?",
      answer: "RSU sale: capital gain = sale price - cost basis. Cost basis = FMV at vesting (already taxed). Short-term (under 1 year): taxed at marginal rate. Long-term (over 1 year): taxed at LTCG rate (0%/15%/20%). Example: vest at $50, sell at $75 after 1 year. Capital gain $25/share. LTCG tax $3.75/share (15%). Total tax: vest income tax (24% × $50 = $12) + LTCG tax (15% × $25 = $3.75) = $15.75/share. Hold 1 year to qualify for LTCG. Sale reported on Form 1099-B, Schedule D."
    },
    {
      question: "What happens to RSUs when leaving company?",
      answer: "RSUs upon departure: vested RSUs = yours (exercise window varies). Unvested RSUs = forfeited (unless acceleration in agreement). Vest after departure: rare, some plans allow post-termination vesting for certain exits. Check grant agreement and company policy. Acceleration clauses: change of control (acquisition), retirement (age + years), death/disability, termination without cause. Negotiate acceleration in exit package if possible. Exercise vested RSUs promptly (most companies require). Taxes due at vest, not at departure."
    },
    {
      question: "How to plan RSU tax withholding?",
      answer: "RSU tax planning: estimate marginal rate for vest year. If marginal rate over 22%: supplemental withholding insufficient. Adjust W-4 (reduce allowances, add extra withholding). Make estimated tax payments quarterly (April 15, June 15, Sept 15, Jan 15). Withholding at vest may trigger underpayment penalty if insufficient. Track cumulative supplemental income: RSU + bonus + other supplemental. Exceed $1M: withholding rate jumps to 37%. Use tax projection calculator. Review vest schedule: know vest dates and amounts. Plan cash flow for tax payments."
    },
    {
      question: "How do RSUs compare to stock options?",
      answer: "RSUs vs stock options: RSUs always have value (share price × units). Options require share price above grant price to have value. RSU tax at vest: ordinary income on full value. Option tax varies: ISO (AMT at exercise), NSO (ordinary income at exercise). RSUs simpler: no exercise decision, no AMT, no $100K limit. Options offer leverage: more upside if stock grows significantly. RSUs safer: value even if stock flat. Options riskier: worthless if below grant price. Companies shifting to RSUs for simplicity. Options still used for early-stage companies (lower grant price)."
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
      <RSUTaxCalculator />
    </>
  )
}