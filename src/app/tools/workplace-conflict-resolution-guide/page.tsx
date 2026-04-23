import type { Metadata } from 'next';
import { Suspense } from 'react';
import WorkplaceConflictGuide from '@/components/WorkplaceConflictGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I resolve workplace conflict?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Workplace conflict resolution process: Step 1 - Acknowledge: Recognize conflict exists, don&apos;t ignore hoping it resolves itself. Step 2 - Understand: Meet privately with parties, listen to each perspective, identify root cause. Step 3 - Mediate: Facilitate discussion, focus on facts not emotions, find common ground. Step 4 - Solve: Generate options, agree on solution, document resolution. Step 5 - Follow up: Monitor implementation, check if resolved, prevent recurrence. Key principles: Address early, stay neutral, focus on work outcomes, separate people from problems, document everything. Escalate to HR if: harassment, safety concerns, policy violations, or unresolved after reasonable attempts. Early resolution = better outcomes. Ignored conflict = escalation. Address promptly."
      }
    },
    {
      "@type": "Question",
      "name": "What are the types of workplace conflict?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Workplace conflict types: Task Conflict: Disagreements about work content - goals, priorities, methods. Resolution: Clarify objectives, find compromise, focus on shared goals. Process Conflict: Disagreements about how work is done - procedures, delegation, responsibilities. Resolution: Standardize processes, clarify roles, establish protocols. Relationship Conflict: Personal friction, personality clashes, interpersonal tension. Resolution: Mediation, set boundaries, focus on professional interaction. Status Conflict: Authority disputes, role confusion, power struggles. Resolution: Clear hierarchy, defined responsibilities, role clarity. Value Conflict: Different beliefs, principles, work styles. Resolution: Respect differences, find common ground, focus on shared outcomes. Resource Conflict: Competition for budget, time, equipment, attention. Resolution: Fair allocation rules, transparent decisions. Identify type = right resolution approach. Wrong approach = wasted effort. Match resolution to conflict type."
      }
    },
    {
      "@type": "Question",
      "name": "When should conflict be escalated to HR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Escalation to HR criteria: Immediate escalation: Safety concerns or threats, harassment or discrimination, violence or intimidation, legal implications, policy violations. Standard escalation: Unresolved after manager attempts, team-wide impact, involves senior leadership, requires formal investigation, pattern of recurring issues. HR role: Formal investigation, policy guidance, documentation, legal compliance, mediation support, disciplinary action if needed. Manager&apos;s role first: Direct resolution attempt, informal mediation, documentation of issue. Escalate when: Manager efforts unsuccessful, severity exceeds manager authority, policy/legal concerns, need formal record. HR escalation = serious matters. Not first step for normal disagreements. Manager should attempt resolution first unless immediate escalation criteria met."
      }
    },
    {
      "@type": "Question",
      "name": "How do I mediate a conflict between employees?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mediation process: Preparation: Understand background, schedule private meeting, set ground rules, prepare neutral environment. Opening: State purpose, set confidentiality expectations, explain process, establish respectful dialogue rules. Information gathering: Each party shares perspective uninterrupted, listen actively, ask clarifying questions, summarize each view. Problem definition: Identify key issues, separate facts from emotions, find underlying interests, clarify impact on work. Solution exploration: Generate options together, evaluate each option, find common ground, focus on future actions. Agreement: Agree on specific actions, set timeline, document resolution, both parties commit. Follow-up: Check progress at agreed interval, adjust if needed, confirm resolution, document outcome. Mediator principles: Stay neutral, don&apos;t judge, focus on facts, separate people from problem, find shared interests, document everything. Mediation = facilitated resolution. Not judging or deciding. Help parties find own solution."
      }
    },
    {
      "@type": "Question",
      "name": "How do I prevent workplace conflicts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Conflict prevention strategies: Clear expectations: Defined roles and responsibilities, clear decision processes, transparent resource allocation, documented procedures. Communication culture: Regular team meetings, open feedback channels, address concerns early, respectful dialogue norms. Relationship building: Team bonding activities, cross-team collaboration, personal connection opportunities, shared goals. Process clarity: How decisions are made, how resources allocated, how disagreements handled, escalation paths documented. Training: Conflict resolution skills, communication training, diversity awareness, emotional intelligence development. Early intervention: Address small issues before escalation, regular check-ins, monitor team dynamics, don&apos;t ignore warning signs. Prevention = cheaper than resolution. Address early. Build communication culture. Clear processes reduce confusion-based conflict."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Workplace Conflict Resolution Guide - Types, Steps & Mediation',
  description: 'Conflict types, resolution steps, mediation techniques, and escalation criteria.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WorkplaceConflictGuide />
    </Suspense>
  );
}