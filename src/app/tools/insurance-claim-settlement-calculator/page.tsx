'use client';

import InsuranceClaimSettlementCalculator from '@/components/InsuranceClaimSettlementCalculator';

export default function InsuranceClaimSettlementCalculatorPage() {
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
                name: 'What is ACV vs replacement cost settlement?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'ACV (Actual Cash Value) settlement pays the depreciated value of damaged property. Replacement cost settlement pays the full cost to replace with new items. Replacement cost coverage typically costs more but provides higher payouts. The difference can be significant for older items.'
                }
              },
              {
                '@type': 'Question',
                name: 'How does filing a claim affect insurance premiums?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Filing claims typically increases premiums by 10-25% for 3-5 years. Multiple claims may result in policy cancellation. Insurers view claim frequency as risk indicator. For small damages near deductible threshold, paying out-of-pocket may cost less than premium increases over time.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is gap insurance and when does it apply?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Gap insurance covers the difference between ACV and loan/lease balance for totaled vehicles. When a car is totaled, ACV may be less than outstanding loan. Gap coverage pays this difference, preventing financial loss. Essential for new cars with loans or leases.'
                }
              },
              {
                '@type': 'Question',
                name: 'Should I file a claim for minor damage?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Consider filing only if damage significantly exceeds deductible. Claims near deductible cost may trigger premium increases exceeding immediate payout benefit. Factor in claim history - multiple claims risk cancellation. For small repairs, paying out-of-pocket often costs less long-term.'
                }
              },
              {
                '@type': 'Question',
                name: 'How long does claim settlement typically take?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Simple claims: 7-14 days. Moderate claims ($1-5k): 14-30 days. Major claims ($5k+): 30-60 days. Complex claims with disputes: 60-90+ days. Timeline depends on claim type, damage documentation, adjuster availability, and policy complexity.'
                }
              }
            ]
          })
        }}
      />
      <InsuranceClaimSettlementCalculator />
    </>
  );
}