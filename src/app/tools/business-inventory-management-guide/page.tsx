import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessInventoryManagementGuide from '@/components/BusinessInventoryManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What methods manage inventory?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Inventory methods include ABC analysis (value classification for focus priority), EOQ model (economic order quantity for cost optimization), Just-in-time (demand timing for waste reduction), safety stock (buffer inventory for risk protection), perpetual tracking (continuous update for real-time accuracy), and periodic review (scheduled checks for control cycles)."
      }
    },
    {
      "@type": "Question",
      "name": "What controls regulate inventory?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Inventory controls include stock level monitoring, reorder point setting, lead time tracking, supplier management, demand forecasting, quality inspection, warehouse organization, and inventory auditing."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure inventory performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key metrics include inventory turnover (sales divided by average inventory showing efficiency), days inventory (inventory divided by daily sales showing holding time), fill rate (orders filled divided by orders showing service level), and carrying cost (storage and handling costs showing cost burden)."
      }
    },
    {
      "@type": "Question",
      "name": "What challenges affect inventory management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common challenges include overstock (excess inventory solved by demand forecasting), stockout (inventory shortage solved by safety stock), obsolescence (expired inventory solved by turnover management), and tracking errors (inaccurate counts solved by system updates)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the ideal inventory turnover rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ideal inventory turnover varies by industry. Retail typically targets 8-12 turns per year, manufacturing 4-8 turns, and grocery stores 12-15 turns. Higher turnover indicates efficiency but too high may risk stockouts. Balance turnover with service level requirements."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Inventory Management Guide - Methods, Controls & Metrics',
  description: 'Inventory methods, controls, performance metrics, and common challenges.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessInventoryManagementGuide />
    </Suspense>
  );
}