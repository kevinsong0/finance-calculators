'use client'

import IRSInstallmentAgreementCalculator from '@/components/IRSInstallmentAgreementCalculator'

export default function IRSInstallmentAgreementCalculatorPage() {
  const faqs = [
    {
      question: "What is an IRS installment agreement?",
      answer: "IRS payment plan to pay tax debt over time. Monthly payments until debt cleared. Interest and penalty continue but penalty reduced from 0.5% to 0.25% monthly. Avoids enforced collection (levies, wage garnishment). Must stay compliant: file returns and pay future taxes on time. Streamlined IA: debt under $50K, 72 months, no financial disclosure. Apply online via IRS.gov or Form 9465."
    },
    {
      question: "How do I apply for IRS payment plan?",
      answer: "Online: IRS.gov Online Payment Agreement Application (fastest). Phone: call IRS (1-800-829-1040). Mail: Form 9465 with return or separately. Debt under $50K: streamlined agreement, automatic approval. Over $50K: requires Form 433-F financial disclosure. Setup fees: $31 online, $225 phone/mail, $89 reinstatement. Low income: fee waiver available. Apply before enforced collection begins."
    },
    {
      question: "What is the Fresh Start program?",
      answer: "Fresh Start Initiative simplifies installment agreements. Debt under $50K: streamlined approval, no financial forms required. 72 month maximum term. Direct debit reduces setup fee to $31 and penalty to 0.25%. Tax liens withdrawn for debts under $25K. Fresh Start helps taxpayers avoid enforced collection. Apply online - quick approval for qualifying debts."
    },
    {
      question: "What are IRS installment agreement fees?",
      answer: "Online application: $31 (reduced fee for direct debit). Phone/mail application: $225. Direct debit: $31. Check/money order payments: $225. Low income: fee waiver available (Form 13844). Reinstatement after default: $89. Setup fee added to first payment. Fee waived if income below threshold. Direct debit saves $194 vs phone application. Apply online for lowest fee."
    },
    {
      question: "Can IRS installment agreement be modified?",
      answer: "Yes. Request modification if circumstances change. Call IRS to adjust payment amount or schedule. Can increase payment to pay faster. Can decrease payment with financial hardship documentation. May convert to partial payment if cannot pay full amount. Default triggers reinstatement ($89 fee). Stay compliant to avoid default. Modifications require IRS approval."
    },
    {
      question: "What happens if I default on payment plan?",
      answer: "Default triggers reinstatement or termination. One missed payment: IRS sends notice, 30 days to reinstate. Repeated defaults: IRS may terminate agreement. Termination = enforced collection (levies, garnishment). Reinstatement fee: $89. Must explain default circumstances. Stay compliant: file returns, pay future taxes. Automatic payments prevent default. Contact IRS before missing payment."
    },
    {
      question: "Does interest continue on payment plan?",
      answer: "Yes. Interest (~8% annually) continues on unpaid balance throughout payment plan. Penalty reduced from 0.5% to 0.25% monthly with installment agreement. Interest and penalty accrue until balance paid. Pay more than minimum to reduce interest. Longer plan = more interest paid. Pay ASAP to minimize total cost. Interest cannot be waived - only penalty."
    },
    {
      question: "What is a partial payment installment agreement?",
      answer: "Partial Payment IA: pay what you can, remaining debt forgiven after term. For taxpayers who cannot pay full amount. IRS reviews financial situation (Form 433-F). Set monthly payment based on ability to pay. After term expires, remaining balance written off. IRS may request partial lump sum upfront. Subject to periodic review. Alternative to Offer in Compromise."
    },
    {
      question: "Can I get payment plan for over $50K?",
      answer: "Yes but requires Form 433-F Collection Information Statement. Disclose income, expenses, assets, debts. IRS determines payment amount based on financial analysis. Not streamlined - manual review required. May take weeks for approval. IRS may require partial payment upfront. Consider Offer in Compromise for large debts. Over $100K: likely requires significant disclosure and review."
    },
    {
      question: "What are installment agreement requirements?",
      answer: "Requirements: filed all required tax returns, pay future taxes on time, stay current on payments, not currently in bankruptcy, debt under $50K for streamlined. Must pay minimum monthly to clear debt in 72 months. Direct debit required for Fresh Start streamlined. Automatic payments prevent default. Contact IRS immediately if cannot make payment. Non-compliance = default and collection."
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
      <IRSInstallmentAgreementCalculator />
    </>
  )
}