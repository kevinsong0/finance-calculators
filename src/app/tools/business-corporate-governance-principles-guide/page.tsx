import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessCorporateGovernancePrinciplesGuide from '@/components/BusinessCorporateGovernancePrinciplesGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What principles guide corporate governance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Governance principles include: Transparency (open disclosure, trust building benefit), Accountability (clear responsibility, performance focus benefit), Fairness (equal treatment, stakeholder confidence benefit), and Responsibility (ethical conduct, sustainability benefit)."
      }
    },
    {
      "@type": "Question",
      "name": "What structures support corporate governance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Governance structures include: board composition, board independence, committee structure, executive compensation, shareholder rights, stakeholder engagement, risk oversight, and compliance framework."
      }
    },
    {
      "@type": "Question",
      "name": "What practices implement governance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Governance practices include: Board meetings (regular frequency, strategic oversight purpose), Financial reporting (quarterly frequency, transparency purpose), Risk assessment (annual frequency, risk management purpose), and Stakeholder communication (ongoing frequency, engagement purpose)."
      }
    },
    {
      "@type": "Question",
      "name": "What compliance requirements govern corporations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compliance requirements include: legal requirements, regulatory standards, industry codes, internal policies, ethical guidelines, best practices, audit requirements, and disclosure standards."
      }
    },
    {
      "@type": "Question",
      "name": "Why is corporate governance important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Corporate governance ensures sustainable business, builds stakeholder trust, guides ethical conduct, prevents misconduct, and creates long-term value. Effective governance transforms organizational structure into responsible stewardship."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Corporate Governance Principles Guide - Principles & Structures',
  description: 'Governance principles, organizational structures, implementation practices, and compliance.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessCorporateGovernancePrinciplesGuide />
    </Suspense>
  );
}
