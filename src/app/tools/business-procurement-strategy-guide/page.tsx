import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessProcurementStrategyGuide from '@/components/BusinessProcurementStrategyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the main procurement strategies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Procurement strategies include: Cost leadership (lowest price sourcing for savings), Quality focus (premium supplier selection for reliability), Speed priority (quick delivery sourcing for agility), and Risk mitigation (diversified suppliers for security). Each strategy aligns procurement with business objectives."
      }
    },
    {
      "@type": "Question",
      "name": "What is the procurement process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The procurement process involves 10 steps: define procurement requirements, develop sourcing strategy, identify potential suppliers, evaluate supplier options, negotiate procurement terms, select supplier partners, execute procurement contracts, manage supplier relationships, monitor procurement performance, and optimize procurement process."
      }
    },
    {
      "@type": "Question",
      "name": "What sourcing methods are used in procurement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sourcing methods include: Competitive bidding (multiple supplier quotes for best price), Direct negotiation (single supplier deal for speed), E-procurement (digital sourcing platform for efficiency), and Group purchasing (consolidated buying for volume leverage)."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure procurement success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key procurement metrics include: procurement cost savings, supplier compliance rate, order accuracy rate, delivery performance, procurement cycle time, supplier satisfaction, contract utilization, and spend under management. These metrics track efficiency and value creation."
      }
    },
    {
      "@type": "Question",
      "name": "Why is procurement strategy important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Procurement strategy ensures cost efficiency, supply reliability, operational agility, and risk security. Strategic procurement transforms purchasing from a transactional function to a value-creating capability that drives competitive advantage."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Procurement Strategy Guide - Strategies, Process & Methods',
  description: 'Procurement strategies, sourcing process, methods, and success metrics for cost-efficient purchasing.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessProcurementStrategyGuide />
    </Suspense>
  );
}