import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessEthicsComplianceGuide from '@/components/BusinessEthicsComplianceGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What principles guide ethics compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ethics compliance principles include integrity for honest conduct with zero tolerance enforcement, fairness for equal treatment with policy review enforcement, transparency for open disclosure with audit process enforcement, responsibility for accountable actions with performance link enforcement, respect for dignified interaction with HR oversight enforcement, and compliance for legal adherence with legal review enforcement."
      }
    },
    {
      "@type": "Question",
      "name": "What areas require ethics compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ethics compliance areas include financial ethics, workplace conduct, data privacy, anti-corruption, fair competition, environmental ethics, supply chain ethics, and customer relations."
      }
    },
    {
      "@type": "Question",
      "name": "What process ensures ethics compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ethics compliance process includes code development for policy creation achieving standards defined, training delivery for education programs achieving awareness built, monitoring systems for compliance tracking achieving issues detected, and reporting channels for whistleblower access achieving concerns voiced."
      }
    },
    {
      "@type": "Question",
      "name": "What violations threaten ethics compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ethics compliance violations include financial misconduct, harassment incidents, data breaches, corruption attempts, safety violations, discrimination cases, conflict violations, and compliance failures."
      }
    },
    {
      "@type": "Question",
      "name": "Why implement ethics compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ethics compliance ensures organizational integrity through establishing principles, defining areas, developing code, delivering training, implementing monitoring, creating channels, handling violations, reviewing program, updating policies, and maintaining culture."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Ethics Compliance Guide - Principles, Areas & Process',
  description: 'Ethics principles, compliance areas, compliance process, and violation types.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessEthicsComplianceGuide />
    </Suspense>
  );
}