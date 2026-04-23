import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessFeedbackSystemsGuide from '@/components/BusinessFeedbackSystemsGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of feedback exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Feedback types include upward feedback from employees to managers for leadership improvement, downward feedback from managers to employees for performance guidance, peer feedback from colleagues for team collaboration, customer feedback from clients and users for service quality, self-feedback from personal reflection for self-awareness, and 360-degree feedback from multiple sources for comprehensive view."
      }
    },
    {
      "@type": "Question",
      "name": "What components make a feedback system?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Feedback system components include feedback mechanisms, feedback channels, feedback frequency, feedback training, feedback culture, feedback follow-up, feedback documentation, feedback integration, feedback metrics, and feedback improvement processes."
      }
    },
    {
      "@type": "Question",
      "name": "What are feedback best practices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Feedback best practices include timely delivery close to events for relevance, specific content with concrete examples for actionability, balanced approach with positive and constructive elements for acceptance, and private setting for confidential delivery building trust."
      }
    },
    {
      "@type": "Question",
      "name": "What barriers prevent effective feedback?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Feedback barriers include fear of confrontation, lack of training, cultural resistance, time constraints, inadequate systems, poor follow-up, negative past experiences, and unclear expectations."
      }
    },
    {
      "@type": "Question",
      "name": "Why build feedback systems?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Feedback systems enable organizational learning through establishing mechanisms, creating channels, defining frequency, providing training, building culture, ensuring follow-up, maintaining documentation, integrating with systems, tracking metrics, and improving processes."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Feedback Systems Guide - Types, Components & Practices',
  description: 'Feedback types, system components, best practices, and common barriers.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessFeedbackSystemsGuide />
    </Suspense>
  );
}