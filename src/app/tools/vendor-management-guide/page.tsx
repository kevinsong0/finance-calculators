import type { Metadata } from 'next';
import { Suspense } from 'react';
import VendorManagementGuide from '@/components/VendorManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is vendor management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vendor management definition: Purpose: Optimize vendor relationships, ensure service quality, manage costs, reduce risks, maintain compliance. Process: Selection - evaluate and choose vendors, Onboarding - set up vendor relationship, Monitoring - track vendor performance, Review - evaluate periodically, Issue resolution - address problems, Renewal/termination - decide on continuation. Scope: All external suppliers, service providers, contractors, partners that provide goods/services to organization. Importance: Cost control, quality assurance, risk management, compliance, operational efficiency. Vendor management = strategic oversight. Select carefully. Monitor performance. Address issues. Maintain relationships. Document everything. Regular review."
      }
    },
    {
      "@type": "Question",
      "name": "How do I select vendors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vendor selection process: Requirements: Define needs clearly, specifications detailed, quantities estimated, timeline established, budget determined. Research: Market analysis, potential vendors identified, reputation checked, references gathered, capability assessed. Evaluation: Quality - product/service quality, Pricing - competitiveness and transparency, Delivery - reliability and timeliness, Service - responsiveness and support, Capability - technical and operational, Stability - financial and business. Comparison: Scorecard approach, weighted criteria, multiple quotes, objective evaluation. Selection: Best fit overall, not just lowest price, contract negotiation, terms finalized. Selection = systematic evaluation. Define requirements. Research options. Evaluate comprehensively. Compare objectively. Negotiate terms. Document decision."
      }
    },
    {
      "@type": "Question",
      "name": "How do I monitor vendor performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vendor performance monitoring: Metrics: Delivery performance - on-time percentage, Quality metrics - defect/error rate, Response time - how quickly responds, Issue resolution - time to fix problems, Cost tracking - pricing stability, Contract compliance - terms followed, Communication quality - clarity and frequency. Methods: Regular reporting from vendor, internal tracking, periodic reviews, audits, user feedback. Frequency: Weekly for critical vendors, monthly for standard, quarterly comprehensive review. Actions: Track trends, identify declining performance, address issues early, escalate persistent problems, review at contract renewal. Monitoring = systematic tracking. Define metrics. Track regularly. Analyze trends. Address issues promptly. Document everything. Review at renewal."
      }
    },
    {
      "@type": "Question",
      "name": "What vendor risks should I manage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vendor risk management: Dependency risk: Single vendor for critical service, backup options needed, multiple sources where possible, contract protections. Quality risk: Performance decline over time, regular monitoring, quality audits, performance standards. Cost risk: Unexpected price increases, long-term contracts, competitive alternatives, price caps. Disruption risk: Vendor failure or outage, contingency plans, backup vendors, transition planning. Security risk: Data handling concerns, security requirements, audits, certifications required. Compliance risk: Regulatory non-compliance, compliance verification, regular audits, contractual requirements. Risks = proactive management. Multiple sources for critical services. Monitor quality. Lock pricing where possible. Have contingency plans. Verify security and compliance."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle vendor issues?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vendor issue resolution: Documentation: Record issue clearly, date and details, impact documented, communication history. Communication: Notify vendor promptly, explain issue and impact, request response timeline, track communication. Resolution steps: Vendor acknowledges issue, propose solution, implement fix, verify resolution, prevent recurrence. Escalation: Vendor management if no response, contract penalties if warranted, senior leadership if critical, legal if necessary. Post-resolution: Document lessons learned, update vendor performance records, adjust monitoring frequency, consider at renewal. Issues = systematic handling. Document clearly. Communicate promptly. Track resolution. Escalate if needed. Learn from incidents. Update records."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Vendor Management Guide - Selection, Monitoring & Risks',
  description: 'Vendor management process, selection criteria, monitoring, and risks.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <VendorManagementGuide />
    </Suspense>
  );
}