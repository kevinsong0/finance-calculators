'use client';

import MultipleIncomeSourcesCalculator from '@/components/MultipleIncomeSourcesCalculator';

export default function MultipleIncomeSourcesCalculatorPage() {
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
                name: 'Why should I have multiple income sources?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Multiple income sources provide: job loss protection, financial flexibility, accelerated wealth building, and risk diversification. Relying on single employer income creates vulnerability. 3-4 income sources with passive income component provides stability. Start building secondary income before you need it.'
                }
              },
              {
                '@type': 'Question',
                name: 'What are the tax implications of multiple incomes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'W-2 income: employer handles withholding. Self-employment (freelance, business): subject to 15.3% self-employment tax plus income tax - requires quarterly estimated payments. Passive income (investment, rental): different tax treatment, may have deductions. Total income affects tax bracket. Track each source separately for proper reporting.'
                }
              },
              {
                '@type': 'Question',
                name: 'How do I start building multiple income streams?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Start with: freelance skills from your job, side business from expertise, investment income from savings, or rental from property. Begin small (5-10 hours/week) to test viability. Build gradually without risking primary income. Focus on one additional stream at a time until established. Passive income requires upfront investment.'
                }
              },
              {
                '@type': 'Question',
                name: 'What percentage of income should be passive?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Target 20-30% passive income for stability. Financial independence requires 50%+ passive income. Early career: focus on active income growth. Mid-career: begin building passive streams (investments, rentals). Late career: passive income should exceed active for retirement readiness. Passive income compounds over time.'
                }
              },
              {
                '@type': 'Question',
                name: 'How many hours should I dedicate to secondary income?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sustainable secondary income: 5-15 hours/week above primary job. More than 20 hours risks burnout and primary job performance. Evaluate hourly rate of secondary work vs primary opportunity cost. If secondary earns significantly less per hour, consider whether time investment worthwhile. Quality over quantity of income streams.'
                }
              }
            ]
          })
        }}
      />
      <MultipleIncomeSourcesCalculator />
    </>
  );
}