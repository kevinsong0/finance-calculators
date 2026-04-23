'use client'

import TaxAuditRiskCalculator from '@/components/TaxAuditRiskCalculator'

export default function TaxAuditRiskCalculatorPage() {
  const faqs = [
    {
      question: "What triggers an IRS audit?",
      answer: "Audit triggers: high income (over $200K), large deductions relative to income, self-employment/business income, home office deduction, large charitable deductions, unreported income, complex return, foreign accounts, cryptocurrency, prior audit history. IRS computer scoring (DIF system) identifies returns with highest audit potential. Random selection also occurs. Document all deductions thoroughly."
    },
    {
      question: "What are IRS audit statistics?",
      answer: "Overall audit rate: ~0.3% (3 in 1000). Income under $50K: ~0.3%. $50K-$100K: ~0.5%. $100K-$200K: ~0.7%. $200K-$500K: ~1%. $500K-$1M: ~2%. Over $1M: ~4%. Self-employed Schedule C: higher rate. Business returns: higher rate. High income + deductions = significantly higher risk. Audit rate increased for complex returns and high earners."
    },
    {
      question: "How long does IRS audit take?",
      answer: "Typical audit: 3-6 months. Office audit: few hours to one day. Field audit: 6-12 months. Correspondence audit: 2-3 months. Complex business audit: 1-2 years. IRS deadline: 3 years from filing date (statute of limitations). Extensions available. Respond promptly to requests. Delays extend process. Professional representation can expedite resolution."
    },
    {
      question: "What documents does IRS request in audit?",
      answer: "Income verification: W-2s, 1099s, bank statements, business records. Deduction proof: receipts, canceled checks, invoices, statements. Home office: exclusive use documentation, measurements, photos. Charitable donations: acknowledgment letters, appraisals for non-cash. Business expenses: mileage logs, receipts, vendor records. Medical expenses: bills, insurance statements. Bank statements for all accounts."
    },
    {
      question: "What happens if I fail IRS audit?",
      answer: "Audit failure = additional tax owed. Interest on additional tax (~8%). Accuracy-related penalty: 20% of underpayment. Negligence penalty: same 20%. Civil fraud penalty: 75% (very rare). Failure to substantiate deductions = deductions denied. Respond to IRS findings: agree, disagree, appeal. Payment plan available if cannot pay. Audit outcome not necessarily failure - many audits result in no change."
    },
    {
      question: "Can I appeal IRS audit results?",
      answer: "Yes. Appeal within 30 days of audit report. Request Appeals Conference. Provide additional documentation supporting position. Appeals independent from audit division. 90% of cases settled in Appeals without Tax Court. Appeals considers hazards of litigation. Professional representation helps. If Appeals denies: Tax Court (pay first then sue) or US District Court (pay first then sue)."
    },
    {
      question: "What is the 3-year audit statute?",
      answer: "IRS audit deadline: 3 years from filing date (or due date if filed early). After 3 years: IRS cannot assess additional tax (statute expired). Exceptions: substantial understatement (>25%) extends to 6 years. No return filed: no statute (unlimited). Fraud: no statute (unlimited). File return timely to start 3-year clock. Keep records 3 years minimum, 6 years for substantial income."
    },
    {
      question: "How do I prepare for IRS audit?",
      answer: "Organize all documentation for deductions claimed. Match receipts to tax return line items. Gather bank statements, pay stubs, 1099s. Business: profit/loss statements, bank records, invoices. Home office: exclusive use proof, measurements. Charitable: acknowledgment letters, receipts. Consider professional representation (CPA, tax attorney). Respond promptly to IRS requests. Be cooperative but protect rights."
    },
    {
      question: "Should I hire professional for audit?",
      answer: "Recommended for: large amounts at stake, complex issues, business audit, foreign accounts, crypto, potential fraud allegations. CPA or tax attorney. Professional knows audit procedures, negotiation strategies. Can attend audit without you present. Higher success rate with representation. Cost worth it for significant issues. Simple correspondence audit may handle yourself. Professional reduces stress and improves outcome."
    },
    {
      question: "How can I reduce audit risk?",
      answer: "Report ALL income (IRS matches 1099s). Keep detailed documentation for deductions. File FBAR if foreign accounts. Report cryptocurrency. Avoid disproportionate deductions relative to income. Use reasonable charitable deduction amounts. Document home office exclusive use. File accurate, complete returns. Use tax professional for complex returns. File on time, pay on time. Respond to IRS notices promptly."
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
      <TaxAuditRiskCalculator />
    </>
  )
}