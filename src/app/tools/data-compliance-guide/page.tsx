import type { Metadata } from 'next';
import { Suspense } from 'react';
import DataComplianceGuide from '@/components/DataComplianceGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is GDPR compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GDPR compliance requirements: Scope: EU data subjects regardless of company location, applies if you process EU personal data. Key requirements: Consent - explicit, informed, withdrawable consent. Data rights - access, deletion, portability, correction. Data minimization - collect only necessary data. Security - appropriate protection measures. Breach notification - 72 hours to authorities, notify affected users. Documentation - records of processing activities. DPO - Data Protection Officer for certain organizations. Penalties: Up to 4% annual revenue or €20M. Steps: Audit data practices, implement consent, create privacy policy, set up data request handling, train employees, document everything. GDPR = comprehensive data protection. Consult legal for specific requirements."
      }
    },
    {
      "@type": "Question",
      "name": "What is CCPA compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CCPA compliance: Scope: California consumers, businesses meeting thresholds ($25M revenue, 50k transactions, 50% revenue from personal data). Consumer rights: Know what data collected, request deletion, opt-out of sale, equal service (no discrimination for exercising rights). Business requirements: Privacy policy with disclosures, Do Not Sell My Personal Info link, respond to requests within 45 days, verify requester identity, maintain records. Differences from GDPR: CCPA is opt-out (GDPR opt-in), CCPA covers sale specifically, broader definition of personal info. Steps: Determine applicability, update privacy policy, implement opt-out mechanism, set up request handling process. CCPA = California privacy. Similar laws emerging in other states. Check legal requirements for your business."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle data breach notification?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Data breach notification process: Detect: Monitoring, alerts, incident identification. Assess: Determine scope, data affected, individuals impacted, risk level. Contain: Stop breach, preserve evidence. Document: Timeline, affected data, systems involved. Notify authorities: GDPR 72 hours to supervisory authority, US varies by state/sector, HIPAA 60 days (no delay). Notify affected individuals: When risk to individuals, clear communication, remediation steps, contact info for questions. Provide: Nature of breach, data types affected, mitigation steps, contact for more info. Post-breach: Review and improve security, document lessons learned, update response plan. Notification = legal requirement in many jurisdictions. Plan ahead, have template ready, know timelines. Legal counsel guidance recommended."
      }
    },
    {
      "@type": "Question",
      "name": "What is privacy by design?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Privacy by design: Embed privacy into system design from start, not after. Principles: Proactive not reactive - anticipate privacy issues, prevent them. Privacy as default - no action needed for maximum privacy. Embedded into design - integral part of system, not add-on. Full functionality - positive-sum, not zero-sum (privacy + functionality). End-to-end security - lifecycle protection. Visibility and transparency - keep it open, verify compliance. User-centric - keep user interests paramount. Implementation: Data minimization during design, encryption built-in, access controls from start, audit logging designed, consent mechanisms integrated, retention limits planned. Benefits: Avoid costly retrofits, comply with regulations, build user trust, reduce breach risk. Privacy by design = proactive approach. Better than reactive fixes. Consult privacy experts during design."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a Data Protection Officer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Data Protection Officer (DPO) requirement (GDPR): Required when: Public authorities, core activity involves regular monitoring on large scale, core activity involves special category data on large scale. DPO role: Monitor compliance, advise on obligations, cooperate with authorities, act as contact point, independent position, report to highest management. Not required: Most private businesses unless meeting thresholds above. However: Many companies appoint DPO anyway for good practice, complex data processing operations benefit from dedicated privacy role. US context: No specific DPO requirement, but privacy officer or compliance role similar. Recommendation: Assess your data processing activities, consider privacy expertise needs, appoint if large-scale sensitive data processing, legal advice on requirements. DPO = dedicated privacy oversight. Optional for many but good practice."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Data Compliance Guide - GDPR, CCPA & Requirements',
  description: 'Data compliance regulations, GDPR requirements, CCPA, and breach notification.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DataComplianceGuide />
    </Suspense>
  );
}