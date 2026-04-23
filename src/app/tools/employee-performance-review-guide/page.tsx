import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeePerformanceReviewGuide from '@/components/EmployeePerformanceReviewGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are performance review methods?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance review methods: Annual review: Yearly comprehensive evaluation, performance summary, goal review, development planning, formal documentation, career discussion. Quarterly review: More frequent feedback, regular touchpoints, progress tracking, adjustment opportunity, ongoing dialogue, timely input. 360-degree feedback: Multiple perspectives gathered, peers input, supervisor review, self-assessment, subordinate feedback, comprehensive view, balanced assessment. Continuous feedback: Ongoing real-time input, regular conversations, immediate feedback, coaching approach, development focus, no surprises. Management by objectives: Goal-based evaluation, results measurement, target achievement, objective tracking, measurable outcomes, performance against goals. Methods = choose appropriately. Annual traditional. Quarterly more frequent. 360 comprehensive. Continuous modern. MBO results-focused. Match to culture. Train managers."
      }
    },
    {
      "@type": "Question",
      "name": "How do I conduct effective performance reviews?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Review process: Preparation: Document performance throughout year, gather examples, review goals, prepare feedback, schedule adequate time, private setting, review materials. Discussion: Two-way dialogue format, employee input encouraged, specific examples provided, balanced feedback given, achievements acknowledged, areas discussed, support offered. Goals: Review goal progress, assess achievement, discuss obstacles, set new goals, align with objectives, make measurable, timeline set. Development: Discuss career aspirations, development needs, skill gaps, learning opportunities, support needed, resources available, plan created. Documentation: Complete review form, summarize discussion, document goals, development plan, commitments made, follow-up scheduled, signatures obtained. Follow-up: Support provided, progress monitored, ongoing feedback, check-ins scheduled, adjustments made, development tracked. Process = structured approach. Year-round documentation. Thorough preparation. Two-way dialogue. Goal focus. Development planning. Complete documentation. Ongoing follow-up."
      }
    },
    {
      "@type": "Question",
      "name": "What criteria should I evaluate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Evaluation criteria: Job performance: Goal achievement measured, quality of work, productivity level, accuracy, efficiency, results delivered, targets met. Job knowledge: Technical competence, role understanding, industry knowledge, process mastery, skill level, expertise depth, learning application. Work behaviors: Attendance reliability, punctuality, professionalism, attitude, initiative shown, accountability, responsibility, ethics. Interpersonal: Communication quality, teamwork effectiveness, collaboration ability, relationship building, conflict handling, customer service, stakeholder interaction. Leadership: For leadership roles, team management, decision-making, strategic thinking, influence ability, delegation skills, vision setting, mentoring. Development: Professional growth, skill improvement, learning initiative, training participation, development progress, capability expansion. Criteria = comprehensive evaluation. Job performance primary. Knowledge essential. Behaviors important. Interpersonal valued. Leadership for managers. Development tracked. Objective standards."
      }
    },
    {
      "@type": "Question",
      "name": "How do I give effective feedback?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Feedback best practices: Specific: Provide specific examples, concrete situations, particular behaviors, exact outcomes, clear instances, no vague comments. Balanced: Acknowledge achievements, recognize strengths, address areas for improvement, constructive criticism, supportive tone, fair assessment. Future-focused: Emphasize development, improvement opportunities, growth potential, forward-looking, actionable suggestions, future success. Two-way: Encourage employee response, listen to perspective, understand context, collaborative discussion, shared understanding, mutual input. Actionable: Provide clear suggestions, specific actions, improvement strategies, development steps, support offered, resources suggested. Timely: Give feedback promptly, recent examples, current situation, relevant timing, ongoing communication, no surprises. Feedback = skill development. Specific examples required. Balanced approach. Future-focused. Two-way dialogue. Actionable suggestions. Timely delivery. Supportive tone."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle difficult review conversations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Difficult conversation handling: Preparation: Prepare thoroughly, gather facts, anticipate reactions, plan approach, remain objective, stay calm, set tone. Delivery: Direct but respectful, specific about issues, factual not emotional, focus on behavior, separate from person, avoid blame, constructive approach. Response: Listen to response, acknowledge feelings, understand perspective, remain professional, avoid arguments, maintain focus, seek understanding. Solution: Focus on improvement, offer support, provide resources, set clear expectations, create action plan, schedule follow-up, monitor progress. Documentation: Document conversation, issues discussed, response noted, plan created, commitments made, follow-up planned, objective record. Support: Offer assistance, coaching available, resources provided, regular check-ins, progress tracking, ongoing support, adjustment flexibility. Difficult = handled professionally. Thorough preparation. Direct delivery. Listen to response. Focus on solution. Complete documentation. Support provided. Follow-up planned."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Performance Review Guide - Methods, Criteria & Process',
  description: 'Performance review methods, evaluation criteria, process steps, and feedback best practices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmployeePerformanceReviewGuide />
    </Suspense>
  );
}