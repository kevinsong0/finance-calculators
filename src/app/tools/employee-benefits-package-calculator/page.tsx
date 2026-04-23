'use client';

import EmployeeBenefitsPackageCalculator from '@/components/EmployeeBenefitsPackageCalculator';

export default function EmployeeBenefitsPackageCalculatorPage() {
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
                name: 'What benefits are typically included in total compensation?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Common benefits: health insurance (employer-paid portion), 401(k) match (typically 3-6% of salary), paid time off (10-20 days), life insurance, dental/vision, stock options/equity, performance bonuses, professional development, commuting benefits. Benefits typically add 20-40% to base salary value.'
                }
              },
              {
                '@type': 'Question',
                name: 'How do I calculate total compensation value?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Total compensation = Base salary + Employer-paid health insurance + 401(k) match + PTO value (salary/260 * days) + Stock/equity value + Bonus target + Other benefits. Tax-advantaged benefits (health, retirement) have higher effective value due to pre-tax treatment.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is a good 401(k) match percentage?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Average employer match: 3-6% of salary with various formulas (50% of contributions up to 6%, 100% up to 3%, etc). Excellent matches exceed 6%. Always contribute enough to get full match - it\'s essentially free money. Match caps may limit total employer contribution.'
                }
              },
              {
                '@type': 'Question',
                name: 'How much is health insurance worth in compensation?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Employer-sponsored health insurance typically costs $6,000-$15,000/year for employer-paid portion. Family coverage can exceed $20,000. This benefit is tax-advantaged - not counted as taxable income. When comparing job offers, include health insurance value in total compensation.'
                }
              },
              {
                '@type': 'Question',
                name: 'Should I prioritize salary or benefits in job offers?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Evaluate total compensation, not just salary. Strong benefits (health, retirement match, equity) may outweigh salary difference of $5-10k. Consider: your health needs (insurance value), retirement goals (match value), equity potential, and work-life balance (PTO). Calculate total comp for accurate comparison.'
                }
              }
            ]
          })
        }}
      />
      <EmployeeBenefitsPackageCalculator />
    </>
  );
}