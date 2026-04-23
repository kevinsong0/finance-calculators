'use client';

import TaxEventImpactCalculator from '@/components/TaxEventImpactCalculator';

export default function TaxEventImpactCalculatorPage() {
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
                name: 'How does getting married affect my taxes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Marriage changes your filing status options. You can file jointly (often lower tax) or separately. Combined income may push you into higher bracket. Update W-4 within 10 days. Compare both filing methods - joint usually saves money but separate may benefit in specific situations like high medical expenses or student loan income-driven repayment.'
                }
              },
              {
                '@type': 'Question',
                name: 'What tax changes happen after a job promotion?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Higher income may push you into a higher tax bracket. Update W-4 immediately to adjust withholding and avoid owing at tax time. Review 401(k) contribution level - higher income allows larger tax-deferred savings. Consider Roth contributions if you expect future higher income.'
                }
              },
              {
                '@type': 'Question',
                name: 'How does having a new child affect taxes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'New child provides Child Tax Credit of $2,000 (up to $1,700 refundable). Update W-4 to claim credit and reduce withholding. May qualify for Child and Dependent Care Credit for daycare expenses. Earned Income Credit may apply for lower income families. Head of Household status if unmarried provides lower tax rates.'
                }
              },
              {
                '@type': 'Question',
                name: 'What are the tax implications of buying a home?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Mortgage interest deduction (up to $750,000 loan limit). Property taxes deductible but capped at $10,000 SALT limit total. First-time homebuyer programs may offer credits. Points paid at purchase are deductible. Compare standard vs itemized deduction - itemize only if total exceeds $15,000 (single) or $30,000 (married).'
                }
              },
              {
                '@type': 'Question',
                name: 'When should I update my W-4 after a major life event?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Submit updated W-4 to employer within 10 days of major events: marriage, divorce, new child, home purchase, significant income change. Prompt updates prevent owing unexpected taxes or having too much withheld. Use IRS W-4 estimator tool for accurate calculations.'
                }
              }
            ]
          })
        }}
      />
      <TaxEventImpactCalculator />
    </>
  );
}