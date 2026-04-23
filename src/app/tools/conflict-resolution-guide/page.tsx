import type { Metadata } from 'next';
import { Suspense } from 'react';
import ConflictResolutionGuide from '@/components/ConflictResolutionGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I resolve workplace conflicts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Conflict resolution process: Identify: Recognize conflict exists, understand parties involved, determine conflict type, assess severity. Understand: Gather perspectives from all sides, listen to each party, understand underlying causes, find root issues. Generate options: Brainstorm solutions together, consider multiple approaches, evaluate pros and cons, find common ground. Agree: Choose best solution, ensure all parties agree, document agreement, clarify next steps. Implement: Execute agreed solution, monitor progress, adjust if needed, follow through. Resolution = systematic process. Identify early. Understand perspectives. Generate options. Agree together. Implement and monitor. Follow up to prevent recurrence."
      }
    },
    {
      "@type": "Question",
      "name": "What causes workplace conflicts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Conflict sources: Communication issues: Misunderstandings, unclear expectations, poor information sharing, different interpretations, assumptions. Resource competition: Limited budget, insufficient staff, equipment sharing, space allocation, prioritization disputes. Personal differences: Personality clashes, different styles, varying values, communication styles, work approaches. Role confusion: Unclear responsibilities, overlapping duties, authority disputes, accountability gaps. Process disagreement: How work should be done, methodology differences, workflow disputes, quality standards. Performance issues: Quality concerns, output disputes, contribution disagreements, workload perceptions. Causes = understand root. Communication most common. Resources create competition. Personal styles clash. Role clarity needed. Address underlying cause not just symptoms."
      }
    },
    {
      "@type": "Question",
      "name": "What conflict resolution approaches exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Resolution approaches: Collaborate: Work together to find win-win solution, both parties&apos; needs met, best for important relationships, takes time and effort, best long-term outcomes. Compromise: Both parties give something, middle ground solution, good when time limited, equal power parties, partial satisfaction for both. Accommodate: One party yields to other, maintain relationship priority, not critical to accommodator, useful for building goodwill, may sacrifice own needs. Avoid: Postpone or sidestep conflict, issue trivial, time needed to calm, no resolution benefit, may escalate later. Compete: One wins, other loses, quick decision needed, emergency situations, assert position strongly, may damage relationship. Approaches = match to situation. Collaborate for important. Compromise for quick. Accommodate for relationship. Avoid for trivial. Compete for emergency. Choose appropriately."
      }
    },
    {
      "@type": "Question",
      "name": "What skills help resolve conflicts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Resolution skills: Active listening: Listen without interrupting, understand perspective, ask clarifying questions, acknowledge feelings, show attention. Emotional control: Remain calm, don&apos;t react emotionally, manage own feelings, stay objective, professional demeanor. Communication: Express clearly, use neutral language, avoid blame, focus on issues, be constructive. Problem-solving: Generate options, evaluate solutions, think creatively, find alternatives, consider trade-offs. Empathy: Understand other&apos;s feelings, recognize their concerns, show respect, validate perspective, build understanding. Negotiation: Find middle ground, trade concessions, create agreements, maintain fairness, ensure implementation. Skills = develop through practice. Listen actively. Stay calm. Communicate clearly. Generate options. Show empathy. Negotiate fairly."
      }
    },
    {
      "@type": "Question",
      "name": "When should I escalate a conflict?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Escalation criteria: Severity: Serious impact on work, policy violations, safety concerns, ethical issues, legal implications. Duration: Long-standing unresolved, repeated attempts failed, pattern continuing, stalemate situation. Scope: Affects multiple people, team-wide impact, department disruption, organizational level. Nature: Harassment or discrimination, violence or threats, serious misconduct, policy violations, legal issues. Capability: Beyond your authority, requires senior involvement, needs HR intervention, policy decision required. Escalation = when needed. Serious issues escalate early. Policy violations immediate. Harassment/discrimination always escalate. Unresolved conflicts escalate. Don&apos;t delay escalation for serious issues."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Conflict Resolution Guide - Sources, Approaches & Skills',
  description: 'Conflict sources, resolution approaches, process, and required skills.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ConflictResolutionGuide />
    </Suspense>
  );
}