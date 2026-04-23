import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessSupplyChainGuide from '@/components/BusinessSupplyChainGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What components make up the supply chain?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Supply chain components include suppliers (source materials for quality inputs), manufacturing (transform materials for production capacity), warehousing (store inventory for availability buffer), distribution (move products for delivery capability), retail (sell to customers for market reach), and customers (purchase products for demand source)."
      }
    },
    {
      "@type": "Question",
      "name": "What flows run through supply chains?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Supply chain flows include material flow (physical goods), information flow (data), financial flow (money), product flow (finished goods), service flow (support), and reverse flow (returns)."
      }
    },
    {
      "@type": "Question",
      "name": "What strategies manage supply chains?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Management strategies include lean supply chain (minimize waste for cost reduction), agile supply chain (flexibility focus for responsiveness), resilient supply chain (risk mitigation for stability), and sustainable supply chain (environmental focus for responsibility)."
      }
    },
    {
      "@type": "Question",
      "name": "What challenges affect supply chains?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common challenges include demand volatility, supply disruption, inventory imbalance, cost pressure, quality issues, delivery delays, information gaps, and global complexity."
      }
    },
    {
      "@type": "Question",
      "name": "How can supply chain resilience be improved?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Supply chain resilience improves through diversifying suppliers, building safety stock, creating contingency plans, improving visibility with technology, developing backup logistics routes, maintaining strong supplier relationships, and regularly testing response plans."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Supply Chain Guide - Components, Flows & Strategies',
  description: 'Supply chain components, flows, management strategies, and challenges.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessSupplyChainGuide />
    </Suspense>
  );
}