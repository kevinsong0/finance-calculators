'use client';

import OvertimePayCalculator from '@/components/OvertimePayCalculator';

export default function OvertimePayCalculatorPage() {
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
                name: 'What is the federal overtime law?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Federal Fair Labor Standards Act (FLSA) requires 1.5x overtime pay for non-exempt employees after 40 hours worked per week. Applies to hourly workers and salaried non-exempt below threshold ($58,656 for 2024). Exempt employees (executive, administrative, professional roles above threshold) are not entitled to overtime.'
                }
              },
              {
                '@type': 'Question',
                name: 'What states have different overtime rules?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'California: Daily overtime after 8 hours, double time after 12 hours, weekly OT after 40. Colorado: Daily OT after 12 hours. Some states have higher salary thresholds for exemption. Check your state labor department for specific rules that may override federal standards.'
                }
              },
              {
                '@type': 'Question',
                name: 'How do I calculate overtime pay?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Overtime pay = Hourly rate × Overtime multiplier × Overtime hours. Standard FLSA multiplier is 1.5x. Double time (2x) applies in some states for excessive hours. Weekly overtime: (Regular hours × rate) + (OT hours × rate × 1.5). Calculate effective hourly rate including all overtime.'
                }
              },
              {
                '@type': 'Question',
                name: 'What makes an employee exempt from overtime?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Exemption requires: (1) Salary above threshold ($58,656 for 2024), (2) Salary basis (fixed compensation not subject to reduction), (3) Primary duties in executive, administrative, or professional capacity. Job title alone does not determine exemption - actual duties matter. Misclassification is common employer violation.'
                }
              },
              {
                '@type': 'Question',
                name: 'Is overtime bad for work-life balance?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Regular overtime above 10-15 hours/week impacts health, family time, and productivity. Studies show productivity declines after 50 hours/week. Evaluate: overtime income value vs personal time cost, burnout risk, and sustainable work patterns. Occasional overtime may be manageable; chronic overtime signals workload issues.'
                }
              }
            ]
          })
        }}
      />
      <OvertimePayCalculator />
    </>
  );
}