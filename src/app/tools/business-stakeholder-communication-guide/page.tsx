import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessStakeholderCommunicationGuide from '@/components/BusinessStakeholderCommunicationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What stakeholders require communication?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stakeholders requiring communication include investors needing financial updates quarterly, customers needing product information regularly, employees needing company news weekly, suppliers needing order updates transaction-based, regulators needing compliance reports per requirements, and community needing CSR activities annually."
      }
    },
    {
      "@type": "Question",
      "name": "What strategies guide stakeholder communication?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stakeholder communication strategies involve mapping stakeholder needs, defining communication objectives, developing tailored messages, selecting appropriate channels, scheduling communications, executing communication plans, monitoring stakeholder response, addressing stakeholder concerns, evaluating effectiveness, and improving communication approach."
      }
    },
    {
      "@type": "Question",
      "name": "What approaches support stakeholder communication?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stakeholder communication approaches include proactive timing before events for preparation benefit, reactive timing after events for response benefit, interactive timing continuously for engagement benefit, and informative timing periodically for education benefit."
      }
    },
    {
      "@type": "Question",
      "name": "How do you measure stakeholder communication?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stakeholder communication metrics include stakeholder satisfaction, message comprehension, response rate, engagement level, concern resolution, communication reach, feedback quality, and relationship strength."
      }
    },
    {
      "@type": "Question",
      "name": "Why focus on stakeholder communication?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stakeholder communication builds relationships through mapping needs, defining objectives, developing messages, selecting channels, scheduling communications, executing plans, monitoring response, addressing concerns, evaluating effectiveness, and improving approach."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Stakeholder Communication Guide - Stakeholders, Strategies & Metrics',
  description: 'Stakeholder types, communication strategies, approaches, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessStakeholderCommunicationGuide />
    </Suspense>
  );
}