'use client';

import TaxSettlementOptionsCalculator from '@/components/TaxSettlementOptionsCalculator';

export default function TaxSettlementOptionsCalculatorPage() {
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
                name: 'What IRS settlement options are available?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Main options include full payment, installment agreement, Offer in Compromise (OIC), Currently Not Collectible (CNC) status, and penalty abatement. Each has specific eligibility requirements based on your financial situation and ability to pay.'
                }
              },
              {
                '@type': 'Question',
                name: 'How does an Offer in Compromise work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'An OIC allows settling tax debt for less than the full amount when you cannot pay in full. IRS accepts based on doubt as to collectibility (RCP less than debt), doubt as to liability (legitimate dispute), or effective tax administration (exceptional circumstances).'
                }
              },
              {
                '@type': 'Question',
                name: 'What is Reasonable Collection Potential (RCP)?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'RCP is the amount IRS expects to collect from you over time. It equals your total realizable assets plus your disposable monthly income multiplied by 60 months. OIC offers must generally equal or exceed your RCP.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is Currently Not Collectible status?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'CNC status suspends collection activity when you cannot pay without creating economic hardship. The debt remains but IRS stops active collection. Status is reviewed periodically and debt may be collected if your financial situation improves.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I get penalties removed from my tax debt?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Penalties may be removed through penalty abatement if you have reasonable cause (circumstances beyond your control), first-time penalty abatement (clean compliance history for 3 years), or statutory exceptions. Interest generally cannot be removed.'
                }
              }
            ]
          })
        }}
      />
      <TaxSettlementOptionsCalculator />
    </>
  );
}