import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessStakeholderEngagementGuide from '@/components/BusinessStakeholderEngagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who are the key business stakeholders?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key business stakeholders include shareholders interested in returns and growth, customers focused on value and service, employees seeking compensation and growth, suppliers interested in partnership and payment, regulators requiring compliance and reporting, and the community concerned with impact and contribution."
      }
    },
    {
      "@type": "Question",
      "name": "What is the stakeholder engagement process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The stakeholder engagement process involves identifying stakeholders, analyzing stakeholder interests, mapping stakeholder influence, developing engagement strategies, creating communication plans, executing engagement activities, monitoring stakeholder sentiment, addressing concerns, evaluating effectiveness, and adapting approaches."
      }
    },
    {
      "@type": "Question",
      "name": "What techniques support stakeholder engagement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stakeholder engagement techniques include stakeholder mapping for prioritization by influence, regular communication for trust building, feedback channels for gathering insights, and collaboration sessions for joint problem-solving and alignment."
      }
    },
    {
      "@type": "Question",
      "name": "How do you measure stakeholder engagement success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stakeholder engagement metrics include stakeholder satisfaction, engagement participation, communication effectiveness, issue resolution rate, stakeholder trust level, relationship strength, feedback response time, and stakeholder retention."
      }
    },
    {
      "@type": "Question",
      "name": "Why is stakeholder engagement important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stakeholder engagement builds relationships by identifying stakeholders, analyzing interests, mapping influence, developing strategies, creating communication plans, executing activities, monitoring sentiment, addressing concerns, evaluating effectiveness, and adapting approaches for continuous improvement."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Stakeholder Engagement Guide - Stakeholders, Process & Metrics',
  description: 'Stakeholder types, engagement process, techniques, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessStakeholderEngagementGuide />
    </Suspense>
  );
}