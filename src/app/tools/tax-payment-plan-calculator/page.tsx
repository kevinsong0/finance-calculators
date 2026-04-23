'use client';

import TaxPaymentPlanCalculator from '@/components/TaxPaymentPlanCalculator';

export default function TaxPaymentPlanCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What are the different types of IRS payment plans?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'IRS offers Streamlined Installment Agreements (debt under $10,000, 36-month term), Streamlined Large IA (debt under $50,000, 72-month term), and Regular Installment Agreements (over $50,000, requires Form 433 financial disclosure). Setup fees range from $43 to $225.'
                }
              },
              {
                '@type': 'Question',
                name: 'How much is the IRS installment agreement setup fee?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Setup fees: $43 for streamlined agreements (online application), $31 for direct debit agreements, $225 for regular agreements requiring financial disclosure. Low-income taxpayers may qualify for fee waivers or reduced fees.'
                }
              },
              {
                '@type': 'Question',
                name: 'What interest rate does IRS charge on installment plans?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'IRS charges statutory interest (currently around 8%) on unpaid balances during the installment period. Interest compounds and continues accruing until the debt is fully paid. This is in addition to any penalties.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I get an installment agreement without financial disclosure?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, streamlined installment agreements do not require detailed financial disclosure. For debts under $50,000, you can set up a plan online without submitting Form 433. Debts over $50,000 require full financial statement disclosure.'
                }
              },
              {
                '@type': 'Question',
                name: 'What happens if I default on my IRS payment plan?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Defaulting on an installment agreement results in plan termination, reinstatement of collection actions (levy, garnishment), and potential default fee. Contact IRS immediately if you cannot make a payment to request modification before defaulting.'
                }
              }
            ]
          })
        }}
      />
      <TaxPaymentPlanCalculator />
    </>
  );
}