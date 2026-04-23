'use client'

import OfferInCompromiseCalculator from '@/components/OfferInCompromiseCalculator'

export default function OfferInCompromiseCalculatorPage() {
  const faqs = [
    {
      question: "What is an IRS Offer in Compromise?",
      answer: "OIC allows settling tax debt for less than full amount. IRS accepts when doubt exists about full collectibility or special circumstances apply. Offer amount based on ability to pay, not debt amount. Types: Doubt as to Collectibility (most common), Doubt as to Liability (dispute amount), Effective Tax Administration (hardship). Application fee $205. Non-refundable payment required. Success rate ~40%. Can save significant money if accepted."
    },
    {
      question: "How is OIC offer amount calculated?",
      answer: "Offer = (Monthly discretionary income × months) + (Assets × 80%). Discretionary income = income - allowable expenses. Months multiplier: 48 (under 65), 12 (married), 20 (over 65). Asset quick sale value at 80%. Example: $500/month discretionary × 48 months = $24K. $20K assets × 80% = $16K. Total offer = $40K. IRS formula determines minimum acceptable offer."
    },
    {
      question: "Who qualifies for Offer in Compromise?",
      answer: "Requirements: filed all tax returns, not in bankruptcy, current on estimated payments, employer deposits current (if applicable). Financial situation must show inability to pay full amount within reasonable time. Doubt as to Collectibility: assets + future income less than total debt. Effective Tax Administration: special circumstances (age, disability, hardship). Doubt as to Liability: dispute tax owed. IRS examines financial situation thoroughly."
    },
    {
      question: "What documents needed for OIC?",
      answer: "Form 433-A (OIC): Collection Information Statement. Disclose all income, expenses, assets, debts. Bank statements, pay stubs, asset documentation. Proof of expenses (receipts, bills). Form 656: Offer in Compromise application. $205 application fee. 20% of offer amount (lump sum) or first periodic payment. Tax returns for all open years. IRS verifies all information thoroughly."
    },
    {
      question: "What happens if OIC is rejected?",
      answer: "Appeal within 30 days of rejection letter. Request Appeals Conference. Provide additional documentation explaining circumstances. Appeals may overturn rejection. If rejected ultimately: return to installment agreement or full payment. Application fee lost ($205). Non-refundable payment lost. Consider alternative: installment agreement, Currently Not Collectible status. Can file new OIC if circumstances change significantly."
    },
    {
      question: "How long does OIC process take?",
      answer: "6-12 months typical. IRS review: 3-6 months. Appeals (if rejected): additional 3-6 months. Lump sum: pay within 5 months of acceptance. Periodic payment: 6-24 months. Deferred: up to remaining collection statute (5 years). Total time from application to completion: 1-2 years. Stay compliant during process - default triggers termination."
    },
    {
      question: "Can I make payments on OIC?",
      answer: "Yes. Periodic Payment Offer: pay in installments over 6-24 months. Deferred Payment: pay over remaining collection statute period (up to 5 years). Submit periodic payments with application. Continue payments during IRS review. Lump Sum: pay within 5 months of acceptance. Different payment options for different situations. Choose payment plan based on ability."
    },
    {
      question: "What happens after OIC accepted?",
      answer: "Pay agreed amount within specified timeframe. Lump sum: 5 months. Periodic: 6-24 months. Remainder of debt forgiven. Must stay compliant: file returns, pay taxes on time for 5 years. Default = reinstatement of full debt. No refunds of prior payments. Clean slate after compliance period. Future taxes due normally. OIC success but strict ongoing requirements."
    },
    {
      question: "What is OIC default?",
      answer: "Default triggers: miss payment, file late return, fail to pay future taxes, new debt. Default consequences: OIC terminated, full debt reinstated, all prior payments lost, collection resumes. 5-year compliance period after acceptance. Must file all returns on time, pay all taxes on time. No new tax debt. Default very costly - all progress lost. Stay vigilant about compliance."
    },
    {
      question: "OIC vs Installment Agreement?",
      answer: "OIC: settle for less, debt forgiven, strict 5-year compliance, 40% success rate, long process, application fee. Installment: pay full amount over time, penalty reduced, easier approval, higher success rate, debt fully paid. OIC better when debt far exceeds ability to pay. Installment better when can pay over time. Consider OIC if offer significantly less than debt. Consider installment if can afford payments."
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
      <OfferInCompromiseCalculator />
    </>
  )
}