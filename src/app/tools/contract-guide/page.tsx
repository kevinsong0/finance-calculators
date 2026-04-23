import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContractGuide from '@/components/ContractGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are essential contract elements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contract essential elements: Parties: Clear identification of all parties, legal names and addresses, authorized representatives, contact information. Subject matter: Clear description of goods/services, specifications, quantities, quality standards. Terms: Payment amounts and schedule, delivery requirements, timelines, performance expectations. Rights and obligations: What each party must do, what each party receives, limitations and restrictions. Termination: Conditions for ending contract, notice requirements, consequences of termination. Dispute resolution: How conflicts handled, mediation/arbitration clauses, legal jurisdiction. Signatures: Authorized signatures, dates, company seals if required. Elements = legal requirements vary. Clear terms prevent disputes. Legal review essential. Incomplete contracts create risk."
      }
    },
    {
      "@type": "Question",
      "name": "How do I negotiate contract terms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contract negotiation process: Preparation: Research other party, understand their needs, identify your priorities, set negotiation range, prepare alternatives. Key negotiable terms: Price and payment terms, delivery schedules, quality standards, warranties, termination rights, liability limits, intellectual property rights. Negotiation tactics: Start with reasonable position, focus on interests not positions, explore creative solutions, trade concessions fairly, document agreements. Common compromises: Price for volume, timeline for quality, risk for reward, exclusivity for commitment. Legal considerations: Ensure terms enforceable, comply with regulations, protect intellectual property, limit liability appropriately. Negotiation = balance interests. Prepare thoroughly. Focus on mutual benefit. Document everything. Legal review before signing."
      }
    },
    {
      "@type": "Question",
      "name": "What are common contract pitfalls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contract pitfalls to avoid: Ambiguous language: Vague terms create disputes, undefined terms cause confusion, unclear obligations lead to problems, unclear scope causes disputes. Missing protections: No termination clause, liability unlimited, no warranty terms, no confidentiality clause, missing intellectual property rights. Unrealistic commitments: Unachievable timelines, impossible performance standards, unaffordable terms, overpromised deliverables. Inadequate enforcement: Weak penalty provisions, unclear remedies, no dispute mechanism, no performance measurement. Procedural issues: Missing signatures, unauthorized signing, improper formation, no proper notice. Avoidance: Clear language, comprehensive review, realistic terms, enforcement mechanisms, legal advice. Pitfalls = preventable. Careful drafting essential. Legal review mandatory. Check thoroughly before signing."
      }
    },
    {
      "@type": "Question",
      "name": "How do I manage contracts effectively?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contract management process: Repository: Central storage for all contracts, searchable database, version control, secure access. Monitoring: Track key dates (expiry, renewal), monitor performance against terms, check compliance requirements, track payments and obligations. Amendments: Document all changes, proper authorization, version tracking, stakeholder communication. Renewals: Review before expiry, negotiate improvements, timely decisions, renewal documentation. Performance tracking: Measure against contract terms, track deliverables, assess quality, check timelines. Risk management: Identify contract risks, monitor risk indicators, implement controls, contingency plans. Reporting: Regular status reports, performance summaries, risk assessments, financial impact. Management = active oversight. Not set-and-forget. Track obligations. Plan renewals. Address issues promptly."
      }
    },
    {
      "@type": "Question",
      "name": "When should I seek legal review for contracts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Legal review timing: Always required: Significant financial value, complex terms, unusual provisions, new business relationships, long-term commitments. Risk indicators: Large dollar amounts, unusual risk allocation, regulatory compliance needed, intellectual property involved, international parties, employment terms. Cost-benefit: Legal cost vs contract value, risk exposure vs review cost, relationship importance, complexity level. Review scope: Contract formation validity, term enforceability, risk allocation, regulatory compliance, protection adequacy. Internal vs external: Internal counsel for routine contracts, external for specialized areas, external for significant transactions. Legal review = risk management. Complex contracts need it. Significant value requires it. Prevention cheaper than dispute resolution."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Contract Management Guide - Types, Elements & Pitfalls',
  description: 'Contract types, essential elements, negotiation, and management.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ContractGuide />
    </Suspense>
  );
}