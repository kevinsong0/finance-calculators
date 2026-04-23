import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessVendorRelationshipManagementGuide from '@/components/BusinessVendorRelationshipManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the main types of vendor relationships?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vendor relationships are categorized into four types: Strategic vendors (critical importance, close partnership management), Tactical vendors (important, regular oversight), Commodity vendors (standard, periodic review), and Preferred vendors (streamlined process for efficiency)."
      }
    },
    {
      "@type": "Question",
      "name": "What are the key stages in vendor relationship management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The vendor relationship lifecycle includes: identify vendor needs, research vendor options, evaluate vendor capabilities, negotiate vendor terms, select vendor partner, contract vendor agreement, onboard vendor relationship, manage vendor performance, review vendor results, and renew or replace vendor."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics should be tracked for vendor management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key vendor management metrics include: vendor satisfaction, contract compliance, performance rating, cost effectiveness, quality delivery, response time, relationship strength, and risk level. These metrics help ensure optimal vendor performance and partnership value."
      }
    },
    {
      "@type": "Question",
      "name": "How often should vendor performance be reviewed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vendor performance reviews should occur quarterly for most vendors. Strategic vendors may require more frequent monthly reviews, while commodity vendors can be reviewed annually. The review frequency should match the vendor's importance and impact on business operations."
      }
    },
    {
      "@type": "Question",
      "name": "What activities are essential for effective vendor management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Essential vendor management activities include: vendor selection (per need for right partner), contract management (ongoing for clear terms), performance review (quarterly for quality assurance), and relationship building (regular for trust development)."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Vendor Relationship Management Guide - Types, Stages & Metrics',
  description: 'Vendor types, relationship stages, management activities, and success metrics for effective vendor partnerships.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessVendorRelationshipManagementGuide />
    </Suspense>
  );
}