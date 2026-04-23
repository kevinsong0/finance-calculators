import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessInsurancePlanningGuide from '@/components/BusinessInsurancePlanningGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of business insurance exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Insurance types include general liability (third-party claims, essential coverage), property insurance (physical assets, essential), professional liability (service errors, important for service firms), workers compensation (employee injuries, mandatory), cyber insurance (data breaches, critical for digital businesses), and business interruption (revenue loss, important for continuity)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the insurance planning process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The process involves assessing business risks, identifying coverage needs, researching providers, comparing policies, reviewing exclusions, negotiating terms, purchasing coverage, documenting policies, reviewing annually, and updating for business changes."
      }
    },
    {
      "@type": "Question",
      "name": "What factors should be considered in insurance planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key factors include coverage adequacy (protection level through risk assessment), premium cost (budget impact through cost comparison), deductible level (out-of-pocket expense through balance analysis), and policy exclusions (gap coverage through careful review)."
      }
    },
    {
      "@type": "Question",
      "name": "What best practices guide insurance management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Best practices include bundling policies for savings, reviewing coverage annually, documenting all policies, understanding exclusions thoroughly, maintaining good records, reporting claims promptly, working with reputable providers, and considering business growth when planning."
      }
    },
    {
      "@type": "Question",
      "name": "How much business insurance is needed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Insurance amounts depend on business size, industry risks, asset value, liability exposure, regulatory requirements, and contractual obligations. Assess all potential losses, consider worst-case scenarios, review industry benchmarks, and ensure coverage exceeds maximum potential liability."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Insurance Planning Guide - Types, Process & Best Practices',
  description: 'Insurance types, planning process, key considerations, and best practices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessInsurancePlanningGuide />
    </Suspense>
  );
}