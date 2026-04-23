import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeDisciplineGuide from '@/components/EmployeeDisciplineGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is progressive discipline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Progressive discipline approach: Purpose: Correct behavior through graduated steps, give employee opportunity to improve, maintain fairness, document process, protect organization. Steps: Verbal warning - first formal discussion, documented in file, opportunity to correct, informal but recorded. Written warning - formal written notice, specific issues outlined, expectations clear, documented officially. Performance improvement plan - formal improvement plan, specific goals set, timeline defined, support provided, progress tracked. Suspension - temporary removal, serious issues, investigation time, unpaid or paid, documented action. Termination - end employment, final step, documented reasons, legal compliance, proper process. Progressive = graduated approach. Verbal first. Written next. PIP for significant. Suspension for serious. Termination final. Documentation throughout. Fairness maintained. Legal compliance."
      }
    },
    {
      "@type": "Question",
      "name": "How do I document discipline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Discipline documentation: Incident record: Date and time of incident, specific behavior observed, witnesses present, impact of behavior, policy violated, immediate action taken. Employee meeting: Meeting date and time, attendees present, issues discussed, employee response, agreement reached, next steps. Warning document: Specific issues addressed, policy references, expected improvement, timeline set, consequences stated, acknowledgment signature. Follow-up: Progress observations, improvement noted, additional issues, further action needed, timeline tracking, outcome record. Documentation = thorough records. Incident details. Meeting notes. Warning content. Follow-up tracking. Employee response. Signature confirmation. Secure storage. Access control."
      }
    },
    {
      "@type": "Question",
      "name": "What principles guide discipline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Discipline principles: Consistency: Same standards for all, similar offenses similar treatment, policy applied equally, no favoritism, documented approach, predictable outcomes. Clarity: Clear policy communication, expectations understood, consequences known, process transparent, employee informed, no surprises. Documentation: All steps recorded, written evidence maintained, timeline tracked, employee response noted, signatures obtained, secure storage. Fairness: Employee opportunity to respond, investigation conducted, evidence considered, appropriate response, objective assessment, bias avoided. Progression: Graduated steps where appropriate, opportunity to improve, severity matched to offense, escalation justified, proportionate response. Legality: Legal compliance maintained, HR consultation, proper process, employee rights respected, termination legal, records retention. Principles = guide discipline. Consistency essential. Clarity required. Documentation mandatory. Fairness fundamental. Progression appropriate. Legality maintained."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle discipline meetings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Discipline meeting process: Preparation: Review incident thoroughly, gather documentation, understand policy, plan approach, involve HR if needed, prepare setting. Meeting: Private location, appropriate attendees, clear purpose stated, specific issues addressed, evidence presented, employee response opportunity. Discussion: Listen to employee perspective, ask clarifying questions, acknowledge response, explain expectations, set improvement goals, discuss consequences. Documentation: Meeting details recorded, issues discussed noted, employee response captured, agreements made documented, timeline set, signatures obtained. Follow-up: Progress expectations set, check-in scheduled, support offered, monitoring explained, outcome communicated, next steps clear. Meeting = professional approach. Preparation thorough. Private setting. Clear communication. Employee response. Documentation complete. Follow-up planned."
      }
    },
    {
      "@type": "Question",
      "name": "How do I avoid discipline legal issues?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Legal discipline considerations: Documentation: Thorough records maintained, written warnings signed, timeline documented, evidence preserved, consistent approach shown, process followed. Process: Policy followed consistently, progressive approach used, investigation conducted, employee response opportunity, appropriate action taken, HR involvement when needed. Protected classes: No discrimination, equal treatment regardless of protected status, consistent standards, documented justification, objective criteria, legal review. Termination: Just cause established, documentation sufficient, policy violations clear, progressive steps followed, final warning given, legal compliance checked. Retaliation: No retaliation for complaints, continued fair treatment, consistent standards, documented reasons, employee rights protected, separate from protected activity. Legal = careful approach. Documentation thorough. Process followed. Discrimination avoided. Termination justified. Retaliation prevented. HR consultation."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Discipline Guide - Types, Process & Principles',
  description: 'Discipline types, process steps, principles, documentation, and legal considerations.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmployeeDisciplineGuide />
    </Suspense>
  );
}