'use client'

import PenaltyAbatementCalculator from '@/components/PenaltyAbatementCalculator'

export default function PenaltyAbatementCalculatorPage() {
  const faqs = [
    {
      question: "What is IRS penalty abatement?",
      answer: "IRS may waive penalties for reasonable cause or first-time compliance. First-Time Abatement (FTA): automatic waiver for compliant taxpayers (no penalties in prior 3 years). Reasonable Cause: waiver for circumstances beyond control (illness, disaster, death). Interest cannot be waived - only penalty. Request by calling IRS or writing detailed letter. FTA easiest path for eligible taxpayers."
    },
    {
      question: "How do I request first-time penalty abatement?",
      answer: "FTA easiest penalty waiver. Requirements: filed all returns, paid any tax due, no penalties in prior 3 years. Call IRS: request FTA verbally (fastest). Write letter: request FTA with explanation. Applies to failure-to-file OR failure-to-pay (one penalty type per taxpayer). Automatic approval for eligible taxpayers. Clean history = automatic eligibility. One-time use per penalty type per account."
    },
    {
      question: "What qualifies as reasonable cause?",
      answer: "Reasonable cause: circumstances preventing timely compliance despite reasonable effort. Examples: serious illness (hospitalization), death of immediate family member, natural disaster (fire, flood), IRS gave incorrect advice, records unavailable (institution closed), civil disturbance, unavoidable absence. Must document circumstances. Write detailed letter with evidence. IRS evaluates each case individually."
    },
    {
      question: "Can I use both FTA and reasonable cause?",
      answer: "Yes but strategically. FTA removes entire penalty (easiest). Use FTA first if eligible. If FTA used before, request reasonable cause for new penalty. Reasonable cause may reduce penalty by 50% or more. FTA one-time use per penalty type. Reasonable cause can be requested multiple times with valid circumstances. Use FTA strategically on largest penalty."
    },
    {
      question: "What penalties can be abated?",
      answer: "FTA applies to: failure-to-file, failure-to-pay. Reasonable cause applies to: failure-to-file, failure-to-pay, failure-to-deposit, estimated tax underpayment, accuracy-related penalty, information reporting penalties. Fraud penalties cannot be abated. Interest cannot be abated. Most civil penalties eligible for abatement with proper documentation and valid cause."
    },
    {
      question: "How long does penalty abatement take?",
      answer: "FTA: immediate approval by phone, 2-4 weeks for written request. Reasonable cause: 30-90 days for IRS review. Complex cases: 3-6 months. Appeals: additional 30-90 days. Call IRS for fastest FTA response. Written requests processed by abatement unit. Follow up if no response in 60 days. Abatement reduces balance, remaining amount still owed."
    },
    {
      question: "What if penalty abatement is denied?",
      answer: "Request Appeals Conference within 30 days of denial. File Form 12153 or write letter. Appeals reviews case independently. Provide additional documentation for reasonable cause. Appeals may grant abatement IRS denied. Tax Court: very limited for penalties (must pay first then sue). Professional help (tax attorney, CPA) for complex abatement cases. Persistence often successful for reasonable cause."
    },
    {
      question: "Does FTA affect my IRS record?",
      answer: "FTA use recorded in IRS system. One-time use per penalty type per taxpayer. FTA used: not available for future same-type penalty. However, after 3 more clean years, may qualify again. Use FTA strategically - save for largest penalty. FTA record doesn't prevent reasonable cause requests. FTA use not negative mark - designed to reward compliant taxpayers."
    },
    {
      question: "What documentation for reasonable cause?",
      answer: "Documentation depends on cause: Medical: hospital records, doctor statements, proof of incapacitation. Death: death certificate, proof of relationship. Disaster: FEMA documentation, insurance claims, photos. IRS error: written IRS advice, correspondence. Records unavailable: proof institution closed, explanation. Documents show circumstances prevented compliance. Thorough documentation increases success rate."
    },
    {
      question: "How do I write abatement request letter?",
      answer: "Include: taxpayer name, SSN, tax year, penalty type, penalty amount, reasonable cause explanation, supporting documentation, request for abatement. Format: business letter, clear and concise. Explain timeline: what happened, when, how it prevented compliance, when resolved. Attach supporting documents. Send to IRS address on penalty notice. Keep copy for records. Certified mail recommended."
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
      <PenaltyAbatementCalculator />
    </>
  )
}