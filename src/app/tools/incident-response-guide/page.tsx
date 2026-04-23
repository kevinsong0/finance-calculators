import type { Metadata } from 'next';
import { Suspense } from 'react';
import IncidentResponseGuide from '@/components/IncidentResponseGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is incident response?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Incident response: process to handle unplanned events that disrupt services. Goal: minimize impact, restore quickly, learn to prevent. Steps: Detection (monitoring, alerts), Triage (severity, assignment), Containment (stop spread), Resolution (fix cause), Recovery (restore normal), Post-mortem (learn, improve). Key roles: Incident commander (overall lead), Communications (updates to stakeholders), Technical lead (fix implementation). Speed + communication + learning = effective response. Practice with drills. Document with runbooks."
      }
    },
    {
      "@type": "Question",
      "name": "How do I classify incident severity?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Incident severity classification: SEV-1 Critical - complete outage, revenue impact, security breach. Response: all hands, immediate, CEO aware. SEV-2 High - major feature broken, significant user impact. Response: core team, ASAP, manager aware. SEV-3 Medium - partial impact, workaround exists. Response: assigned team, 24h resolution. SEV-4 Low - minor issue, limited users. Response: normal queue. Criteria: user impact count, revenue loss, security risk, workaround availability. Escalate if unclear. Document criteria clearly. Train team on severity levels."
      }
    },
    {
      "@type": "Question",
      "name": "What is an incident commander?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Incident commander: person who leads incident response. Responsibilities: Overall coordination, resource allocation, decision-making authority, communication lead, timeline tracking, escalation decisions. NOT technical fixer - focuses on coordination. Handoff when needed. Skills: calm under pressure, clear communication, decision-making, delegation. Rotate duty (on-call rotation). Training: practice with drills, shadow experienced commanders. Incident commander = single point of coordination. Prevents chaos. Clear decisions. Effective communication. Technical lead works on fix, commander manages process."
      }
    },
    {
      "@type": "Question",
      "name": "What should a post-mortem include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Post-mortem content: Timeline (what happened when), Impact (users affected, duration, cost), Root cause (why it happened, not just symptoms), Detection (how it was found, could it be faster), Resolution (what fixed it), Action items (prevent recurrence, who owns, due date), Lessons learned (what worked, what didn&apos;t). Blameless: Focus on system/process, not individuals. Everyone makes mistakes - improve system. Share post-mortem with team. Track action items. Review past post-mortems for patterns. Template: date, severity, summary, timeline, root cause, impact, actions, lessons."
      }
    },
    {
      "@type": "Question",
      "name": "How do I communicate during an incident?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Incident communication: Internal: Dedicated Slack channel (incident-name), regular status updates (every 15-30 min for SEV-1), clear format (status, actions, ETA, blockers), commander owns updates. External (customers): Pre-written templates for different scenarios, update when status changes, honest but reassuring tone, don&apos;t speculate on cause, provide workaround if available, apology when appropriate. Stakeholders: Executive summary for leadership, regular briefings for SEV-1. Over-communicate during, detailed post-mortem after. Silence = panic. Update even when no progress. Communication = trust."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Incident Response Guide - Phases, Severity & Best Practices',
  description: 'Incident management phases, severity levels, roles, and communication.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <IncidentResponseGuide />
    </Suspense>
  );
}