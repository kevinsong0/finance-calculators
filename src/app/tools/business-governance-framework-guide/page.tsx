import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessGovernanceFrameworkGuide from '@/components/BusinessGovernanceFrameworkGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the principles of corporate governance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Corporate governance principles include transparency for open disclosure building trust, accountability for clear responsibility creating ownership, fairness for equal treatment ensuring equity, and responsibility for ethical conduct maintaining integrity."
      }
    },
    {
      "@type": "Question",
      "name": "What are the components of a governance framework?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Governance framework components include board structure, board committees, management oversight, internal controls, risk management, compliance systems, audit processes, reporting standards, stakeholder rights, and ethical guidelines."
      }
    },
    {
      "@type": "Question",
      "name": "What governance structures exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Governance structures include board of directors for strategic oversight and direction setting, audit committee for financial oversight and audit review, risk committee for risk oversight and risk assessment, and compensation committee for pay oversight and remuneration."
      }
    },
    {
      "@type": "Question",
      "name": "What are governance best practices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Governance best practices include regular board meetings, independent directors, separation of roles, disclosure requirements, conflict of interest policies, whistleblower protection, code of conduct, and shareholder communication."
      }
    },
    {
      "@type": "Question",
      "name": "Why is governance important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Governance ensures organizational integrity through transparency, accountability, fairness, responsibility, board structure, committees, management oversight, internal controls, risk management, and ethical guidelines."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Governance Framework Guide - Principles, Components & Practices',
  description: 'Governance principles, framework components, structures, and best practices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessGovernanceFrameworkGuide />
    </Suspense>
  );
}