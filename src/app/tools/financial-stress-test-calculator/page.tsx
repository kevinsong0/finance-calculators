'use client';

import FinancialStressTestCalculator from '@/components/FinancialStressTestCalculator';

export default function FinancialStressTestCalculatorPage() {
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
                name: 'What is a financial stress test?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A financial stress test simulates adverse scenarios (job loss, medical emergency, market crash) to evaluate your financial resilience. It reveals vulnerabilities in your emergency fund, insurance coverage, and overall financial stability before actual crises occur.'
                }
              },
              {
                '@type': 'Question',
                name: 'How much emergency fund do I need for stress scenarios?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Financial experts recommend 3-6 months of expenses minimum. Stress testing may reveal you need more: unstable jobs require 12+ months, high medical risk needs additional buffer, and combined scenarios (job loss + medical) may require 8-12 months coverage.'
                }
              },
              {
                '@type': 'Question',
                name: 'What scenarios should I stress test?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Test individual scenarios: job loss (most common), medical emergency (highest expense spike), market crash (investment impact), and combined crises (worst case). Each reveals different vulnerabilities in your financial plan.'
                }
              },
              {
                '@type': 'Question',
                name: 'How does insurance affect stress test results?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Insurance dramatically improves stress test resilience. Disability insurance replaces income during illness, health insurance limits medical expense spikes, and unemployment insurance extends runway. Stress testing reveals coverage gaps worth addressing.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is a good financial resilience score?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Score of 80+ indicates strong resilience across scenarios. 60-79 is adequate but has vulnerabilities. Below 60 requires immediate action to build reserves, obtain insurance, or reduce debt. The score combines runway, insurance, and scenario performance.'
                }
              }
            ]
          })
        }}
      />
      <FinancialStressTestCalculator />
    </>
  );
}