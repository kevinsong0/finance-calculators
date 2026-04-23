import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessContractManagementGuide from '@/components/BusinessContractManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of business contracts need management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contract types include sales contracts (customer agreements with revenue terms), vendor contracts (supplier agreements with procurement terms), employment contracts (staff agreements with HR terms), service contracts (provider agreements with service levels), lease contracts (property agreements with facility terms), and partnership contracts (joint agreements with collaboration terms)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the contract management process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The process involves drafting contract terms, reviewing for compliance, negotiating provisions, finalizing language, obtaining signatures, storing documents, tracking obligations, monitoring performance, managing amendments, and archiving completed contracts."
      }
    },
    {
      "@type": "Question",
      "name": "What compliance requirements apply to contracts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compliance requirements include legal requirements, regulatory standards, industry regulations, company policies, risk management provisions, disclosure obligations, liability limitations, and termination provisions."
      }
    },
    {
      "@type": "Question",
      "name": "What best practices improve contract management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Best practices include using standard templates for consistency and speed, mandatory legal review for risk mitigation, version control for audit trail, and renewal tracking with calendar alerts to prevent missed deadlines."
      }
    },
    {
      "@type": "Question",
      "name": "How should contracts be stored and organized?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contracts should be stored in a centralized document management system with version control, searchable metadata, access controls, backup procedures, and retention policies. Organize by type, status, and renewal dates for efficient management."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Contract Management Guide - Types, Process & Compliance',
  description: 'Contract types, management process, compliance requirements, and best practices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessContractManagementGuide />
    </Suspense>
  );
}