import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeCareerDevelopmentGuide from '@/components/EmployeeCareerDevelopmentGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What career development paths exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Career development paths: Vertical advancement: Traditional upward movement, leadership progression, management roles, executive track, responsibility growth, title advancement, hierarchy climb. Specialization: Deep skill development, expert mastery, technical excellence, subject expertise, thought leadership, knowledge depth, domain authority. Cross-functional: Broad experience building, varied departments, different functions, versatility development, organizational understanding, perspective breadth, diverse exposure. Lateral growth: Horizontal movement, new skills, different roles, capability expansion, experience variety, role exploration, skill building. Project leadership: High visibility projects, leadership opportunities, demonstration moments, result delivery, impact creation, recognition potential. Management track: Team leadership development, people management, supervisory skills, leadership preparation, management capability, team responsibility. Paths = multiple directions. Vertical traditional. Specialization depth. Cross-functional breadth. Lateral variety. Project visibility. Management leadership. Individualized paths. Goal aligned."
      }
    },
    {
      "@type": "Question",
      "name": "What development methods work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Development methods: Training programs: Formal learning, structured content, skill building, knowledge acquisition, certification opportunities, professional development, organized curriculum. Stretch assignments: Challenging projects, growth opportunities, capability testing, experience expansion, visibility increase, skill application, development acceleration. Mentorship: Experienced guidance, wisdom sharing, career advice, network building, perspective gaining, relationship development, personalized support. Coaching: One-on-one support, focused development, personalized guidance, skill refinement, behavior change, performance enhancement, individual attention. Cross-training: Different function exposure, versatility building, broad skills, organizational understanding, flexibility development, capability expansion. Education support: Formal education assistance, degree support, certification funding, learning investment, academic development, professional qualification. Methods = comprehensive options. Training formal. Stretch experiential. Mentorship wisdom. Coaching personalized. Cross-training variety. Education investment. Method mix effective."
      }
    },
    {
      "@type": "Question",
      "name": "How do I plan career development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Development planning: Assessment: Current skill evaluation, capability assessment, strength identification, weakness recognition, experience review, knowledge assessment, baseline establishment. Goals: Career goals defined, direction clarified, aspirations expressed, targets set, milestones identified, timeline established, outcome visualization. Gap analysis: Gap between current and target, development needs, skill gaps, experience gaps, capability gaps, improvement areas, focus identification. Plan: Development plan created, specific actions, methods chosen, timeline set, resources identified, support planned, milestone markers. Implementation: Development activities executed, plan followed, progress tracked, learning engaged, experience gained, skill building, goal pursuit. Review: Regular review conducted, progress assessment, plan adjustment, milestone check, redirection if needed, continued planning, goal refinement. Planning = structured approach. Assessment thorough. Goals clear. Gaps identified. Plan created. Implementation active. Regular review. Continuous adjustment."
      }
    },
    {
      "@type": "Question",
      "name": "How do I support employee development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Development support: Conversations: Regular career conversations, goal discussions, development talks, aspiration sharing, path exploration, interest identification, direction dialogue. Opportunities: Development opportunities provided, stretch assignments, project leadership, learning chances, experience building, growth occasions. Training: Training access ensured, learning programs, skill building, professional development, knowledge expansion, capability enhancement. Mentorship: Mentorship connections offered, guidance access, experienced support, relationship building, wisdom sharing, network expansion. Feedback: Regular feedback given, performance input, development suggestions, improvement guidance, progress commentary, encouragement provided. Reviews: Progress reviews scheduled, development check-ins, milestone assessment, plan evaluation, redirection discussion, continued support. Support = comprehensive assistance. Career conversations. Opportunity provision. Training access. Mentorship connections. Regular feedback. Progress reviews. Ongoing commitment."
      }
    },
    {
      "@type": "Question",
      "name": "How do I measure development progress?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Progress measurement: Skill acquisition: Skills learned, capabilities gained, knowledge acquired, competencies built, proficiency improved, mastery advanced, ability expanded. Experience growth: Experience accumulated, exposure gained, breadth increased, depth enhanced, challenges handled, situations navigated, maturity developed. Goal achievement: Development goals met, objectives accomplished, targets reached, milestones completed, outcomes achieved, progress made, success delivered. Performance improvement: Performance enhanced, results improved, output quality, efficiency gains, contribution increase, value creation, impact demonstrated. Career advancement: Career progress made, movement achieved, advancement realized, position change, responsibility growth, title progression, role evolution. Satisfaction: Employee satisfaction with development, engagement level, motivation maintained, commitment continued, development appreciation, investment valued. Measurement = comprehensive evaluation. Skill acquisition. Experience growth. Goal achievement. Performance improvement. Career advancement. Satisfaction tracked. Regular assessment. Documentation maintained."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Career Development Guide - Paths, Methods & Support',
  description: 'Career development paths, development methods, planning, and support.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmployeeCareerDevelopmentGuide />
    </Suspense>
  );
}