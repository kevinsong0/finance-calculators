'use client';

import TaxNegotiationStrategyCalculator from '@/components/TaxNegotiationStrategyCalculator';

export default function TaxNegotiationStrategyCalculatorPage() {
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
                name: 'When should I appeal instead of negotiate with the IRS?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Appeal is best when you have strong documentation, a valid legal position, and disputes exceeding $5,000. Appeals preserve your legal rights and provide independent review. Negotiation works better for moderate disputes or when you need faster resolution.'
                }
              },
              {
                '@type': 'Question',
                name: 'What factors affect negotiation success with IRS?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Success depends on your position strength (documentation quality), IRS position strength, your ability to pay, financial hardship circumstances, and time constraints. Strong documentation and weak IRS positions significantly improve outcomes.'
                }
              },
              {
                '@type': 'Question',
                name: 'What settlement range can I expect from IRS negotiation?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Settlement ranges vary by strategy. Appeals may reduce debt 10-50%. Direct negotiation typically results in 20-60% reduction. Offer in Compromise can settle for your reasonable collection potential. Installment agreements pay full debt over time with potential penalty abatement.'
                }
              },
              {
                '@type': 'Question',
                name: 'Should I hire a professional for IRS negotiation?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For disputes exceeding $10,000, complex issues, or when facing collection actions, professional representation (CPA, tax attorney, enrolled agent) significantly improves outcomes. Professionals understand IRS procedures, negotiation tactics, and can often achieve better settlements.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is the fastest way to resolve an IRS dispute?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The fastest resolution is paying the full amount with a penalty abatement request (if you can afford it). This resolves in 2-3 months. For those who cannot pay, a quick settlement or installment agreement with penalty relief takes 3-6 months.'
                }
              }
            ]
          })
        }}
      />
      <TaxNegotiationStrategyCalculator />
    </>
  );
}