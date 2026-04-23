import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessInternalCommunicationGuide from '@/components/BusinessInternalCommunicationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What channels support internal communication?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Internal communication channels include email for formal communication and documentation, meetings for group discussion and complex topics, messaging for quick updates and immediate feedback, intranet for information hub and resource access, video calls for remote interaction and visual connection, and notice boards for announcements and broad reach."
      }
    },
    {
      "@type": "Question",
      "name": "What are internal communication best practices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Internal communication best practices include defining communication purpose, choosing appropriate channel, crafting clear messages, targeting right audience, timing communications, encouraging feedback, monitoring effectiveness, archiving communications, training skills, and reviewing and improving processes."
      }
    },
    {
      "@type": "Question",
      "name": "What barriers hinder internal communication?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Internal communication barriers include information overload from too much content solved by prioritization, channel confusion from wrong medium solved by channel guidelines, message ambiguity from unclear content solved by clarity training, and timing issues from poor scheduling solved by timing rules."
      }
    },
    {
      "@type": "Question",
      "name": "How do you measure internal communication?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Internal communication metrics include message reach rate, response time, understanding accuracy, feedback participation, channel usage, communication satisfaction, information retention, and action completion rate."
      }
    },
    {
      "@type": "Question",
      "name": "Why optimize internal communication?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Internal communication enables organizational alignment through defining purpose, choosing channels, crafting messages, targeting audience, timing communications, encouraging feedback, monitoring effectiveness, archiving communications, training skills, and improving processes."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Internal Communication Guide - Channels, Practices & Metrics',
  description: 'Internal communication channels, best practices, barriers, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessInternalCommunicationGuide />
    </Suspense>
  );
}