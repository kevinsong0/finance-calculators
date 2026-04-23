import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessCrisisResponseGuide from '@/components/BusinessCrisisResponseGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the phases of crisis response?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Crisis response phases include pre-crisis phase for preparation and prevention risk mitigation, crisis response phase for detection and containment damage control, and post-crisis phase for recovery and learning resilience."
      }
    },
    {
      "@type": "Question",
      "name": "What is the crisis response process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The crisis response process involves establishing crisis team, identifying crisis scenarios, developing crisis protocols, creating communication plans, training crisis responders, detecting crisis signals, activating crisis response, executing containment actions, communicating with stakeholders, and conducting post-crisis review."
      }
    },
    {
      "@type": "Question",
      "name": "What types of business crises exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Business crisis types include operational crisis from system failures with recovery protocols, financial crisis from cash issues with financial controls, reputational crisis from public incidents with communication strategy, and natural disaster from environmental events with safety protocols."
      }
    },
    {
      "@type": "Question",
      "name": "What should be in a crisis readiness checklist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Crisis readiness checklist items include crisis team established, protocols documented, communication channels ready, resources allocated, training completed, monitoring active, escalation paths defined, and backup systems tested."
      }
    },
    {
      "@type": "Question",
      "name": "Why is crisis response important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Crisis response ensures organizational resilience by establishing team, identifying scenarios, developing protocols, creating plans, training responders, detecting signals, activating response, executing actions, communicating with stakeholders, and conducting post-crisis review."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Crisis Response Guide - Phases, Steps & Readiness',
  description: 'Crisis response phases, process steps, crisis types, and readiness checklist.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessCrisisResponseGuide />
    </Suspense>
  );
}