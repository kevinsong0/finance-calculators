import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessContinuityGuide from '@/components/BusinessContinuityGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is business continuity planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Business continuity planning definition: Purpose: Ensure business can continue during disruption, minimize downtime impact, protect operations, recover quickly. Scope: All business operations, not just IT, people, facilities, processes, supply chain. Difference from disaster recovery: BCP = overall business operations, DR = IT systems recovery, BCP broader scope, DR is subset. Elements: Risk assessment - identify potential disruptions, Impact analysis - assess effects on business, Recovery strategies - plan response methods, Plan documentation - written procedures, Training - educate employees, Testing - validate plan works. BCP = comprehensive business protection. All operations covered. Document procedures. Train team. Test regularly. Coordinate with DR."
      }
    },
    {
      "@type": "Question",
      "name": "How do I conduct business impact analysis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Business impact analysis process: Identify functions: List all business functions, categorize by importance, understand dependencies, map processes. Assess impact: Downtime cost per function, customer impact, regulatory impact, reputation impact, operational impact. Determine recovery needs: Maximum tolerable downtime, resources needed for recovery, dependencies and sequence, recovery time objectives. Prioritize: Critical functions - highest priority, Essential functions - second priority, Important functions - third priority, Non-critical - lowest priority. Document: BIA report findings, recovery priorities, resource requirements, time objectives. Analysis = systematic assessment. Identify all functions. Measure impact. Define recovery needs. Prioritize clearly. Document findings."
      }
    },
    {
      "@type": "Question",
      "name": "What should a BCP include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Business continuity plan contents: Risk assessment: Identified risks, probability estimates, potential impacts, mitigation measures. Business impact analysis: Critical functions defined, recovery priorities, downtime tolerance, resource needs. Recovery strategies: Alternate facilities, backup resources, manual procedures, supplier alternatives. Team structure: Response team roles, decision authority, contact information, availability requirements. Communication plan: Stakeholder notification, communication channels, message templates, update schedules. Recovery procedures: Step-by-step recovery, system restoration, process resumption, normal operations return. Testing program: Test schedule, test types, success criteria, documentation. Maintenance: Review schedule, update triggers, version control, distribution list. BCP = comprehensive documentation. Risk and impact analysis. Recovery strategies. Team and communication. Detailed procedures. Testing and maintenance. Keep current."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I test the BCP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BCP testing frequency: Tabletop exercises: Quarterly minimum, discuss scenarios, review procedures, identify gaps, low cost. Walkthroughs: Quarterly or semi-annual, step through plan, verify procedures, test understanding, moderate detail. Component testing: Monthly or quarterly, test specific elements, backup systems, alternate sites, focused validation. Full simulation: Annual minimum, simulate real disruption, activate full plan, comprehensive validation, regulatory requirement often. Factors: Regulatory requirements, risk level, plan complexity, past incidents, resource availability. Documentation: Record all test results, issues identified, improvements made, update plan accordingly. Testing = regular validation. Quarterly tabletops. Annual full test. Document results. Fix gaps. Update plan. Testing proves plan works."
      }
    },
    {
      "@type": "Question",
      "name": "How do I maintain the BCP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BCP maintenance practices: Regular review: Annual comprehensive review, quarterly updates, after significant changes, after incidents. Trigger updates: New systems/processes, organizational changes, lessons from tests, regulatory changes, new risks. Version control: Document changes, maintain version history, distribution control, archive old versions. Accessibility: Plan easily accessible, team knows location, multiple formats, offline copies available. Training: Regular training updates, new team member training, refresher training, role-specific training. Audit: Internal audit periodically, regulatory audit if required, third-party assessment, gap identification. Maintenance = ongoing process. Regular reviews. Update when changes occur. Version control. Keep accessible. Train team. Audit periodically. Keep plan current."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Continuity Guide - Elements, Priorities & Testing',
  description: 'BCP elements, business impact analysis, priorities, and testing.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BusinessContinuityGuide />
    </Suspense>
  );
}