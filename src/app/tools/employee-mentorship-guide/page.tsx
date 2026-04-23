import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeMentorshipGuide from '@/components/EmployeeMentorshipGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of mentorship exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mentorship types: Traditional mentorship: Experienced mentor, mentee guidance, long-term relationship, career development, wisdom sharing, structured relationship, personal investment. Peer mentorship: Peer-to-peer learning, knowledge sharing, mutual benefit, short-term focus, skill exchange, collaborative learning, accessible approach. Reverse mentorship: Junior mentors senior, fresh perspectives, technology skills, new ideas, generational insight, innovation input, unique direction. Group mentorship: Multiple mentors, group setting, program-based, diverse input, various perspectives, collaborative learning, structured sessions. Situational mentorship: Specific challenge focus, as-needed basis, targeted guidance, problem-solving, temporary relationship, immediate help, focused assistance. Formal programs: Organization-led programs, structured matching, defined duration, clear goals, program support, measurable outcomes, organized approach. Types = multiple options. Traditional common. Peer accessible. Reverse innovative. Group diverse. Situational targeted. Formal structured. Match to needs. Program support."
      }
    },
    {
      "@type": "Question",
      "name": "What are benefits of mentorship?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mentorship benefits: Mentee benefits: Skill development accelerated, career guidance received, network expanded, confidence built, knowledge gained, faster growth, obstacle navigation, career clarity. Mentor benefits: Leadership development, coaching skills, fresh perspective, satisfaction gained, legacy building, relationship expansion, organizational understanding, influence positive. Organization benefits: Knowledge transfer ensured, succession development, retention improved, culture strengthened, leadership pipeline, capability building, institutional knowledge preserved, development culture. Mutual benefits: Relationship value, shared learning, connection depth, mutual respect, collaborative growth, network expansion, shared success, ongoing bond. Benefits = comprehensive value. Mentee growth. Mentor development. Organization advantage. Mutual satisfaction. Knowledge preservation. Culture building. Succession support. Investment return."
      }
    },
    {
      "@type": "Question",
      "name": "How do I match mentors and mentees?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Matching process: Goals: Understand mentee goals, development needs, career direction, skill gaps, desired outcomes, specific focus, improvement areas. Skills: Identify mentor expertise, relevant experience, skill match, capability alignment, knowledge areas, teaching ability, availability level. Style: Consider communication style, personality fit, approach compatibility, work style, values alignment, learning style, relationship comfort. Connection: Facilitate initial meeting, assess chemistry, gauge connection, explore fit, discuss expectations, confirm interest, relationship potential. Formal: Use formal matching criteria, objective assessment, structured process, program guidelines, documented approach, consistent method. Matching = deliberate process. Goals understood. Skills matched. Style compatible. Connection tested. Formal criteria. Chemistry assessment. Comfort confirmed. Commitment clear."
      }
    },
    {
      "@type": "Question",
      "name": "How do I structure mentorship relationships?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Relationship structure: Expectations: Clear expectations set, role definitions, commitment level, meeting frequency, confidentiality, boundaries established, goals defined, success measures. Goals: Development goals established, specific objectives, measurable targets, timeline set, progress indicators, outcome definition, goal tracking. Meetings: Regular meeting schedule, frequency determined, duration appropriate, agenda guidance, structure defined, productive sessions, consistent timing. Content: Discussion topics suggested, goal progress, challenges addressed, opportunities explored, career guidance, skill development, feedback exchanged. Documentation: Progress documented, goals tracked, achievements noted, adjustments planned, milestones marked, outcomes recorded, relationship assessment. Support: Program support available, resources provided, guidance offered, issue resolution, intervention available, ongoing assistance. Structure = clear framework. Expectations defined. Goals established. Meetings regular. Content guided. Progress tracked. Support available. Flexibility appropriate."
      }
    },
    {
      "@type": "Question",
      "name": "How do I evaluate mentorship effectiveness?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Effectiveness evaluation: Goal achievement: Development goals met, objectives accomplished, skill improvement, knowledge gained, career progress, capability enhancement, measurable outcomes. Mentee satisfaction: Mentee feedback gathered, satisfaction measured, experience quality, value perception, relationship rating, program appreciation. Mentor satisfaction: Mentor perspective collected, experience evaluated, satisfaction level, commitment assessment, feedback provided, continuation interest. Relationship quality: Relationship strength assessed, connection depth, communication quality, trust level, openness measure, engagement evaluation. Business impact: Performance improvement, career advancement, retention effect, capability building, succession impact, organizational benefit, business value. Program metrics: Program participation, completion rates, relationship duration, engagement level, expansion interest, repeat participation, referral activity. Evaluation = comprehensive assessment. Goal achievement. Satisfaction feedback. Relationship quality. Business impact. Program metrics. Continuous improvement. Outcome measurement."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Mentorship Guide - Types, Benefits & Process',
  description: 'Mentorship types, benefits, matching process, and effectiveness evaluation.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmployeeMentorshipGuide />
    </Suspense>
  );
}