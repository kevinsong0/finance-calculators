import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessStakeholderManagementGuide from '@/components/BusinessStakeholderManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What stakeholders require management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key stakeholders include: Shareholders (primary priority, investment returns engagement), Customers (critical priority, product satisfaction engagement), Employees (essential priority, work experience engagement), and Suppliers (important priority, partnership value engagement)."
      }
    },
    {
      "@type": "Question",
      "name": "What strategies manage stakeholders?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Management strategies include: stakeholder identification, priority assessment, needs analysis, engagement planning, communication strategy, relationship building, feedback collection, issue resolution, value delivery, and relationship monitoring."
      }
    },
    {
      "@type": "Question",
      "name": "What approaches engage stakeholders?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Engagement approaches include: Direct engagement (personal interaction, trust building benefit), Regular communication (updates and reports, transparency benefit), Feedback mechanisms (surveys and channels, input collection benefit), and Issue resolution (problem solving, relationship repair benefit)."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure stakeholder management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success metrics include: stakeholder satisfaction, engagement effectiveness, relationship strength, communication quality, issue resolution rate, value delivery score, trust index, and stakeholder retention."
      }
    },
    {
      "@type": "Question",
      "name": "Why is stakeholder management important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stakeholder management ensures business success, builds relationships, delivers value, resolves issues, and creates sustainability. Effective management transforms isolated transactions into connected relationships."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Stakeholder Management Guide - Stakeholders, Strategies & Approaches',
  description: 'Key stakeholders, management strategies, engagement approaches, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessStakeholderManagementGuide />
    </Suspense>
  );
}
