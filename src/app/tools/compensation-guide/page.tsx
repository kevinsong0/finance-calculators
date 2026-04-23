import type { Metadata } from 'next';
import { Suspense } from 'react';
import CompensationGuide from '@/components/CompensationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is compensation strategy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compensation strategy definition: Purpose: Attract and retain talent, motivate performance, ensure fairness, align with budget, competitive position. Components: Base salary - fixed compensation, bonus - performance-based, commission - sales-driven, equity - ownership stake, benefits - non-cash value. Philosophy: What the organization values, how pay decisions made, market positioning, performance link, equity principles. Factors: Market rates, internal equity, role complexity, experience level, performance, company budget, geographic factors. Strategy = deliberate approach. Define philosophy. Balance components. Competitive positioning. Fair and transparent. Review regularly."
      }
    },
    {
      "@type": "Question",
      "name": "How do I set competitive salaries?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Salary setting process: Market analysis: Research industry benchmarks, salary surveys, geographic adjustments, competitor analysis, market positioning (median, leading). Internal equity: Compare similar roles internally, ensure fairness, address disparities, consistent criteria. Individual factors: Experience level, skills and qualifications, performance history, specialization, tenure. Budget consideration: Total compensation budget, headcount costs, growth projections, affordability. Decision: Set salary range for each role, position within market (typically median), adjust for individual factors, document rationale. Review: Annual market updates, performance adjustments, equity corrections, inflation considerations. Setting = market + internal + individual. Use reliable data. Ensure fairness. Document decisions. Review annually. Balance competitiveness with budget."
      }
    },
    {
      "@type": "Question",
      "name": "How do I structure performance-based pay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance-based pay structure: Components: Base salary - stable foundation, bonus - performance achievement, commission - sales results, profit sharing - company success. Target setting: Clear, measurable goals, achievable but challenging, aligned with role, communicated upfront. Measurement: Objective criteria, regular tracking, fair evaluation, transparent process. Payment timing: Quarterly or annual, linked to results cycle, predictable schedule. Amount determination: Percentage of salary, fixed amounts, tiered based on achievement, caps if needed. Fairness: Same criteria for similar roles, objective measurement, consistent application, clear communication. Performance pay = clear link to results. Define targets upfront. Measure objectively. Pay fairly. Balance motivation with stability. Communicate clearly."
      }
    },
    {
      "@type": "Question",
      "name": "How do I ensure internal pay equity?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Internal pay equity: Definition: Fair compensation for similar work, consistent treatment, no unjustified disparities, equal pay for equal work. Analysis: Compare similar roles, similar responsibilities, similar skills required, similar impact. Identify disparities: Unexplained differences, potential discrimination patterns, tenure-based issues, historical inequities. Address issues: Adjust compensation, correct disparities, document rationale, communicate changes. Prevention: Consistent criteria for decisions, documented rationale, regular audits, manager training. Legal considerations: Equal pay laws, discrimination prevention, documentation requirements. Equity = fair treatment. Analyze regularly. Address disparities. Document decisions. Prevent future issues. Compliance essential."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I review compensation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compensation review frequency: Annual review: Standard practice, market updates, performance adjustments, inflation consideration, budget planning. Market analysis: Annual minimum, more often for competitive markets, track trends, adjust positioning. Performance-based: Per performance cycle, quarterly or annual, link to evaluation, consistent timing. Individual adjustments: Promotions, role changes, market corrections, retention needs - as needed. Budget cycle: Align with company planning, fiscal year timing, headcount changes. Best practice: Annual comprehensive review, quarterly market monitoring, performance-linked adjustments, ad-hoc for special situations. Frequency = annual standard. Market monitoring ongoing. Performance link to cycle. Budget alignment. Regular review prevents issues."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Compensation Strategy Guide - Components, Structures & Review',
  description: 'Compensation components, structures, factors, and review process.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CompensationGuide />
    </Suspense>
  );
}