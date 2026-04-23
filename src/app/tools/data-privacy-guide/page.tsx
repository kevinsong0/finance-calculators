import type { Metadata } from 'next';
import { Suspense } from 'react';
import DataPrivacyGuide from '@/components/DataPrivacyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the key data privacy principles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Data privacy principles: Transparency (clearly communicate practices via privacy policy). Purpose Limitation (collect only for specific documented purposes). Data Minimization (collect only necessary data). Accuracy (keep data correct, allow user corrections). Storage Limitation (retain only as long as needed, then delete). Security (protect from unauthorized access with encryption, controls). Accountability (demonstrate compliance). These principles underpin GDPR, CCPA, and other regulations. Implement proactively, not reactively."
      }
    },
    {
      "@type": "Question",
      "name": "What is GDPR compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GDPR (EU data protection): Applies if processing EU residents' data, regardless of company location. Requirements: lawful basis (consent, contract, legitimate interest), explicit consent for sensitive data, data subject rights (access, delete, correct, port, object), Data Protection Officer (large processors), breach notification within 72 hours, Privacy by Design, data processing agreements with vendors. Penalties: up to 4% global revenue or 20M EUR. Key: documented consent, rights process, security measures, vendor contracts."
      }
    },
    {
      "@type": "Question",
      "name": "What rights do users have over their data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "User data rights (GDPR/CCPA): Right to Access (know what data is collected). Right to Rectification (correct inaccurate data). Right to Erasure/Deletion (delete their data). Right to Data Portability (get data in usable format). Right to Object (stop processing). Right to Withdraw Consent (revoke earlier consent). Right to Know (CCPA - what categories collected). Right to Opt-Out (CCPA - stop sale/sharing). Businesses must respond within 30-45 days. Implement request process."
      }
    },
    {
      "@type": "Question",
      "name": "How do I implement privacy by design?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Privacy by Design: Embed privacy into product from start, not retrofit. Steps: Data mapping (what data, why, where). Minimize collection (remove unnecessary fields). Secure storage (encryption, access controls). User control (easy access/delete/opt-out). Transparent communication (clear privacy policy). Consent management (explicit opt-in, easy withdraw). Retention limits (auto-delete old data). Regular audits (verify practices). Documentation (record decisions). Involve privacy in design reviews. Prevents issues, reduces compliance cost."
      }
    },
    {
      "@type": "Question",
      "name": "What is a data breach response plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Data breach response: Detection (monitoring, alerts). Containment (isolate affected systems, preserve evidence). Assessment (scope, data types affected, risk level). Notification (GDPR: 72 hours to authority, notify affected users if high risk; CCPA: notify users). Documentation (record breach, response, timeline). Remediation (fix vulnerability, prevent recurrence). Communication (internal team, users, regulators, media if needed). Testing (regular breach simulation exercises). Post-breach review (lessons learned). Prepare plan before breach occurs."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Data Privacy Guide - Principles, Regulations & Best Practices',
  description: 'Privacy principles, key regulations, best practices, and user rights.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DataPrivacyGuide />
    </Suspense>
  );
}