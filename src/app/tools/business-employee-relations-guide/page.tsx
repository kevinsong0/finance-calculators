import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessEmployeeRelationsGuide from '@/components/BusinessEmployeeRelationsGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What areas define employee relations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Employee relations areas include communication for open dialogue with regular updates, conflict resolution for fair handling with mediation process, policy enforcement for consistent application with clear guidelines, recognition programs for acknowledgment with formal and informal methods, feedback channels for voice opportunities with multiple methods, and work environment for conditions with continuous improvement."
      }
    },
    {
      "@type": "Question",
      "name": "What are employee relations best practices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Employee relations best practices include maintaining open communication, addressing concerns promptly, applying policies consistently, recognizing contributions regularly, providing feedback opportunities, supporting employee development, resolving conflicts fairly, building trust relationships, monitoring employee satisfaction, and continuously improving processes."
      }
    },
    {
      "@type": "Question",
      "name": "What challenges affect employee relations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Employee relations challenges include communication gaps causing misunderstanding solved by regular updates, policy inconsistency causing fairness concerns solved by training managers, conflict escalation causing team disruption solved by early intervention, and recognition neglect causing engagement drop solved by program implementation."
      }
    },
    {
      "@type": "Question",
      "name": "How do you measure employee relations success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Employee relations metrics include employee satisfaction score, grievance resolution time, policy violation incidents, recognition participation, feedback submission rate, conflict resolution success, trust survey results, and turnover intention rate."
      }
    },
    {
      "@type": "Question",
      "name": "Why focus on employee relations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Employee relations build workplace harmony through maintaining communication, addressing concerns, applying policies, recognizing contributions, providing opportunities, supporting development, resolving conflicts, building trust, monitoring satisfaction, and improving processes."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Employee Relations Guide - Areas, Practices & Metrics',
  description: 'Employee relations areas, best practices, common challenges, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessEmployeeRelationsGuide />
    </Suspense>
  );
}