import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessChangeManagementGuide from '@/components/BusinessChangeManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the phases of change management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Change management phases include preparation phase for assessment and planning readiness, implementation phase for execution and support adoption, and sustainment phase for monitoring and reinforcement stabilization."
      }
    },
    {
      "@type": "Question",
      "name": "What is the change management process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The change management process involves identifying change need, assessing organizational readiness, defining change objectives, developing change strategy, planning change activities, communicating change vision, engaging stakeholders, implementing change actions, monitoring progress, and reinforcing outcomes."
      }
    },
    {
      "@type": "Question",
      "name": "How do you handle resistance to change?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Change resistance handling addresses fear of uncertainty with clear communication, loss of control with participation opportunities, skill concerns with training support, and cultural clash with cultural alignment strategies."
      }
    },
    {
      "@type": "Question",
      "name": "What roles are involved in change management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Change management roles include change sponsor, change manager, change agents, stakeholders, change recipients, communication lead, training lead, and resistance manager."
      }
    },
    {
      "@type": "Question",
      "name": "Why is change management important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Change management ensures successful transformation by identifying need, assessing readiness, defining objectives, developing strategy, planning activities, communicating vision, engaging stakeholders, implementing actions, monitoring progress, and reinforcing outcomes."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Change Management Guide - Phases, Steps & Resistance',
  description: 'Change management phases, process steps, resistance handling, and roles.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessChangeManagementGuide />
    </Suspense>
  );
}