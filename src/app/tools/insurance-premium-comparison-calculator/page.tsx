'use client';

import InsurancePremiumComparisonCalculator from '@/components/InsurancePremiumComparisonCalculator';

export default function InsurancePremiumComparisonCalculatorPage() {
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
                name: 'What factors should I compare between insurance policies?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Compare: annual premium cost, deductible amount, coverage limits, exclusions, claim process, insurer reputation, customer service ratings, and financial stability. Lower premium may mean higher deductible or less coverage. Total cost includes expected claim out-of-pocket expenses.'
                }
              },
              {
                '@type': 'Question',
                name: 'How do I calculate total cost of insurance?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Total cost = Annual premium + Expected claim costs (deductible payments + uncovered expenses). Estimate expected claims based on your history and risk. A policy with lower premium but higher deductible may cost more if claims occur frequently.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is a good value score for insurance?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Value score measures coverage per dollar minus deductible impact. Higher score means better value. Compare value scores across policies to find best coverage-to-price ratio. Consider your risk profile - high claim frequency favors low deductible regardless of score.'
                }
              },
              {
                '@type': 'Question',
                name: 'Why do premiums vary between insurers?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Premiums vary due to: different risk assessment models, claim history data, operational costs, target demographics, and profit margins. Each insurer weighs factors differently. Shop around annually - rates change and loyalty discounts may not offset competitive pricing.'
                }
              },
              {
                '@type': 'Question',
                name: 'Should I switch insurance for lower premium?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Evaluate total cost including coverage changes, deductible differences, and expected claims. Lower premium with higher deductible may cost more over time. Consider insurer reputation and claim handling. Bundling discounts and loyalty benefits may favor staying. Switch if savings exceed $200+ annually.'
                }
              }
            ]
          })
        }}
      />
      <InsurancePremiumComparisonCalculator />
    </>
  );
}