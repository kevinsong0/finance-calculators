import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessDataPrivacyGuide from '@/components/BusinessDataPrivacyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What regulations govern data privacy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key regulations include GDPR (European data requiring consent and rights protection), CCPA (California consumers requiring disclosure and opt-out), HIPAA (health information requiring protection and access controls), SOX (financial data requiring accuracy and controls), PCI DSS (payment cards requiring security standards), and FERPA (education records requiring student privacy)."
      }
    },
    {
      "@type": "Question",
      "name": "What are core data privacy principles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Core principles include data minimization (collecting only necessary data), purpose limitation (using data for stated purposes only), storage limitation (keeping data only as long as needed), accuracy maintenance (ensuring correct data), security measures (protecting data appropriately), transparency requirement (informing about data use), consent basis (obtaining permission), and rights protection (honoring individual rights)."
      }
    },
    {
      "@type": "Question",
      "name": "What best practices ensure data privacy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Best practices include privacy policies for transparency through clear disclosure, consent management for legal basis through opt-in systems, data mapping for inventory control through regular audit, and access controls for security through role-based limits."
      }
    },
    {
      "@type": "Question",
      "name": "What risks threaten data privacy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risks include data breaches (exposure and liability prevented by encryption and monitoring), non-compliance (fines and sanctions prevented by regular audits), unauthorized access (privacy violation prevented by access controls), and poor documentation (audit failures prevented by thorough record keeping)."
      }
    },
    {
      "@type": "Question",
      "name": "How should businesses respond to data breaches?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Businesses should have incident response plans: identify breach scope, contain the incident, assess affected data, notify affected individuals per regulatory requirements, report to authorities as required, document the incident, review security measures, implement improvements, and communicate transparently with stakeholders."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Data Privacy Guide - Regulations, Principles & Best Practices',
  description: 'Data privacy regulations, principles, best practices, and risk factors.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessDataPrivacyGuide />
    </Suspense>
  );
}