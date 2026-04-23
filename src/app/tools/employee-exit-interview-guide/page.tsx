import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeExitInterviewGuide from '@/components/EmployeeExitInterviewGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the purpose of exit interviews?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exit interview purposes: Feedback collection: Gather departing employee insights, candid feedback opportunity, honest perspective, improvement suggestions, organization view, unfiltered input. Retention insights: Understand departure reasons, why employees leave, improvement areas, retention factors, addressable issues, prevention strategies. Culture assessment: Employee view of culture, environment evaluation, team dynamics, management effectiveness, communication quality, values alignment. Trend analysis: Pattern identification over time, common departure reasons, department trends, management areas needing improvement, systemic issues, strategic insights. Knowledge transfer: Capture institutional knowledge, process insights, relationship information, customer understanding, project history, organizational learning. Purposes = multiple benefits. Candid feedback. Retention insights. Culture view. Pattern analysis. Knowledge capture. Strategic improvement. Employee perspective."
      }
    },
    {
      "@type": "Question",
      "name": "What questions should I ask in exit interviews?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exit interview questions: Departure reason: Primary reason for leaving, decision factors, timing consideration, other opportunities, what prompted departure, specific trigger. Job satisfaction: Overall job satisfaction, role fulfillment, responsibilities match, expectations met, what worked well, what didn&apos;t work. Management: Manager relationship feedback, support received, communication quality, development support, feedback quality, management effectiveness. Team dynamics: Team relationship quality, collaboration effectiveness, team culture, support level, communication, teamwork. Culture: Company culture view, values alignment, environment assessment, inclusion feeling, respect level, atmosphere. Compensation: Pay satisfaction, benefits assessment, fairness view, market comparison, total package evaluation. Growth: Career development opportunities, advancement possibility, skill building, development support, future path. Questions = comprehensive coverage. Departure primary. Satisfaction overall. Management feedback. Team dynamics. Culture view. Compensation assessment. Growth evaluation. Open-ended preferred."
      }
    },
    {
      "@type": "Question",
      "name": "How do I conduct effective exit interviews?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Interview best practices: Timing: Schedule before departure, adequate time allocated, not too close to last day, enough time to prepare, employee availability, departure timing. Interviewer: Appropriate interviewer selected, often HR representative, sometimes manager, neutral party preferred, trust building, appropriate relationship. Setting: Private comfortable location, confidential atmosphere, no interruptions, relaxed environment, open dialogue encouraged, safe space. Approach: Open-ended questions primary, active listening practiced, no defensiveness shown, follow-up questions asked, employee-led conversation, genuine interest. Confidentiality: Confidentiality clearly promised, information usage explained, anonymity if desired, trust maintained, appropriate sharing, aggregate reporting. Documentation: Responses documented accurately, specific examples captured, themes noted, actionable items identified, thorough recording, organized format. Practices = effective approach. Timely scheduling. Appropriate interviewer. Comfortable setting. Open-ended questions. Active listening. Confidentiality. Accurate documentation."
      }
    },
    {
      "@type": "Question",
      "name": "How do I analyze exit interview data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Data analysis: Aggregation: Compile all responses, organize by theme, categorize feedback, department grouping, role grouping, timeline tracking, systematic collection. Patterns: Identify common themes, recurring issues, frequent concerns, repeated suggestions, consistent feedback, notable patterns. Trends: Track trends over time, changing issues, emerging concerns, improvement progress, persistent problems, historical comparison. Comparison: Compare departments, role differences, management areas, tenure groups, demographic trends, tenure patterns. Reporting: Report to leadership, key findings highlighted, actionable insights, improvement recommendations, trend visualization, strategic implications. Action: Implement improvements, address identified issues, track change impact, measure improvement, follow-up assessment, continuous enhancement. Analysis = systematic approach. Response aggregation. Pattern identification. Trend tracking. Comparison analysis. Leadership reporting. Action implementation. Outcome measurement."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use exit interview findings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Findings utilization: Retention improvement: Address departure reasons, implement retention strategies, fix identified issues, prevent similar departures, improve conditions, enhance experience. Culture enhancement: Culture issues addressed, environment improvements, values alignment, inclusion efforts, communication enhancement, respect building. Management development: Manager feedback used, development areas identified, training provided, coaching offered, support improvement, skill building. Policy changes: Policy issues addressed, process improvements, procedure updates, workflow enhancement, communication changes, system improvements. Compensation review: Pay concerns addressed, benefits evaluation, market comparison, package review, fairness assessment, competitive position. Process improvement: Hiring process evaluation, onboarding assessment, development review, performance process, communication improvement. Utilization = active improvement. Retention focus. Culture enhancement. Manager development. Policy changes. Compensation review. Process improvement. Outcome tracking."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Exit Interview Guide - Purpose, Questions & Analysis',
  description: 'Exit interview purposes, questions, best practices, and data analysis.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmployeeExitInterviewGuide />
    </Suspense>
  );
}