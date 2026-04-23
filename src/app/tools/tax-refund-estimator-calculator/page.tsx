import TaxRefundEstimatorCalculator from '@/components/TaxRefundEstimatorCalculator'

export default function TaxRefundEstimatorCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <TaxRefundEstimatorCalculator />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Why do I get a tax refund?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A refund means you overpaid taxes during the year. Your employer withheld more from your paycheck than your actual tax liability. While refunds feel good, they mean you gave the government free use of your money. Consider adjusting your W-4 to reduce withholding."
                }
              },
              {
                "@type": "Question",
                "name": "What if I owe taxes instead of getting a refund?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "If withholding is less than your tax liability, you owe money. Small amounts (<$1,000) are usually fine. Larger amounts may trigger underpayment penalties. To avoid penalties, pay at least 90% of current year tax or 100% of last year's tax through withholding/estimated payments."
                }
              },
              {
                "@type": "Question",
                "name": "Should I itemize or use standard deduction?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Use whichever is larger. 2024 standard deduction: $14,600 single, $29,200 married filing jointly. Itemize if deductions (mortgage interest, charitable donations, state taxes up to $10K SALT cap, medical expenses over 7.5% AGI) exceed standard deduction. Most taxpayers now use standard."
                }
              },
              {
                "@type": "Question",
                "name": "How does the Child Tax Credit affect my refund?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Child Tax Credit is $2,000 per qualifying child under 17. Up to $1,700 is refundable - meaning you can get it even if you have no tax liability. The credit reduces your tax directly (better than deduction). Income limits apply: phaseout starts at $200K single, $400K married."
                }
              },
              {
                "@type": "Question",
                "name": "How can I adjust my tax withholding?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Submit a new W-4 form to your employer. Use the IRS Tax Withholding Estimator tool online. For self-employed, make quarterly estimated tax payments (due April 15, June 15, September 15, January 15). Adjust mid-year if your income or deductions change significantly."
                }
              }
            ]
          })
        }}
      />
    </main>
  )
}