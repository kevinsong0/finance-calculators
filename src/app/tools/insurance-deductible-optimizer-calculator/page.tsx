'use client';

import InsuranceDeductibleOptimizerCalculator from '@/components/InsuranceDeductibleOptimizerCalculator';

export default function InsuranceDeductibleOptimizerCalculatorPage() {
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
                name: 'How do I choose the right deductible?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Choose deductible based on: emergency fund availability, expected claim frequency, premium savings, and risk tolerance. High deductible saves premium but requires cash reserves. Calculate break-even: how many claims needed to justify low deductible premium cost. Match deductible to your financial situation.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is the break-even point for deductible choice?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Break-even = (High deductible - Low deductible) / Annual premium savings. If you expect fewer claims than break-even, high deductible saves money. If more claims expected, low deductible costs less overall. Factor in claim probability over your analysis period.'
                }
              },
              {
                '@type': 'Question',
                name: 'What are the risks of high deductible insurance?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Risks: large unexpected out-of-pocket costs, potential inability to pay deductible if claim occurs, stress during financial emergencies, small claims not worth filing. High deductible requires adequate emergency fund (at least 2x deductible). Consider worst-case scenarios before choosing.'
                }
              },
              {
                '@type': 'Question',
                name: 'Does high deductible health insurance have tax benefits?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. High deductible health plans (HDHPs) with deductible above $1,600 (individual) or $3,200 (family) qualify for Health Savings Account (HSA). HSA contributions are tax-deductible, grow tax-free, and withdrawals for medical expenses are tax-free. This tax benefit can offset higher deductible costs.'
                }
              },
              {
                '@type': 'Question',
                name: 'How much should my emergency fund cover for deductible?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Emergency fund should cover at least 2x your maximum deductible across all insurance policies. For auto + home with $1,000 each, aim for $2,000 minimum. Conservative approach: cover all deductibles plus 3 months expenses. High deductible strategy requires larger reserves.'
                }
              }
            ]
          })
        }}
      />
      <InsuranceDeductibleOptimizerCalculator />
    </>
  );
}