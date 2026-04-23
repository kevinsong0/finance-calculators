import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeSuccessionPlanningGuide from '@/components/EmployeeSuccessionPlanningGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is succession planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Succession planning definition: Purpose: Leadership continuity ensured, knowledge preserved, organizational stability, risk mitigation, development planning, smooth transitions. Focus: Critical positions identified, key roles prioritized, essential positions covered, leadership roles, specialized positions, revenue-driving roles. Approach: Potential successors identified, development planned, readiness assessed, backup prepared, transition planned, capability built. Timeline: Long-term planning, ongoing process, regular review, continuous update, future-focused, proactive approach. Outcome: Smooth leadership transitions, reduced disruption, preserved knowledge, stable operations, prepared organization, reduced risk. Succession = continuity planning. Critical positions focus. Successors identified. Development planned. Regular review. Risk mitigation. Knowledge preservation. Stability maintained."
      }
    },
    {
      "@type": "Question",
      "name": "What positions need succession planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Critical positions: Executive leadership: CEO, CFO, COO, senior executives, strategic leadership, organization direction, high impact roles, critical decisions. Senior management: Directors, department heads, division leaders, key managers, operational leadership, significant influence. Key technical roles: Technical leaders, specialized expertise, unique skills, critical knowledge, scarce capabilities, essential technical. Critical operations: Operations leadership, process owners, workflow control, business continuity, essential functions, operational stability. Revenue-driving: Sales leadership, key client relationships, revenue generation, customer ownership, financial impact, business critical. Specialized: Specialized expertise, unique knowledge, rare skills, niche capabilities, specialized roles, difficult to replace. Positions = critical identification. Executive leadership. Senior management. Technical expertise. Operations control. Revenue impact. Specialized roles. Impact assessment."
      }
    },
    {
      "@type": "Question",
      "name": "How do I identify succession candidates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Candidate identification: Talent assessment: Review current talent, evaluate employees, skill assessment, leadership potential, performance review, capability evaluation. Criteria: Performance history strong, potential capability, required skills, relevant experience, leadership ability, position fit, growth orientation. Sources: Internal candidates first, high performers, leadership pipeline, development candidates, promotion ready, emerging leaders. Pool: Build succession pool, multiple candidates, depth development, backup options, readiness levels, pipeline maintenance. Evaluation: Objective assessment, criteria applied, readiness rating, development needs, timeline estimate, capability match. Identification = systematic process. Talent assessment. Criteria defined. Internal focus. Pool building. Multiple candidates. Objective evaluation. Readiness assessment."
      }
    },
    {
      "@type": "Question",
      "name": "How do I develop succession candidates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Candidate development: Assessment: Identify development needs, skill gaps, experience gaps, readiness gaps, capability gaps, improvement areas. Plan: Create development plans, specific goals, learning objectives, timeline set, resources identified, support planned. Methods: Training programs, leadership development, mentorship assigned, coaching provided, stretch assignments, project leadership, cross-functional exposure. Experience: Relevant experience gained, leadership opportunities, decision-making exposure, strategic involvement, team management, broader scope. Support: Mentorship support, coaching available, guidance provided, feedback regular, progress monitored, encouragement offered. Timeline: Development timeline set, readiness progress, milestone tracking, capability building, progress assessment, adjustment flexibility. Development = deliberate investment. Needs identified. Plans created. Methods varied. Experience built. Support provided. Progress tracked. Readiness improved."
      }
    },
    {
      "@type": "Question",
      "name": "How do I assess succession readiness?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Readiness assessment: Criteria: Performance level required, skills match, experience depth, leadership capability, strategic thinking, cultural fit, position understanding. Rating: Ready now assessment, ready in 1-2 years, ready in 2-3 years, development needed, potential identified, readiness levels defined. Evaluation: Objective measurement, criteria applied, evidence reviewed, capability tested, performance documented, feedback gathered. Testing: Stretch assignments tested, leadership evaluated, decision-making assessed, capability demonstrated, performance observed, readiness tested. Timeline: Time to readiness estimated, development remaining, experience needed, timeline forecast, preparation remaining, readiness progression. Documentation: Readiness documented, assessment recorded, development tracked, progress noted, capability cataloged, status maintained. Assessment = thorough evaluation. Criteria defined. Levels rated. Objective measurement. Capability tested. Timeline estimated. Documentation maintained. Regular review."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Succession Planning Guide - Positions, Process & Criteria',
  description: 'Succession planning purposes, critical positions, process, and readiness assessment.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmployeeSuccessionPlanningGuide />
    </Suspense>
  );
}