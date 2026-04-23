import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeRetentionGuide from '@/components/EmployeeRetentionGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why do employees leave?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Employee departure reasons: Top factors: Poor management (manager relationship), lack of growth opportunities, compensation concerns, culture mismatch, work-life balance issues, lack of recognition. Departure triggers: Better offer elsewhere, burnout, conflict with manager, lack of advancement, family/personal reasons, company changes. Patterns: Often not about money alone, managers key to retention, growth needs vary by age/stage, culture matters more than perks. Prevention: Regular 1:1s, development opportunities, fair compensation, positive culture, work flexibility, recognition. Key insight: People leave managers more than companies. Manager training = retention investment. Address root causes not symptoms."
      }
    },
    {
      "@type": "Question",
      "name": "What is a stay interview?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stay interview: Proactive conversation to understand what keeps employee engaged. Purpose: Identify retention drivers for individual, learn concerns before they become issues, show investment in their satisfaction, build relationship. Questions: What do you enjoy about work? What would make you stay? What frustrates you? What&apos;s missing from your role? What are your career goals? How can we support you better? Timing: Regularly (quarterly/annually), during positive times not just when concerns arise. Action: Document responses, address concerns raised, follow up on commitments, track themes across team. Stay interview = preventive retention. Exit interview = reactive learning. Proactive beats reactive. Ask before they decide to leave."
      }
    },
    {
      "@type": "Question",
      "name": "How do I improve employee engagement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Employee engagement improvement: Connection to work: Clear purpose in role, understanding impact, meaningful tasks, skill utilization. Connection to team: Positive relationships, collaboration opportunities, team belonging, shared goals. Connection to company: Values alignment, company mission, transparency in decisions, inclusive culture. Connection to manager: Regular feedback, support in development, autonomy balanced with guidance, open communication. Practical steps: Regular check-ins, recognition programs, growth opportunities, team events, clear communication, involvement in decisions, feedback loops, work flexibility. Measure: Engagement surveys (annual/biannual), pulse surveys (frequent brief), turnover data, productivity metrics. Engagement = investment. Disengaged = lost productivity + departure risk. Address systematically."
      }
    },
    {
      "@type": "Question",
      "name": "What is quiet quitting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quiet quitting: Employees doing minimum required, not going above. Signs: Meeting expectations only, no initiative, reduced enthusiasm, no extra effort, present but disengaged. Causes: Burnout, lack of recognition, poor management, no growth path, work-life imbalance, culture mismatch, feeling undervalued. Impact: Reduced innovation, lower team morale, missed opportunities, gradual performance decline. Response: 1:1 conversation to understand cause, address concerns, reconnect to purpose, provide growth opportunities, adjust workload if needed, recognize contributions, improve manager relationship, offer flexibility. Prevention: Address before it starts - regular feedback, growth opportunities, fair compensation, work balance, recognition. Quiet quitting = disengagement signal. Address early. Not laziness - often unmet needs. Understand root cause."
      }
    },
    {
      "@type": "Question",
      "name": "How do I conduct an exit interview?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exit interview best practices: Purpose: Learn why employee leaves, identify patterns, improve retention, honest feedback opportunity. Questions: Why leaving? What&apos;s at new job that&apos;s missing here? How was manager relationship? What would you change? Any unresolved concerns? What worked well? Training opportunities? Culture feedback? How was workload? Conduct: HR or trusted manager, private setting, assure confidentiality, allow honest feedback, don&apos;t defend or argue, document responses, ask open-ended questions. Analysis: Track themes across exits, identify patterns, prioritize issues, action plan for improvements, share findings with leadership. Follow-up: Address identified issues, track if improvements made, reduce future departures. Exit interview = learning opportunity. Departed employee = honest perspective. Use data to improve. Don&apos;t waste the feedback."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Retention Guide - Drivers, Strategies & Interventions',
  description: 'Employee retention drivers, engagement, warning signs, and stay interviews.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmployeeRetentionGuide />
    </Suspense>
  );
}