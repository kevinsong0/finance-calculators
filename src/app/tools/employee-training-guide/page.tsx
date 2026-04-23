import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeTrainingGuide from '@/components/EmployeeTrainingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of employee training exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Training types: Onboarding: New employee introduction, company orientation, culture introduction, policy overview, role training, systems introduction, first weeks intensive. Technical: Role-specific skills, job competency, technical knowledge, equipment training, process training, specialized skills, ongoing development. Leadership: Manager development, leadership skills, supervision techniques, strategic thinking, team management, decision-making, executive skills. Compliance: Required training, safety training, harassment prevention, ethics training, regulatory compliance, policy training, annual requirements. Soft skills: Communication skills, interpersonal effectiveness, teamwork, customer service, time management, professionalism, emotional intelligence. Safety: Workplace safety, hazard awareness, equipment safety, emergency procedures, protective equipment, accident prevention, incident response. Types = comprehensive coverage. Onboarding foundational. Technical ongoing. Leadership for managers. Compliance required. Soft skills valued. Safety mandatory. Role-appropriate."
      }
    },
    {
      "@type": "Question",
      "name": "What training methods are effective?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Training delivery methods: Classroom: Instructor-led sessions, group learning, discussion opportunities, interactive environment, structured content, social learning, scheduled sessions. Online: E-learning modules, self-paced options, accessibility convenience, tracking capability, consistent content, cost-effective, broad reach, flexible timing. On-the-job: Practical application, supervisor guidance, real work context, immediate relevance, skill practice, continuous learning, job-specific focus. Mentorship: Experienced guidance, personalized support, knowledge transfer, relationship building, career development, ongoing support, wisdom sharing. Workshops: Hands-on practice, skill building, focused topics, intensive sessions, practical exercises, immediate application, group interaction. Methods = match to needs. Classroom for concepts. Online for flexibility. On-job for skills. Mentorship for development. Workshops for practice. Combine methods. Audience appropriate."
      }
    },
    {
      "@type": "Question",
      "name": "How do I plan employee training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Training planning: Needs assessment: Identify skill gaps, performance issues, new requirements, compliance needs, development desires, future needs, role changes. Objectives: Set learning goals, specific outcomes, measurable targets, behavior changes, skill acquisition, knowledge gain, competency development. Methods: Choose appropriate delivery, match to content, audience consideration, resource availability, time constraints, effectiveness history, accessibility needs. Resources: Allocate budget, assign trainers, prepare materials, schedule facilities, technology setup, participant materials, assessment tools. Schedule: Set training calendar, timing appropriate, duration planned, frequency determined, sequence logical, conflict avoided, adequate spacing. Communication: Inform participants, explain purpose, set expectations, provide details, prepare attendees, manager notification, logistics shared. Planning = systematic approach. Needs identified. Objectives set. Methods chosen. Resources allocated. Schedule planned. Communication complete. Execute effectively."
      }
    },
    {
      "@type": "Question",
      "name": "How do I evaluate training effectiveness?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Training evaluation: Reaction: Participant satisfaction, feedback collected, content evaluation, delivery assessment, materials rated, environment feedback, overall experience. Learning: Knowledge gained measured, skills acquired, competency demonstrated, understanding verified, assessment scores, certification achieved, proficiency shown. Behavior: Behavior change observed, skills applied, new practices adopted, work habits improved, implementation tracked, application evidence, workplace transfer. Results: Business impact measured, performance improved, productivity gains, quality improvement, error reduction, efficiency increase, goal achievement. ROI: Cost-benefit analysis, training costs, benefits quantified, savings calculated, productivity value, retention impact, performance value, financial return. Evaluation = comprehensive assessment. Reaction feedback. Learning measured. Behavior observed. Results tracked. ROI calculated. Continuous improvement. Data-driven decisions."
      }
    },
    {
      "@type": "Question",
      "name": "How do I create a training program?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Program creation steps: Analysis: Needs analysis conducted, audience identified, current state assessed, goals defined, gaps found, requirements listed, scope determined. Design: Learning objectives set, content outline created, methods selected, sequence planned, materials designed, assessment planned, timeline set. Development: Content created, materials developed, activities designed, assessment tools built, facilitator guides prepared, resources gathered, technology configured. Implementation: Program delivered, participants trained, facilitators engaged, materials distributed, technology activated, support provided, issues addressed. Evaluation: Effectiveness measured, feedback collected, outcomes assessed, improvements identified, adjustments planned, documentation completed, lessons learned. Creation = systematic process. Analysis foundation. Design structure. Development build. Implementation delivery. Evaluation assessment. Iterative improvement. Continuous enhancement."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Training Guide - Types, Methods & Evaluation',
  description: 'Training types, delivery methods, planning process, and effectiveness evaluation.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmployeeTrainingGuide />
    </Suspense>
  );
}