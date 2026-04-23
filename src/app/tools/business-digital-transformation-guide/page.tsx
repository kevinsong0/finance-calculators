import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessDigitalTransformationGuide from '@/components/BusinessDigitalTransformationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What drivers push digital transformation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Transformation drivers include: Customer expectations (digital-first experiences), Competitive pressure (market disruption), Technology advances (new capabilities), Cost optimization (efficiency gains), and Regulatory requirements (compliance needs)."
      }
    },
    {
      "@type": "Question",
      "name": "What stages define digital transformation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Transformation stages include: digital awareness, strategy development, pilot initiatives, technology implementation, process redesign, culture change, full integration, continuous optimization, and digital maturity. Each stage builds toward digital excellence."
      }
    },
    {
      "@type": "Question",
      "name": "What domains require digital transformation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Transformation domains include: Customer experience (digital engagement), Operations (process automation), Products/services (digital offerings), Business model (digital value), and Organization (digital culture). Each domain needs targeted transformation."
      }
    },
    {
      "@type": "Question",
      "name": "What technologies enable transformation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key technologies include: Cloud computing (scalable infrastructure), AI/ML (intelligent automation), IoT (connected systems), Big data analytics (data-driven insights), Mobile platforms (anywhere access), and APIs (system integration). Technology selection depends on strategic needs."
      }
    },
    {
      "@type": "Question",
      "name": "Why is digital transformation important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Digital transformation creates competitive advantage through technology, improves customer experience and engagement, enables operational efficiency and agility, unlocks new revenue streams, and builds future-ready organizations. Strategic transformation drives sustainable success."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Digital Transformation Guide - Drivers, Stages & Technologies',
  description: 'Transformation drivers, implementation stages, domains, and enabling technologies.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessDigitalTransformationGuide />
    </Suspense>
  );
}
