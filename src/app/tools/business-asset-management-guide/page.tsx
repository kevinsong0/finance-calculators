import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessAssetManagementGuide from '@/components/BusinessAssetManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of business assets exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Asset types include: Fixed assets (long-term assets, capital management focus), Current assets (short-term assets, working capital focus), Intangible assets (non-physical assets, value protection focus), and Financial assets (investment assets, portfolio management focus)."
      }
    },
    {
      "@type": "Question",
      "name": "What processes manage business assets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Management processes include: asset acquisition, asset tracking, asset valuation, asset maintenance, asset utilization, asset depreciation, asset disposal, asset replacement, asset optimization, and asset audit."
      }
    },
    {
      "@type": "Question",
      "name": "What strategies optimize asset management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Management strategies include: Lifecycle management (full asset lifecycle for maximized value), Utilization optimization (improve usage rates for higher efficiency), Maintenance planning (preventive maintenance for reduced downtime), and Disposal optimization (value recovery for asset monetization)."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure asset management success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success metrics include: asset turnover ratio, return on assets, asset utilization rate, maintenance cost ratio, asset age distribution, depreciation rate, asset value growth, and disposal value recovery."
      }
    },
    {
      "@type": "Question",
      "name": "Why is asset management important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Asset management maximizes resource value, improves efficiency, reduces costs, protects investments, and supports growth. Proper management transforms assets from static holdings into productive resources."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Asset Management Guide - Types, Processes & Strategies',
  description: 'Asset types, management processes, optimization strategies, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessAssetManagementGuide />
    </Suspense>
  );
}
