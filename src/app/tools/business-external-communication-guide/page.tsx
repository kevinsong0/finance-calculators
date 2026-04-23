import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessExternalCommunicationGuide from '@/components/BusinessExternalCommunicationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of external communication exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "External communication types include marketing communication for customers and brand building, public relations for media and public reputation, investor relations for shareholders and trust building, customer service for clients and support, partner communication for business partners and collaboration, and regulatory communication for authorities and compliance."
      }
    },
    {
      "@type": "Question",
      "name": "What channels support external communication?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "External communication channels include website, social media, email campaigns, press releases, annual reports, customer portals, media interviews, events and conferences, advertising, and direct mail."
      }
    },
    {
      "@type": "Question",
      "name": "What principles guide external communication?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "External communication principles include consistency for message alignment and brand coherence, transparency for open disclosure and trust building, relevance for targeted content and engagement, and timeliness for prompt response and responsiveness."
      }
    },
    {
      "@type": "Question",
      "name": "How do you measure external communication?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "External communication metrics include brand awareness, media coverage, customer engagement, response rate, message reach, audience sentiment, conversion rate, and communication ROI."
      }
    },
    {
      "@type": "Question",
      "name": "Why optimize external communication?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "External communication builds brand reputation through defining strategy, selecting channels, crafting messages, targeting audiences, maintaining consistency, ensuring transparency, responding timely, monitoring sentiment, measuring impact, and adjusting strategies."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business External Communication Guide - Types, Channels & Principles',
  description: 'External communication types, channels, guiding principles, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessExternalCommunicationGuide />
    </Suspense>
  );
}