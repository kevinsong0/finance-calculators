import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessOrganizationCultureGuide from '@/components/BusinessOrganizationCultureGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What elements define organization culture?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Organization culture elements include values for core beliefs and behavioral norms, mission for purpose statement and strategic direction, vision for future aspiration and goal alignment, norms for behavioral expectations and daily practices, symbols for visual identity and physical environment, and rituals for recurring events and team cohesion."
      }
    },
    {
      "@type": "Question",
      "name": "What types of organization culture exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Organization culture types include hierarchical culture, collaborative culture, competitive culture, creative culture, customer-focused culture, result-oriented culture, people-oriented culture, and process-driven culture."
      }
    },
    {
      "@type": "Question",
      "name": "How do you build organization culture?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Organization culture building involves defining desired culture, assessing current culture, identifying culture gaps, developing culture strategy, communicating culture vision, aligning systems and policies, training culture behaviors, modeling culture leadership, reinforcing culture norms, and measuring culture progress."
      }
    },
    {
      "@type": "Question",
      "name": "What indicates healthy organization culture?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Culture health indicators include employee engagement measured by survey scores showing commitment level, retention rates measured by turnover data showing culture fit, performance quality measured by work output showing culture impact, and communication style measured by interaction patterns showing culture expression."
      }
    },
    {
      "@type": "Question",
      "name": "Why develop organization culture?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Organization culture provides competitive advantage through defining culture, assessing current state, identifying gaps, developing strategy, communicating vision, aligning systems, training behaviors, modeling leadership, reinforcing norms, and measuring progress."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Organization Culture Guide - Elements, Types & Building',
  description: 'Culture elements, types, building strategies, and health indicators.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessOrganizationCultureGuide />
    </Suspense>
  );
}