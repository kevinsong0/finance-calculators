import type { Metadata } from 'next';
import { Suspense } from 'react';
import CrisisManagementGuide from '@/components/CrisisManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is crisis management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Crisis management definition: Purpose: Prepare for emergencies, respond effectively, minimize damage, recover quickly, protect organization. Phases: Pre-crisis - plan, prepare, train. Response - act immediately, communicate. Containment - limit damage, stabilize. Recovery - restore, rebuild, learn. Crisis types: Operational - system failures, supply disruption. Financial - cash crisis, major losses. Reputational - scandal, negative publicity. Natural - disasters, weather events. Cyber - data breach, hacking. Personnel - key people loss. Crisis = unexpected major disruption. Preparation essential. Fast response required. Communication critical. Learn and improve."
      }
    },
    {
      "@type": "Question",
      "name": "How do I develop a crisis plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Crisis plan development: Risk assessment: Identify potential crises, assess likelihood and impact, prioritize by severity, understand vulnerabilities. Plan elements: Crisis identification criteria - what triggers plan, Response team - who leads and participates, Communication protocols - how to communicate, Resource allocation - what needed, Decision authority - who makes calls, Contact lists - key contacts available, Backup procedures - alternatives ready, Recovery steps - restoration plan. Documentation: Written plan accessible, team knows locations, regular updates, version control. Testing: Simulations periodically, tabletop exercises, review after real events, identify gaps. Plan = preparation before crisis. Assess risks. Define responses. Assign roles. Document clearly. Test regularly. Update as needed."
      }
    },
    {
      "@type": "Question",
      "name": "How do I respond when a crisis occurs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Crisis response actions: Immediate actions: Activate crisis plan, assemble response team, assess situation severity, ensure safety first, contain damage. Communication: Notify key stakeholders quickly, provide initial facts, indicate next steps, assign spokesperson, control messaging. Coordination: Assign roles and tasks, establish communication channels, coordinate resources, make decisions quickly, document actions. Monitoring: Track situation development, measure impact, gather information, adjust response, update stakeholders. Support: Help affected parties, provide resources, address immediate needs, protect people. Response = speed essential. Activate plan. Communicate fast. Coordinate team. Monitor situation. Document everything. Adjust as needed."
      }
    },
    {
      "@type": "Question",
      "name": "How do I communicate during a crisis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Crisis communication principles: Speed: Communicate quickly, not hours later, get facts out early, acknowledge situation, don&apos;t let speculation fill gap. Honesty: Tell truth, acknowledge problems, don&apos;t minimize, admit if uncertain, explain what&apos;s being done. Empathy: Show concern for affected, human response not corporate, acknowledge impact, offer support. Consistency: Single spokesperson, consistent message, coordinated updates, no conflicting statements. Updates: Regular updates, even if no new news, maintain contact, show ongoing attention. Channels: All appropriate channels, reach all stakeholders, accessible information. Communication = critical during crisis. Fast, honest, empathetic. Consistent messaging. Regular updates. Reach all stakeholders. Never hide or delay."
      }
    },
    {
      "@type": "Question",
      "name": "How do I recover after a crisis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Post-crisis recovery: Immediate recovery: Stabilize operations, restore critical functions, support affected parties, address urgent needs. Assessment: Analyze crisis impact, identify root causes, evaluate response effectiveness, document lessons learned. Long-term: Implement improvements, address underlying issues, update crisis plan, rebuild trust/relationships. Communication: Continue updates, explain recovery progress, acknowledge improvements, thank supporters. Prevention: Fix vulnerability, add safeguards, reduce future risk, test new measures. Learning: Review all actions, identify what worked, note what failed, update training. Recovery = restore and improve. Stabilize first. Assess impact. Learn lessons. Update plans. Prevent recurrence. Communicate progress."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Crisis Management Guide - Types, Planning & Response',
  description: 'Crisis types, phases, planning, and communication principles.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CrisisManagementGuide />
    </Suspense>
  );
}