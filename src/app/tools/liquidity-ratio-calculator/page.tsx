'use client';

import LiquidityRatioCalculator from '@/components/LiquidityRatioCalculator';

export default function LiquidityRatioCalculatorPage() {
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
                name: 'What are the main liquidity ratios?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Three key ratios: Cash Ratio (cash vs short-term debt), Quick Ratio (cash + near-liquid assets vs debt), and Current Ratio (all liquid assets + monthly income vs debt). Higher ratios indicate better ability to meet immediate obligations.'
                }
              },
              {
                '@type': 'Question',
                name: 'How do liquidity ratios apply to personal finance?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Corporate ratios adapted for personal use focus on expense coverage rather than debt coverage. Cash ratio translates to 2+ months expenses in pure cash. Quick ratio means 3+ months in liquid assets. Current ratio suggests 6+ months total coverage.'
                }
              },
              {
                '@type': 'Question',
                name: 'What counts as liquid assets?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Tier 1 (immediate): cash, checking, savings, money market. Tier 2 (quick): stocks, bonds, CDs that can be sold within 30 days. Tier 3 (current): includes monthly income stream. Retirement accounts often have penalties/restrictions, reducing true liquidity.'
                }
              },
              {
                '@type': 'Question',
                name: 'Why is cash ratio important for emergencies?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cash ratio measures immediate access without selling investments or waiting for transfers. During true emergencies (natural disasters, banking disruptions), only cash is reliably accessible. Target 2+ months in cash before investing excess.'
                }
              },
              {
                '@type': 'Question',
                name: 'What liquidity ratio targets should I aim for?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Minimum: Quick ratio of 1.0 (liquid assets cover monthly expenses). Recommended: Quick ratio of 3.0 (3 months coverage). Strong: Quick ratio of 6.0 (6 months coverage). Adjust targets based on job stability, health risks, and debt obligations.'
                }
              }
            ]
          })
        }}
      />
      <LiquidityRatioCalculator />
    </>
  );
}