import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeePromotionGuide from '@/components/EmployeePromotionGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What criteria guide promotion decisions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Promotion criteria: Performance: Results achieved, goals met, quality output, productivity level, consistent excellence, track record, measurable outcomes, value delivered. Skills: Competency level required, role-specific skills, technical expertise, leadership skills for management, communication ability, critical thinking, problem-solving. Experience: Time in current role, relevant experience, breadth of exposure, depth of knowledge, progression history, milestone achievement, demonstrated growth. Leadership: For leadership roles, leadership demonstrated, team management ability, influence skills, strategic thinking, decision-making, people development, vision. Potential: Growth capability, future performance, learning agility, adaptability, stretch ability, aspiration level, readiness assessment, development trajectory. Fit: Role alignment, culture match, team fit, values alignment, style compatibility, situation appropriateness, transition capability. Criteria = comprehensive evaluation. Performance primary. Skills essential. Experience considered. Leadership for roles. Potential future. Fit important. Objective assessment."
      }
    },
    {
      "@type": "Question",
      "name": "How do I ensure fair promotions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Promotion fairness: Criteria: Consistent criteria for all, documented standards, objective measures, clearly communicated, understood by employees, regularly reviewed, applied equally. Assessment: Objective evaluation methods, multiple perspectives, evidence-based decisions, documented rationale, bias avoided, diverse evaluators, fair comparison. Opportunity: Opportunities communicated, criteria accessible, development support, skill building, visibility provided, mentorship available, equitable access. Documentation: Performance documented throughout, examples recorded, evidence maintained, decision rationale written, comparison basis clear, audit trail created. Communication: Process explained, criteria shared, opportunities announced, decisions communicated, feedback provided, appeal process explained, transparency maintained. Diversity: Diverse candidates considered, bias prevention, equal opportunity, inclusion focus, representation goals, barrier removal, fair access. Fairness = systematic approach. Consistent criteria. Objective assessment. Communicated opportunity. Documented decisions. Transparent process. Diversity focus. Appeal process."
      }
    },
    {
      "@type": "Question",
      "name": "What promotion types exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Promotion types: Vertical promotion: Upward movement in hierarchy, higher level position, increased responsibility, greater authority, higher compensation, formal advancement, career progression. Horizontal move: Different role same level, lateral transition, new skills development, broader experience, different department, varied responsibilities, lateral growth. Temporary assignment: Short-term higher role, acting position, interim leadership, stretch opportunity, temporary responsibility, skills development, trial opportunity. Stretch project: Special project leadership, high visibility work, expanded scope, new challenge, demonstration opportunity, skill building, performance showcase. Career path progression: Planned advancement, defined path, milestone progression, structured development, career roadmap, sequential steps, planned trajectory. Types = various advancement. Vertical traditional. Horizontal breadth. Temporary trial. Stretch challenge. Career path planned. Match to goals. Employee development. Organization need."
      }
    },
    {
      "@type": "Question",
      "name": "How do I prepare employees for promotion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Promotion preparation: Development: Skill building opportunities, training provided, mentorship assigned, coaching support, leadership development, competency building, gap addressing. Experience: Stretch assignments given, project leadership, visibility opportunities, cross-functional work, new responsibilities, breadth exposure, depth development. Feedback: Regular performance feedback, development guidance, promotion readiness assessment, improvement suggestions, progress tracking, preparation support, expectation setting. Communication: Career path discussion, promotion criteria explained, readiness feedback, opportunity visibility, development plan, timeline discussion, support offered. Support: Resources provided, training available, mentorship arranged, coaching sessions, development programs, preparation time, adjustment support. Preparation = proactive development. Skill building. Experience opportunities. Regular feedback. Clear communication. Support provided. Readiness assessment. Smooth transition."
      }
    },
    {
      "@type": "Question",
      "name": "How do I support promotion transitions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Transition support: Preparation: Pre-promotion preparation, role understanding, responsibility clarity, expectation setting, skill readiness, knowledge transfer, relationship building. Orientation: New role orientation, team introduction, process overview, systems training, stakeholder meetings, context provided, support introduction. Training: Role-specific training, leadership development, skill building, competency development, new knowledge, different skills, ongoing learning. Mentorship: Mentor assigned, guidance provided, experienced support, advice available, relationship established, questions answered, transition help. Feedback: Regular feedback given, adjustment monitoring, progress tracking, support provided, issues addressed, encouragement offered, guidance continued. Adjustment: Allow adjustment time, patience exercised, support maintained, resources available, questions answered, flexibility shown, success focus. Support = comprehensive assistance. Preparation thorough. Orientation clear. Training provided. Mentorship assigned. Regular feedback. Adjustment patience. Success monitored."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Promotion Guide - Criteria, Types & Process',
  description: 'Promotion criteria, types, fairness principles, and transition support.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmployeePromotionGuide />
    </Suspense>
  );
}