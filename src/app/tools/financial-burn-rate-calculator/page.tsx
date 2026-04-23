'use client';

import FinancialBurnRateCalculator from '@/components/FinancialBurnRateCalculator';

export default function FinancialBurnRateCalculatorPage() {
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
                name: 'What is financial burn rate?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Burn rate is the monthly rate at which you deplete savings when expenses exceed income. Formula: Monthly Expenses - Monthly Income = Burn Rate. If expenses are $4,000 and income is $2,000, burn rate is $2,000/month, meaning savings decline by that amount each month.'
                }
              },
              {
                '@type': 'Question',
                name: 'How do I calculate my financial runway?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Runway = Total Savings / Monthly Burn Rate. Example: $50,000 savings with $2,500/month burn = 20 months runway. This simple formula assumes constant burn rate. Real runway is shorter due to inflation increasing expenses and investment returns potentially offsetting some burn.'
                }
              },
              {
                '@type': 'Question',
                name: 'Why does burn rate accelerate over time?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Inflation increases expenses each year (typically 2-3%), while savings returns may be lower. Real burn rate grows: $3,000/month burn at 3% inflation becomes $3,090/month next year. This acceleration reduces actual runway compared to simple calculations.'
                }
              },
              {
                '@type': 'Question',
                name: 'What burn rate scenarios should I analyze?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Test multiple scenarios: reduced income (job loss/part-time), increased expenses (medical/emergency), pure burn (no income), and combined crises. Each shows different vulnerabilities. Emergency scenarios typically show shortest runway and reveal true reserve needs.'
                }
              },
              {
                '@type': 'Question',
                name: 'How much runway do I need?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Minimum: 3 months for stable employment. Recommended: 6 months for most situations. Extended: 12+ months for unstable jobs, freelancers, or early retirees. Burn rate analysis helps determine your specific runway target based on realistic scenarios.'
                }
              }
            ]
          })
        }}
      />
      <FinancialBurnRateCalculator />
    </>
  );
}