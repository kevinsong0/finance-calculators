import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessInventoryControlGuide from '@/components/BusinessInventoryControlGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What methods are used for inventory control?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Inventory control methods include: ABC analysis (classify by value importance for focus efficiency), Just-in-time (minimize stock levels for cost reduction), Safety stock (buffer inventory for risk mitigation), and EOQ model (optimal order quantity for balanced cost)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the inventory control process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The inventory control process involves 10 steps: set inventory policies, define reorder points, calculate safety stock, monitor stock levels, track inventory turnover, manage stock locations, audit inventory counts, adjust inventory records, forecast demand needs, and optimize stock mix."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure inventory performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key inventory metrics include: Inventory turnover (sales/average inventory for efficiency), Days inventory (365/turnover ratio for cash flow), Stock accuracy (correct counts/total for reliability), and Fill rate (orders filled/total for service level)."
      }
    },
    {
      "@type": "Question",
      "name": "What are common inventory challenges?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common challenges include: overstock costs, stockout risks, demand variability, lead time uncertainty, storage constraints, shrinkage losses, obsolescence risks, and coordination complexity. Effective control addresses these challenges systematically."
      }
    },
    {
      "@type": "Question",
      "name": "Why is inventory control important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Inventory control balances cost and availability, improves cash flow, reduces waste, enhances customer service, and supports operational efficiency. Proper control transforms inventory from a cost burden into a competitive advantage."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Inventory Control Guide - Methods, Process & Metrics',
  description: 'Control methods, inventory process, key metrics, and common challenges for stock management.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessInventoryControlGuide />
    </Suspense>
  );
}