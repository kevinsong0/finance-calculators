import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessLaborRelationsGuide from '@/components/BusinessLaborRelationsGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What aspects define labor relations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Labor relations aspects include collective bargaining for negotiation process achieving agreements, union relations for collaboration achieving partnership, contract administration for agreement implementation achieving compliance, dispute resolution for conflict handling achieving settlement, grievance processing for complaint handling achieving resolution, and compliance management for legal adherence achieving legal standing."
      }
    },
    {
      "@type": "Question",
      "name": "What is the labor relations process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The labor relations process involves understanding labor laws, identifying bargaining units, preparing negotiation strategy, engaging in collective bargaining, administering agreements, handling grievances properly, resolving disputes effectively, maintaining union communication, monitoring compliance status, and reviewing and improving practices."
      }
    },
    {
      "@type": "Question",
      "name": "What considerations affect labor relations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Labor relations considerations include legal requirements through labor laws with legal counsel approach, economic factors through budget constraints with financial planning approach, operational needs through business requirements with operations review approach, and employee interests through workforce concerns with employee input approach."
      }
    },
    {
      "@type": "Question",
      "name": "What skills support labor relations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Labor relations skills include negotiation techniques, conflict resolution, communication skills, legal knowledge, contract interpretation, relationship building, problem solving, and mediation abilities."
      }
    },
    {
      "@type": "Question",
      "name": "Why develop labor relations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Labor relations build workforce partnership through understanding laws, identifying units, preparing strategy, engaging bargaining, administering agreements, handling grievances, resolving disputes, maintaining communication, monitoring compliance, and improving practices."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Labor Relations Guide - Aspects, Process & Skills',
  description: 'Labor relations aspects, management process, key considerations, and required skills.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessLaborRelationsGuide />
    </Suspense>
  );
}