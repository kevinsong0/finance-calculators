import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessIntellectualPropertyGuide from '@/components/BusinessIntellectualPropertyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of intellectual property exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IP types include patents (protecting inventions for 20 years covering technical innovations), trademarks (protecting brand identity with renewable duration covering names, logos, symbols), copyrights (protecting creative works for life plus 70 years covering art, writing, code), trade secrets (protecting confidential info indefinitely covering processes, formulas), design rights (protecting visual design for 15 years covering product appearance), and domain names (protecting web identity through registration covering online presence)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the IP management process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The process involves identifying IP assets, assessing protection needs, choosing protection type, filing applications, monitoring for infringement, enforcing rights, managing portfolio, licensing strategically, updating registrations, and documenting ownership."
      }
    },
    {
      "@type": "Question",
      "name": "What strategies protect intellectual property?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Protection strategies include registration for legal protection by filing promptly, documentation for proof of ownership by recording creation, monitoring to detect infringement through regular surveillance, and enforcement to protect rights through legal action if needed."
      }
    },
    {
      "@type": "Question",
      "name": "What risks threaten intellectual property?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common risks include infringement by others, unauthorized use, expiration of protection, poor documentation, failure to register, license disputes, trade secret leaks, and international complexity in protection."
      }
    },
    {
      "@type": "Question",
      "name": "When should IP protection be filed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IP protection should be filed as soon as possible after creating the asset. Patents should be filed before public disclosure. Trademarks should be registered before commercial use. Copyrights can be registered after creation but before distribution. Early filing provides stronger protection and prevents others from claiming rights."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Intellectual Property Guide - Types, Process & Strategies',
  description: 'IP types, management process, protection strategies, and common risks.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessIntellectualPropertyGuide />
    </Suspense>
  );
}