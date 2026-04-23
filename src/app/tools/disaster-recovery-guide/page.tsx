import type { Metadata } from 'next';
import { Suspense } from 'react';
import DisasterRecoveryGuide from '@/components/DisasterRecoveryGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is disaster recovery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Disaster recovery definition: Purpose: Restore IT systems after disaster, minimize business disruption, recover critical operations, protect data and systems. Scope: IT systems recovery, data restoration, infrastructure rebuilding, technology-focused. Difference from business continuity: DR = IT recovery focus, BCP = overall business operations, DR is subset of BCP, DR focuses on technology. Components: Recovery plan - documented procedures, Backup systems - data protection, Alternate site - backup location, Communication plan - notification procedures, Recovery team - assigned responders, Testing program - regular validation. Disaster recovery = IT-focused recovery. Restore systems quickly. Protect data. Document procedures. Test regularly. Coordinate with broader BCP."
      }
    },
    {
      "@type": "Question",
      "name": "What are RTO and RPO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "RTO and RPO explained: RTO (Recovery Time Objective): Maximum acceptable downtime, time to restore systems, measured in hours/days, defines urgency of recovery. RPO (Recovery Point Objective): Maximum acceptable data loss, data age at recovery, measured in hours/days of data, defines backup frequency. Examples: RTO 4 hours = must restore within 4 hours, RPO 24 hours = accept up to 24 hours of data loss. Relationship: RTO determines recovery speed needed, RPO determines backup frequency needed. Setting objectives: Analyze business impact, assess cost of downtime, consider technical capability, balance cost vs protection. Trade-offs: Lower RTO/RPO = higher cost, higher RTO/RPO = more risk, find acceptable balance. RTO/RPO = define recovery targets. RTO = downtime tolerance. RPO = data loss tolerance. Balance cost and protection. Update as business changes."
      }
    },
    {
      "@type": "Question",
      "name": "How do I test disaster recovery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DR testing types: Tabletop exercise: Discussion-based, review plan verbally, identify gaps, low cost, low risk, good for plan review. Walkthrough: Step-by-step plan review, identify missing steps, verify procedures, low cost, moderate detail. Component testing: Test specific DR elements, backup restore test, alternate site test, focused validation. Full simulation: Simulate actual disaster, activate full recovery, test all procedures, high cost, most thorough. Annual testing: Comprehensive test annually, regulatory requirement often, validates full plan. Frequency: Tabletop quarterly, component testing monthly/quarterly, full simulation annually. Documentation: Record test results, identify issues found, update plan based on findings, track improvement. Testing = validate plan works. Regular testing. Document results. Fix gaps. Update plan. Annual comprehensive test."
      }
    },
    {
      "@type": "Question",
      "name": "What should a DR plan include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DR plan elements: Scope: Systems covered, priorities defined, critical vs non-critical, recovery order. Team: Roles and responsibilities, contact information, decision authority, availability requirements. Procedures: Detection procedures - identify disaster, Response procedures - initial actions, Recovery procedures - restore systems, Resumption procedures - return to normal. Resources: Backup locations, alternate sites, equipment needs, vendor contacts. Communication: Stakeholder notification, team communication, status updates, external communication. Testing: Test schedule, test procedures, success criteria, documentation. Documentation: Plan location, version control, update schedule, access control. Plan = comprehensive documentation. Define scope and team. Step-by-step procedures. Resources available. Communication clear. Test schedule. Maintain current version."
      }
    },
    {
      "@type": "Question",
      "name": "How do I choose a recovery strategy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recovery strategy options: Hot site: Fully operational backup site, immediate availability, highest cost, fastest recovery (minutes/hours). Warm site: Partially equipped backup, some systems ready, medium cost, moderate recovery (hours). Cold site: Space available, no equipment installed, lowest cost, slower recovery (days). Cloud recovery: Cloud-based backup systems, scalable, moderate cost, flexible recovery. Mobile recovery: Portable recovery units, temporary facilities, specific scenarios. Factors: RTO requirements - faster recovery = higher cost, Budget constraints - balance protection vs cost, Data sensitivity - critical data needs better protection, Geographic risk - location-specific disasters. Selection: Match strategy to RTO/RPO, balance cost and protection, consider multiple sites, document strategy rationale. Strategy = match to needs and budget. Hot for fastest. Warm for moderate. Cold for low cost. Cloud for flexibility. Document choice rationale."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Disaster Recovery Guide - Components, Metrics & Testing',
  description: 'DR components, RTO/RPO metrics, recovery phases, and testing.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DisasterRecoveryGuide />
    </Suspense>
  );
}