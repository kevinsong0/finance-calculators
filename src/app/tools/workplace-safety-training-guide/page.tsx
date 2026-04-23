import type { Metadata } from 'next';
import { Suspense } from 'react';
import WorkplaceSafetyTrainingGuide from '@/components/WorkplaceSafetyTrainingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What safety training is required?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Required safety training: General safety: Workplace hazards overview, safety protocols, emergency procedures, incident reporting, safe work practices, hazard identification, all employees. OSHA compliance: OSHA rights and responsibilities, complaint procedures, recordkeeping, inspection process, whistleblower protection, required by law for specific industries. Hazard communication: Chemical hazards, labeling requirements, safety data sheets, exposure risks, protective measures, handling procedures, chemical workers. Personal protective equipment: PPE selection, proper use, maintenance, limitations, inspection, required for PPE users. Emergency response: Evacuation procedures, first aid basics, fire safety, emergency contacts, assembly points, drills participation. Training = required programs. General safety foundation. OSHA compliance mandated. HazCom for chemicals. PPE for equipment. Emergency for all. Specific job training. Documentation required."
      }
    },
    {
      "@type": "Question",
      "name": "How do I deliver safety training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Training delivery methods: Classroom: Instructor-led sessions, group learning, discussion opportunities, Q&A time, interactive environment, structured content, scheduled sessions. Online: E-learning modules, self-paced learning, accessibility convenience, tracking capability, consistent content, cost effective, broad reach. Hands-on: Practical practice, equipment use, procedure demonstration, supervised practice, skill building, competency verification, real application. Video: Video demonstrations, visual learning, consistent content, repeatable content, accessible anytime, standard examples, scenario examples. On-the-job: Workplace training, mentoring, supervisor guidance, job-specific skills, immediate application, continuous learning, real context. Methods = mix appropriately. Classroom for basics. Online for convenience. Hands-on for skills. Video for consistency. On-job for application. Combination effective. Audience appropriate."
      }
    },
    {
      "@type": "Question",
      "name": "How do I evaluate training effectiveness?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Training evaluation: Knowledge assessment: Tests and quizzes, knowledge verification, understanding check, written assessments, oral questions, pass/fail criteria. Skills demonstration: Practical demonstration, procedure performance, equipment use, skill observation, competency check, hands-on assessment. Behavior observation: Work behavior monitoring, procedure following, safety practice, compliance observation, on-the-job behavior, safe work habits. Incident tracking: Incident rate monitoring, injury tracking, near miss reports, hazard reports, safety violations, trend analysis. Audit results: Safety audit findings, compliance checks, regulatory audits, internal audits, gap identification, improvement areas. Feedback: Employee feedback collection, training satisfaction, content effectiveness, delivery assessment, improvement suggestions, needs identification. Evaluation = comprehensive approach. Knowledge tests. Skills demonstration. Behavior observation. Incident tracking. Audit results. Employee feedback. Continuous improvement."
      }
    },
    {
      "@type": "Question",
      "name": "What compliance applies to safety training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Training compliance: OSHA requirements: Specific training mandated, content requirements defined, frequency requirements, documentation standards, record retention, employee access to records. Industry standards: Industry-specific requirements, specialized hazards, particular equipment, unique environments, professional standards, certification requirements. Documentation: Training records maintained, completion documentation, content covered, trainer credentials, employee signatures, date tracking, duration noted. Frequency: Initial training required, refresher training schedule, annual updates, periodic retraining, change-triggered training, remedial training. Certification: Certifications required, renewal schedules, competency verification, qualifications maintained, expiration tracking, recertification process. Compliance = required adherence. OSHA mandates. Industry standards. Documentation thorough. Frequency maintained. Certification tracked. Audit readiness. Legal protection."
      }
    },
    {
      "@type": "Question",
      "name": "How often should safety training occur?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Training frequency: Initial training: New hire orientation, job assignment training, hazard-specific introduction, equipment introduction, before exposure, before work start. Annual refreshers: Yearly review of basics, policy updates, procedure reinforcement, hazard reminder, emergency procedures, general safety. Periodic retraining: As required by regulations, competency verification, skill refresh, procedure changes, equipment changes, incident-triggered. Change-triggered: New hazards introduced, equipment changes, procedure changes, incident lessons, policy updates, regulatory changes. Remedial: After incidents, after violations, competency gaps, observation issues, refresher needs, improvement focus. Frequency = appropriate timing. Initial before exposure. Annual refreshers. Periodic as required. Change-triggered updates. Remedial after incidents. Continuous reinforcement. Documentation maintained."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Workplace Safety Training Guide - Programs, Methods & Compliance',
  description: 'Safety training programs, delivery methods, evaluation, and compliance requirements.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WorkplaceSafetyTrainingGuide />
    </Suspense>
  );
}