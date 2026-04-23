import type { Metadata } from 'next';
import { Suspense } from 'react';
import WorkplaceSafetyGuide from '@/components/WorkplaceSafetyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are workplace safety responsibilities?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Workplace safety responsibilities: Employer: Provide safe working environment, conduct safety training, provide protective equipment, identify and mitigate hazards, maintain safety procedures, report and investigate incidents, comply with regulations. Employee: Follow safety procedures, use protective equipment correctly, report hazards and incidents, participate in training, maintain awareness, cooperate with safety programs. Safety Officer: Conduct inspections, deliver training, investigate incidents, maintain documentation, coordinate safety programs, ensure compliance. Management: Set safety policy, allocate resources, enforce safety standards, lead safety culture, support safety programs, review performance. Responsibilities = shared accountability. Employer provides foundation. Employee follows procedures. Safety officer coordinates. Management leads. Everyone contributes to safe workplace."
      }
    },
    {
      "@type": "Question",
      "name": "What are types of workplace hazards?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Workplace hazard types: Physical hazards: Falls from heights, slipping/tripping, equipment injuries, noise exposure, electrical hazards, temperature extremes. Prevention: Safety equipment, training, proper procedures. Chemical hazards: Toxic substances, corrosive materials, flammable materials, fumes and gases. Prevention: Proper handling, ventilation, PPE, spill procedures. Biological hazards: Viruses, bacteria, mold, bloodborne pathogens. Prevention: Hygiene practices, vaccination, proper disposal. Ergonomic hazards: Poor workstation setup, repetitive movements, heavy lifting, awkward positions. Prevention: Proper equipment, posture training, breaks. Psychological hazards: Work stress, harassment, workplace violence. Prevention: Support programs, policies, training. Hazards = identify systematically. Prevention methods vary. Risk assessment essential. Training critical. Continuous monitoring."
      }
    },
    {
      "@type": "Question",
      "name": "How do I respond to workplace incidents?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Incident response process: Immediate response: Ensure safety of others, provide medical attention if needed, secure the area, prevent further harm. Reporting: Notify supervisor immediately, complete incident report form, document time, location, witnesses, conditions. Investigation: Identify root cause, gather witness statements, examine physical evidence, review procedures, determine contributing factors. Corrective action: Implement fixes to prevent recurrence, update procedures if needed, additional training if required, equipment changes. Documentation: Complete all required forms, maintain records, report to authorities if required, update safety data. Follow-up: Monitor corrective action effectiveness, check injured employee recovery, review incident lessons, communicate to team. Response = systematic approach. Safety first. Document everything. Find root cause. Prevent recurrence. Learn from incidents."
      }
    },
    {
      "@type": "Question",
      "name": "How do I conduct workplace safety training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Safety training process: Planning: Identify training needs, define objectives, develop content, schedule sessions, prepare materials. Content: Hazard identification, safety procedures, equipment use, emergency response, incident reporting, regulations compliance. Delivery: Use multiple methods (presentation, demonstration, practice), engage participants, check understanding, allow questions, hands-on practice where possible. Documentation: Record attendance, test comprehension, maintain training records, schedule refresher training. Evaluation: Assess knowledge gained, observe behavior changes, measure incident reduction, gather feedback. Frequency: Initial training for new employees, regular refresher training, training after incidents, training for new hazards/equipment. Training = essential safety foundation. Plan content carefully. Use engaging methods. Document completion. Evaluate effectiveness. Regular refreshers maintain awareness."
      }
    },
    {
      "@type": "Question",
      "name": "How do I build a safety culture?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Safety culture building: Leadership commitment: Visible leadership involvement, safety prioritized in decisions, resources allocated, leading by example. Communication: Regular safety messaging, open incident discussion, safety updates, accessible reporting. Employee involvement: Safety committees, hazard reporting encouraged, safety suggestions valued, participation in programs. Recognition: Acknowledge safe behavior, celebrate safety milestones, reward suggestions, positive reinforcement. Training: Comprehensive training program, ongoing learning, competency verification. Procedures: Clear, accessible procedures, consistent enforcement, regular review and update. Measurement: Track safety metrics, monitor trends, benchmark performance, report progress. Culture = shared values and behaviors. Leadership sets tone. Communication builds awareness. Involvement creates ownership. Recognition reinforces behavior. Continuous improvement mindset."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Workplace Safety Guide - Hazards, Prevention & Response',
  description: 'Safety hazards, prevention measures, responsibilities, and incident response.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WorkplaceSafetyGuide />
    </Suspense>
  );
}