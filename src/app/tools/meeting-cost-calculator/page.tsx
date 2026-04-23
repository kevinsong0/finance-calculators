import type { Metadata } from 'next';
import { Suspense } from 'react';
import MeetingCostCalculator from '@/components/MeetingCostCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate meeting cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Meeting cost formula: (Annual salary / 2080 hours) × Duration hours × Number of participants. 2080 = 52 weeks × 40 hours work year. Example: 5 people averaging $100k, 1 hour meeting. Hourly rate = $48. Cost = $48 × 1 × 5 = $240. Use meeting cost calculator for accurate estimates including overhead."
      }
    },
    {
      "@type": "Question",
      "name": "What is the average cost of a meeting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Average meeting cost varies by participants. 1 hour with 5 employees at $75k average: ~$180. Executive meeting with 3 VP-level ($200k) for 1 hour: ~$290. Weekly recurring meeting: multiply by 52 for annual cost. Large companies: single meeting can cost $1000+ with many senior participants."
      }
    },
    {
      "@type": "Question",
      "name": "Why calculate meeting costs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Calculate meeting costs to: justify meeting necessity, identify expensive recurring meetings, make decisions about meeting vs async communication, show ROI of meeting reduction, build awareness of time value. Hidden costs: prep time, context switching, scheduling overhead. Companies waste millions on unnecessary meetings annually."
      }
    },
    {
      "@type": "Question",
      "name": "How can I reduce meeting costs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reduce meeting costs: shorter duration (30 min default), fewer participants (only essential), async alternatives (email, Slack), clear agenda (end early if done), cancel unnecessary recurring meetings, replace with documentation, stand-ups for quick updates, decision-free updates via email. Audit meetings quarterly."
      }
    },
    {
      "@type": "Question",
      "name": "What are hidden meeting costs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hidden meeting costs: prep time (research, materials), context switching (15-30 min to refocus after), scheduling overhead (finding time, conflicts), follow-up actions (assignments, tracking), travel time (for in-person), software licenses (video conferencing). Real cost often 2-3x direct hourly calculation. Consider full cost when evaluating meetings."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Meeting Cost Calculator - Calculate Real Cost of Meetings',
  description: 'Calculate meeting costs based on participant salaries. See total cost, per-minute cost, annual recurring cost. Make meetings more efficient.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MeetingCostCalculator />
    </Suspense>
  );
}