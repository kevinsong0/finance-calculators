import IRSPaymentPlanAffordabilityCalculator from '@/components/IRSPaymentPlanAffordabilityCalculator'

export default function IRSPaymentPlanAffordabilityCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <IRSPaymentPlanAffordabilityCalculator />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What are the IRS payment plan options?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'IRS offers short-term plans (180 days, no fee) and long-term installment agreements. Guaranteed agreements (debt ≤$10k, 3 years) and streamlined agreements (debt ≤$50k, 6 years) have simplified requirements.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do interest and penalties continue during an IRS payment plan?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, interest (approximately 8% annually) and the failure-to-pay penalty (0.25% per month) continue during the payment plan. This increases the total amount paid.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the IRS setup fee for a payment plan?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The setup fee is $31 when applying online, $107 by phone or mail. Low-income taxpayers may qualify for fee waiver or reduced fee.',
                },
              },
              {
                '@type': 'Question',
                name: 'What happens if I miss a payment on my IRS installment agreement?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Missing payments can result in default of the agreement, leading to IRS collection actions including levies and liens. Contact IRS immediately if you cannot make a payment.',
                },
              },
            ],
          }),
        }}
      />
    </main>
  )
}