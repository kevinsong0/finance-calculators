'use client';

import TaxAuditReadinessCalculator from '@/components/TaxAuditReadinessCalculator';

export default function TaxAuditReadinessCalculatorPage() {
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
                name: 'What are the three types of IRS audits?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Correspondence audits are conducted via mail, typically focusing on one item. Office audits require in-person meeting at IRS office. Field audits occur at your location and examine multiple items or entire returns. Each requires different preparation levels.'
                }
              },
              {
                '@type': 'Question',
                name: 'How long does audit preparation typically take?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Basic correspondence audit preparation takes 7-14 days. Office audits require 14-21 days. Field audits may need 21-35 days depending on complexity. Without organized records, preparation time increases significantly for all types.'
                }
              },
              {
                '@type': 'Question',
                name: 'What are my rights during an IRS audit?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You have rights to professional representation, to know why information is requested, to appeal unfavorable decisions, to request meetings at reasonable times/places, and to receive written explanations of audit findings and appeal procedures.'
                }
              },
              {
                '@type': 'Question',
                name: 'Should I hire a professional for an audit?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For correspondence audits on simple issues, self-representation may suffice. For office or field audits, complex issues, or if you lack confidence, hiring a CPA, tax attorney, or enrolled agent is strongly recommended. Professionals understand IRS procedures and can often achieve better outcomes.'
                }
              },
              {
                '@type': 'Question',
                name: 'What documents should I bring to an audit?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Bring only documents specifically requested by the IRS notice. Common items include the return being audited, supporting documents for questioned items, Form W-2s and 1099s, receipts, bank statements, and any relevant contracts or agreements. Do not volunteer extra information.'
                }
              }
            ]
          })
        }}
      />
      <TaxAuditReadinessCalculator />
    </>
  );
}