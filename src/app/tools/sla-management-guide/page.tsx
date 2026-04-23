import type { Metadata } from 'next';
import { Suspense } from 'react';
import SLAManagementGuide from '@/components/SLAManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a service level agreement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SLA definition: Purpose: Define expected service performance, establish measurable standards, protect both parties, clarify responsibilities, enable enforcement. Components: Service description - what&apos;s provided, Performance metrics - measurable targets, Response times - time to respond, Availability - uptime percentage, Remedies - consequences for failure, Reporting - performance reports. Types: Customer SLA - between provider and customer, Internal SLA - between internal teams, Vendor SLA - between company and vendor, Multi-level SLA - different levels for different customers. Importance: Clear expectations, performance guarantee, accountability, dispute resolution basis. SLA = performance contract. Define services. Set metrics. Include remedies. Monitor compliance. Enforce when needed. Review regularly."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics should an SLA include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SLA metrics: Availability: Uptime percentage (e.g., 99.9%), measured by monitoring systems, downtime tracking, planned vs unplanned distinction. Response time: Time to acknowledge issue (e.g., 1 hour), time to respond to requests, measured by ticket tracking, response timestamps. Resolution time: Time to fix issues (e.g., 24 hours), severity-based targets, measured by issue resolution tracking. Quality: Error/defect rate (e.g., below 1%), customer satisfaction scores, measured by quality metrics, surveys. Throughput: Transactions per period, capacity metrics, measured by system monitoring. Security: Security incident response time, patch deployment time, measured by security tracking. Metrics = measurable targets. Define clearly. Set realistic levels. Include measurement method. Balance service quality vs cost. Review periodically."
      }
    },
    {
      "@type": "Question",
      "name": "How do I enforce an SLA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SLA enforcement: Penalty structure: Financial penalties for breaches, service credits, refund mechanisms, graduated penalties for severity. Reporting: Regular performance reports, breach notifications, documented evidence, tracking of incidents. Escalation: Issue escalation process, management involvement, termination consideration, dispute resolution. Measurement: Accurate tracking systems, agreed measurement method, data transparency, both parties can verify. Review: Periodic SLA reviews, performance discussions, adjustment discussions, relationship management. Termination: Repeated breach termination clause, notice requirements, transition provisions. Enforcement = clear consequences. Financial penalties. Regular reporting. Escalation process. Accurate measurement. Termination provisions. Enforce consistently."
      }
    },
    {
      "@type": "Question",
      "name": "How do I monitor SLA compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SLA monitoring: Tracking systems: Automated monitoring where possible, dashboard for key metrics, alert thresholds, regular data collection. Reporting: Monthly performance reports, breach notifications, trend analysis, comparison to targets. Communication: Regular vendor/provider meetings, performance discussions, issue identification, improvement plans. Documentation: Record all breaches, impact documentation, resolution tracking, history maintained. Review: Quarterly SLA reviews, annual comprehensive assessment, adjustment recommendations, renewal decisions. Monitoring = systematic tracking. Automated systems. Regular reporting. Proactive communication. Document breaches. Review periodically. Act on findings."
      }
    },
    {
      "@type": "Question",
      "name": "How do I negotiate an SLA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SLA negotiation: Preparation: Understand your needs, realistic targets, market benchmarks, acceptable compromises. Key terms: Metrics and targets - negotiate levels, Measurement method - agree on approach, Reporting frequency - set schedule, Remedies/penalties - financial terms, Exclusions - define exceptions, Termination - breach thresholds. Balance: Service quality vs cost, realistic vs demanding, provider capability vs needs, flexibility vs specificity. Common compromises: Higher availability with higher cost, slower response for lower price, limited coverage vs full, capped penalties. Documentation: All terms documented, clear language, both parties sign, version control. Negotiation = fair agreement. Know your needs. Balance quality and cost. Be realistic. Document everything. Both parties agree. Review annually."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'SLA Management Guide - Components, Metrics & Enforcement',
  description: 'SLA components, performance metrics, enforcement, and monitoring.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SLAManagementGuide />
    </Suspense>
  );
}